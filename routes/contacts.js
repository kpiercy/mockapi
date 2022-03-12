require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/dbops_contacts')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all contacts for this job
router.get('/', dboperations.all_contacts)

//get single contact for this job by id
router.get('/:id', dboperations.one_contact)

//update single contact for this job by id
router.put('/:id', dboperations.update_contact)

//create new contact by job
router.post('/', dboperations.create_contact)

//delete contact for this job
router.delete('/', dboperations.delete_contact)

module.exports = router;