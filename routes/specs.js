require('dotenv').config()

const express = require('express')
const router = express.Router({ mergeParams: true })
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')
const validateDto = require('../middleware/validateDto')
const specDto = require('../schemas/specs')

//child routes
const groupRoutes = require('./groups')
const reportRoutes = require('./reports')
const filterRoutes = require('./filters')
const channelRoutes = require('./paychannels')
const logoRoutes = require('./logos')
const chartRoutes = require('./charts')
const insertRoutes = require('./inserts')
const layoutRoutes = require('./layouts')

//controller
const dboperations = require('../controllers/specs')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
router.use('/:specid/groups', groupRoutes)
router.use('/:specid/reports', reportRoutes)
router.use('/:specid/filters', filterRoutes)
router.use('/:specid/channels', channelRoutes)
router.use('/:specid/logos', logoRoutes)
router.use('/:specid/charts', chartRoutes)
router.use('/:specid/inserts', insertRoutes)
router.use('/:specid/layouts', layoutRoutes)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs:
 *  get:
 *      summary: Get all specs by facilityid
 *      tags: [Specs]
 *      description: Finds all specs for facility
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
 *      responses:
 *          200:
 *              description: Found specs
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Specs:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Spec'
 *          404:
 *              description: No specs found for facility
 */
router.get('/', checkReach, dboperations.all_specs)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}:
 *  get:
 *      summary: Get spec by id
 *      tags: [Specs]
 *      description: Finds single spec by id
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
 *              description: Found spec
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Specs:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Spec'
 *          404:
 *              description: No specs found
 */
router.get('/:specid', checkReach, dboperations.one_spec)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}:
 *  patch:
 *      summary: Update spec by id
 *      tags: [Specs]
 *      description: Update single spec by id
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
 *                Specs:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UpdateSpecsBody'
 *      responses:
 *          200:
 *              description: Found spec
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Specs:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Spec'
 *          404:
 *              description: No specs found to update
 */
router.patch('/:specid', checkReach, dboperations.update_spec)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs:
 *  post:
 *      summary: Create one or Specs for facility
 *      tags: [Specs]
 *      description: Create specs
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
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Specs:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateSpecsBody'
 *      responses:
 *          201:
 *              description: Create spec(s)
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Specs:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Spec'
 */
router.post('/', checkReach, authLvl, validateDto(specDto), dboperations.create_spec)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}:
 *  delete:
 *      summary: Delete spec by id
 *      tags: [Specs]
 *      description: Delete spec by id
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
 *              description: Delete spec
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Specs:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/DeleteSpecsResponse'
 *          404:
 *              description: No specs found to delete by id
 */
router.delete('/:specid', checkReach, authLvl, dboperations.delete_spec)

module.exports = router
