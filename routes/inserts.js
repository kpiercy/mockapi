require('dotenv').config()

const express = require('express')
const router = express.Router()
const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl')
const paginate = require('../middleware/paginateProofs')
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const dboperations = require('../services/dbops_proofs')
const model = require('../models/proof')
const pubip = require('express-ip')

router.use(pubip().getIpInfoMiddleware)
router.all('/', publimiter, authenticateToken, authAccess, authIP)

//get all inserts for this file version
router.get('/', (req, res) => {

})

//get single insert for this file version
router.get('/:id', (req,res) => {
    const id = req.params.id

})

//create new insert for this file version
router.post('/', (req, res) => {

})

//delete insert for this file version
router.delete('/', (req, res) => {

})

module.exports = router;