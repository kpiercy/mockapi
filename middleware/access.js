require('dotenv').config()

const sql = require('mssql/msnodesqlv8')
const configJobData = require('../config/JobData_dbconfig')

async function apiAccess(req, res, next) {
      
    let y = req.headers["authorization"];
    if (y == null) {
      y = req.body.token;
    } else {
      const authHeader = req.headers["authorization"];
      y = authHeader && authHeader.split(" ")[1];
    }

    const token = y;

    try{

        if (token == null) return res.status(401);

        let pool = await sql.connect(configJobData)
        let canAccess = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('UserAccessAPI')
            var thisUserAccess = canAccess.recordset[0].apiaccess
            var thisUserClient = canAccess.recordset[0].clientid
        await sql.connect(configJobData)
        let clientAccess = await pool.request()
            .input('clientid', sql.VarChar, thisUserClient)
            .execute('ClientAccessAPI')
            var thisClientAccess = clientAccess.recordset[0].Status
        console.log({ userAccess: thisUserAccess, clientStatus: thisClientAccess })
        if (thisUserAccess === 'true' && thisClientAccess === 'Active') {
            console.log('***User & Client apiAccess: verified***')
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