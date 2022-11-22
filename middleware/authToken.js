require('dotenv').config()
const jwt = require('jsonwebtoken')
const ApiError = require('../errors/api-error')

async function authenticateToken(req, res, next){

    let y = req.headers["authorization"];
    if ( y == null ) {
        y = req.body.token;
        cert = process.env.REFRESH_TOKEN_SECRET;
    } else {
        const authHeader = req.headers["authorization"];
        y = authHeader && authHeader.split(" ")[1];
        cert = process.env.ACCESS_TOKEN_SECRET;
    }

    const token = y;
    const secret = cert;

    if (token == null) return res.status(401)

    jwt.verify(token, secret,  (err, user) => {
        if (err) {
            console.log(err)
            next(ApiError.forbidden(err))
        } else {
            req.user = user
            console.log("AuthTokenMW: authToken verified");
            const { _id } = jwt.verify(token, secret);

            next()
        }
    })

    // try {
    //     const { _id } = jwt.verify(token, secret)

    //     let pool = await sql.connect(configJobData);
    //     let job = await pool.request()
    //         .input ('token', sql.VarChar, _id)
    //         .execute('GetClientReach');

    //         req.user = res.json(JSON.parse(job.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']));
    //     } catch (e) {
    //         res.status(500).json({ Error: +e.message })
    //         console.log(e);
    //     }
 
    }
    

module.exports = authenticateToken;