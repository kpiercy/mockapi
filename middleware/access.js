require('dotenv').config()

const sql = require('mssql/msnodesqlv8')
const configJobData = require('../config/JobData_dbconfig')


async function apiAccess(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    try{
        let pool = await sql.connect(configJobData)
        let canAccess = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('CanAccessAPI')
        var thisUserAccess = canAccess.recordset[0].apiAccess
            if (thisUserAccess !== '1') {
                res.status(401).json('Requesting user does not have API access.')
            } else {
                next()
            }
    } catch {
        res.status(500).json('Unable to retrieve apiAccess for user.')
    }

}

module.exports = apiAccess;