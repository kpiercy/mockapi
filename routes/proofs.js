require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/dbops_proofs')

//model
const model = require('../classes/proof')

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get single proof by id
router.get('/:proofid', checkReach, dboperations.proof_client_getOne)
    
//get all proofs for this clientid
router.get('/', checkReach, dboperations.proofs_client_all)

//insert new proof
router.post('/', authLvl, checkReach, dboperations.proof_create)

//update proof
router.put('/', authLvl, checkReach, dboperations.proof_update)

module.exports = router;