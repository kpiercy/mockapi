require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/summaries')

//model

//router options and children 
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all summaries, paginate
router.get('/', checkReach, dboperations.all_summaries)

//get single summary by id
router.get('/:id', checkReach, dboperations.one_summary)

//create new summary
router.post('/', checkReach, authLvl, dboperations.create_summary)

//delete summary
router.delete('/', checkReach, authLvl, dboperations.delete_summary)

module.exports = router;