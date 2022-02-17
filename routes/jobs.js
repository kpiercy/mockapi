require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes
const fileRoutes = require('./files')
const downloadRoutes = require('./downloads')
const contactRoutes = require('./contacts')
const paymentRoutes = require('./payments')
const orderRoutes = require('./orders')
const proofRoutes = require('./proofs')

//controller
const dboperations = require('../controllers/dbops_jobs')

//model
const model = require('../models/proof')

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use('/:jobid/files', fileRoutes)
router.use('/:jobid/downloads', downloadRoutes)
router.use('/:jobid/contacts', contactRoutes)
router.use('/:jobid/orders', orderRoutes)
router.use('/:jobid/payments', paymentRoutes)
router.use('/:jobid/proofs', proofRoutes)

//get all jobs
router.get('/', checkReach, authLvl, dboperations.all_jobs)

//get single job by id
router.get('/:jobid', checkReach, dboperations.one_job)

//create new job
//router.post('/', checkReach, authLvl, dboperations.jobs_create)

//delete job
//router.delete('/', checkReach, authLvl, dboperations.jobs_delete)

module.exports = router;

