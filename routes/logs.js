require('dotenv').config()

const express = require('express')
const router = express.Router({ mergeParams: true })
//const pubip = require('express-ip')

//MIDDLEWARE
const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl') // pass on routes that can only be hit internally
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const checkReach = require('../middleware/reachlimiter') //pass on routes that need query reach limited to only their client (bypasses check if user is internal)

//CONTROLLER
const dboperations = require('../controllers/logs')

//CHILD ROUTES

//CHILD ROUTING

//ROUTES
router.get('/', publimiter, authenticateToken, authAccess, authIP, checkReach, dboperations.find_logs)


module.exports = router;
