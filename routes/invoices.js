require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/dbops_invoices')

//model

//router options and children 
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all invoices, paginate
router.get('/', dboperations.all_invoices)

//get single invoice by id
router.get('/:id', dboperations.one_invoice)

//create new invoice
router.post('/', dboperations.create_invoice)

//delete invoice
router.delete('/', dboperations.delete_invoice)

module.exports = router;