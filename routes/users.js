require('dotenv').config()

//2FA notes: store pubIP to DB during registration/setup, if requesting pubIP does not match stored value, send email during /auth or /refresh to user email with link containing /me/confirm route and token that expires in 1 day, during /me/confirm route, append the new pubIp to their pubIp field, ALSO add windows scheduler script that reset each users "confirmed" status to false every xx days to make them redo 2FA

const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const authlimiter = require('../middleware/authlimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl')
const authAccess = require('../middleware/access')
const authRefAccess= require('../middleware/refAccess')
const authIP = require('../middleware/ipAccess')
const dboperations = require('../services/dbops_users')
var configJobData = require('../config/JobData_dbconfig')
var configEliteMaster = require('../config/EliteMaster_dbconfig')
const sql = require('mssql/msnodesqlv8')
const pubip = require('express-ip')
//const speakeasy = require('speakeasy')
//const uuid = require('uuid').v4

const router = express.Router()
router.use(pubip().getIpInfoMiddleware)
router.all('/', authlimiter)


//takes in req body, SHA256 ecrypts the password, verifies user exists in DB and compares SHA256 password to stored value, returns accessToken and refreshToken
router.post('/auth', authIP, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const username = req.body.username
    const user = { name: req.body.username, password: hashedPassword }
    if (user == null){
        return res.status(400).send('Please enter proper credentials')
    }
    try {
        try{
            let pool = await sql.connect(configJobData)
            let users = await pool.request()
            .input('username', sql.VarChar, username)  
            .execute('UserExists')
            var thisUser = users.recordset[0].username
            var thisPass = users.recordset[0].hashedpassword
            var thisAccess = users.recordset[0].apiaccess

            if ( await bcrypt.compare(req.body.password, thisPass) && thisUser === username) {
                if ( thisAccess === 'true' ) {
                        const accessToken = generateAccessToken(user)
                        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                        res.json({accessToken: accessToken, refreshToken: refreshToken})

                        let userUp = { usernm: req.body.username, refToken: refreshToken, accToken: accessToken}
                        dboperations.addTokens(userUp).then(result => {
                            res.status(201).json(result);
                        })

                    } else {
                        res.status(403).send('User does not have API access at this time, please check with your admin and contact Elite Services if necessary')
                    }
                } else {
                    res.status(403).send('Username or password incorrect')
                }
        } catch {
            res.status(401).send('Credentials do not exist in DB')
        }
    
    } catch (error){
        res.status(500).send(error)

    }
})

//takes in refresh token from req body, confirms that matches stored refresh token, returns new access token, updates DB with new access token
router.post('/refresh', authRefAccess, async (req,res) => {
    const refreshtoken = req.body.token

    if (refreshtoken == null) return res.sendStatus(401)

    try{
        let pool = await sql.connect(configJobData)
        let users = await pool.request()
            .input('refToken', sql.VarChar, refreshtoken)
            .execute('RefreshAccess')
        var thisRefTok = users.recordset[0].refreshtoken
        if ( thisRefTok == refreshtoken ){
                jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) return res.sendStatus(403)
                    const accesstoken = generateAccessToken({ name: user.username})
                    res.status(201).json ({ accessToken: accesstoken })
    
                    let userUp = { refToken: refreshtoken, accToken: accesstoken}
                    dboperations.updateAccToken(userUp).then(result => {
                        res.status(201).json(result);
                    })
                
                })
            } else {
                res.status(401).send('Refresh token does not match our records')
            }

    } catch (error){
        res.status(500).send(error)
    }

})

//get your userid, username and permissionLvl
router.get('/me', authenticateToken, authAccess, authIP, async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    try{
        let pool = await sql.connect(configJobData)
        let permLvl = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('UsersMe')
            res.json(JSON.parse(permLvl.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    } catch {
        res.status(500).json('Unable to retrieve user.')
    }
})

//get your userid, username and permissionLvl
router.post('/me/confirm', authenticateToken, authAccess, async (req, res) => {
    console.log('Successful')
    res.status(200).send('Successful')
})

//get all users 
router.get('/', authenticateToken, authLvl, authAccess, authIP, (req, res) => {
    dboperations.getUsers().then(result => {
        //console.log(result);
        res.status(200).json(JSON.parse(result));
    })
})

router.post('/', authenticateToken, authLvl, authAccess, authIP, async (req, res) => {
    try {
        const user = req.body
        for(let i = 0; i < user.length; i++){
            const hashedpassword = await bcrypt.hash(user[i].password, 10)
            Object.assign(user[i], { hashedpassword: hashedpassword })
         }
        const users = JSON.stringify(user)
        dboperations.addUser(users).then(result => {
            res.status(201).json(result);
        })

    } catch (error){
        res.status(500).send(error)
    }
})

router.delete('/', authenticateToken, authLvl, authAccess, authIP, async (req, res) =>{
    try{
        const client = req.body.clientid
        let pool = await sql.connect(configJobData)
        let clients = await pool.request()
            .input('client', sql.VarChar, client)
            .execute('ClientExists')
        if(clients.recordset[0]['count'] > 0.5) {
            let pool2 = await sql.connect(configJobData)
            let revoke = await pool2.request()
                .input('client', sql.VarChar, client)
                .execute('RevokeAPIAccess')
            res.status(202).send(revoke.recordsets)
        } else{
            res.status(400).send('No users by that clientid found.')
            }

    } catch (error) {
        res.status(500).send(error)
    }
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25m' })
}

module.exports = router;