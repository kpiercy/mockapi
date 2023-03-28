require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')
const validateDto = require('../middleware/validateDto')
const invoiceDto = require('../schemas/invoices')

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

//router.get('/clients/{clientid}/invoices', checkReach, dboperations.getSageInv)
 
/**
 * @swagger
 * /clients/{clientid}/invoices:
 *  get:
 *      summary: Get all invoices by clientid or parentid
 *      tags: [Invoices]
 *      description: Finds all invoice by clientid/parentid
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of data to find
 *      responses:
 *          200:
 *              description: Found invoice
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Invoices:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Invoice'
 *          404:
 *              description: Invoice record was not found
 */
router.get('/', checkReach, dboperations.all_invoices)

/**
 * @swagger
 * /clients/{clientid}/invoices/{invoiceid}:
 *  get:
 *      summary: Use to find invoice by id
 *      tags: [Invoices]
 *      description: Find a invoice entry
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of data to find
 *        - in: path
 *          name: invoiceid
 *          schema: 
 *              type: int
 *          required: true
 *          description: InvoiceID of data to find
 *      responses:
 *          200:
 *              description: Found invoice
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Invoices:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Invoice'
 *          404:
 *              description: Invoice record was not found
 */
router.get('/:invoiceid', checkReach, dboperations.one_invoice)

/**
 * @swagger
 * /clients/{clientid}/invoices/{invoiceid}:
 *  patch:
 *      summary: Update invoice by id
 *      tags: [Invoices]
 *      description: Update single invoice by id
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of data to find
 *        - in: path
 *          name: invoiceid
 *          schema: 
 *              type: int
 *          required: true
 *          description: InvoiceID of data to find
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Invoices:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UpdateInvoicesBody'
 *      responses:
 *          200:
 *              description: Updated invoice
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Invoices:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Invoice'
 *          404:
 *              description: Invoice record was not found
 */
router.patch("/:invoiceid", checkReach, dboperations.update_invoice);

/**
 * @swagger
 * /clients/{clientid}/invoices:
 *  post:
 *      summary: Create one or more invoices for client
 *      tags: [Invoices]
 *      description: Create invoices for facility spec
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of data to find
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Invoices:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateInvoicesBody'
 *      responses:
 *          201:
 *              description: Created invoices
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Invoices:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Invoice'
 */
router.post('/', checkReach, authLvl, validateDto(invoiceDto), dboperations.create_invoice)

/**
 * @swagger
 * /clients/{clientid}/invoices/{invoiceid}:
 *  delete:
 *      summary: Delete invoice by id
 *      tags: [Invoices]
 *      description: Delete single invoice by id
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of data to find
 *        - in: path
 *          name: invoiceid
 *          schema: 
 *              type: int
 *          required: true
 *          description: InvoiceID of data to find
 *      responses:
 *          202:
 *              description: Updated invoice
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Invoices:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/DeleteInvoiceResponse'
 *          404:
 *              description: Invoice record was not found
 */
router.delete('/:invoiceid', checkReach, authLvl, dboperations.delete_invoice)

module.exports = router;