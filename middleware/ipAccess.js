const sql = require('mssql/msnodesqlv8')
const configJobData = require('../config/JobData_dbconfig')
const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken')
const ApiError = require('../utils/api-error')

async function authIP(req, res, next){
    try{
        //handling for when req is from /refresh for the token assignment
        let y = req.headers["authorization"];
        if (y == null) {
        y = req.body.token;
        } else {
        const authHeader = req.headers["authorization"];
        y = authHeader && authHeader.split(" ")[1];
        }

        const token = y;

        let pool = await sql.connect(configJobData)
        let goodIp = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('MW_IPExists')
        var thisIp = goodIp.recordset[0].allowedips
        var thisUser = goodIp.recordset[0].email
        let str = thisIp
        let lookup = str.search(req.ipInfo.ip)
            if (lookup == -1) {
                res.status(403).json({ Error: 'Access not allowed from this IP. Please check your email to perform additional verification.' })
                // //perform 2fa here
                // async function sendemail() {
                //     // create reusable transporter object using the default SMTP transport
                //     let transporter = nodemailer.createTransport({
                //     host: "smtp.socketlabs.com",
                //     port: 587,
                //     secure: false, // true for 465, false for other ports
                //     auth: {
                //         user: process.env.SMTP_USER,
                //         pass: process.env.SMTP_PASS,
                //     },
                // })
            
                // // send mail with defined transport object
                // let info = await transporter.sendMail({
                //     from: '"ElitePS API" <api@eliteps.com>', // sender address
                //     to: `${thisUser}`, // list of receivers
                //     subject: "Please confirm identity to access ElitePS API", // Subject line
                //     text: "Hello, Additional verification is required to continue access to the ElitePS API. If you do not see a 'Confirm Me' button below, please reach out to kpiercy@eliteps.com for additional assistance.", // plain text body
                //     html: `<!doctype html>
                //     <html>
                //       <head>
                //         <meta charset="utf-8">
                //       </head>
                //       <body>
                //       <p>Hello,<br> Additional verification is required to continue access to the ElitePS API. Please click the link below to reinitiate access:<br><form action="http://localhost:4000/clients/users/me/confirm" method="post" enctype="multipart/form-data"><input type="hidden" name="headers[Authorization]" value="Bearer ${token}" /><input id='submitButton' type='submit' value='Confirm Me'/></form></p>
                //       </body>
                //     </html>`
                //     })
            
                // console.log("Verification email sent: %s", info.messageId)
                // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // }
                // sendemail().catch(console.error)
                } 
             else {
                console.log('IPAccessMW: ipaccess verified')
                next()
            }
    } catch (err) {
        console.log(err)
        next(ApiError.internal(err))
        //res.status(500).json({ Error: 'Unable to verify IP' })
    }
    
}


module.exports = authIP;