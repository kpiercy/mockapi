require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes
const versfileRoutes = require('./versfiles')
const serviceRoutes = require('./services')

//controller
const dboperations = require('../controllers/dbops_versions')

//model

//router options and children 
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use('/:versionid/files', versfileRoutes)
router.use('/:versionid/services', serviceRoutes)

//get all versions, paginate
router.get('/', dboperations.all_versions)

//get single version by id
router.get('/:id', dboperations.one_version)

//create new version
router.post('/', dboperations.create_version)

//delete version
router.delete('/', dboperations.delete_version)

module.exports = router;