require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/downloads')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/downloads:
 *  get:
 *      summary: Get all download by invoiceid
 *      tags: [Downloads]
 *      description: Find all download by invoiceid
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
 *              description: Found downloads
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Downloads:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Download'
 *          404:
 *              description: No downloads found for job
 */
router.get('/', checkReach, dboperations.all_downloads)

/**
 * @swagger
 * /clients/{clientid}/jobs/{jobid}/downloads/{downloadid}:
 *  get:
 *      summary: Get download by id
 *      tags: [Downloads]
 *      description: Get a single download record by id
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
 *      responses:
 *          200:
 *              description: Found download
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              Downloads:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Download'
 *          404:
 *              description: No download found
 */
router.get('/:downloadid', checkReach, dboperations.one_download)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/downloads/{downloadid}:
 *     patch:
 *         summary: Update download by id
 *         tags: [Downloads]
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
 *           - name: downloadid
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
 *                             Downloads:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/UpdateDownloadsBody'
 *         responses:
 *             200:
 *                 description: Updated download
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Downloads:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Download'
 *             404:
 *                 description: Download record was not found
 */
router.patch('/:downloadid', checkReach, dboperations.update_download)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/downloads:
 *     post:
 *         summary: Create one or more downloads for job
 *         tags: [Downloads]
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
 *           - name: downloadid
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
 *                             Downloads:
 *                                 type: array
 *                                 items:
 *                                     $ref: '#/components/schemas/CreateDownloadsBody'
 *         responses:
 *             201:
 *                 description: Updated download
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Downloads:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/Download'
 */
router.post('/', checkReach, authLvl, dboperations.create_download)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/downloads/{downloadid}:
 *     delete:
 *         summary: Delete download by id
 *         tags: [Downloads]
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
 *           - name: downloadid
 *             in: path
 *             required: true
 *             schema:
 *               type: int
 *               example: 60
 *         responses:
 *             200:
 *                 description: Deleted download
 *                 content: 
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 Downloads:
 *                                     type: array
 *                                     items:
 *                                         $ref: '#/components/schemas/DeleteDownloadResponse'
 *             404:
 *                 description: Download record was not found
 */
router.delete('/:downloadid', checkReach, authLvl, dboperations.delete_download)

module.exports = router;