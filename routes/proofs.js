require('dotenv').config()
const express = require('express')
const router = express.Router()
const publimiter = require('../functions/publimiter')
const authenticateToken = require('../functions/authToken')
const dboperations = require('../functions/dboperations')


//get single proof by id
router.get('/:id', publimiter, authenticateToken, (req,res) => {
    const id = req.params.id
    dboperations.getProof(id).then(result => {
        //console.log(result);
        res.status(200).json(result[0]);
    })
})

//get all proofs >>>>>>>>> REQUIRE ADMIN
router.get('/', publimiter, authenticateToken, (req, res) => {

    dboperations.getProofs().then(result => {
        //console.log(result);
        res.status(200).json(result);
    })
})

//insert new proof
router.post('/', publimiter, authenticateToken, (req,res) => {
    let proof = { ...req.body }
    dboperations.addProof(proof).then(result => {
        //console.log(result);
        res.status(201).json(result);
    })
})

//update proof
router.patch('/', publimiter, authenticateToken, (req,res) => {

    let proofresult = { ...req.body }
    dboperations.updateProof(proofresult).then(result => {
        //console.log(result);
        res.status(201).json(result);
    })
})

module.exports = router;