require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/details')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled


//get all details
router.get('/', checkReach, dboperations.all_details)

//get single detail by id
router.get('/:detailid', checkReach, dboperations.one_detail)

//create new detail
router.post('/', checkReach, authLvl, dboperations.create_detail)

//delete detail
router.delete('/', checkReach, authLvl, dboperations.delete_detail)

module.exports = router;

