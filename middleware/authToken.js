require('dotenv').config()
const jwt = require('jsonwebtoken')

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
            res.status(403).json(err)
        } else {
            req.user = user
            console.log("***authToken: verified***");
            next()
        }

    })
    
}

module.exports = authenticateToken;