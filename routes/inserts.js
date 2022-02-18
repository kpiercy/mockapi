require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/dbops_inserts')

//model
const model = require('../classes/proof')

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all inserts
router.get('/', checkReach, authLvl, dboperations.all_inserts)

//get single insert by id
router.get('/:insertid', checkReach, dboperations.one_insert)

//create new insert
router.post('/', checkReach, authLvl, dboperations.create_insert)

//delete insert
router.delete('/', checkReach, authLvl, dboperations.delete_insert)

module.exports = router;

