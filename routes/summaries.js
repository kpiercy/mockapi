require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/dbops_summaries')

//model

//router options and children 
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all summaries, paginate
router.get('/', dboperations.all_summaries)

//get single summary by id
router.get('/:id', dboperations.one_summary)

//create new summary
router.post('/', dboperations.create_summary)

//delete summary
router.delete('/', dboperations.delete_summary)

module.exports = router;