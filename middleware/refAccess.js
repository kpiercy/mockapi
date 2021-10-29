require('dotenv').config()

const sql = require('mssql/msnodesqlv8')
const configJobData = require('../config/JobData_dbconfig')


async function refAccess(req, res, next) {
    const token = req.body.token
    if (token == null) return res.sendStatus(401)

    try{
        let pool = await sql.connect(configJobData)
        let canAccess = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('CanAccessAPI')
        var thisUserAccess = canAccess.recordset[0].apiaccess
            if (thisUserAccess !== 'true') {
                res.status(401).json('Requesting user does not have API access. Please contact ElitePS for more information.')
            } else {
                next()
            }
    } catch {
        res.status(500).json('Unable to retrieve apiAccess for user.')
    }

}

module.exports = refAccess;