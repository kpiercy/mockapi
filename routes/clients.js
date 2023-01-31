require('dotenv').config()

const express = require('express')
const router = express.Router({ mergeParams: true })
//const pubip = require('express-ip')

//MIDDLEWARE
const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl') // pass on routes that can only be hit internally
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const checkReach = require('../middleware/reachlimiter') //pass on routes that need query reach limited to only their client (bypasses check if user is internal)
const validateDto = require('../middleware/validateDto')
const clientDto = require('../schemas/clients')

//CONTROLLER
const dboperations = require('../controllers/clients')

//CHILD ROUTES
const userRoutes = require('./users')
const jobRoutes = require('./jobs')
const invoiceRoutes = require('./invoices')
const contractRoutes = require('./contracts')

//CHILD ROUTING
router.use('/users', userRoutes)
router.use('/:clientid/users', userRoutes)
router.use('/:clientid/contracts', publimiter, authenticateToken, authAccess, authIP, contractRoutes)
router.use('/:clientid/invoices', publimiter, authenticateToken, authAccess, authIP, invoiceRoutes)
router.use('/:clientid/jobs', publimiter, authenticateToken, authAccess, authIP, jobRoutes)

 /**
  * @swagger
  * tags:
  *   name: Clients
  *   description: 
  */

 /**
  * @swagger
  * /clients:
  *   post:
  *     summary: Use to create one or more clients
  *     tags: [Clients]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: array
  *             items:
  *               $ref: '#/components/schemas/CreateClientsBody'
  *     responses:
  *       200:
  *         description: List of created clients
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 $ref: '#/components/schemas/Client'
  *       400:
  *         description: Bad request
  */

//create new client
router.post('/', authLvl, validateDto(clientDto), dboperations.clients_create)

/**
 * @swagger
 * /clients/{clientid}:
 *  get:
 *      summary: Use to get client by clientid
 *      tags: [Clients]
 *      description: Retrieve one client by clientid or alternatively pass in a parentid for clientid to retrieve all clients associated to that parentid
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: string
 *          required: true
 *          description: ClientID of data to retrieve
 *        - in: query
 *          name: paginate
 *          schema:
 *              type: boolean
 *          required: false
 *          description: Enable pagination of results
 *        - in: query
 *          name: page
 *          schema:
 *              type: string
 *          required: false
 *          default: 1
 *          description: Page number to view
 *        - in: query
 *          name: limit
 *          schema:
 *              type: string
 *          default: 1
 *          required: false
 *          description:
 *      responses:
 *          200:
 *              description: List of clients
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Client'
 *          404:
 *              description: Client was not found
 */
router.get('/:clientid', checkReach, dboperations.clients_client_all)

/**
 * @swagger
 * /clients/{clientid}:
 *  patch:
 *      summary: Use to update properties of a client
 *      tags: [Clients]
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema:
 *              type: string
 *          required: true
 *          description: ClientID of client to update
 *      responses:
 *          200:
 *              description: List of clients updated
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Client'
 *          404:
 *              description: Client was not found
 */
router.patch('/:clientid', authLvl, dboperations.update_client)

/**
 * @swagger
 * /clients/{clientid}:
 *  delete:
 *      summary: Delete client by clientid
 *      tags: [Clients]
 *      description: Update client and any children as inactive if parentid is provided
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema:
 *              type: string
 *          required: true
 *          description: ClientID of client to delete
 *      responses:
 *          200:
 *              description: List of clients deleted
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/DeleteClientsResponse'
 *                              
 */
router.delete('/', authLvl, dboperations.clients_delete)

module.exports = router
