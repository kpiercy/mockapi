require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes
const encounterRoutes = require('./encounters')

//controller
const dboperations = require('../controllers/dbops_patients')

//model

//router options and children 
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use('/:patientid/encounters', encounterRoutes)

//get all patients, paginate
router.get('/', checkReach, dboperations.all_patients)

//get single patient by id
router.get('/:id', checkReach, dboperations.one_patient)

//create new patient
router.post('/', checkReach, authLvl, dboperations.create_patient)

//delete patient
router.delete('/', checkReach, authLvl, dboperations.delete_patient)

module.exports = router;