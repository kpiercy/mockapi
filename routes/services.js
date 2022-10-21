require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')

//child routes

//controller
const dboperations = require('../controllers/dbops_services')

//model

//router options and children 
router.use(pubip().getIpInfoMiddleware)
router.all('*', publimiter, authenticateToken, authLvl, authAccess, authIP)

//create new service
router.post('/', dboperations.create_service)

//get all services, paginate
router.get('/', dboperations.all_services)

//get single service by id
router.get('/:serviceid', dboperations.one_service)

//update service based on fields provided or create a new one if it does nto exist already
router.put('/:serviceid', dboperations.update_service)

//delete service
router.delete('/:serviceid', dboperations.delete_service)

module.exports = router;