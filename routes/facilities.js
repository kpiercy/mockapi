require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require("../middleware/validateDto");
const facilityDto = require("../schemas/facilities");

//child routes
const specRoutes = require('./specs')

//controller
const dboperations = require("../controllers/facilities");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
router.use('/:facilityid/specs', specRoutes)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities:
 *  get:
 *      summary: Get all facilities by jobid
 *      tags: [Facilities]
 *      description: Find all facilities by jobid
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *              example: 101
 *          required: true
 *          description: ClientID of data to find
 *        - in: path
 *          name: jobid
 *          schema: 
 *              type: int
 *              example: 300
 *          required: true
 *          description: JobID of data to find
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
 *              description: Found facilities
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Facilities:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/FacilityWithSpec'
 *          404:
 *              description: No facilities found for job
 */
router.get("/", checkReach, dboperations.all_facilities);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}:
 *  get:
 *      summary: Get facility by id
 *      tags: [Facilities]
 *      description: Find single facility by id
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *              example: 101
 *          required: true
 *          description: ClientID of data to find
 *        - in: path
 *          name: jobid
 *          schema: 
 *              type: int
 *              example: 300
 *          required: true
 *          description: JobID of data to find
 *        - in: path
 *          name: facilityid
 *          schema: 
 *              type: int
 *              example: 220
 *          required: true
 *          description: FacilityID of data to find
 *      responses:
 *          200:
 *              description: Found facilities
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Facilities:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/FacilityWithSpec'
 *          404:
 *              description: No facilities found
 */
router.get("/:facilityid", checkReach, dboperations.one_facility);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}:
 *     patch:
 *         summary: Update facility by id
 *         tags: [Facilities]
 *         parameters:
 *           - name: clientid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 101
 *           - name: jobid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 300
 *           - name: facilityid
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
 *                             Facilities:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/UpdateFacilitiesBody'
 *         responses:
 *             200:
 *                 description: Updated facility
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Downloads:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Facility'
 *             404:
 *                 description: Download record was not found
 */
router.patch("/:facilityid", checkReach, dboperations.update_facility);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities:
 *     post:
 *         summary: Create one or more facilities
 *         tags: [Facilities]
 *         parameters:
 *           - name: clientid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 101
 *           - name: jobid
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
 *                             Facilities:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/CreateFacilitiesWithSpecsBody'
 *         responses:
 *             200:
 *                 description: Created facilities
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Facilities:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/CreateFacilitiesWithSpecsResponse'
 */
router.post("/", checkReach, validateDto(facilityDto), dboperations.create_facility);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}:
 *  delete:
 *      summary: Delete facility by id
 *      tags: [Facilities]
 *      description: Delete single facility by id
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *              example: 101
 *          required: true
 *          description: ClientID of data to find
 *        - in: path
 *          name: jobid
 *          schema: 
 *              type: int
 *              example: 300
 *          required: true
 *          description: JobID of data to find
 *        - in: path
 *          name: facilityid
 *          schema: 
 *              type: int
 *              example: 220
 *          required: true
 *          description: FacilityID of data to find
 *      responses:
 *          202:
 *              description: Found facilities
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Facilities:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/DeleteFacilityResponse'
 *          404:
 *              description: No facilities found
 */
router.delete("/:facilityid", checkReach, authLvl, dboperations.delete_facility);

module.exports = router;
