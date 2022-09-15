require('dotenv').config()

//2FA notes: store pubIP to DB during registration/setup, if requesting pubIP does not match stored value, send email during /auth or /refresh to user email with link containing /me/confirm route and token that expires in 1 day, during /me/confirm route, append the new pubIp to their pubIp field, ALSO add windows scheduler script that reset each users "confirmed" status to false every xx days to make them redo 2FA

const express = require('express')
const authlimiter = require('../middleware/authlimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl')
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const dboperations = require('../controllers/dbops_users')
const pubip = require('express-ip')

const router = express.Router()
router.use(pubip().getIpInfoMiddleware)
router.all('*', authlimiter)

//takes in req body, SHA256 ecrypts the password, verifies user exists in DB and compares SHA256 password to stored value, returns accessToken and refreshToken
router.post('/auth', dboperations.user_auth)

//takes in refresh token from req body, confirms that matches stored refresh token, returns new access token, updates DB with new access token
router.post('/refresh', authenticateToken, authAccess, authIP, dboperations.user_refresh)

//get your userid, username and permissionLvl
router.get('/me', authenticateToken, authLvl, authAccess, authIP, dboperations.user_me)

//get all users 
router.get('/', authenticateToken, authLvl, authAccess, authIP, dboperations.user_get_all)

//get one user 
//router.get('/:userid', authenticateToken, authLvl, authAccess, authIP, dboperations.user_get_one)

//create one or more users
router.post('/', authenticateToken, authLvl, authAccess, authIP, dboperations.user_create)

//revoke api access for all users of a client by client id
router.delete('/', authenticateToken, authLvl, authAccess, authIP, dboperations.user_client_revoke)

//revoke api access of a single user by userid
//router.delete('/:userid', authenticateToken, authLvl, authAccess, authIP, dboperations.user_revoke)

// //get your userid, username and permissionLvl
// router.post('/me/confirm', authenticateToken, authAccess, async (req, res) => {
//     console.log('Successful')
//     res.status(200).send('Successful')
// })

module.exports = router;