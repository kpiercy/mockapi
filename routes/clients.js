require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//middleware
const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl') // pass on routes that can only be hit internally
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const checkReach = require('../middleware/reachlimiter') //pass on routes that need query reach limited to only their client (bypasses check if user is internal)

//controller
const dboperations = require('../controllers/dbops_clients')

//child routes
const jobRoutes = require('./jobs')
const invoiceRoutes = require('./invoices')

//router options and children
router.use(pubip().getIpInfoMiddleware)
router.all('*', publimiter, authenticateToken, authAccess, authIP)
router.use('/:clientid/invoices', invoiceRoutes)
router.use('/:clientid/jobs', jobRoutes)


//get all clients by clientid, will paginate in case of parent-child relations, will otherwise return single client in pagination form
router.get('/:clientid', checkReach, dboperations.clients_client_all)

//get single client by mn_id
router.get('/:mnid', checkReach, dboperations.clients_client_mn)

//udpate client by clientid or all if providing parent_clientid
//router.get('/:clientid', checkReach, dboperations.clients_client_mn)

//create new client
router.post('/', authLvl, dboperations.clients_create) 

//set client and any children as inactive if parentclientid is provided
router.delete('/', authLvl, dboperations.clients_delete)


module.exports = router;