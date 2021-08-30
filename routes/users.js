require('dotenv').config()


const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const authlimiter = require('../middleware/authlimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl')
const authAccess = require('../middleware/access')
const authRefAccess= require('../middleware/refAccess')
const dboperations = require('../services/dbops_users')
var configJobData = require('../config/JobData_dbconfig')
//var configEliteMaster = require('../config/EliteMaster_dbconfig')
const sql = require('mssql/msnodesqlv8')
const uuid = require('uuid').v4

const router = express.Router()


//takes in req body, SHA256 ecrypts the password, verifies user exists in DB and compares SHA256 password to stored value, returns accessToken and refreshToken
router.post('/auth', authlimiter, async (req, res) => {
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
            var thisPass = users.recordset[0].hashedPassword
            var thisAccess = users.recordset[0].apiAccess
            if( await bcrypt.compare(req.body.password, thisPass) && thisUser === username && thisAccess === 'true') {
                const accessToken = generateAccessToken(user)
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                res.json({accessToken: accessToken, refreshToken: refreshToken})
                
                let userUp = { usernm: req.body.username, refToken: refreshToken, accToken: accessToken}
                dboperations.addTokens(userUp).then(result => {
                    res.status(201).json(result);
                })
                //res.send('Success')
            } else {
                res.status(403).send('Not allowed')
            }
        } catch {
            res.status(401).send('Credentials do not exist in DB')
        }
    
    } catch (error){
        res.status(500).send(error)

    }
})

//takes in refresh token from req body, confirms that matches stored refresh token, returns new access token, updates DB with new access token
router.post('/refresh', authlimiter, authRefAccess, async (req,res) => {
    const refreshToken = req.body.token

    if (refreshToken == null) return res.sendStatus(401)

    try{
        let pool = await sql.connect(configJobData)
        let users = await pool.request()
            .input('refToken', sql.VarChar, refreshToken)
            .execute('RefreshAccess')
        var thisRefTok = users.recordset[0].refreshToken
        if ( thisRefTok == refreshToken){
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.sendStatus(403)
                const accessToken = generateAccessToken({ name: user.username})
                res.status(201).json ({ accessToken: accessToken })

                let userUp = { refToken: refreshToken, accToken: accessToken}
                dboperations.updateAccToken(userUp).then(result => {
                    res.status(201).json(result);
                })
            
            })
        } else {
            res.status(401).send('Refresh token does not match DB')
        }

    } catch (error){
        res.status(500).send(error)
    }

})

//get your userid, username and permissionLvl
router.get('/me', authlimiter, authenticateToken, authAccess, async (req, res) => {
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

//get all users 
router.get('/', authlimiter, authenticateToken, authLvl, authAccess, (req, res) => {
    dboperations.getUsers().then(result => {
        //console.log(result);
        res.status(200).json(JSON.parse(result));
    })
})

router.post('/', authlimiter, authenticateToken, authLvl, authAccess, async (req, res) => {
    try {
        const user = req.body
        for(let i = 0; i < user.length; i++){
            const hashedPassword = await bcrypt.hash(user[i].password, 10)
            Object.assign(user[i], { GUID: uuid(), hashedPassword: hashedPassword })
         }
        const users = JSON.stringify(user)
        dboperations.addUser(users).then(result => {
            res.status(201).json(result);
        })

    } catch (error){
        res.status(500).send(error)
    }
})

router.delete('/', authlimiter, authenticateToken, authLvl, authAccess, async (req, res) =>{
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
            res.status(400).send('No client by that name exists')
            }

    } catch (error) {
        res.status(500).send(error)
    }
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25m' })
}

module.exports = router;