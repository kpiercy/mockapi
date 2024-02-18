require('dotenv').config()

const sql = require('mssql')
const ApiError = require('../utils/api-error')

const configJobData = require(`../config/${process.env.NODE_ENV}`)

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
            .execute('MW_UserAccessAPI')
            var thisUserAccess = canAccess.recordset[0].apiaccess
            var thisUserClient = canAccess.recordset[0].clientid
        await sql.connect(configJobData)
        let clientAccess = await pool.request()
            .input('clientid', sql.Int, thisUserClient)
            .execute('MW_ClientAccessAPI')
            var thisClientAccess = clientAccess.recordset[0].Status
        console.log({ userAccess: thisUserAccess, clientStatus: thisClientAccess })
        if (thisUserAccess === true && thisClientAccess === 'Live') {
            console.log('AccessMW: User & Client apiAccess verified')
            next()
        } else {
                //res.status(403).json({Error: 'Requesting user does not have API access. Please contact ElitePS for more information.'})
                next(ApiError.forbidden(err))
            }
    } catch (err) {
        next(ApiError.internal(err));
    }

}

module.exports = apiAccess;