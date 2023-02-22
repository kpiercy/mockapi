require('dotenv').config()

const express = require('express')
const router = express.Router({ mergeParams: true })
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/changes')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

 /**
  * @swagger
  * tags:
  *   name: Changes
  *   description: 
  */


/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/changes:
 *  get:
 *      summary: Use to find changes by jobid
 *      tags: [Changes]
 *      description: Find changes by job
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
 *              description: Found change records
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object 
 *                          properties:
 *                              Changes:
 *                                 type: array
 *                                 items:
 *                                    $ref: '#/components/schemas/Changes'
 *          404:
 *              description: Change record was not found
 */
router.get('/', checkReach, dboperations.all_changes)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/changes/{changeid}:
 *  get:
 *      summary: Use to find change by id
 *      tags: [Changes]
 *      description: Find a chart entry
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
 *          name: changeid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ChangeID of data to find
 *      responses:
 *          200:
 *              description: Found change record
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object 
 *                          properties:
 *                              Changes:
 *                                 type: array
 *                                 items:
 *                                    $ref: '#/components/schemas/Changes'
 *          404:
 *              description: Change record was not found
 */
router.get('/:changeid', checkReach, dboperations.one_change)

 /**
  * @swagger
  * /clients/{clientid}/jobs/{jobid}/changes:
  *   patch:
  *     summary: Use to update a change request
  *     tags: [Changes]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               Changes:
  *                 type: array
  *                 items:
  *                   $ref: '#/components/schemas/UpdateChange'
  *     responses:
  *       200:
  *         description: Updated change request
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 Changes:
  *                   type: array
  *                   items: 
  *                     $ref: '#/components/schemas/Changes'
  */
router.patch('/:changeid', checkReach, dboperations.update_change)

 /**
  * @swagger
  * /clients/{clientid}/jobs/{jobid}/changes:
  *   post:
  *     summary: Use to create one or more changes
  *     tags: [Changes]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             properties:
  *               Changes:
  *                 type: array
  *                 items:
  *                   $ref: '#/components/schemas/CreateChangeBody'
  *     responses:
  *       200:
  *         description: List of created changes
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 Changes:
  *                   type: array
  *                   items: 
  *                     $ref: '#/components/schemas/Changes'
  */
router.post('/', checkReach, authLvl, dboperations.create_change)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/changes/{changeid}:
 *  delete:
 *      summary: Use to delete change by id
 *      tags: [Changes]
 *      description: Delete a change entry
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
 *          name: changeid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ChangeID of data to find
 *      responses:
 *          200:
 *              description: Found change record
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object 
 *                          properties:
 *                              Changes:
 *                                 type: array
 *                                 items:
 *                                    $ref: '#/components/schemas/Changes'
 *          404:
 *              description: Change record was not found
 */
router.delete('/:changeid', checkReach, authLvl, dboperations.delete_change)

module.exports = router
