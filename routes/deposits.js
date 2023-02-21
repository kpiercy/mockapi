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
 * /clients/{clientid}/invoices/{invoiceid}/deposits:
 *  get:
 *      summary: Get all deposits by invoiceid
 *      tags: [Deposits]
 *      description: Find all deposits by invoiceid
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *              example: 101
 *          required: true
 *          description: ClientID of data to find
 *        - in: path
 *          name: invoiceid
 *          schema: 
 *              type: int
 *              example: 300
 *          required: true
 *          description: InvoiceID of data to find
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
 *              description: Found deposits
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Deposits:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Deposit'
 *          404:
 *              description: No deposits found for invoiceid
 */
router.get("/", checkReach, dboperations.all_deposits);

/**
 * @swagger
 * /clients/{clientid}/invoices/{invoiceid}/deposits/{depositid}:
 *  get:
 *      summary: Get deposit by id
 *      tags: [Deposits]
 *      description: Find deposit by id
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *              example: 101
 *          required: true
 *          description: ClientID of data to find
 *        - in: path
 *          name: invoiceid
 *          schema: 
 *              type: int
 *              example: 300
 *          required: true
 *          description: InvoiceID of data to find
 *        - in: path
 *          name: depositid
 *          schema: 
 *              type: int
 *          required: true
 *          description: DepositID of data to find
 *      responses:
 *          200:
 *              description: Found deposit
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Deposits:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Deposit'
 *          404:
 *              description: No deposit found by id
 */
router.get("/:depositid", checkReach, dboperations.one_deposit);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/deposits/{depositid}:
 *     patch:
 *         summary: Update deposit by id
 *         tags: [Deposits]
 *         parameters:
 *           - name: clientid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 101
 *           - name: invoiceid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 300
 *           - name: depositid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 35
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             Deposits:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/UpdateDepositsBody'
 *         responses:
 *             200:
 *                 description: Updated deposit
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Deposits:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Deposit'
 *             404:
 *                 description: Deposit record was not found
 */
router.patch("/:depositid", checkReach, dboperations.update_deposit);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/deposits:
 *     post:
 *         summary: Create one or more deposits
 *         tags: [Deposits]
 *         parameters:
 *           - name: clientid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 101
 *           - name: invoiceid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 300
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             Deposits:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/CreateDepositsBody'
 *         responses:
 *             201:
 *                 description: Created deposits
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Deposits:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Deposit'
 */
router.post("/", checkReach, dboperations.create_deposit);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/deposits/{depositid}:
 *     delete:
 *         summary: Delete deposit by id
 *         tags: [Deposits]
 *         parameters:
 *           - name: clientid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 101
 *           - name: invoiceid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 300
 *           - name: depositid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 35
 *         responses:
 *             202:
 *                 description: Deleted deposit
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Deposits:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/DeleteDepositResponse'
 *             404:
 *                 description: Deposit record was not found
 */
router.delete("/:depositid", checkReach, authLvl, dboperations.delete_deposit);

module.exports = router;
