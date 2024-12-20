require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes
const fileRoutes = require('./files')
const serviceRoutes = require('./services')
const summaryRoutes = require('./summaries')

//controller
const dboperations = require('../controllers/versions')

//model

//router options and children 
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use('/:versionid/services', serviceRoutes)
router.use('/:versionid/files', fileRoutes)
router.use('/:versionid/summaries', summaryRoutes)

//get all versions, paginate
router.get('/', checkReach, dboperations.all_versions)

//get single version by id
router.get('/:id', checkReach, dboperations.one_version)

//create new version
router.post('/', checkReach, authLvl, dboperations.create_version)

//delete version
router.delete('/', checkReach, authLvl, dboperations.delete_version)

module.exports = router;