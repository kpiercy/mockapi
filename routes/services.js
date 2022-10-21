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

//create new service
router.post('/', authLvl, dboperations.create_service)

//get all services, paginate
router.get('/', authLvl, dboperations.all_services)

//get single service by id
router.get('/:serviceid', authLvl, dboperations.one_service)

//update service based on fields provided or create a new one if it does nto exist already
router.put('/:serviceid', authLvl, dboperations.update_service)

//delete service
router.delete('/:serviceid', authLvl, dboperations.delete_service)

module.exports = router;