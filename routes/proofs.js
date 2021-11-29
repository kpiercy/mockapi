require('dotenv').config()
const express = require('express')
const router = express.Router()
const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl')
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const checkReach = require('../middleware/reachlimiter')
const dboperations = require('../controllers/dbops_proofs')
const pubip = require('express-ip')

router.use(pubip().getIpInfoMiddleware)
router.all('*', publimiter, authenticateToken, authAccess, authIP)

//get single proof by id
router.get('/:proofid', checkReach, dboperations.proof_client_getOne)
    
//get all proofs for this clientid
router.get('/', checkReach, dboperations.proofs_client_all)

//insert new proof
router.post('/', authLvl, checkReach, dboperations.proof_create)

//update proof
router.put('/', authLvl, checkReach, dboperations.proof_update)

module.exports = router;