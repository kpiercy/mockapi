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

//get single proof by id
router.get('/:id', (req,res) => {
    //add query to only show proofs associated to this user/client
    const id = req.params.id
    dboperations.getProof(id).then(result => {
        //console.log(result);
        res.status(200).json(result[0]);
    })
})

//get all proofs
router.get('/', paginate(model), authLvl, (req, res) => {
    res.status(200).json(res.paginatedResults)
})

//insert new proof
router.post('/', authLvl, (req,res) => {
    let proof = JSON.stringify(req.body)
            dboperations.addProof(proof).then(result => {
            //console.log(result);
            res.status(201).json(result);
    })
})

//update proof
router.put('/', (req,res) => {

    let proofresult = JSON.stringify(req.body)
    console.log(proofresult)
    dboperations.updateProof(proofresult).then(result => {
        //console.log(result);
        res.status(201).json(result);
    })
})

module.exports = router;