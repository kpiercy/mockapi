require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes
const versionRoutes = require('./versions')

//controller
const dboperations = require('../controllers/orders')

//model

//router options and children 
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use('/:orderid/versions', versionRoutes)

//get all orders for this job by client
router.get('/', checkReach, dboperations.all_orders)

//get single order for this job by client
router.get('/:orderid', checkReach, dboperations.one_order)

//update single contact for this job by id
router.put('/:orderid', checkReach, dboperations.update_order)

//create new order for this job by client
router.post('/', checkReach, authLvl, dboperations.create_order)

//delete order for this job by client
router.delete('/:orderid', checkReach, authLvl, dboperations.delete_order)

module.exports = router;