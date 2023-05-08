require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes


//controller
const dboperations = require("../controllers/returns");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/returns:
 *  get:
 *      summary: Get returns by jobid
 *      tags: [Returns]
 *      description: Finds returns by jobid
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID or ParentID of data to find
 *        - in: path
 *          name: jobid
 *          schema: 
 *              type: int
 *          required: true
 *          description: JobID of data to find
 *      responses:
 *          200:
 *              description: Found returns
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Returns:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Return'
 *          404:
 *              description: Return records was not found for Job
 */
router.get("/", checkReach, dboperations.all_returns);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/returns/{returnid}:
 *  get:
 *      summary: Get return by id
 *      tags: [Returns]
 *      description: Finds return by id
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID or ParentID of data to find
 *        - in: path
 *          name: jobid
 *          schema: 
 *              type: int
 *          required: true
 *          description: JobID of data to find
 *        - in: path
 *          name: returnid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ReturnID of data to find
 *      responses:
 *          200:
 *              description: Found return
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Returns:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Return'
 *          404:
 *              description: Return records was not found
 */
router.get("/:returnid", checkReach, dboperations.one_return);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/returns/logs:
 *  get:
 *      summary: Get return logs
 *      tags: [Returns]
 *      description: Finds logs for all returns
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of data to find
 *        - in: path
 *          name: jobid
 *          schema: 
 *              type: int
 *          required: true
 *          description: JobID of data to find
 *      responses:
 *          200:
 *              description: Found return logs
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Returns:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/ReturnLog'
 *          404:
 *              description: Return logs not found for jobid specified
 */
router.get('/logs', checkReach, authLvl, dboperations.find_logs)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/returns/{returnid}:
 *  patch:
 *      summary: Update return by id
 *      tags: [Returns]
 *      description: Update return by id
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID or ParentID of data to find
 *        - in: path
 *          name: jobid
 *          schema: 
 *              type: int
 *          required: true
 *          description: JobID of data to find
 *        - in: path
 *          name: returnid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ReturnID of data to find
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Returns:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UpdateReturnsBody'
 *      responses:
 *          200:
 *              description: Updated return
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Returns:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Return'
 *          404:
 *              description: Return record was not found
 */
router.patch("/:returnid", checkReach, authLvl, dboperations.update_return);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/returns:
 *  post:
 *      summary: Create one or more Returns for job
 *      tags: [Returns]
 *      description: Create returns
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID or ParentID of data to find
 *        - in: path
 *          name: jobid
 *          schema: 
 *              type: int
 *          required: true
 *          description: JobID of data to find
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Returns:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateReturnsBody'
 *      responses:
 *          201:
 *              description: Created returns
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Returns:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Return'
 */
router.post("/", checkReach, authLvl, dboperations.create_return);


//router.delete("/:returnid", checkReach, authLvl, dboperations.delete_return);

module.exports = router;
