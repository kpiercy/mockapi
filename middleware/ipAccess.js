const sql = require('mssql/msnodesqlv8')
const configJobData = require('../config/JobData_dbconfig')

async function authIP(req, res, next){
    try{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        let pool = await sql.connect(configJobData)
        let goodIp = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('IPExists')
        var thisIp = goodIp.recordset[0].allowedips
        let str = thisIp
        let lookup = str.search(req.ipInfo.ip)
            if (lookup == -1) {
                res.status(403).send('Access not allowed from this IP')
                //perform 2fa here
            } else {
                next()
            }
    } catch {
        res.status(500).json('Unable to verify IP')
    }
    
}

module.exports = authIP;