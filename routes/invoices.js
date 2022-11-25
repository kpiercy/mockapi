require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')
const validateDto = require('../middleware/validateDto')
const invoiceDto = require('../dto/invoices')

//child routes
const creditRoutes = require("./credits");
const depositRoutes = require("./deposits");

//controller
const dboperations = require('../controllers/invoices')

//model

//router options and children 
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use("/:invoiceid/credits", creditRoutes);
router.use("/:invoiceid/deposits", depositRoutes);

//get all invoices, paginate
router.get('/', checkReach, dboperations.all_invoices)

//get single invoice by id
router.get('/:invoiceid', checkReach, dboperations.one_invoice)

//update single deposit for this job by id
router.patch("/:invoiceid", checkReach, dboperations.update_invoice);

//create new invoice
router.post('/', checkReach, authLvl, validateDto(invoiceDto), dboperations.create_invoice)

//delete invoice
router.delete('/:invoiceid', checkReach, authLvl, dboperations.delete_invoice)

module.exports = router;