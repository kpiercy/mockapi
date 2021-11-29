require('dotenv').config()

const sql = require('mssql/msnodesqlv8')
const configJobData = require('../config/JobData_dbconfig')


async function authLvl(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    try{
        let pool = await sql.connect(configJobData)
        let permLvl = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('AuthPermLvl')
        var thisUserLvl = permLvl.recordset[0].permissions
        var thisUser = permLvl.recordset[0].username
            if (thisUserLvl != 'Admin') {
                res.status(401).json('Requesting user does not have permission necesssary.')
            } else {
                console.log('Request generated from ElitePS Admin user: '+`${thisUser}`)
                next()
            }
    } catch {
        res.status(500).json('Unable to retrieve authLvl for user.')
    }

}

module.exports = authLvl;