require('dotenv').config()

const express = require('express')
const router = express.Router()
const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl')
const paginate = require('../middleware/paginateProofs')
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const dboperations = require('../controllers/dbops_proofs')
const pubip = require('express-ip')

router.use(pubip().getIpInfoMiddleware)
router.all('*', publimiter, authenticateToken, authAccess, authIP)

//get all versions, paginate
router.get('/', (req, res) => {

})

//get single version by id
router.get('/:id', (req,res) => {
    const id = req.params.id

})

//create new version
router.post('/', (req, res) => {

})

//delete version
router.delete('/', (req, res) => {

})

module.exports = router;