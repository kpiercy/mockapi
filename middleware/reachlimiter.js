require('dotenv').config()

const sql = require('mssql/msnodesqlv8')
const configJobData = require('../config/JobData_dbconfig')


async function limitReach(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    req.params.cid = req.cid //retrieve cid from originalUrl
    const cid = req.params.cid

    if (token == null) return res.sendStatus(401)

    try{
        let pool = await sql.connect(configJobData)
        let limit = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('GetClientReach')
        var thisReach = limit.recordset[0].clientid
        var thisPerm = limit.recordset[0].permissions
            
            if (thisReach !== cid) {
                res.status(401).json('Requesting user does not belong to the specified client contained in the url. You can use /clients/users/me to retrieve the correct client id.')
            } else if (thisReach === process.env.EPS_CLIENT_ID) { 
                let reqUser = 'ElitePS Admin'
                console.log('ElitePS user reach verified')
                next()
            } else {
                console.log('User reach verified')
                next()
            }
    } catch {
        res.status(500).json('Unable to verify user reach by client id specified')
    }

}

module.exports = limitReach;