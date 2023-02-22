require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')
const validateDto = require('../middleware/validateDto')
const jobDto = require('../schemas/jobs')

//child routes
const fileRoutes = require('./files')
const downloadRoutes = require('./downloads')
const returnRoutes = require('./returns')
const contactRoutes = require('./contacts')
const orbipayRoutes = require('./orbipays')
const proofRoutes = require('./proofs')
const processRoutes = require('./processes')
const workflowRoutes = require('./workflows')
const facilityRoutes = require('./facilities')
const orderRoutes = require('./orders')
const changeRoutes = require('./changes')

//controller
const dboperations = require('../controllers/jobs')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use('/:jobid/facilities', facilityRoutes)
router.use('/:jobid/orders', orderRoutes)
router.use('/:jobid/files', fileRoutes)
router.use('/:jobid/downloads', downloadRoutes)
router.use('/:jobid/returns', returnRoutes)
router.use('/:jobid/contacts', contactRoutes)
router.use('/:jobid/orbipays', orbipayRoutes) //convert to be a job of Client rather than standalone route
router.use('/:jobid/proofs', proofRoutes)
router.use('/:jobid/processes', processRoutes)
router.use('/:jobid/workflows', workflowRoutes)
router.use('/:jobid/changes', changeRoutes)

/**
 * @swagger
 * /clients/{clientid}/jobs:
 *  get:
 *      summary: Get all jobs by clientid or parentid
 *      tags: [Jobs]
 *      description: Finds all job by clientid/parentid
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID or ParentID of data to find
 *      responses:
 *          200:
 *              description: Found jobs
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Jobs:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/JobWithFacilities'
 *          404:
 *              description: Job record was not found
 */
router.get('/', checkReach, dboperations.all_jobs) //authLvl????

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}:
 *  get:
 *      summary: Get job by id
 *      tags: [Jobs]
 *      description: Find one job by id
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
 *              description: Found jobs
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Jobs:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/JobWithFacilities'
 *          404:
 *              description: Job record was not found
 */
router.get('/:jobid', checkReach, dboperations.one_job) //authLvl????

/**
 * @swagger
 * /clients/{clientid}/jobs:
 *  post:
 *      summary: Create one or more jobs for client
 *      tags: [Jobs]
 *      description: Create jobs for client
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of data to find
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Jobs:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateJobsBody'
 *      responses:
 *          201:
 *              description: Created jobs
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Jobs:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Job'
 */
router.post('/', checkReach, authLvl, validateDto(jobDto), dboperations.jobs_create)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}:
 *  delete:
 *      summary: Delete job by id
 *      tags: [Jobs]
 *      description: Delete single job by id
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
 *      responses:
 *          202:
 *              description: Deleted job
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Jobs:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/DeleteJobsResponse'
 *          404:
 *              description: Job record was not found
 */
router.delete('/:jobid', checkReach, authLvl, dboperations.jobs_delete)

module.exports = router;

