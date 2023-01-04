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

/**
 * @swagger
 *   /clients/{clientid}/invoices:
 *     get:
 *       tags:
 *         - Invoices
 *       summary: Get all invoices by clientid
 *       description: Get all invoices by clientid
 *       operationId: getAllInvoicesByClientid
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
 *                   Invoices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AddtlpgsSell:
 *                           type: number
 *                           example: 25
 *                         Client_GUID:
 *                           type: string
 *                           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Customer:
 *                           type: string
 *                           example: PFS zAdena
 *                         DuplexSell:
 *                           type: number
 *                           example: 0
 *                         EmailInvoicesto:
 *                           type: string
 *                           example: GW@eliteps.com
 *                         EndDate:
 *                           type: string
 *                           example: '2022-08-31T00:00:00'
 *                         EpaySell:
 *                           type: number
 *                           example: 27.5
 *                         GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         HandInsertSell:
 *                           type: number
 *                           example: 0
 *                         InvoiceSent:
 *                           type: boolean
 *                           example: true
 *                         NCOASell:
 *                           type: number
 *                           example: 0
 *                         OrderID:
 *                           type: number
 *                           example: 4567
 *                         OrderNumber:
 *                           type: string
 *                           example: '456789'
 *                         OutgoingSell:
 *                           type: number
 *                           example: 0
 *                         PaperSell:
 *                           type: number
 *                           example: 0
 *                         Parent_GUID:
 *                           type: string
 *                           example: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         Project:
 *                           type: string
 *                           example: zAdena - August 2022
 *                         ReturnsSell:
 *                           type: number
 *                           example: 0
 *                         SimplexSell:
 *                           type: number
 *                           example: 156.25
 *                         StartDate:
 *                           type: string
 *                           example: '2022-08-01T00:00:00'
 *                         TotalAddtlpgs:
 *                           type: number
 *                           example: 250
 *                         TotalBalance:
 *                           type: number
 *                           example: 1565
 *                         TotalDuplex:
 *                           type: number
 *                           example: 0
 *                         TotalEpay:
 *                           type: number
 *                           example: 500
 *                         TotalHandInsert:
 *                           type: number
 *                           example: 0
 *                         TotalNCOA:
 *                           type: number
 *                           example: 950
 *                         TotalOutgoing:
 *                           type: number
 *                           example: 1000
 *                         TotalPaper:
 *                           type: number
 *                           example: 1250
 *                         TotalPostage:
 *                           type: number
 *                           example: 465
 *                         TotalReturns:
 *                           type: number
 *                           example: 1000
 *                         TotalServices:
 *                           type: number
 *                           example: 208.75
 *                         TotalSimplex:
 *                           type: number
 *                           example: 1250
 *                         TotalStatements:
 *                           type: number
 *                           example: 1000
 *                         TotalTaxes:
 *                           type: number
 *                           example: 0
 *                     example:
 *                       - AddtlpgsSell: 25
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Customer: PFS zAdena
 *                         DuplexSell: 0
 *                         EmailInvoicesto: GW@eliteps.com
 *                         EndDate: '2022-08-31T00:00:00'
 *                         EpaySell: 27.5
 *                         GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         HandInsertSell: 0
 *                         InvoiceSent: true
 *                         NCOASell: 0
 *                         OrderID: 4567
 *                         OrderNumber: '456789'
 *                         OutgoingSell: 0
 *                         PaperSell: 0
 *                         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         Project: zAdena - August 2022
 *                         ReturnsSell: 0
 *                         SimplexSell: 156.25
 *                         StartDate: '2022-08-01T00:00:00'
 *                         TotalAddtlpgs: 250
 *                         TotalBalance: 1565
 *                         TotalDuplex: 0
 *                         TotalEpay: 500
 *                         TotalHandInsert: 0
 *                         TotalNCOA: 950
 *                         TotalOutgoing: 1000
 *                         TotalPaper: 1250
 *                         TotalPostage: 465
 *                         TotalReturns: 1000
 *                         TotalServices: 208.75
 *                         TotalSimplex: 1250
 *                         TotalStatements: 1000
 *                         TotalTaxes: 0
 *                       - AddtlpgsSell: 16.08
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Customer: zAdena
 *                         DuplexSell: 0
 *                         EmailInvoicesto: zadena@pfsgroup.org
 *                         EndDate: '2022-12-29T00:00:00'
 *                         EpaySell: 12.5
 *                         GUID: C353B260-1066-423D-AC54-B75ED0E22743
 *                         HandInsertSell: 0
 *                         InvoiceSent: false
 *                         NCOASell: 6.993
 *                         OrderID: 123456
 *                         OrderNumber: '188999'
 *                         OutgoingSell: 0
 *                         PaperSell: 0
 *                         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         Project: zAdena - December 2022
 *                         ReturnsSell: 0
 *                         SimplexSell: 150
 *                         StartDate: '2022-12-01T00:00:00'
 *                         TotalAddtlpgs: 201
 *                         TotalBalance: 1565
 *                         TotalDuplex: 600
 *                         TotalEpay: 2500
 *                         TotalHandInsert: 0
 *                         TotalNCOA: 999
 *                         TotalOutgoing: 999
 *                         TotalPaper: 1200
 *                         TotalPostage: 509.49
 *                         TotalReturns: 999
 *                         TotalServices: 185.573
 *                         TotalSimplex: 1200
 *                         TotalStatements: 999
 *                         TotalTaxes: 0
 *               examples:
 *                 '200':
 *                   value:
 *                     Invoices:
 *                       - AddtlpgsSell: 25
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Customer: PFS zAdena
 *                         DuplexSell: 0
 *                         EmailInvoicesto: GW@eliteps.com
 *                         EndDate: '2022-08-31T00:00:00'
 *                         EpaySell: 27.5
 *                         GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         HandInsertSell: 0
 *                         InvoiceSent: true
 *                         NCOASell: 0
 *                         OrderID: 4567
 *                         OrderNumber: '456789'
 *                         OutgoingSell: 0
 *                         PaperSell: 0
 *                         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         Project: zAdena - August 2022
 *                         ReturnsSell: 0
 *                         SimplexSell: 156.25
 *                         StartDate: '2022-08-01T00:00:00'
 *                         TotalAddtlpgs: 250
 *                         TotalBalance: 1565
 *                         TotalDuplex: 0
 *                         TotalEpay: 500
 *                         TotalHandInsert: 0
 *                         TotalNCOA: 950
 *                         TotalOutgoing: 1000
 *                         TotalPaper: 1250
 *                         TotalPostage: 465
 *                         TotalReturns: 1000
 *                         TotalServices: 208.75
 *                         TotalSimplex: 1250
 *                         TotalStatements: 1000
 *                         TotalTaxes: 0
 *                       - AddtlpgsSell: 16.08
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Customer: zAdena
 *                         DuplexSell: 0
 *                         EmailInvoicesto: zadena@pfsgroup.org
 *                         EndDate: '2022-12-29T00:00:00'
 *                         EpaySell: 12.5
 *                         GUID: C353B260-1066-423D-AC54-B75ED0E22743
 *                         HandInsertSell: 0
 *                         InvoiceSent: false
 *                         NCOASell: 6.993
 *                         OrderID: 123456
 *                         OrderNumber: '188999'
 *                         OutgoingSell: 0
 *                         PaperSell: 0
 *                         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         Project: zAdena - December 2022
 *                         ReturnsSell: 0
 *                         SimplexSell: 150
 *                         StartDate: '2022-12-01T00:00:00'
 *                         TotalAddtlpgs: 201
 *                         TotalBalance: 1565
 *                         TotalDuplex: 600
 *                         TotalEpay: 2500
 *                         TotalHandInsert: 0
 *                         TotalNCOA: 999
 *                         TotalOutgoing: 999
 *                         TotalPaper: 1200
 *                         TotalPostage: 509.49
 *                         TotalReturns: 999
 *                         TotalServices: 185.573
 *                         TotalSimplex: 1200
 *                         TotalStatements: 999
 *                         TotalTaxes: 0
 */
router.get('/', checkReach, dboperations.all_invoices)

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}:
 *     get:
 *       tags:
 *         - Invoices
 *       summary: Get invoice by invoiceid
 *       description: Get invoice by invoiceid
 *       operationId: getInvoiceByInvoiceid
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
 *                   Invoices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AddtlpgsSell:
 *                           type: number
 *                           example: 25
 *                         Client_GUID:
 *                           type: string
 *                           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Customer:
 *                           type: string
 *                           example: PFS zAdena
 *                         DuplexSell:
 *                           type: number
 *                           example: 0
 *                         EmailInvoicesto:
 *                           type: string
 *                           example: GW@eliteps.com
 *                         EndDate:
 *                           type: string
 *                           example: '2022-08-31T00:00:00'
 *                         EpaySell:
 *                           type: number
 *                           example: 27.5
 *                         GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         HandInsertSell:
 *                           type: number
 *                           example: 0
 *                         InvoiceSent:
 *                           type: boolean
 *                           example: true
 *                         NCOASell:
 *                           type: number
 *                           example: 0
 *                         OrderID:
 *                           type: number
 *                           example: 4567
 *                         OrderNumber:
 *                           type: string
 *                           example: '456789'
 *                         OutgoingSell:
 *                           type: number
 *                           example: 0
 *                         PaperSell:
 *                           type: number
 *                           example: 0
 *                         Parent_GUID:
 *                           type: string
 *                           example: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         Project:
 *                           type: string
 *                           example: zAdena - August 2022
 *                         ReturnsSell:
 *                           type: number
 *                           example: 0
 *                         SimplexSell:
 *                           type: number
 *                           example: 156.25
 *                         StartDate:
 *                           type: string
 *                           example: '2022-08-01T00:00:00'
 *                         TotalAddtlpgs:
 *                           type: number
 *                           example: 250
 *                         TotalBalance:
 *                           type: number
 *                           example: 1565
 *                         TotalDuplex:
 *                           type: number
 *                           example: 0
 *                         TotalEpay:
 *                           type: number
 *                           example: 500
 *                         TotalHandInsert:
 *                           type: number
 *                           example: 0
 *                         TotalNCOA:
 *                           type: number
 *                           example: 950
 *                         TotalOutgoing:
 *                           type: number
 *                           example: 1000
 *                         TotalPaper:
 *                           type: number
 *                           example: 1250
 *                         TotalPostage:
 *                           type: number
 *                           example: 465
 *                         TotalReturns:
 *                           type: number
 *                           example: 1000
 *                         TotalServices:
 *                           type: number
 *                           example: 208.75
 *                         TotalSimplex:
 *                           type: number
 *                           example: 1250
 *                         TotalStatements:
 *                           type: number
 *                           example: 1000
 *                         TotalTaxes:
 *                           type: number
 *                           example: 0
 *                     example:
 *                       - AddtlpgsSell: 25
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Customer: PFS zAdena
 *                         DuplexSell: 0
 *                         EmailInvoicesto: GW@eliteps.com
 *                         EndDate: '2022-08-31T00:00:00'
 *                         EpaySell: 27.5
 *                         GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         HandInsertSell: 0
 *                         InvoiceSent: true
 *                         NCOASell: 0
 *                         OrderID: 4567
 *                         OrderNumber: '456789'
 *                         OutgoingSell: 0
 *                         PaperSell: 0
 *                         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         Project: zAdena - August 2022
 *                         ReturnsSell: 0
 *                         SimplexSell: 156.25
 *                         StartDate: '2022-08-01T00:00:00'
 *                         TotalAddtlpgs: 250
 *                         TotalBalance: 1565
 *                         TotalDuplex: 0
 *                         TotalEpay: 500
 *                         TotalHandInsert: 0
 *                         TotalNCOA: 950
 *                         TotalOutgoing: 1000
 *                         TotalPaper: 1250
 *                         TotalPostage: 465
 *                         TotalReturns: 1000
 *                         TotalServices: 208.75
 *                         TotalSimplex: 1250
 *                         TotalStatements: 1000
 *                         TotalTaxes: 0
 *               examples:
 *                 '200':
 *                   value:
 *                     Invoices:
 *                       - AddtlpgsSell: 25
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Customer: PFS zAdena
 *                         DuplexSell: 0
 *                         EmailInvoicesto: GW@eliteps.com
 *                         EndDate: '2022-08-31T00:00:00'
 *                         EpaySell: 27.5
 *                         GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         HandInsertSell: 0
 *                         InvoiceSent: true
 *                         NCOASell: 0
 *                         OrderID: 4567
 *                         OrderNumber: '456789'
 *                         OutgoingSell: 0
 *                         PaperSell: 0
 *                         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         Project: zAdena - August 2022
 *                         ReturnsSell: 0
 *                         SimplexSell: 156.25
 *                         StartDate: '2022-08-01T00:00:00'
 *                         TotalAddtlpgs: 250
 *                         TotalBalance: 1565
 *                         TotalDuplex: 0
 *                         TotalEpay: 500
 *                         TotalHandInsert: 0
 *                         TotalNCOA: 950
 *                         TotalOutgoing: 1000
 *                         TotalPaper: 1250
 *                         TotalPostage: 465
 *                         TotalReturns: 1000
 *                         TotalServices: 208.75
 *                         TotalSimplex: 1250
 *                         TotalStatements: 1000
 *                         TotalTaxes: 0
 */
router.get('/:invoiceid', checkReach, dboperations.one_invoice)

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}:
 *     patch:
 *       tags:
 *         - Invoices
 *       summary: Update invoice by invoiceid
 *       description: Update invoice by invoiceid
 *       operationId: updateInvoiceByInvoiceid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Invoices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AddtlpgsSell:
 *                         type: number
 *                         example: 16.08
 *                       Customer:
 *                         type: string
 *                         example: zAdena
 *                       DuplexSell:
 *                         type: number
 *                         example: 0
 *                       EmailInvoicesTo:
 *                         type: string
 *                         example: zadena@pfsgroup.org
 *                       EndDate:
 *                         type: string
 *                         example: 11/30/2022
 *                       EpaySell:
 *                         type: number
 *                         example: 12.5
 *                       HandInsertSell:
 *                         type: number
 *                         example: 0
 *                       InvoiceSent:
 *                         type: number
 *                         example: 1
 *                       NCOASell:
 *                         type: number
 *                         example: 6.993
 *                       OrderID:
 *                         type: number
 *                         example: 123456
 *                       OrderNumber:
 *                         type: string
 *                         example: '188111'
 *                       OutgoingSell:
 *                         type: number
 *                         example: 0
 *                       PaperSell:
 *                         type: number
 *                         example: 0
 *                       Project:
 *                         type: string
 *                         example: zAdena - November 2022
 *                       ReturnsSell:
 *                         type: number
 *                         example: 0
 *                       SimplexSell:
 *                         type: number
 *                         example: 150
 *                       StartDate:
 *                         type: string
 *                         example: 11/1/2022
 *                       TotalAddlpgs:
 *                         type: number
 *                         example: 201
 *                       TotalDuplex:
 *                         type: number
 *                         example: 600
 *                       TotalEpay:
 *                         type: number
 *                         example: 2500
 *                       TotalHandInsert:
 *                         type: number
 *                         example: 0
 *                       TotalNCOA:
 *                         type: number
 *                         example: 999
 *                       TotalOutgoing:
 *                         type: number
 *                         example: 999
 *                       TotalPaper:
 *                         type: number
 *                         example: 1200
 *                       TotalPostage:
 *                         type: number
 *                         example: 509.49
 *                       TotalReturns:
 *                         type: number
 *                         example: 999
 *                       TotalServices:
 *                         type: number
 *                         example: 185.573
 *                       TotalSimplex:
 *                         type: number
 *                         example: 1200
 *                       TotalStatements:
 *                         type: number
 *                         example: 999
 *                       TotalTaxes:
 *                         type: number
 *                         example: 0
 *                   example:
 *                     - AddtlpgsSell: 16.08
 *                       Customer: zAdena
 *                       DuplexSell: 0
 *                       EmailInvoicesTo: zadena@pfsgroup.org
 *                       EndDate: 11/30/2022
 *                       EpaySell: 12.5
 *                       HandInsertSell: 0
 *                       InvoiceSent: 1
 *                       NCOASell: 6.993
 *                       OrderID: 123456
 *                       OrderNumber: '188111'
 *                       OutgoingSell: 0
 *                       PaperSell: 0
 *                       Project: zAdena - November 2022
 *                       ReturnsSell: 0
 *                       SimplexSell: 150
 *                       StartDate: 11/1/2022
 *                       TotalAddlpgs: 201
 *                       TotalDuplex: 600
 *                       TotalEpay: 2500
 *                       TotalHandInsert: 0
 *                       TotalNCOA: 999
 *                       TotalOutgoing: 999
 *                       TotalPaper: 1200
 *                       TotalPostage: 509.49
 *                       TotalReturns: 999
 *                       TotalServices: 185.573
 *                       TotalSimplex: 1200
 *                       TotalStatements: 999
 *                       TotalTaxes: 0
 *             example:
 *               Invoices:
 *                 - AddtlpgsSell: 16.08
 *                   Customer: zAdena
 *                   DuplexSell: 0
 *                   EmailInvoicesTo: zadena@pfsgroup.org
 *                   EndDate: 11/30/2022
 *                   EpaySell: 12.5
 *                   HandInsertSell: 0
 *                   InvoiceSent: 1
 *                   NCOASell: 6.993
 *                   OrderID: 123456
 *                   OrderNumber: '188111'
 *                   OutgoingSell: 0
 *                   PaperSell: 0
 *                   Project: zAdena - November 2022
 *                   ReturnsSell: 0
 *                   SimplexSell: 150
 *                   StartDate: 11/1/2022
 *                   TotalAddlpgs: 201
 *                   TotalDuplex: 600
 *                   TotalEpay: 2500
 *                   TotalHandInsert: 0
 *                   TotalNCOA: 999
 *                   TotalOutgoing: 999
 *                   TotalPaper: 1200
 *                   TotalPostage: 509.49
 *                   TotalReturns: 999
 *                   TotalServices: 185.573
 *                   TotalSimplex: 1200
 *                   TotalStatements: 999
 *                   TotalTaxes: 0
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Invoices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Invoice_GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderID:
 *                           type: number
 *                           example: 123456
 *                         OrderNumber:
 *                           type: string
 *                           example: '188111'
 *                         Project:
 *                           type: string
 *                           example: zAdena - November 2022
 *                     example:
 *                       - Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderID: 123456
 *                         OrderNumber: '188111'
 *                         Project: zAdena - November 2022
 *               examples:
 *                 '200':
 *                   value:
 *                     Invoices:
 *                       - Invoice_GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         OrderID: 123456
 *                         OrderNumber: '188111'
 *                         Project: zAdena - November 2022
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
router.patch("/:invoiceid", checkReach, dboperations.update_invoice);

/**
 * @swagger
 *   /clients/{clientid}/invoices:
 *     post:
 *       tags:
 *         - Invoices
 *       summary: Create invoices
 *       description: Create invoices
 *       operationId: createInvoices
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Invoices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AddtlpgsSell:
 *                         type: number
 *                         example: 16.08
 *                       Client_GUID:
 *                         type: string
 *                         example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *                       Customer:
 *                         type: string
 *                         example: zAdena
 *                       DuplexSell:
 *                         type: number
 *                         example: 0
 *                       EmailInvoicesTo:
 *                         type: string
 *                         example: zadena@pfsgroup.org
 *                       EndDate:
 *                         type: string
 *                         example: 12/29/2022
 *                       EpaySell:
 *                         type: number
 *                         example: 12.5
 *                       HandInsertSell:
 *                         type: number
 *                         example: 0
 *                       InvoiceSent:
 *                         type: number
 *                         example: 0
 *                       NCOASell:
 *                         type: number
 *                         example: 6.993
 *                       OrderID:
 *                         type: number
 *                         example: 123456
 *                       OrderNumber:
 *                         type: string
 *                         example: '188999'
 *                       OutgoingSell:
 *                         type: number
 *                         example: 0
 *                       PaperSell:
 *                         type: number
 *                         example: 0
 *                       Parent_GUID:
 *                         type: string
 *                         example: 8dd82a1a-105c-4fed-b157-ae18684eecc1
 *                       Project:
 *                         type: string
 *                         example: zAdena - December 2022
 *                       ReturnsSell:
 *                         type: number
 *                         example: 0
 *                       SimplexSell:
 *                         type: number
 *                         example: 150
 *                       StartDate:
 *                         type: string
 *                         example: 12/1/2022
 *                       TotalAddlpgs:
 *                         type: number
 *                         example: 201
 *                       TotalDuplex:
 *                         type: number
 *                         example: 600
 *                       TotalEpay:
 *                         type: number
 *                         example: 2500
 *                       TotalHandInsert:
 *                         type: number
 *                         example: 0
 *                       TotalNCOA:
 *                         type: number
 *                         example: 999
 *                       TotalOutgoing:
 *                         type: number
 *                         example: 999
 *                       TotalPaper:
 *                         type: number
 *                         example: 1200
 *                       TotalPostage:
 *                         type: number
 *                         example: 509.49
 *                       TotalReturns:
 *                         type: number
 *                         example: 999
 *                       TotalServices:
 *                         type: number
 *                         example: 185.573
 *                       TotalSimplex:
 *                         type: number
 *                         example: 1200
 *                       TotalStatements:
 *                         type: number
 *                         example: 999
 *                       TotalTaxes:
 *                         type: number
 *                         example: 0
 *                   example:
 *                     - AddtlpgsSell: 16.08
 *                       Client_GUID: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *                       Customer: zAdena
 *                       DuplexSell: 0
 *                       EmailInvoicesTo: zadena@pfsgroup.org
 *                       EndDate: 12/29/2022
 *                       EpaySell: 12.5
 *                       HandInsertSell: 0
 *                       InvoiceSent: 0
 *                       NCOASell: 6.993
 *                       OrderID: 123456
 *                       OrderNumber: '188999'
 *                       OutgoingSell: 0
 *                       PaperSell: 0
 *                       Parent_GUID: 8dd82a1a-105c-4fed-b157-ae18684eecc1
 *                       Project: zAdena - December 2022
 *                       ReturnsSell: 0
 *                       SimplexSell: 150
 *                       StartDate: 12/1/2022
 *                       TotalAddlpgs: 201
 *                       TotalDuplex: 600
 *                       TotalEpay: 2500
 *                       TotalHandInsert: 0
 *                       TotalNCOA: 999
 *                       TotalOutgoing: 999
 *                       TotalPaper: 1200
 *                       TotalPostage: 509.49
 *                       TotalReturns: 999
 *                       TotalServices: 185.573
 *                       TotalSimplex: 1200
 *                       TotalStatements: 999
 *                       TotalTaxes: 0
 *             example:
 *               Invoices:
 *                 - AddtlpgsSell: 16.08
 *                   Client_GUID: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *                   Customer: zAdena
 *                   DuplexSell: 0
 *                   EmailInvoicesTo: zadena@pfsgroup.org
 *                   EndDate: 12/29/2022
 *                   EpaySell: 12.5
 *                   HandInsertSell: 0
 *                   InvoiceSent: 0
 *                   NCOASell: 6.993
 *                   OrderID: 123456
 *                   OrderNumber: '188999'
 *                   OutgoingSell: 0
 *                   PaperSell: 0
 *                   Parent_GUID: 8dd82a1a-105c-4fed-b157-ae18684eecc1
 *                   Project: zAdena - December 2022
 *                   ReturnsSell: 0
 *                   SimplexSell: 150
 *                   StartDate: 12/1/2022
 *                   TotalAddlpgs: 201
 *                   TotalDuplex: 600
 *                   TotalEpay: 2500
 *                   TotalHandInsert: 0
 *                   TotalNCOA: 999
 *                   TotalOutgoing: 999
 *                   TotalPaper: 1200
 *                   TotalPostage: 509.49
 *                   TotalReturns: 999
 *                   TotalServices: 185.573
 *                   TotalSimplex: 1200
 *                   TotalStatements: 999
 *                   TotalTaxes: 0
 *       responses:
 *         '201':
 *           description: '201'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Invoices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         GUID:
 *                           type: string
 *                           example: C353B260-1066-423D-AC54-B75ED0E22743
 *                         OrderID:
 *                           type: number
 *                           example: 123456
 *                         OrderNumber:
 *                           type: string
 *                           example: '188999'
 *                         Project:
 *                           type: string
 *                           example: zAdena - December 2022
 *                     example:
 *                       - GUID: C353B260-1066-423D-AC54-B75ED0E22743
 *                         OrderID: 123456
 *                         OrderNumber: '188999'
 *                         Project: zAdena - December 2022
 *               examples:
 *                 '201':
 *                   value:
 *                     Invoices:
 *                       - GUID: C353B260-1066-423D-AC54-B75ED0E22743
 *                         OrderID: 123456
 *                         OrderNumber: '188999'
 *                         Project: zAdena - December 2022
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *         description: can be individual or parent client id
 */
router.post('/', checkReach, authLvl, validateDto(invoiceDto), dboperations.create_invoice)

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}:
 *     delete:
 *       tags:
 *         - Invoices
 *       summary: Delete invoice by invoiceid
 *       description: Delete invoice by invoiceid
 *       operationId: deleteInvoiceByInvoiceid
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
 *                   Invoices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         Client_GUID:
 *                           type: string
 *                           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Customer:
 *                           type: string
 *                           example: zAdena
 *                         GUID:
 *                           type: string
 *                           example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         Parent_GUID:
 *                           type: string
 *                           example: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         Project:
 *                           type: string
 *                           example: zAdena - November 2022
 *                     example:
 *                       - Active: false
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Customer: zAdena
 *                         GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         Project: zAdena - November 2022
 *               examples:
 *                 '200':
 *                   value:
 *                     Invoices:
 *                       - Active: false
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Customer: zAdena
 *                         GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *                         Project: zAdena - November 2022
 */
router.delete('/:invoiceid', checkReach, authLvl, dboperations.delete_invoice)

module.exports = router;