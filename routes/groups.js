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
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/groups/{groupid}:
 *  get:
 *      summary: Use to find group by id
 *      tags: [Groups]
 *      description: Find a group entry
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
 *          name: facilityid
 *          schema: 
 *              type: int
 *          required: true
 *          description: FacilityID of data to find
 *        - in: path
 *          name: specid
 *          schema: 
 *              type: int
 *          required: true
 *          description: SpecID of data to find
 *        - in: path
 *          name: groupid
 *          schema: 
 *              type: int
 *          required: true
 *          description: GroupID of data to find
 *      responses:
 *          200:
 *              description: Found group
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Groups:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Group'
 *          404:
 *              description: Group record was not found
 */
router.get("/:groupid", checkReach, dboperations.one_group);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/groups/{groupid}:
 *  patch:
 *      summary: Update group by id
 *      tags: [Groups]
 *      description: Update single group by id
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
 *          name: facilityid
 *          schema: 
 *              type: int
 *          required: true
 *          description: FacilityID of data to find
 *        - in: path
 *          name: specid
 *          schema: 
 *              type: int
 *          required: true
 *          description: SpecID of data to find
 *        - in: path
 *          name: groupid
 *          schema: 
 *              type: int
 *          required: true
 *          description: GroupID of data to find
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Groups:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UpdateGroupsBody'
 *      responses:
 *          200:
 *              description: Updated group
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Groups:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Group'
 *          404:
 *              description: Group record was not found
 */
router.patch("/:groupid", checkReach, dboperations.update_group);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/groups:
 *  post:
 *      summary: Create one or more groups for facility spec
 *      tags: [Groups]
 *      description: Create groups for facility spec
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
 *          name: facilityid
 *          schema: 
 *              type: int
 *          required: true
 *          description: FacilityID of data to find
 *        - in: path
 *          name: specid
 *          schema: 
 *              type: int
 *          required: true
 *          description: SpecID of data to find
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Groups:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateGroupsBody'
 *      responses:
 *          200:
 *              description: Created groups
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Groups:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Group'
 */
router.post("/", checkReach, authLvl, validateDto(groupDto), dboperations.create_group);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/groups/{groupid}:
 *  delete:
 *      summary: Delete group by id
 *      tags: [Groups]
 *      description: Delete single group by id
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
 *          name: facilityid
 *          schema: 
 *              type: int
 *          required: true
 *          description: FacilityID of data to find
 *        - in: path
 *          name: specid
 *          schema: 
 *              type: int
 *          required: true
 *          description: SpecID of data to find
 *        - in: path
 *          name: groupid
 *          schema: 
 *              type: int
 *          required: true
 *          description: GroupID of data to find
 *      responses:
 *          200:
 *              description: Updated group
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Groups:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/DeleteGroupResponse'
 *          404:
 *              description: Group record was not found
 */
router.delete("/:groupid", checkReach, authLvl, dboperations.delete_group);

module.exports = router;
