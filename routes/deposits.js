require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/deposits");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/deposits:
 *     get:
 *       tags:
 *         - Deposits
 *       summary: Get all deposits by invoiceid
 *       description: Get all deposits by invoiceid
 *       operationId: getAllDepositsByInvoiceid
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
 *                   Deposits:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AcctNumber:
 *                           type: string
 *                           example: z2068-1-P
 *                         Amount:
 *                           type: number
 *                           example: 465
 *                         CheckNumber:
 *                           type: string
 *                           example: '1'
 *                         CheckingAcct:
 *                           type: string
 *                           example: ACH
 *                         DiscountAcct:
 *                           type: string
 *                           example: ''
 *                         DiscountAmount:
 *                           type: number
 *                           example: 0
 *                         ERPCode:
 *                           type: string
 *                           example: z2068-1
 *                         ERPCustomerID:
 *                           type: number
 *                           example: 123
 *                         GUID:
 *                           type: string
 *                           example: 944951D2-08F6-4C90-B4BE-0487A3DE99EE
 *                         Invoice_GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber:
 *                           type: string
 *                           example: '456789'
 *                         ReceivedFrom:
 *                           type: string
 *                           example: i updated this with put
 *                     example:
 *                       - AcctNumber: z2068-1-P
 *                         Amount: 465
 *                         CheckNumber: '1'
 *                         CheckingAcct: ACH
 *                         DiscountAmount: 0
 *                         ERPCode: z2068-1
 *                         ERPCustomerID: 123
 *                         GUID: 944951D2-08F6-4C90-B4BE-0487A3DE99EE
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *                         ReceivedFrom: i updated this with put
 *                       - AcctNumber: z2068
 *                         Amount: 50
 *                         CheckNumber: '123'
 *                         CheckingAcct: '12345'
 *                         DiscountAcct: ''
 *                         DiscountAmount: 0
 *                         ERPCode: z2068-1
 *                         ERPCustomerID: 987
 *                         GUID: 0FF3ED93-A413-4474-8754-B4D0678E7147
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *                         ReceivedFrom: zPFSGroup
 *               examples:
 *                 '200':
 *                   value:
 *                     Deposits:
 *                       - AcctNumber: z2068-1-P
 *                         Amount: 465
 *                         CheckNumber: '1'
 *                         CheckingAcct: ACH
 *                         DiscountAmount: 0
 *                         ERPCode: z2068-1
 *                         ERPCustomerID: 123
 *                         GUID: 944951D2-08F6-4C90-B4BE-0487A3DE99EE
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *                         ReceivedFrom: i updated this with put
 *                       - AcctNumber: z2068
 *                         Amount: 50
 *                         CheckNumber: '123'
 *                         CheckingAcct: '12345'
 *                         DiscountAcct: ''
 *                         DiscountAmount: 0
 *                         ERPCode: z2068-1
 *                         ERPCustomerID: 987
 *                         GUID: 0FF3ED93-A413-4474-8754-B4D0678E7147
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *                         ReceivedFrom: zPFSGroup
 */
router.get("/", checkReach, dboperations.all_deposits);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/deposits/{depositid}:
 *     get:
 *       tags:
 *         - Deposits
 *       summary: Get deposit by depositid
 *       description: Get deposit by depositid
 *       operationId: getDepositByDepositid
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
 *                   Deposits:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AcctNumber:
 *                           type: string
 *                           example: z2068-1-P
 *                         Amount:
 *                           type: number
 *                           example: 465
 *                         CheckNumber:
 *                           type: string
 *                           example: '1'
 *                         CheckingAcct:
 *                           type: string
 *                           example: ACH
 *                         DiscountAmount:
 *                           type: number
 *                           example: 0
 *                         ERPCode:
 *                           type: string
 *                           example: z2068-1
 *                         ERPCustomerID:
 *                           type: number
 *                           example: 123
 *                         GUID:
 *                           type: string
 *                           example: 944951D2-08F6-4C90-B4BE-0487A3DE99EE
 *                         Invoice_GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber:
 *                           type: string
 *                           example: '456789'
 *                         ReceivedFrom:
 *                           type: string
 *                           example: i updated this with put
 *                     example:
 *                       - AcctNumber: z2068-1-P
 *                         Amount: 465
 *                         CheckNumber: '1'
 *                         CheckingAcct: ACH
 *                         DiscountAmount: 0
 *                         ERPCode: z2068-1
 *                         ERPCustomerID: 123
 *                         GUID: 944951D2-08F6-4C90-B4BE-0487A3DE99EE
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *                         ReceivedFrom: i updated this with put
 *               examples:
 *                 '200':
 *                   value:
 *                     Deposits:
 *                       - AcctNumber: z2068-1-P
 *                         Amount: 465
 *                         CheckNumber: '1'
 *                         CheckingAcct: ACH
 *                         DiscountAmount: 0
 *                         ERPCode: z2068-1
 *                         ERPCustomerID: 123
 *                         GUID: 944951D2-08F6-4C90-B4BE-0487A3DE99EE
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *                         ReceivedFrom: i updated this with put
 */
router.get("/:depositid", checkReach, dboperations.one_deposit);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/deposits/{depositid}:
 *     patch:
 *       tags:
 *         - Deposits
 *       summary: Update deposit by depositid
 *       description: Update deposit by depositid
 *       operationId: updateDepositByDepositid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Deposits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AcctNumber:
 *                         type: string
 *                         example: z2068-1-P
 *                       Amount:
 *                         type: number
 *                         example: 465
 *                       CheckNumber:
 *                         type: string
 *                         example: '1'
 *                       CheckingAcct:
 *                         type: string
 *                         example: ACH
 *                       Discount:
 *                         type: number
 *                         example: 0
 *                       DiscountAcct:
 *                         type: string
 *                         example: ''
 *                       ERPCode:
 *                         type: string
 *                         example: z2068-1
 *                       ERPCustomerID:
 *                         type: number
 *                         example: 123
 *                       OrderNumber:
 *                         type: string
 *                         example: '456789'
 *                       ReceivedFrom:
 *                         type: string
 *                         example: i updated this
 *                   example:
 *                     - AcctNumber: z2068-1-P
 *                       Amount: 465
 *                       CheckNumber: '1'
 *                       CheckingAcct: ACH
 *                       Discount: 0
 *                       DiscountAcct: ''
 *                       ERPCode: z2068-1
 *                       ERPCustomerID: 123
 *                       OrderNumber: '456789'
 *                       ReceivedFrom: i updated this
 *             example:
 *               Deposits:
 *                 - AcctNumber: z2068-1-P
 *                   Amount: 465
 *                   CheckNumber: '1'
 *                   CheckingAcct: ACH
 *                   Discount: 0
 *                   DiscountAcct: ''
 *                   ERPCode: z2068-1
 *                   ERPCustomerID: 123
 *                   OrderNumber: '456789'
 *                   ReceivedFrom: i updated this
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Deposits:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AcctNumber:
 *                           type: string
 *                           example: z2068-1-P
 *                         Amount:
 *                           type: number
 *                           example: 465
 *                         Discount:
 *                           type: number
 *                           example: 0
 *                         GUID:
 *                           type: string
 *                           example: 944951D2-08F6-4C90-B4BE-0487A3DE99EE
 *                         Invoice_GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber:
 *                           type: string
 *                           example: '456789'
 *                     example:
 *                       - AcctNumber: z2068-1-P
 *                         Amount: 465
 *                         Discount: 0
 *                         GUID: 944951D2-08F6-4C90-B4BE-0487A3DE99EE
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *               examples:
 *                 '200':
 *                   value:
 *                     Deposits:
 *                       - AcctNumber: z2068-1-P
 *                         Amount: 465
 *                         Discount: 0
 *                         GUID: 944951D2-08F6-4C90-B4BE-0487A3DE99EE
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
 *       - name: depositid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 0ff3ed93-a413-4474-8754-b4d0678e7147
 */
router.patch("/:depositid", checkReach, dboperations.update_deposit);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/deposits:
 *     post:
 *       tags:
 *         - Deposits
 *       summary: Create deposits
 *       description: Create deposits
 *       operationId: createDeposits
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Deposits:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AcctNumber:
 *                         type: string
 *                         example: z2068
 *                       Amount:
 *                         type: number
 *                         example: 509.49
 *                       CheckNumber:
 *                         type: string
 *                         example: '123'
 *                       CheckingAccount:
 *                         type: string
 *                         example: '456'
 *                       Discount:
 *                         type: number
 *                         example: 0
 *                       DiscountAcct:
 *                         type: string
 *                         example: ''
 *                       ERPCode:
 *                         type: string
 *                         example: z2068-1
 *                       ERPCustomerID:
 *                         type: number
 *                         example: 987
 *                       Invoice_GUID:
 *                         type: string
 *                         example: c353b260-1066-423d-ac54-b75ed0e22743
 *                       OrderNumber:
 *                         type: string
 *                         example: '188999'
 *                       ReceivedFrom:
 *                         type: string
 *                         example: zPFSGroup
 *                   example:
 *                     - AcctNumber: z2068
 *                       Amount: 509.49
 *                       CheckNumber: '123'
 *                       CheckingAccount: '456'
 *                       Discount: 0
 *                       DiscountAcct: ''
 *                       ERPCode: z2068-1
 *                       ERPCustomerID: 987
 *                       Invoice_GUID: c353b260-1066-423d-ac54-b75ed0e22743
 *                       OrderNumber: '188999'
 *                       ReceivedFrom: zPFSGroup
 *             example:
 *               Deposits:
 *                 - AcctNumber: z2068
 *                   Amount: 509.49
 *                   CheckNumber: '123'
 *                   CheckingAccount: '456'
 *                   Discount: 0
 *                   DiscountAcct: ''
 *                   ERPCode: z2068-1
 *                   ERPCustomerID: 987
 *                   Invoice_GUID: c353b260-1066-423d-ac54-b75ed0e22743
 *                   OrderNumber: '188999'
 *                   ReceivedFrom: zPFSGroup
 *       responses:
 *         '201':
 *           description: '201'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Deposits:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AcctNumber:
 *                           type: string
 *                           example: z2068
 *                         Amount:
 *                           type: number
 *                           example: 509.49
 *                         Discount:
 *                           type: number
 *                           example: 0
 *                         GUID:
 *                           type: string
 *                           example: 16B2772D-C6AA-449C-92F5-5306FCA0ADBA
 *                         Invoice_GUID:
 *                           type: string
 *                           example: C353B260-1066-423D-AC54-B75ED0E22743
 *                         OrderNumber:
 *                           type: string
 *                           example: '188999'
 *                     example:
 *                       - AcctNumber: z2068
 *                         Amount: 509.49
 *                         Discount: 0
 *                         GUID: 16B2772D-C6AA-449C-92F5-5306FCA0ADBA
 *                         Invoice_GUID: C353B260-1066-423D-AC54-B75ED0E22743
 *                         OrderNumber: '188999'
 *               examples:
 *                 '201':
 *                   value:
 *                     Deposits:
 *                       - AcctNumber: z2068
 *                         Amount: 509.49
 *                         Discount: 0
 *                         GUID: 16B2772D-C6AA-449C-92F5-5306FCA0ADBA
 *                         Invoice_GUID: C353B260-1066-423D-AC54-B75ED0E22743
 *                         OrderNumber: '188999'
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
router.post("/", checkReach, dboperations.create_deposit);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/deposits/{depositid}:
 *     delete:
 *       tags:
 *         - Deposits
 *       summary: Delete deposit by depositid
 *       description: Delete deposit by depositid
 *       operationId: deleteDepositByDepositid
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
 *                   Deposits:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         Amount:
 *                           type: number
 *                           example: 50
 *                         CheckNumber:
 *                           type: string
 *                           example: '123'
 *                         CheckingAccount:
 *                           type: string
 *                           example: '12345'
 *                         GUID:
 *                           type: string
 *                           example: 0FF3ED93-A413-4474-8754-B4D0678E7147
 *                         Invoice_GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber:
 *                           type: string
 *                           example: '456789'
 *                         ReceivedFrom:
 *                           type: string
 *                           example: zPFSGroup
 *                     example:
 *                       - Active: false
 *                         Amount: 50
 *                         CheckNumber: '123'
 *                         CheckingAccount: '12345'
 *                         GUID: 0FF3ED93-A413-4474-8754-B4D0678E7147
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *                         ReceivedFrom: zPFSGroup
 *               examples:
 *                 '200':
 *                   value:
 *                     Deposits:
 *                       - Active: false
 *                         Amount: 50
 *                         CheckNumber: '123'
 *                         CheckingAccount: '12345'
 *                         GUID: 0FF3ED93-A413-4474-8754-B4D0678E7147
 *                         Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderNumber: '456789'
 *                         ReceivedFrom: zPFSGroup
 */
router.delete("/:depositid", checkReach, authLvl, dboperations.delete_deposit);

module.exports = router;
