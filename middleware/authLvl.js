require('dotenv').config()

const sql = require('mssql')
const configJobData = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')


async function authLvl(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    try{
        let pool = await sql.connect(configJobData)
        let permLvl = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('MW_AuthPermLvl')
        var thisUserLvl = permLvl.recordset[0].securityGrp
        var thisUser = permLvl.recordset[0].username
            if (thisUserLvl.toLowerCase() !== 'admin') {
                console.log("!!!!!!!!  Admin Protected route call made by non-admin user: " + `${thisUser}` + " !!!!!!!!")
                //res.status(401).json({ Error: 'Requesting user does not have permission necesssary.' })
                next(ApiError.unauthorized())
            } else {
                console.log('AuthLvlMW: AdminLvl for '+`${thisUser.substring(0, 3)}`+': verified')
                next()
            }
    } catch (err) {
        console.log(err)
        // res.status(500).json({ Error: 'Unable to retrieve authLvl for user.' })
        next(ApiError.internal(err))
    }

}

module.exports = authLvl;