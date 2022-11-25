require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/orbipays')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all payments for this job
router.get('/', checkReach, dboperations.all_orbipays)

//get single payment for this job by id
router.get('/:orbipayid', checkReach, dboperations.one_orbipay)

//create new payment by job
router.post('/', checkReach, authLvl, dboperations.create_orbipay)

//create new payment by job
router.patch('/:orbipayid', checkReach, authLvl, dboperations.update_orbipay)

//delete payment for this job
router.delete("/:orbipayid", checkReach, authLvl, dboperations.delete_orbipay);

module.exports = router;