require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const filterDto = require('../schemas/filters')

//child routes

//controller
const dboperations = require("../controllers/filters");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/filters:
 *  get:
 *      summary: Find filters by specid
 *      tags: [Filters]
 *      description: Find all filters by specid
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
 *      responses:
 *          200:
 *              description: Found filters
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Filters:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Filter'
 *          404:
 *              description: Filter records not found by specid
 */
router.get("/", checkReach, dboperations.all_filters);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/filters/{filterid}:
 *  get:
 *      summary: Use to find filter by id
 *      tags: [Filters]
 *      description: Find a filter entry
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
 *          name: filterid
 *          schema: 
 *              type: int
 *          required: true
 *          description: FilterID of data to find
 *      responses:
 *          200:
 *              description: Found filter
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Filters:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Filter'
 *          404:
 *              description: Filter record was not found
 */
router.get("/:filterid", checkReach, dboperations.one_filter);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/filters/{filterid}:
 *  patch:
 *      summary: Update filter by id
 *      tags: [Filters]
 *      description: Update single filter by id
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
 *          name: filterid
 *          schema: 
 *              type: int
 *          required: true
 *          description: FilterID of data to find
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Filters:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UpdateFiltersBody'
 *      responses:
 *          200:
 *              description: Updated filter
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Filters:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Filter'
 *          404:
 *              description: Filter record was not found
 */
router.patch("/:filterid", checkReach, dboperations.update_filter);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/filters:
 *  post:
 *      summary: Create one or more filters for facility spec
 *      tags: [Filters]
 *      description: Create filters for facility spec
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
 *                Filters:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateFiltersBody'
 *      responses:
 *          200:
 *              description: Created filters
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Filters:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Filter'
 */
router.post("/", checkReach, authLvl, validateDto(filterDto), dboperations.create_filter);

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/filters/{filterid}:
 *  delete:
 *      summary: Delete filter by id
 *      tags: [Filters]
 *      description: Delete single filter by id
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
 *          name: filterid
 *          schema: 
 *              type: int
 *          required: true
 *          description: FilterID of data to find
 *      responses:
 *          200:
 *              description: Updated filter
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Filters:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/DeleteFilterResponse'
 *          404:
 *              description: Filter record was not found
 */
router.delete("/:filterid", checkReach, authLvl, dboperations.delete_filter);

module.exports = router;
