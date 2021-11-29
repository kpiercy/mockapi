require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})

const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl')
const paginate = require('../middleware/paginateClients')
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const checkReach = require('../middleware/reachlimiter')
const dboperations = require('../controllers/dbops_clients')
const pubip = require('express-ip')
const model = require('../models/client')
router.use(pubip().getIpInfoMiddleware)
router.all('*', publimiter, authenticateToken, authAccess, authIP)


// //get all clients
// router.get('/', (req, res) => {
//     dboperations.getClients().then(result => {
//         res.status(200).json(JSON.parse(result));
//     })
// })

// //get all clients, paginate
// router.get('/', checkReach, authLvl, dboperations.clients_all)

//get all clients by clientid, paginate (for use in parent-child relationships)
router.get('/:clientid', checkReach, dboperations.clients_client_all)

//get single client by mn_id
//router.get('/:mnid', checkReach, dboperations.clients_client_mn)

//create new client
router.post('/', authLvl, dboperations.clients_create)

//delete client
router.route('/')
    .delete((req, res) => {

})


// jobrouter.route('/')
//     .get((req,res) => {
//         res.send('jobrouter inside clientrouter get hello')
// })

// jobrouter.route('/:jobid')
//     .get((req,res) => {

// })


module.exports = router;