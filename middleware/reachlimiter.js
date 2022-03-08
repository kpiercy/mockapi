require('dotenv').config()

const sql = require('mssql/msnodesqlv8')
const configJobData = require('../config/JobData_dbconfig')

//handles the requirement that every request this mw is passed on should contain clientid and determines if the requesting user is a part of the clientid in the user table

async function limitReach(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if ( req.params.clientid == null ){
        var cid = req.body.clientid
    } else {
        var cid = req.params.clientid
    }

    let text2 = cid
    var cid = text2.toLowerCase()

    if (token == null) return res.status(401)

    try{
        var master = false
        var parent = false
        let pool = await sql.connect(configJobData)
        let limit = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('GetClientReach')
        var thisReach = limit.recordset[0].clientid
        var thisUser = limit.recordset[0].username
        var thisParent = limit.recordset[0].parent_clientid
        try {
            if ( thisReach.toLowerCase() === process.env.EPS_CLIENT_ID ) { 
                var master = true
                console.log('***user: '+`${thisUser.substring(0, 3)}`+' invoked master reach***')
                next()
            } else if ( thisParent.toLowerCase() === cid ) {
                var parent = true
                console.log('***user: '+`${thisUser.substring(0, 3)}`+' invoked parent reach***')
                next()
            } else if ( thisReach.toLowerCase() !== cid && master === false  && parent === false) {
                    res.status(401).json({ Error: 'Requesting user does not belong to the specified client contained in "clientid". You can use /clients/users/me to retrieve the correct client id.' })
            } else {
                console.log('***User reach verified***')
                next()
            }
        } catch {
            res.status(400).json({ Error: 'unexpected exception in reach limit verification encountered' })
        }    

    } catch {
        res.status(500).json({ Error: 'Unable to verify user reach by client id specified' })
    }

}

module.exports = limitReach;