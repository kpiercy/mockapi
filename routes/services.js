require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/dbops_services')

//model

//router options and children 
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all services, paginate
router.get('/', dboperations.all_services)

//get single service by id
router.get('/:id', dboperations.one_service)

//create new service
router.post('/', dboperations.create_service)

//delete service
router.delete('/', dboperations.delete_service)

module.exports = router;