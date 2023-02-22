require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const channelDto = require('../schemas/paychannels')

//child routes

//controller
const dboperations = require("../controllers/paychannels");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all paychannels for this job
//router.get("/", checkReach, dboperations.all_paychannels);
 
/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/channels/{channelid}:
 *  get:
 *      summary: Get channel by id
 *      tags: [Channels]
 *      description: Finds channel by id
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
 *          name: channelid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ChannelID of data to find
 *      responses:
 *          200:
 *              description: Found channel
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Channels:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Channel'
 *          404:
 *              description: Channel record was not found
 */
router.get("/:paychannelid", checkReach, dboperations.one_paychannel);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/channels/{channelid}:
 *  patch:
 *      summary: Update pay channels
 *      tags: [Channels]
 *      description: Update pay channel record for facility spec of job
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
 *          name: channelid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ChannelID of data to find
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Channels:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UpdateChannelsBody'
 *      responses:
 *          200:
 *              description: Updated channel record
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Channels:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Channel'
 */
router.patch("/:paychannelid", checkReach, dboperations.update_paychannel);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/channels:
 *  post:
 *      summary: Create pay channels
 *      tags: [Channels]
 *      description: Create pay channel record for facility spec of job
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
 *                Channels:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateChannelsBody'
 *      responses:
 *          201:
 *              description: Created channel record
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Channels:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Channel'
 */
router.post("/", checkReach, authLvl, validateDto(channelDto), dboperations.create_paychannel);

//delete paychannel for this job
//router.delete("/:paychannelid", checkReach, authLvl, dboperations.delete_paychannel);

module.exports = router;
