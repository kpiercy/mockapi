require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/credits");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/credits:
 *     get:
 *       tags:
 *         - Credits
 *       summary: Get all credits by invoiceid
 *       description: Get all credits by invoiceid
 *       operationId: getAllCreditsByInvoiceid
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: ''
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Credits:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Amount:
 *                           type: number
 *                           example: 25
 *                         AppliedToCustomer:
 *                           type: string
 *                           example: zAdena
 *                         CreditPercentage:
 *                           type: number
 *                           example: 0
 *                         GUID:
 *                           type: string
 *                           example: 6355B3EF-24DC-4556-B705-4BA3CB23DBF6
 *                         Invoice_GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber:
 *                           type: string
 *                           example: '456789'
 *                     example:
 *                       - Amount: 25
 *                         AppliedToCustomer: zAdena
 *                         CreditPercentage: 0
 *                         GUID: 6355B3EF-24DC-4556-B705-4BA3CB23DBF6
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *                       - Amount: 25
 *                         AppliedToCustomer: zAdena
 *                         CreditPercentage: 0
 *                         GUID: 32421F30-5AEA-4844-AF6A-24FE516B01E7
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *                       - Amount: 25
 *                         AppliedToCustomer: some other customer
 *                         CreditPercentage: 0
 *                         GUID: 0B431641-97D3-4858-9E14-98C1EB196D13
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *               examples:
 *                 '200':
 *                   value:
 *                     Credits:
 *                       - Amount: 25
 *                         AppliedToCustomer: zAdena
 *                         CreditPercentage: 0
 *                         GUID: 6355B3EF-24DC-4556-B705-4BA3CB23DBF6
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *                       - Amount: 25
 *                         AppliedToCustomer: zAdena
 *                         CreditPercentage: 0
 *                         GUID: 32421F30-5AEA-4844-AF6A-24FE516B01E7
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *                       - Amount: 25
 *                         AppliedToCustomer: some other customer
 *                         CreditPercentage: 0
 *                         GUID: 0B431641-97D3-4858-9E14-98C1EB196D13
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 */
router.get("/", checkReach, dboperations.all_credits);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/credits/{creditid}:
 *     get:
 *       tags:
 *         - Credits
 *       summary: Get credit by creditid
 *       description: Get credit by creditid
 *       operationId: getCreditByCreditid
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: ''
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Credits:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Amount:
 *                           type: number
 *                           example: 25
 *                         AppliedToCustomer:
 *                           type: string
 *                           example: some other customer
 *                         CreditPercentage:
 *                           type: number
 *                           example: 0
 *                         GUID:
 *                           type: string
 *                           example: 0B431641-97D3-4858-9E14-98C1EB196D13
 *                         Invoice_GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber:
 *                           type: string
 *                           example: '456789'
 *                     example:
 *                       - Amount: 25
 *                         AppliedToCustomer: some other customer
 *                         CreditPercentage: 0
 *                         GUID: 0B431641-97D3-4858-9E14-98C1EB196D13
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *               examples:
 *                 '200':
 *                   value:
 *                     Credits:
 *                       - Amount: 25
 *                         AppliedToCustomer: some other customer
 *                         CreditPercentage: 0
 *                         GUID: 0B431641-97D3-4858-9E14-98C1EB196D13
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 */
router.get("/:creditid", checkReach, dboperations.one_credit);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/credits/{creditid}:
 *     patch:
 *       tags:
 *         - Credits
 *       summary: Update credit by creditid
 *       description: Update credit by creditid
 *       operationId: updateCreditByCreditid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Credits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Amount:
 *                         type: number
 *                         example: 0
 *                       OrderNumber:
 *                         type: string
 *                         example: '188999'
 *                       Percentage:
 *                         type: number
 *                         example: 25
 *                   example:
 *                     - Amount: 0
 *                       OrderNumber: '188999'
 *                       Percentage: 25
 *             example:
 *               Credits:
 *                 - Amount: 0
 *                   OrderNumber: '188999'
 *                   Percentage: 25
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Credits:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Amount:
 *                           type: number
 *                           example: 0
 *                         AppliedTo:
 *                           type: string
 *                           example: some other customer
 *                         GUID:
 *                           type: string
 *                           example: 0B431641-97D3-4858-9E14-98C1EB196D13
 *                         Invoice_GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber:
 *                           type: string
 *                           example: '188999'
 *                         Percentage:
 *                           type: number
 *                           example: 25
 *                     example:
 *                       - Amount: 0
 *                         AppliedTo: some other customer
 *                         GUID: 0B431641-97D3-4858-9E14-98C1EB196D13
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '188999'
 *                         Percentage: 25
 *               examples:
 *                 '200':
 *                   value:
 *                     Credits:
 *                       - Amount: 0
 *                         AppliedTo: some other customer
 *                         GUID: 0B431641-97D3-4858-9E14-98C1EB196D13
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '188999'
 *                         Percentage: 25
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *         description: can be individual or parent client id
 *       - name: invoiceid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *       - name: creditid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 0b431641-97d3-4858-9e14-98c1eb196d13
 */
router.patch("/:creditid", checkReach, dboperations.update_credit);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/credits:
 *     post:
 *       tags:
 *         - Credits
 *       summary: Create credits for invoice
 *       description: Create credits for invoice
 *       operationId: createCreditsForInvoice
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Credits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Amount:
 *                         type: number
 *                         example: 25
 *                       ApplyToCustomer:
 *                         type: string
 *                         example: zAdena
 *                       CreditPercentage:
 *                         type: number
 *                         example: 0
 *                       Invoice_GUID:
 *                         type: string
 *                         example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                       OrderNumber:
 *                         type: string
 *                         example: '456789'
 *                   example:
 *                     - Amount: 25
 *                       ApplyToCustomer: zAdena
 *                       CreditPercentage: 0
 *                       Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                       OrderNumber: '456789'
 *             example:
 *               Credits:
 *                 - Amount: 25
 *                   ApplyToCustomer: zAdena
 *                   CreditPercentage: 0
 *                   Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                   OrderNumber: '456789'
 *       responses:
 *         '201':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Credits:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Amount:
 *                           type: number
 *                           example: 25
 *                         AppliedToCustomer:
 *                           type: string
 *                           example: zAdena
 *                         CreditPercentage:
 *                           type: number
 *                           example: 0
 *                         GUID:
 *                           type: string
 *                           example: 6355B3EF-24DC-4556-B705-4BA3CB23DBF6
 *                         Invoice_GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber:
 *                           type: string
 *                           example: '456789'
 *                     example:
 *                       - Amount: 25
 *                         AppliedToCustomer: zAdena
 *                         CreditPercentage: 0
 *                         GUID: 6355B3EF-24DC-4556-B705-4BA3CB23DBF6
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *               examples:
 *                 '200':
 *                   value:
 *                     Credits:
 *                       - Amount: 25
 *                         AppliedToCustomer: zAdena
 *                         CreditPercentage: 0
 *                         GUID: 6355B3EF-24DC-4556-B705-4BA3CB23DBF6
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *         description: can be individual or parent client id
 *       - name: invoiceid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 */
router.post("/", checkReach, dboperations.create_credit);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/credits/{creditid}:
 *     delete:
 *       tags:
 *         - Credits
 *       summary: Delete credit by creditid
 *       description: Delete credit by creditid
 *       operationId: deleteCreditByCreditid
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: ''
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Credits:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         Amount:
 *                           type: number
 *                           example: 0
 *                         GUID:
 *                           type: string
 *                           example: 0B431641-97D3-4858-9E14-98C1EB196D13
 *                         Invoice_GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber:
 *                           type: string
 *                           example: '188999'
 *                         Percentage:
 *                           type: number
 *                           example: 25
 *                     example:
 *                       - Active: false
 *                         Amount: 0
 *                         GUID: 0B431641-97D3-4858-9E14-98C1EB196D13
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '188999'
 *                         Percentage: 25
 *               examples:
 *                 '200':
 *                   value:
 *                     Credits:
 *                       - Active: false
 *                         Amount: 0
 *                         GUID: 0B431641-97D3-4858-9E14-98C1EB196D13
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '188999'
 *                         Percentage: 25
 */
router.delete("/:creditid", checkReach, authLvl, dboperations.delete_credit);

module.exports = router;
