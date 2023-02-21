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
 * /clients/{clientid}/invoices/{invoiceid}/credits:
 *  get:
 *      summary: Get all credits by invoiceid
 *      tags: [Credits]
 *      description: Find all credits by invoiceid
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
 *              description: Found credits
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Credits:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Credit'
 *          404:
 *              description: No credits found for invoiceid
 */
router.get("/", checkReach, dboperations.all_credits);

/**
 * @swagger
 * /clients/{clientid}/invoices/{invoiceid}/credits/{creditid}:
 *  get:
 *      summary: Get credit by id
 *      tags: [Credits]
 *      description: Find credit by id
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
 *        - in: path
 *          name: creditid
 *          schema: 
 *              type: int
 *          required: true
 *          description: CreditID of data to find
 *      responses:
 *          200:
 *              description: Found credit
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Credits:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Credit'
 *          404:
 *              description: No credit found by id
 */
router.get("/:creditid", checkReach, dboperations.one_credit);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/credits/{creditid}:
 *     patch:
 *         summary: Update credit by id
 *         tags: [Credits]
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
 *           - name: creditid
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
 *                             Credits:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/UpdateCreditsBody'
 *         responses:
 *             200:
 *                 description: Updated credit
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Credits:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Credit'
 *             404:
 *                 description: Credit record was not found
 */
router.patch("/:creditid", checkReach, dboperations.update_credit);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/credits:
 *     post:
 *         summary: Create one or more credits
 *         tags: [Credits]
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
 *                             Credits:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/CreateCreditsBody'
 *         responses:
 *             201:
 *                 description: Created credits
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Credits:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Credit'
 */
router.post("/", checkReach, dboperations.create_credit);

/**
 * @swagger
 *   /clients/{clientid}/invoices/{invoiceid}/credits/{creditid}:
 *     delete:
 *         summary: Delete credit by id
 *         tags: [Credits]
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
 *           - name: creditid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 35
 *         responses:
 *             202:
 *                 description: Deleted credit
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Credits:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/DeleteCreditResponse'
 *             404:
 *                 description: Credit record was not found
 */
router.delete("/:creditid", checkReach, authLvl, dboperations.delete_credit);

module.exports = router;
