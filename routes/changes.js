require('dotenv').config()

const express = require('express')
const router = express.Router({ mergeParams: true })
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/changes')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all changes for this job
router.get("/", checkReach, dboperations.all_changes);

//get single change for this job by id
router.get('/:changeid', checkReach, dboperations.one_change)

//update existing based on provided fields or create if not found
router.patch('/:changeid', checkReach, dboperations.update_change)

//create new change by job
router.post('/', checkReach, authLvl, dboperations.create_change)

//delete change for this job
router.delete('/:changeid', checkReach, authLvl, dboperations.delete_change)

module.exports = router
