require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/processes");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/processs:
 *  get:
 *      summary: Get processes by jobid
 *      tags: [Processes]
 *      description: Finds processes by jobid
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
 *              description: Found processes
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Processes:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Process'
 *          404:
 *              description: Process records was not found for Job
 */
router.get("/", checkReach, dboperations.all_processes);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/processs/{processid}:
 *  get:
 *      summary: Get process by id
 *      tags: [Processes]
 *      description: Finds process by id
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
 *          name: processid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ProcessID of data to find
 *      responses:
 *          200:
 *              description: Found process
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Processes:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Process'
 *          404:
 *              description: Process record was not found
 */
router.get("/:processid", checkReach, dboperations.one_process);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/processs/{processid}:
 *  patch:
 *      summary: Update process by id
 *      tags: [Processes]
 *      description: Update process by id
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
 *          name: processid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ProcessID of data to find
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Processes:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UpdateProcessesBody'
 *      responses:
 *          200:
 *              description: Found process
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Processes:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Process'
 *          404:
 *              description: Process record was not found
 */
router.patch("/:processid", checkReach, dboperations.update_process);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/processs:
 *  post:
 *      summary: Create one or more proceses for job
 *      tags: [Processes]
 *      description: use to create one or more processes for jobs
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
 *                Processes:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateProcessesBody'
 *      responses:
 *          201:
 *              description: Found process
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Processes:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Process'
 */
router.post("/", checkReach, authLvl, dboperations.create_processes);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/processs/{processid}:
 *  delete:
 *      summary: Delete process by id
 *      tags: [Processes]
 *      description: Delete process by id
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
 *          name: processid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ProcessID of data to find
 *      responses:
 *          202:
 *              description: Deleted process
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Processes:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/DeleteProcessesResponse'
 *          404:
 *              description: Process record was not found
 */
router.delete("/:processid", checkReach, authLvl, dboperations.delete_process);

module.exports = router;
