require('dotenv').config()

const sql = require('mssql')
const ApiError = require('../utils/api-error')
const configJobData = require(`../config/${process.env.NODE_ENV}`)

//handles the requirement that every request this mw is passed on should contain clientid and determines if the requesting user is a part of the clientid in the user table

async function limitReach(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if ( req.params.clientid == null ){
        var cid = req.body.clientid
    } else {
        var cid = req.params.clientid
    }

    if (token == null) return next(ApiError.unautorized())

    try{
        var master = false
        var parent = false
        let pool = await sql.connect(configJobData)
        let limit = await pool.request()
            .input('token', sql.VarChar, token)
            .input('clientid', sql.Int, cid)
            .execute('MW_GetReach')
        var thisReach = limit.recordset[0].clientid
        var thisUser = limit.recordset[0].username
        var thisParent = limit.recordset[0].parent_clientid
        var thisPerm = limit.recordset[0].securityGrp
        
            if ( thisReach === parseInt(process.env.EPS_CLIENT_ID) && thisPerm.toLowerCase() === 'admin') { 
                var master = true
                console.log('ReachLimitMW: Master reach for user: '+`${thisUser.substring(0, 3)}`+' verified')
                next()
            } else if (
              thisParent === cid &&
              thisPerm.toLowerCase() === "parent"
            ) {
              var parent = true;
              console.log(
                "ReachLimitMW: Parent reach for user " +
                  `${thisUser.substring(0, 3)}` +
                  " verified***"
              );
              next();
            } else if (
              thisReach === cid &&
              thisPerm.toLowerCase() === "standard" &&
              master === false &&
              parent === false
            ) {
              console.log(
                "ReachLimitMW: Standard reach for user " +
                  `${thisUser.substring(0, 3)}` +
                  " verified***"
              );
              next();
            } else if (
              thisReach !== cid &&
              master === false &&
              parent === false
            ) {
              console.log("ReachLimitMW: ReachLimit exceeded by user:" +`${thisUser.substring(0,3)}` + "***")
              next(
                ApiError.forbidden(
                  'ReachLimit exceeded, Requesting user does not belong to the specified client contained in "clientid". You can use /clients/users/me to retrieve the correct client id.'
                )
              )
              // res.status(401).json({
              //   Error:
              //     'ReachLimit exceeded, Requesting user does not belong to the specified client contained in "clientid". You can use /clients/users/me to retrieve the correct client id.',
              // });
            } else {
              next(ApiError.notAllowed('Unhandled user reach limit exception encountered'))
              // res.status(500).json({
              //   Error: "Unhandled user reach limit exception encountered",
              // });
            }               

    } catch {
      next(ApiError.notAllowed('Unable to verify user reach by client id specified'))
        // res.status(500).json({ Error: 'Unable to verify user reach by client id specified' })
    }

}

module.exports = limitReach;