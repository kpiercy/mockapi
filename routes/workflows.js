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
 *   /clients/{clientid}/jobs/{jobid}/workflows:
 *     get:
 *       tags:
 *         - Workflows
 *       summary: /
 *       description: /
 *       operationId: '2'
 *       parameters:
 *         - name: paginate
 *           in: query
 *           schema:
 *             type: string
 *             example: 'true'
 *         - name: page
 *           in: query
 *           schema:
 *             type: string
 *             example: '1'
 *         - name: limit
 *           in: query
 *           schema:
 *             type: string
 *             example: '1'
 *       responses:
 *         '200':
 *           description: ''
 */
router.get("/", checkReach, dboperations.all_workflows);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/workflows/{workflowid}:
 *     get:
 *       tags:
 *         - Workflows
 *       summary: /:workflowid
 *       description: /:workflowid
 *       operationId: workflowid
 *       responses:
 *         '200':
 *           description: ''
 */
router.get("/:workflowid", checkReach, dboperations.one_workflow);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/workflows/{workflowid}:
 *     patch:
 *       tags:
 *         - Workflows
 *       summary: /:workflowid
 *       description: /:workflowid
 *       operationId: workflowid1
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Workflows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AlacritiEnabled:
 *                         type: boolean
 *                         example: true
 *                       BatchInSetsOf:
 *                         type: number
 *                         example: 2000
 *                       Design:
 *                         type: string
 *                         example: PFS_Adena.ptk
 *                       FacilityPDFReturnEnabled:
 *                         type: boolean
 *                         example: false
 *                       PaperlessEnabled:
 *                         type: boolean
 *                         example: true
 *                       PriintToPath:
 *                         type: string
 *                         example: UPDATED\\inmuneliterds\c$\colorfilestoprint\
 *                       PrintPDFReturnEnabled:
 *                         type: boolean
 *                         example: true
 *                       RunMode:
 *                         type: string
 *                         example: IDK
 *                       SubprocessReqd:
 *                         type: boolean
 *                         example: true
 *                       TableUpdate:
 *                         type: boolean
 *                         example: false
 *                       UNCPath:
 *                         type: string
 *                         example: \\INMUNELITERDS\C$\Clients\P\PFS_Adena_UPDATED\
 *                       UseStoredProc:
 *                         type: boolean
 *                         example: false
 *                   example:
 *                     - AlacritiEnabled: true
 *                       BatchInSetsOf: 2000
 *                       Design: PFS_Adena.ptk
 *                       FacilityPDFReturnEnabled: false
 *                       PaperlessEnabled: true
 *                       PriintToPath: UPDATED\\inmuneliterds\c$\colorfilestoprint\
 *                       PrintPDFReturnEnabled: true
 *                       RunMode: IDK
 *                       SubprocessReqd: true
 *                       TableUpdate: false
 *                       UNCPath: \\INMUNELITERDS\C$\Clients\P\PFS_Adena_UPDATED\
 *                       UseStoredProc: false
 *             example:
 *               Workflows:
 *                 - AlacritiEnabled: true
 *                   BatchInSetsOf: 2000
 *                   Design: PFS_Adena.ptk
 *                   FacilityPDFReturnEnabled: false
 *                   PaperlessEnabled: true
 *                   PriintToPath: UPDATED\\inmuneliterds\c$\colorfilestoprint\
 *                   PrintPDFReturnEnabled: true
 *                   RunMode: IDK
 *                   SubprocessReqd: true
 *                   TableUpdate: false
 *                   UNCPath: \\INMUNELITERDS\C$\Clients\P\PFS_Adena_UPDATED\
 *                   UseStoredProc: false
 *       responses:
 *         '200':
 *           description: ''
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *       - name: jobid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *       - name: workflowid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 */
router.patch("/:workflowid", checkReach, dboperations.update_workflow);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/workflows:
 *     post:
 *       tags:
 *         - Workflows
 *       summary: /
 *       description: /
 *       operationId: '1'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Workflows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AlacritiEnabled:
 *                         type: boolean
 *                         example: false
 *                       BatchInSetsOf:
 *                         type: number
 *                         example: 2000
 *                       DataSource:
 *                         type: string
 *                         example: ''
 *                       Design:
 *                         type: string
 *                         example: PFS_Adena.ptk
 *                       FacilityPDFReturnEnabled:
 *                         type: boolean
 *                         example: false
 *                       Job_GUID:
 *                         type: string
 *                         example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                       PaperlessEnabled:
 *                         type: boolean
 *                         example: false
 *                       PriintToPath:
 *                         type: string
 *                         example: \\inmuneliterds\c$\colorfilestoprint\
 *                       PrintPDFReturnEnabled:
 *                         type: boolean
 *                         example: false
 *                       RunMode:
 *                         type: string
 *                         example: Hold
 *                       StoredProc:
 *                         type: string
 *                         example: ''
 *                       SubprocessReqd:
 *                         type: boolean
 *                         example: false
 *                       TableName:
 *                         type: string
 *                         example: ''
 *                       TableUpdate:
 *                         type: boolean
 *                         example: false
 *                       UNCPath:
 *                         type: string
 *                         example: \\INMUNELITERDS\C$\Clients\P\PFS_Adena\
 *                       UseStoredProc:
 *                         type: boolean
 *                         example: false
 *                   example:
 *                     - AlacritiEnabled: false
 *                       BatchInSetsOf: 2000
 *                       DataSource: ''
 *                       Design: PFS_Adena.ptk
 *                       FacilityPDFReturnEnabled: false
 *                       Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                       PaperlessEnabled: false
 *                       PriintToPath: \\inmuneliterds\c$\colorfilestoprint\
 *                       PrintPDFReturnEnabled: false
 *                       RunMode: Hold
 *                       StoredProc: ''
 *                       SubprocessReqd: false
 *                       TableName: ''
 *                       TableUpdate: false
 *                       UNCPath: \\INMUNELITERDS\C$\Clients\P\PFS_Adena\
 *                       UseStoredProc: false
 *             example:
 *               Workflows:
 *                 - AlacritiEnabled: false
 *                   BatchInSetsOf: 2000
 *                   DataSource: ''
 *                   Design: PFS_Adena.ptk
 *                   FacilityPDFReturnEnabled: false
 *                   Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                   PaperlessEnabled: false
 *                   PriintToPath: \\inmuneliterds\c$\colorfilestoprint\
 *                   PrintPDFReturnEnabled: false
 *                   RunMode: Hold
 *                   StoredProc: ''
 *                   SubprocessReqd: false
 *                   TableName: ''
 *                   TableUpdate: false
 *                   UNCPath: \\INMUNELITERDS\C$\Clients\P\PFS_Adena\
 *                   UseStoredProc: false
 *       responses:
 *         '200':
 *           description: ''
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *       - name: jobid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 664c6b5e-334e-4368-988e-167e02c34ec9
 */
router.post("/", checkReach, authLvl, dboperations.create_workflow);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/workflows/{workflowid}:
 *     delete:
 *       tags:
 *         - Workflows
 *       summary: /:workflowid
 *       description: /:workflowid
 *       operationId: workflowid2
 *       responses:
 *         '200':
 *           description: ''
 */
router.delete("/:workflowid", checkReach, authLvl, dboperations.delete_workflow);

module.exports = router;
