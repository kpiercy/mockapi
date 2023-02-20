require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const contractsDto = require('../schemas/contracts')

//child routes
const priceRoutes = require("./prices");

//controller
const dboperations = require("../controllers/contracts");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use("/:contractid/prices", priceRoutes);

/**
 * @swagger
 * /clients/{clientid}/contracts:
 *  get:
 *      summary: Use to find contracts by clientid
 *      tags: [Contracts]
 *      description: Find all contracts by clientid
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of data to find
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
 *              description: Found contracts
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Contracts:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/ContractWithPrices'
 *                                      Prices:
 *                                          type: array
 *                                          items:
 *                                              $ref: '#/components/schemas/CreatePricesBody'
 *          404:
 *              description: No contract records found for client
 */
router.get("/", checkReach, dboperations.all_contracts);

/**
 * @swagger
 * /clients/{clientid}/contracts/{contractid}:
 *  get:
 *      summary: Use to find contracts by contractid
 *      tags: [Contracts]
 *      description: Find all contracts by contractid
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
 *      responses:
 *          200:
 *              description: Found contract
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Contracts:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/ContractWithPrices'
 *                                      Prices:
 *                                          type: array
 *                                          items:
 *                                              $ref: '#/components/schemas/CreatePricesBody'
 *          404:
 *              description: No contract records found
 */
router.get("/:contractid", checkReach, dboperations.one_contract);

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}:
 *     patch:
 *         summary: Update contact by id
 *         tags: [Contracts]
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
 *                             Contracts:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/UpdateContractsBody'
 *         responses:
 *             200:
 *                 description: Updated contract
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Contracts:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Contract'
 *             404:
 *                 description: Contract record was not found
 */
router.patch("/:contractid", checkReach, dboperations.update_contract);

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}:
 *     post:
 *         summary: Create one or more contracts for client
 *         tags: [Contracts]
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
 *                             Contracts:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/CreateContractWithPrices'
 *         responses:
 *             201:
 *                 description: List of created contracts
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Contracts:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/ContractWithPrices'
 */
router.post("/", checkReach, validateDto(contractsDto), dboperations.create_contract);

/**
 * @swagger
 * /clients/{clientid}/contracts/{contractid}:
 *  delete:
 *      summary: Delete contract by id
 *      tags: [Contracts]
 *      description: Deletes the contract by id
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of contract to delete
 *        - in: path
 *          name: contractid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ContractID of data to delete
 *      responses:
 *          202:
 *              description: Contract disabled
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Contracts:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/DeleteContractResponse'
 *          404:
 *              description: No contract records found
 */
router.delete("/:contractid", checkReach, authLvl, dboperations.delete_contract);

module.exports = router;
