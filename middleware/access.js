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
            .execute('UserAccessAPI')
            var thisUserAccess = canAccess.recordset[0].apiaccess
            var thisUserClient = canAccess.recordset[0].clientid
        let pool2 = await sql.connect(configJobData)
        let clientAccess = await pool.request()
            .input('clientid', sql.VarChar, thisUserClient)
            .execute('ClientAccessAPI')
            var thisClientAccess = clientAccess.recordset[0].Status
        if (thisUserAccess === 'true' && thisClientAccess === 'Active') {
            console.log('***user access was verified***')
            next()
        } else {
                res.status(403).json({Error: 'Requesting user does not have API access. Please contact ElitePS for more information.'})
            }
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: 'Unable to retrieve apiAccess for user.' })
    }

}

module.exports = apiAccess;