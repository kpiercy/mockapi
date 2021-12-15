if ( process.env.ENVIRONMENT !== 'production' ) {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl')
const paginate = require('../middleware/paginateProofs')
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const dboperations = require('../controllers/dbops_proofs')
const model = require('../models/proof')
const pubip = require('express-ip')

router.use(pubip().getIpInfoMiddleware)
router.all('/', publimiter, authenticateToken, authAccess, authIP)

//get all contacts for this job by client
router.get('/', (req, res) => {

})

//get single contact for this job by client using id
router.get('/:id', (req,res) => {
    const id = req.params.id

})

//create new contact for this job by client
router.post('/', (req, res) => {

})

//delete contact for this job by client
router.delete('/', (req, res) => {

})

module.exports = router;