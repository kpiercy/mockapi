require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/orbipays')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/orbipays:
 *  get:
 *      summary: Get all orbipays by jobid
 *      tags: [Orbipays]
 *      description: Finds all orbipays by jobid
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
 *              description: Found orbipays
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Orbipays:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Orbipay'
 *          404:
 *              description: Orbipay record was not found
 */
router.get('/', checkReach, dboperations.all_orbipays)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/orbipays/{orbipayid}:
 *  get:
 *      summary: Get orbipay by id
 *      tags: [Orbipays]
 *      description: Finds orbipay by id
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
 *          name: orbipayid
 *          schema: 
 *              type: int
 *          required: true
 *          description: OrbipayID of data to find
 *      responses:
 *          200:
 *              description: Found orbipay
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Orbipays:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Orbipay'
 *          404:
 *              description: Orbipay record was not found
 */
router.get('/:orbipayid', checkReach, dboperations.one_orbipay)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/orbipays:
 *  post:
 *      summary: Create one or more orbipays for job
 *      tags: [Orbipays]
 *      description: Create orbipays for job
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
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Orbipays:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateOrbipaysBody'
 *      responses:
 *          201:
 *              description: Created orbipays
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Orbipays:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Orbipay'
 */
router.post('/', checkReach, authLvl, dboperations.create_orbipay)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/orbipays/{orbipayid}:
 *  patch:
 *      summary: Update orbipay for job
 *      tags: [Orbipays]
 *      description: Update a single orbipay
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
 *          name: orbipayid
 *          schema: 
 *              type: int
 *          required: true
 *          description: OrbipayID of data to find
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Orbipays:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UpdateOrbipaysBody'
 *      responses:
 *          200:
 *              description: Updated orbipays
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Orbipays:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Orbipay'
 */
router.patch('/:orbipayid', checkReach, authLvl, dboperations.update_orbipay)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/orbipays/{orbipayid}:
 *  delete:
 *      summary: Delete orbipay by id
 *      tags: [Orbipays]
 *      description: Deletes orbipay by id
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
 *          name: orbipayid
 *          schema: 
 *              type: int
 *          required: true
 *          description: OrbipayID of data to find
 *      responses:
 *          202:
 *              description: Deleted orbipay
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Orbipays:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/DeleteOrbipayResponse'
 *          404:
 *              description: Orbipay record was not found
 */
router.delete("/:orbipayid", checkReach, authLvl, dboperations.delete_orbipay);

module.exports = router;