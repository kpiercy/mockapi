if ( process.env.ENVIRONMENT !== 'production' ) {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router({mergeParams: true})

const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl') // pass on routes that can only be hit internally
//const paginate = require('../middleware/paginateClients')
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const checkReach = require('../middleware/reachlimiter') //pass on routes that need query reach limited to only their client
const dboperations = require('../controllers/dbops_clients')
const pubip = require('express-ip')
//const model = require('../models/client')
router.use(pubip().getIpInfoMiddleware)
router.all('*', publimiter, authenticateToken, authAccess, authIP)


//get all clients, paginate
router.get('/', checkReach, authLvl, dboperations.clients_all)

//get all clients by clientid, paginate (for use in parent-child relationships), will otherwise return single client in pagination form
router.get('/:clientid', checkReach, dboperations.clients_client_all)

//get single client by mn_id
router.get('/:mnid', checkReach, dboperations.clients_client_mn)

//create new client
router.post('/', authLvl, dboperations.clients_create)

//set client and any children as inactive if parentclientid is provided
router.delete('/', authLvl, dboperations.clients_delete)


module.exports = router;