require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const groupDto = require('../schemas/groups')

//child routes

//controller
const dboperations = require("../controllers/groups");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all groups for this job
//router.get("/", checkReach, dboperations.all_groups);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/groups/{groupid}:
 *     get:
 *       tags:
 *         - Groups
 *       summary: Get group by groupid
 *       description: Get group by groupid
 *       operationId: getGroupByGroupid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Groups:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         GUID:
 *                           type: string
 *                           example: 1E931B34-9F31-4DEC-8443-E3D62432A9FC
 *                         GroupOnField1:
 *                           type: string
 *                           example: GROUP_HERE
 *                         GroupOnField2:
 *                           type: string
 *                           example: ''
 *                         GroupOnField3:
 *                           type: string
 *                           example: ''
 *                         GroupOnField4:
 *                           type: string
 *                           example: ''
 *                         GroupOnField5:
 *                           type: string
 *                           example: ''
 *                         Spec_GUID:
 *                           type: string
 *                           example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                     example:
 *                       - Active: true
 *                         GUID: 1E931B34-9F31-4DEC-8443-E3D62432A9FC
 *                         GroupOnField1: GROUP_HERE
 *                         GroupOnField2: ''
 *                         GroupOnField3: ''
 *                         GroupOnField4: ''
 *                         GroupOnField5: ''
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *               examples:
 *                 '200':
 *                   value:
 *                     Groups:
 *                       - Active: true
 *                         GUID: 1E931B34-9F31-4DEC-8443-E3D62432A9FC
 *                         GroupOnField1: GROUP_HERE
 *                         GroupOnField2: ''
 *                         GroupOnField3: ''
 *                         GroupOnField4: ''
 *                         GroupOnField5: ''
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 */
router.get("/:groupid", checkReach, dboperations.one_group);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/groups/{groupid}:
 *     patch:
 *       tags:
 *         - Groups
 *       summary: Update group by groupid
 *       description: Update group by groupid
 *       operationId: updateGroupByGroupid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Groups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       GroupOnField1:
 *                         type: string
 *                         example: GROUP_HERE_UPDATED
 *                       GroupOnField2:
 *                         type: string
 *                         example: ''
 *                       GroupOnField3:
 *                         type: string
 *                         example: ''
 *                       GroupOnField4:
 *                         type: string
 *                         example: ''
 *                       GroupOnField5:
 *                         type: string
 *                         example: ''
 *                   example:
 *                     - Active: true
 *                       GroupOnField1: GROUP_HERE_UPDATED
 *                       GroupOnField2: ''
 *                       GroupOnField3: ''
 *                       GroupOnField4: ''
 *                       GroupOnField5: ''
 *             example:
 *               Groups:
 *                 - Active: true
 *                   GroupOnField1: GROUP_HERE_UPDATED
 *                   GroupOnField2: ''
 *                   GroupOnField3: ''
 *                   GroupOnField4: ''
 *                   GroupOnField5: ''
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Groups:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         GUID:
 *                           type: string
 *                           example: 1E931B34-9F31-4DEC-8443-E3D62432A9FC
 *                         GroupOnField1:
 *                           type: string
 *                           example: GROUP_HERE_UPDATED
 *                         GroupOnField2:
 *                           type: string
 *                           example: ''
 *                         GroupOnField3:
 *                           type: string
 *                           example: ''
 *                         GroupOnField4:
 *                           type: string
 *                           example: ''
 *                         GroupOnField5:
 *                           type: string
 *                           example: ''
 *                     example:
 *                       - Active: true
 *                         GUID: 1E931B34-9F31-4DEC-8443-E3D62432A9FC
 *                         GroupOnField1: GROUP_HERE_UPDATED
 *                         GroupOnField2: ''
 *                         GroupOnField3: ''
 *                         GroupOnField4: ''
 *                         GroupOnField5: ''
 *               examples:
 *                 '200':
 *                   value:
 *                     Groups:
 *                       - Active: true
 *                         GUID: 1E931B34-9F31-4DEC-8443-E3D62432A9FC
 *                         GroupOnField1: GROUP_HERE_UPDATED
 *                         GroupOnField2: ''
 *                         GroupOnField3: ''
 *                         GroupOnField4: ''
 *                         GroupOnField5: ''
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
 *       - name: facilityid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 1f80ff20-5afc-44d5-9407-910ab3c63eca
 *       - name: specid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *       - name: groupid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 1e931b34-9f31-4dec-8443-e3d62432a9fc
 */
router.patch("/:groupid", checkReach, dboperations.update_group);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/groups:
 *     post:
 *       tags:
 *         - Groups
 *       summary: Create groupings for facility spec
 *       description: Create groupings for facility spec
 *       operationId: '3'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Groups:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       GroupOnField1:
 *                         type: string
 *                         example: GROUPING_FIELD
 *                       GroupOnField2:
 *                         nullable: true
 *                         example: null
 *                       GroupOnField3:
 *                         nullable: true
 *                         example: null
 *                       GroupOnField4:
 *                         nullable: true
 *                         example: null
 *                       GroupOnField5:
 *                         nullable: true
 *                         example: null
 *                   example:
 *                     - Active: true
 *                       GroupOnField1: GROUPING_FIELD
 *                       GroupOnField2: null
 *                       GroupOnField3: null
 *                       GroupOnField4: null
 *                       GroupOnField5: null
 *             example:
 *               Groups:
 *                 - Active: true
 *                   GroupOnField1: GROUPING_FIELD
 *                   GroupOnField2: null
 *                   GroupOnField3: null
 *                   GroupOnField4: null
 *                   GroupOnField5: null
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
 *       - name: facilityid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: specid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 */
router.post("/", checkReach, authLvl, validateDto(groupDto), dboperations.create_group);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/groups/{groupid}:
 *     delete:
 *       tags:
 *         - Groups
 *       summary: Delete group by groupid
 *       description: Delete group by groupid
 *       operationId: deleteGroupByGroupid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Groups:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         GUID:
 *                           type: string
 *                           example: 1E931B34-9F31-4DEC-8443-E3D62432A9FC
 *                     example:
 *                       - Active: false
 *                         GUID: 1E931B34-9F31-4DEC-8443-E3D62432A9FC
 *               examples:
 *                 '200':
 *                   value:
 *                     Groups:
 *                       - Active: false
 *                         GUID: 1E931B34-9F31-4DEC-8443-E3D62432A9FC
 */
router.delete("/:groupid", checkReach, authLvl, dboperations.delete_group);

module.exports = router;
