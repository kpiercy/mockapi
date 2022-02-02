require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/dbops_downloads')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all downloads for this job
router.get('/', dboperations.all_downloads)

//get single download for this job by id
router.get('/:id', dboperations.one_download)

//create new download by job
router.post('/', dboperations.create_download)

//delete download for this job
router.delete('/', dboperations.delete_download)

module.exports = router;