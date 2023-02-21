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
 * /clients/{clientid}/contracts/{contractid}/prices:
 *  get:
 *      summary: Get all prices by contractid
 *      tags: [Prices]
 *      description: Use to retrieve all prices for a given contract
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of data to find
 *        - in: path
 *          name: contractid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ContractID of data to find
 *        - in: path
 *          name: paginate
 *          schema: 
 *              type: string
 *              example: true
 *          required: false
 *          description: Whether to paginate the results or not
 *        - in: path
 *          name: page
 *          schema: 
 *              type: string
 *              example: 1
 *          required: false
 *          description: Which page to retrieve/currently viewing
 *        - in: path
 *          name: limit
 *          schema: 
 *              type: string
 *              example: 1
 *          required: false
 *          description: Limit response to this amount per page
 *      responses:
 *          200:
 *              description: Found prices
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Prices:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Price'
 *          404:
 *              description: No price records found for contract
 */
router.get("/", checkReach, dboperations.all_prices);

/**
 * @swagger
 * /clients/{clientid}/contracts/{contractid}/prices/{priceid}:
 *  get:
 *      summary: Get price by id
 *      tags: [Prices]
 *      description: Use to retrieve one price from a contract by id
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of data to find
 *        - in: path
 *          name: contractid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ContractID of data to find
 *        - in: path
 *          name: priceid
 *          schema: 
 *              type: int
 *          required: true
 *          description: PriceID of data to find
 *      responses:
 *          200:
 *              description: Found price
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Prices:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Price'
 *          404:
 *              description: No price records found for contract
 */
router.get("/:priceid", checkReach, dboperations.one_price);

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}/prices/{priceid}:
 *     patch:
 *         summary: Update price by id
 *         tags: [Prices]
 *         parameters:
 *           - name: clientid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 75
 *           - name: contractid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 230
 *           - name: priceid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 3100
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             Prices:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/UpdatePricesBody'
 *         responses:
 *             200:
 *                 description: Updated price
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Prices:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Price'
 *             404:
 *                 description: Contract record was not found
 */
router.patch("/:priceid", checkReach, dboperations.update_price);

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}/prices:
 *     post:
 *         summary: Create one or more prices for a client contract
 *         tags: [Prices]
 *         parameters:
 *           - name: clientid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 75
 *           - name: contractid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 230
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             Prices:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/CreatePricesBody'
 *         responses:
 *             200:
 *                 description: Created prices
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Prices:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Price'
 */
router.post("/", checkReach, validateDto(pricesDto), dboperations.create_price);

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}/prices/{priceid}:
 *     delete:
 *         summary: Delete price by id
 *         tags: [Prices]
 *         parameters:
 *           - name: clientid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 75
 *           - name: contractid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 230
 *           - name: priceid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 3100
 *         responses:
 *             200:
 *                 description: Deleted price
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Prices:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Price'
 *             404:
 *                 description: Contract record was not found
 */
router.delete("/:priceid", checkReach, authLvl, dboperations.delete_price);

module.exports = router;
