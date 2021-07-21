require('dotenv').config()
const express = require('express')
const router = express.Router()
const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const paginate = require('../middleware/paginateProofs')
const dboperations = require('../middleware/dboperations')
const model = require('../models/proofModel')


//get single proof by id
router.get('/:id', publimiter, authenticateToken, (req,res) => {
    const id = req.params.id
    dboperations.getProof(id).then(result => {
        //console.log(result);
        res.status(200).json(result[0]);
    })
})

//get all proofs >>>>>>>>> REQUIRE ADMIN
router.get('/', publimiter, authenticateToken, paginate(model), (req, res) => {
    res.status(200).json(res.paginatedResults)
})

//insert new proof
router.post('/', publimiter, authenticateToken, (req,res) => {
    let proof = JSON.stringify(req.body)
            dboperations.addProof(proof).then(result => {
            //console.log(result);
            res.status(201).json(result);
    })
})

//update proof
router.put('/', publimiter, authenticateToken, (req,res) => {

    let proofresult = JSON.stringify(req.body)
    console.log(proofresult)
    dboperations.updateProof(proofresult).then(result => {
        //console.log(result);
        res.status(201).json(result);
    })
})

module.exports = router;