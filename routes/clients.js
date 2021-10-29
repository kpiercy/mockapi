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
router.all('/', publimiter, authenticateToken, authAccess, authIP, authLvl)

//get all clients, paginate
router.get('/', (req, res) => {

})

//get single client by id
router.get('/:id', (req,res) => {
    const id = req.params.id

})

//create new client
router.post('/', (req, res) => {

})

//delete client
router.delete('/', (req, res) => {

})