require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const pricesDto = require('../schemas/prices')

//child routes

//controller
const dboperations = require("../controllers/prices");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}/prices:
 *     get:
 *       tags:
 *         - Prices
 *       summary: Get all prices by contractid
 *       description: Get all prices by contractid
 *       operationId: getAllPricesByContractid
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
 *                   Prices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Client_GUID:
 *                           type: string
 *                           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Contract_GUID:
 *                           type: string
 *                           example: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         GUID:
 *                           type: string
 *                           example: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                         ItemPrice:
 *                           type: number
 *                           example: 100
 *                         Service:
 *                           type: string
 *                           example: Additional Pages
 *                     example:
 *                       - Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Contract_GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                         ItemPrice: 100
 *                         Service: Additional Pages
 *                       - Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Contract_GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         GUID: F201D8CB-444A-44A2-8433-372E16C6B92C
 *                         ItemPrice: 100
 *                         Service: updatedDESC
 *               examples:
 *                 '200':
 *                   value:
 *                     Prices:
 *                       - Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Contract_GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                         ItemPrice: 100
 *                         Service: Additional Pages
 *                       - Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Contract_GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         GUID: F201D8CB-444A-44A2-8433-372E16C6B92C
 *                         ItemPrice: 100
 *                         Service: updatedDESC
 */
router.get("/", checkReach, dboperations.all_prices);

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}/prices/{priceid}:
 *     get:
 *       tags:
 *         - Prices
 *       summary: Get price by priceid
 *       description: Get price by priceid
 *       operationId: getPriceByPriceid
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
 *                   Prices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Client_GUID:
 *                           type: string
 *                           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Contract_GUID:
 *                           type: string
 *                           example: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         GUID:
 *                           type: string
 *                           example: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                         ItemPrice:
 *                           type: number
 *                           example: 100
 *                         Service:
 *                           type: string
 *                           example: Additional Pages
 *                     example:
 *                       - Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Contract_GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                         ItemPrice: 100
 *                         Service: Additional Pages
 *               examples:
 *                 '200':
 *                   value:
 *                     Prices:
 *                       - Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Contract_GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                         ItemPrice: 100
 *                         Service: Additional Pages
 */
router.get("/:priceid", checkReach, dboperations.one_price);

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}/prices/{priceid}:
 *     patch:
 *       tags:
 *         - Prices
 *       summary: Update price by priceid
 *       description: Update price by priceid
 *       operationId: updatePriceByPriceid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Prices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ItemPrice:
 *                         type: number
 *                         example: 50
 *                   example:
 *                     - ItemPrice: 50
 *             example:
 *               Prices:
 *                 - ItemPrice: 50
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Prices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         GUID:
 *                           type: string
 *                           example: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                         ItemPrice:
 *                           type: number
 *                           example: 50
 *                         Service_GUID:
 *                           type: string
 *                           example: 8D4BDCF4-21C8-43A5-861F-432C7100E361
 *                     example:
 *                       - GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                         ItemPrice: 50
 *                         Service_GUID: 8D4BDCF4-21C8-43A5-861F-432C7100E361
 *               examples:
 *                 '200':
 *                   value:
 *                     Prices:
 *                       - GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                         ItemPrice: 50
 *                         Service_GUID: 8D4BDCF4-21C8-43A5-861F-432C7100E361
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *       - name: contractid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 507e3fcf-f79b-4b74-b675-6bd829e8e3ec
 *       - name: priceid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 */
router.patch("/:priceid", checkReach, dboperations.update_price);

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}/prices:
 *     post:
 *       tags:
 *         - Prices
 *       summary: Create price for a service on a contract
 *       description: Create price for a service on a contract
 *       operationId: createPriceForAServiceOnAContract
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Prices:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Contract_GUID:
 *                         type: string
 *                         example: 507e3fcf-f79b-4b74-b675-6bd829e8e3ec
 *                       ItemPrice:
 *                         type: number
 *                         example: 100
 *                       Service_GUID:
 *                         type: string
 *                         example: 3f7baa3c-a269-4227-930e-26b60fb0d110
 *                   example:
 *                     - Contract_GUID: 507e3fcf-f79b-4b74-b675-6bd829e8e3ec
 *                       ItemPrice: 100
 *                       Service_GUID: 3f7baa3c-a269-4227-930e-26b60fb0d110
 *             example:
 *               Prices:
 *                 - Contract_GUID: 507e3fcf-f79b-4b74-b675-6bd829e8e3ec
 *                   ItemPrice: 100
 *                   Service_GUID: 3f7baa3c-a269-4227-930e-26b60fb0d110
 *       responses:
 *         '201':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Prices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         GUID:
 *                           type: string
 *                           example: F201D8CB-444A-44A2-8433-372E16C6B92C
 *                         Price:
 *                           type: number
 *                           example: 100
 *                     example:
 *                       - GUID: F201D8CB-444A-44A2-8433-372E16C6B92C
 *                         Price: 100
 *               examples:
 *                 '200':
 *                   value:
 *                     Prices:
 *                       - GUID: F201D8CB-444A-44A2-8433-372E16C6B92C
 *                         Price: 100
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *       - name: contractid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 507e3fcf-f79b-4b74-b675-6bd829e8e3ec
 */
router.post("/", checkReach, validateDto(pricesDto), dboperations.create_price);

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}/prices/{priceid}:
 *     delete:
 *       tags:
 *         - Prices
 *       summary: Delete price from contract by priceid
 *       description: Delete price from contract by priceid
 *       operationId: deletePriceFromContractByPriceid
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
 *                   Prices:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         GUID:
 *                           type: string
 *                           example: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                         ItemPrice:
 *                           type: number
 *                           example: 0
 *                     example:
 *                       - GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                         ItemPrice: 0
 *               examples:
 *                 '200':
 *                   value:
 *                     Prices:
 *                       - GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                         ItemPrice: 0
 */
router.delete("/:priceid", checkReach, authLvl, dboperations.delete_price);

module.exports = router;
