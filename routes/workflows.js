require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/workflows");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/workflows:
 *  get:
 *      summary: Get all workflows by jobid
 *      tags: [Workflows]
 *      description: Finds all workflows for job
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
 *              description: Found workflow(s)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Workflows:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Workflow'
 *          404:
 *              description: No workflows found for job
 */
router.get("/", checkReach, dboperations.all_workflows);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/workflows/{workflowid}:
 *  get:
 *      summary: Get workflow by id
 *      tags: [Workflows]
 *      description: Finds single workflow by id
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
 *        - in: path
 *          name: workflowid
 *          schema:
 *              type: int
 *          required: true
 *          description: WorkflowID of data to find
 *      responses:
 *          200:
 *              description: Found workflow
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Workflows:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Workflow'
 *          404:
 *              description: No workflow found by id
 */
router.get("/:workflowid", checkReach, dboperations.one_workflow);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/workflows/{workflowid}:
 *  patch:
 *      summary: Update workflow by id
 *      tags: [Workflows]
 *      description: Update single workflow by id
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema:
 *              type: int
 *          required: true
 *          description: ClientID of data to update
 *        - in: path
 *          name: jobid
 *          schema:
 *              type: int
 *          required: true
 *          description: JobID of data to update
 *        - in: path
 *          name: workflowid
 *          schema:
 *              type: int
 *          required: true
 *          description: WorkflowID of data to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Workflows:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UpdateWorkflowsBody'
 *      responses:
 *          200:
 *              description: Updated workflow
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Workflows:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Workflow'
 *          404:
 *              description: No workflow found to update by id
 */
router.patch("/:workflowid", checkReach, dboperations.update_workflow);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/workflows/{workflowid}:
 *  post:
 *      summary: Create one or more workflows for job
 *      tags: [Workflows]
 *      description: Creates workflow records
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema:
 *              type: int
 *          required: true
 *          description: ClientID to assign workflow to
 *        - in: path
 *          name: jobid
 *          schema:
 *              type: int
 *          required: true
 *          description: JobID to assign workflow to
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Workflows:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateWorkflowsBody'
 *      responses:
 *          201:
 *              description: Created workflow(s)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Workflows:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Workflow'
 */
router.post("/", checkReach, authLvl, dboperations.create_workflow);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/workflows/{workflowid}:
 *  delete:
 *      summary: Delete workflow by id
 *      tags: [Workflows]
 *      description: Delete single workflow by id
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema:
 *              type: int
 *          required: true
 *          description: ClientID of data to delete
 *        - in: path
 *          name: jobid
 *          schema:
 *              type: int
 *          required: true
 *          description: JobID of data to delete
 *        - in: path
 *          name: workflowid
 *          schema:
 *              type: int
 *          required: true
 *          description: WorkflowID of data to delete
 *      responses:
 *          202:
 *              description: Deleted workflow
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Workflows:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/DeleteWorkflowsResponse'
 *          404:
 *              description: No workflow found to delete by id
 */
router.delete("/:workflowid", checkReach, authLvl, dboperations.delete_workflow);

module.exports = router;
