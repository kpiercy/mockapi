require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/contacts')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/contacts:
 *  get:
 *      summary: Use to find contacts by jobid
 *      tags: [Contacts]
 *      description: Find all contacts by jobid
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
 *              description: Found contact
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Contacts:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Contact'
 *          404:
 *              description: No contact records found for job
 */
router.get('/', checkReach, dboperations.all_contacts)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/contacts/{contactid}:
 *  get:
 *      summary: Use to find contact by id
 *      tags: [Contacts]
 *      description: Find a contact entry
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
 *          name: contactid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ChartID of data to find
 *      responses:
 *          200:
 *              description: Found contact
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Contacts:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Contact'
 *          404:
 *              description: Chart record was not found
 */
router.get('/:contactid', checkReach, dboperations.one_contact)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/contacts/{contactid}:
 *     patch:
 *         summary: Update contact by id
 *         tags: [Contacts]
 *         parameters:
 *           - name: clientid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 75
 *           - name: jobid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 99
 *           - name: contactid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 101
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             Contacts:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/UpdateContactsBody'
 *         responses:
 *             200:
 *                 description: Updated contact
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Contacts:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Contact'
 *             404:
 *                 description: Contact record was not found
 */
router.patch('/:contactid', checkReach, dboperations.update_contact)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/contacts/{contactid}:
 *     post:
 *         summary: Create one or more contacts for job
 *         tags: [Contacts]
 *         parameters:
 *           - name: clientid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 75
 *           - name: jobid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 99
 *           - name: contactid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 101
 *         requestBody:
 *             required: true
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             Contacts:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/CreateContactsBody'
 *         responses:
 *             201:
 *                 description: List of created contact
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Contacts:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Contact'
 */
router.post('/', checkReach, dboperations.create_contact)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/contacts/{contactid}:
 *     delete:
 *         summary: Delete contact by id
 *         tags: [Contacts]
 *         parameters:
 *           - name: clientid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 75
 *           - name: jobid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 99
 *           - name: contactid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 101
 *         responses:
 *             202:
 *                 description: Deleted contact
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Contacts:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/DeleteContactResponse'
 *             404:
 *                 description: Contact record was not found
 */
router.delete('/:contactid', checkReach, authLvl, dboperations.delete_contact)

module.exports = router;