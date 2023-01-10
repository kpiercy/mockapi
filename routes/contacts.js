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
 *   /clients/{clientid}/jobs/{jobid}/contacts:
 *     get:
 *       tags:
 *         - Contacts
 *       summary: Get all contacts by jobid
 *       description: Get all contacts by jobid
 *       operationId: getAllContactsByJobid
 *       parameters:
 *         - name: paginate
 *           in: query
 *           schema:
 *             type: string
 *             example: 'true'
 *         - name: page
 *           in: query
 *           schema:
 *             type: string
 *             example: '1'
 *         - name: limit
 *           in: query
 *           schema:
 *             type: string
 *             example: '2'
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: ''
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Contacts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         ContactType:
 *                           type: string
 *                           example: StmtProcessing
 *                         Email:
 *                           type: string
 *                           example: kpiercy@eliteps.com
 *                         FirstName:
 *                           type: string
 *                           example: Kevin
 *                         GUID:
 *                           type: string
 *                           example: BA569969-2C0F-41A5-8B85-4730A159EE47
 *                         LastName:
 *                           type: string
 *                           example: Piercy
 *                         Phone:
 *                           type: string
 *                           example: '7654991654'
 *                     example:
 *                       - ContactType: StmtProcessing
 *                         Email: kpiercy@eliteps.com
 *                         FirstName: Kevin
 *                         GUID: BA569969-2C0F-41A5-8B85-4730A159EE47
 *                         LastName: Piercy
 *                         Phone: '7654991654'
 *                       - ContactType: StmtProcessing
 *                         Email: kpiercy@eliteps.com
 *                         FirstName: Kraig
 *                         GUID: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *                         LastName: Piercy
 *                         Phone: '7654990654'
 *               examples:
 *                 '200':
 *                   value:
 *                     Contacts:
 *                       - ContactType: StmtProcessing
 *                         Email: kpiercy@eliteps.com
 *                         FirstName: Kevin
 *                         GUID: BA569969-2C0F-41A5-8B85-4730A159EE47
 *                         LastName: Piercy
 *                         Phone: '7654991654'
 *                       - ContactType: StmtProcessing
 *                         Email: kpiercy@eliteps.com
 *                         FirstName: Kraig
 *                         GUID: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *                         LastName: Piercy
 *                         Phone: '7654990654'
 */
router.get('/', checkReach, dboperations.all_contacts)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/contacts/{contactid}:
 *     get:
 *       tags:
 *         - Contacts
 *       summary: Get contact by contactid
 *       description: Get contact by contactid
 *       operationId: getContactByContactid
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: ''
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Contacts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         ContactType:
 *                           type: string
 *                           example: StmtProcessing
 *                         Email:
 *                           type: string
 *                           example: kpiercy@eliteps.com
 *                         FirstName:
 *                           type: string
 *                           example: Kraig
 *                         GUID:
 *                           type: string
 *                           example: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *                         LastName:
 *                           type: string
 *                           example: Piercy
 *                         Phone:
 *                           type: string
 *                           example: '7654990654'
 *                     example:
 *                       - Active: true
 *                         ContactType: StmtProcessing
 *                         Email: kpiercy@eliteps.com
 *                         FirstName: Kraig
 *                         GUID: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *                         LastName: Piercy
 *                         Phone: '7654990654'
 *               examples:
 *                 '200':
 *                   value:
 *                     Contacts:
 *                       - Active: true
 *                         ContactType: StmtProcessing
 *                         Email: kpiercy@eliteps.com
 *                         FirstName: Kraig
 *                         GUID: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *                         LastName: Piercy
 *                         Phone: '7654990654'
 */
router.get('/:contactid', checkReach, dboperations.one_contact)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/contacts/{contactid}:
 *     patch:
 *       tags:
 *         - Contacts
 *       summary: Update contact by contactid
 *       description: Update contact by contactid
 *       operationId: updateContactByContactid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Contacts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       Email:
 *                         type: string
 *                         example: jpiercy@eliteps.com
 *                       FirstName:
 *                         type: string
 *                         example: John
 *                       LastName:
 *                         type: string
 *                         example: Piercy
 *                       Phone:
 *                         type: string
 *                         example: '7654990654'
 *                   example:
 *                     - Active: true
 *                       Email: jpiercy@eliteps.com
 *                       FirstName: John
 *                       LastName: Piercy
 *                       Phone: '7654990654'
 *             example:
 *               Contacts:
 *                 - Active: true
 *                   Email: jpiercy@eliteps.com
 *                   FirstName: John
 *                   LastName: Piercy
 *                   Phone: '7654990654'
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Contacts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         Contact_GUID:
 *                           type: string
 *                           example: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *                         Email:
 *                           type: string
 *                           example: jpiercy@eliteps.com
 *                         FirstName:
 *                           type: string
 *                           example: John
 *                         Job_GUID:
 *                           type: string
 *                           example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LastName:
 *                           type: string
 *                           example: Piercy
 *                         Phone:
 *                           type: string
 *                           example: '7654990654'
 *                     example:
 *                       - Active: true
 *                         Contact_GUID: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *                         Email: jpiercy@eliteps.com
 *                         FirstName: John
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LastName: Piercy
 *                         Phone: '7654990654'
 *               examples:
 *                 '200':
 *                   value:
 *                     Contacts:
 *                       - Active: true
 *                         Contact_GUID: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *                         Email: jpiercy@eliteps.com
 *                         FirstName: John
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LastName: Piercy
 *                         Phone: '7654990654'
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *       - name: jobid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *       - name: contactid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 */
router.patch('/:contactid', checkReach, dboperations.update_contact)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/contacts:
 *     post:
 *       tags:
 *         - Contacts
 *       summary: Create contacts for job
 *       description: Create contacts for job
 *       operationId: createContactsForJob
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Contacts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: number
 *                         example: 1
 *                       Email:
 *                         type: string
 *                         example: kpiercy@eliteps.com
 *                       FirstName:
 *                         type: string
 *                         example: Kevin
 *                       Job_GUID:
 *                         type: string
 *                         example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LastName:
 *                         type: string
 *                         example: Piercy
 *                       Phone:
 *                         type: string
 *                         example: '7654991654'
 *                       Type:
 *                         type: string
 *                         example: 3a3c663f-aa44-4295-89f5-c24869689b34
 *                   example:
 *                     - Active: 1
 *                       Email: kpiercy@eliteps.com
 *                       FirstName: Kevin
 *                       Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LastName: Piercy
 *                       Phone: '7654991654'
 *                       Type: 3a3c663f-aa44-4295-89f5-c24869689b34
 *             example:
 *               Contacts:
 *                 - Active: 1
 *                   Email: kpiercy@eliteps.com
 *                   FirstName: Kevin
 *                   Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                   LastName: Piercy
 *                   Phone: '7654991654'
 *                   Type: 3a3c663f-aa44-4295-89f5-c24869689b34
 *       responses:
 *         '201':
 *           description: '201'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Contacts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         GUID:
 *                           type: string
 *                           example: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *                         Type:
 *                           type: string
 *                           example: 3A3C663F-AA44-4295-89F5-C24869689B34
 *                     example:
 *                       - GUID: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *                         Type: 3A3C663F-AA44-4295-89F5-C24869689B34
 *               examples:
 *                 '201':
 *                   value:
 *                     Contacts:
 *                       - GUID: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *                         Type: 3A3C663F-AA44-4295-89F5-C24869689B34
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *       - name: jobid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 664c6b5e-334e-4368-988e-167e02c34ec9
 */
router.post('/', checkReach, dboperations.create_contact)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/contacts/{contactid}:
 *     delete:
 *       tags:
 *         - Contacts
 *       summary: Delete contact by contactid
 *       description: Delete contact by contactid
 *       operationId: deleteContactByContactid
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: ''
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Contacts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         GUID:
 *                           type: string
 *                           example: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *                     example:
 *                       - Active: false
 *                         GUID: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 *               examples:
 *                 '200':
 *                   value:
 *                     Contacts:
 *                       - Active: false
 *                         GUID: 8703E6B3-A32C-4CC1-9A4A-F4619CB9A6B4
 */
router.delete('/:contactid', checkReach, authLvl, dboperations.delete_contact)

module.exports = router;