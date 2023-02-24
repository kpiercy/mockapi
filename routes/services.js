require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//middleware
const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl') // pass on routes that can only be hit internally
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')


//child routes

//controller
const dboperations = require('../controllers/services')

//model

//router options and children 
router.use(pubip().getIpInfoMiddleware)
router.all('*', publimiter, authenticateToken, authAccess, authIP, authLvl)

/**
 * @swagger
 * /services:
 *  post:
 *      summary: Create one or more service
 *      tags: [Services]
 *      description: Create services
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Services:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateServicesBody'
 *      responses:
 *          201:
 *              description: Created service(s)
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Services:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Service'
 */
router.post('/', dboperations.create_service)

/**
 * @swagger
 * /services:
 *  get:
 *      summary: Get all services
 *      tags: [Services]
 *      description: Finds all active services
 *      responses:
 *          200:
 *              description: Found services
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Services:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Service'
 *          404:
 *              description: No services found
 */
router.get('/', dboperations.all_services)

/**
 * @swagger
 * /services/{serviceid}:
 *  get:
 *      summary: Get service by id
 *      tags: [Services]
 *      description: Finds active service by id
 *      parameters:
 *        - in: path
 *          name: serviceid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ServiceID of data to find
 *      responses:
 *          200:
 *              description: Found service
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Services:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Service'
 *          404:
 *              description: No active service found by id
 */
router.get('/:serviceid', dboperations.one_service)

/**
 * @swagger
 * /services/{serviceid}:
 *  patch:
 *      summary: Update service by id
 *      tags: [Services]
 *      description: Update single service by id
 *      parameters:
 *        - in: path
 *          name: serviceid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ServiceID of data to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Services:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UpdateServicesBody'
 *      responses:
 *          200:
 *              description: Updated service
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Services:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Service'
 *          404:
 *              description: No service found to update
 */
router.patch('/:serviceid', dboperations.update_service)

/**
 * @swagger
 * /services/{serviceid}:
 *  delete:
 *      summary: Delete service by id
 *      tags: [Services]
 *      description: Delete single service by id
 *      parameters:
 *        - in: path
 *          name: serviceid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ServiceID of data to delete
 *      responses:
 *          202:
 *              description: Updated service
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Services:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/DeleteServicesResponse'
 *          404:
 *              description: No service found to delete
 */
router.delete('/:serviceid', dboperations.delete_service)

module.exports = router;