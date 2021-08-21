require('dotenv').config()


const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const authlimiter = require('../middleware/authlimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl')
const dboperations = require('../services/dbops_users')
var configJobData = require('../config/JobData_dbconfig')
//var configEliteMaster = require('../config/EliteMaster_dbconfig')
const sql = require('mssql/msnodesqlv8')
const uuid = require('uuid').v4
//const { json } = require('express')

const router = express.Router()


//takes in req body, SHA256 ecrypts the password, verifies user exists in DB and compares SHA256 password to stored value, returns accessToken and refreshToken
router.post('/auth', authlimiter, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const username = req.body.username
    const user = { name: req.body.name, password: hashedPassword }
    //add 2FA
    //IP address check in limiter?
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
            if( await bcrypt.compare(req.body.password, thisPass) && thisUser == username) {
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
    
    } catch {
        res.status(500).send()

    }
})

//takes in refresh token from req body, confirms that matches stored refresh token, returns new access token, updates DB with new access token
router.post('/refresh', authlimiter, async (req,res) => {
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

    } catch {
        res.status(500).send()
    }

})

//get your userid, username and permissionLvl
router.get('/me', authlimiter, authenticateToken, async (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    try{
        let pool = await sql.connect(configJobData)
        let permLvl = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('UsersMe')
            res.json(permLvl.recordset[0])
    } catch {
        res.status(500).json('Unable to retrieve user.')
    }
})

//get all users 
router.get('/', authlimiter, authenticateToken, authLvl, (req, res) => {
    dboperations.getUsers().then(result => {
        //console.log(result);
        res.status(200).json(result);
    })
})

router.post('/', authlimiter, authenticateToken, authLvl, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        //const user = JSON.stringify(req.body)
        const user = { GUID: uuid(), name: req.body.name, password: req.body.password, permissionLvl: req.body.permissionLvl, hashedPassword: hashedPassword }
        dboperations.addUser(user).then(result => {
            res.status(201).json(result);
        })

    } catch {
        res.status(500).send()
    }
})


router.delete('/', authlimiter, authenticateToken, authLvl, (req, res) => {
    refreshToken = refreshTokens.filter(token => token !== req.body.token)
    res.status(200).send('Logged out')
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '25m' })
}

module.exports = router;