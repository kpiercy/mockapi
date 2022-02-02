require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes
const detailRoutes = require('./details')

//controller
const dboperations = require('../controllers/dbops_encounters')

//model
const model = require('../models/proof')

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use('/:encounterid/details', detailRoutes)


//get all encounters
router.get('/', checkReach, authLvl, dboperations.all_encounters)

//get single encounter by id
router.get('/:encounterid', checkReach, dboperations.one_encounter)

//create new encounter
router.post('/', checkReach, authLvl, dboperations.create_encounter)

//delete encounter
router.delete('/', checkReach, authLvl, dboperations.delete_encounter)

module.exports = router;

