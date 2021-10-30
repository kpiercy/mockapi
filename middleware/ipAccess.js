const sql = require('mssql/msnodesqlv8')
const configJobData = require('../config/JobData_dbconfig')
const nodemailer = require("nodemailer")

async function authIP(req, res, next){
    try{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        let pool = await sql.connect(configJobData)
        let goodIp = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('IPExists')
        var thisIp = goodIp.recordset[0].allowedips
        var thisUser = goodIp.recordset[0].email
        let str = thisIp
        let lookup = str.search(req.ipInfo.ip)
            if (lookup == -1) {
                res.status(403).send('Access not allowed from this IP. Please check your email to perform additional verification.')
                //perform 2fa here
                async function sendemail() {
    
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: "smtp.socketlabs.com",
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: process.env.SMTP_USER,
                            pass: process.env.SMTP_PASS,
                        },
                    })
                
                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: '"ElitePS API" <api@eliteps.com>', // sender address
                        to: `${thisUser}`, // list of receivers
                        subject: "Please confirm identity to access ElitePS API", // Subject line
                        text: "Hello world?", // plain text body
                        html: "<b>Hello world?</b>", // html body
                        })
                
                    console.log("Message sent: %s", info.messageId)
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                
                    }
                    sendemail().catch(console.error)
                } 
             else {
                next()
            }
    } catch {
        res.status(500).json('Unable to verify IP')
    }
    
}

module.exports = authIP;