require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes
const versionRoutes = require('./versions')

//controller
const dboperations = require('../controllers/orders')

//model

//router options and children 
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use('/:orderid/versions', versionRoutes)

//get all orders for this job by client
//router.get('/', checkReach, dboperations.all_orders)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/orders/{orderid}:
 *  get:
 *      summary: Get order by id
 *      tags: [Orders]
 *      description: Finds order by id
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
 *          name: orderid
 *          schema: 
 *              type: int
 *          required: true
 *          description: OrderID of data to find
 *      responses:
 *          200:
 *              description: Found order
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Orders:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Order'
 *          404:
 *              description: Order record was not found
 */
router.get('/:orderid', checkReach, dboperations.one_order)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/orders/{orderid}:
 *  patch:
 *      summary: Update order by id
 *      tags: [Orders]
 *      description: Update single order by id
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
 *          name: orderid
 *          schema: 
 *              type: int
 *          required: true
 *          description: OrderID of data to find
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Orders:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/UpdateOrdersBody'
 *      responses:
 *          200:
 *              description: Updated order
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Orders:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Order'
 */
router.patch('/:orderid', checkReach, dboperations.update_order)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/orders:
 *  post:
 *      summary: Create orders record for job
 *      tags: [Orders]
 *      description: Create order automation record for job
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
 *                Orders:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateOrdersBody'
 *      responses:
 *          201:
 *              description: Created order
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Orders:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/Order'
 */
router.post('/', checkReach, authLvl, dboperations.create_order)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/orders/{orderid}:
 *  delete:
 *      summary: Delete order by id
 *      tags: [Orders]
 *      description: Delete order by id
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
 *          name: orderid
 *          schema: 
 *              type: int
 *          required: true
 *          description: OrderID of data to find
 *      responses:
 *          202:
 *              description: Deleted order
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Orders:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/DeleteOrderResponse'
 *          404:
 *              description: Order record was not found
 */
router.delete('/:orderid', checkReach, authLvl, dboperations.delete_order)

module.exports = router;