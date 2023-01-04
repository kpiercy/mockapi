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
 *   /services:
 *     post:
 *       tags:
 *         - Services
 *       summary: Create services
 *       description: Create services
 *       operationId: createServices
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Services:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       BasePrice:
 *                         type: number
 *                         example: 55
 *                       Code:
 *                         type: string
 *                         example: code123
 *                       Description:
 *                         type: string
 *                         example: some descript
 *                       GLID:
 *                         type: string
 *                         example: '123456'
 *                       InventoryItem:
 *                         type: boolean
 *                         example: false
 *                       MarkupPercentage:
 *                         type: number
 *                         example: 0
 *                       MinimumPrice:
 *                         type: number
 *                         example: 15
 *                       RunRate:
 *                         type: number
 *                         example: 0
 *                       SetupFee:
 *                         type: number
 *                         example: 0
 *                       Taxable:
 *                         type: boolean
 *                         example: false
 *                       Type:
 *                         type: string
 *                         example: F856BEFB-97B2-4B39-B74D-4EA23B6F26BD
 *                       UnitCost:
 *                         type: number
 *                         example: 0
 *                       UsePerM:
 *                         type: number
 *                         example: 1
 *                   example:
 *                     - Active: true
 *                       BasePrice: 55
 *                       Code: code123
 *                       Description: some descript
 *                       GLID: '123456'
 *                       InventoryItem: false
 *                       MarkupPercentage: 0
 *                       MinimumPrice: 15
 *                       RunRate: 0
 *                       SetupFee: 0
 *                       Taxable: false
 *                       Type: F856BEFB-97B2-4B39-B74D-4EA23B6F26BD
 *                       UnitCost: 0
 *                       UsePerM: 1
 *             example:
 *               Services:
 *                 - Active: true
 *                   BasePrice: 55
 *                   Code: code123
 *                   Description: some descript
 *                   GLID: '123456'
 *                   InventoryItem: false
 *                   MarkupPercentage: 0
 *                   MinimumPrice: 15
 *                   RunRate: 0
 *                   SetupFee: 0
 *                   Taxable: false
 *                   Type: F856BEFB-97B2-4B39-B74D-4EA23B6F26BD
 *                   UnitCost: 0
 *                   UsePerM: 1
 *       responses:
 *         '201':
 *           description: '201'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Services:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         Description:
 *                           type: string
 *                           example: some descript
 *                         GUID:
 *                           type: string
 *                           example: 1D8A56F7-862E-403F-93CA-BAB328C13B48
 *                     example:
 *                       - Active: true
 *                         Description: some descript
 *                         GUID: 1D8A56F7-862E-403F-93CA-BAB328C13B48
 *               examples:
 *                 '201':
 *                   value:
 *                     Services:
 *                       - Active: true
 *                         Description: some descript
 *                         GUID: 1D8A56F7-862E-403F-93CA-BAB328C13B48
 */
router.post('/', dboperations.create_service)

/**
 * @swagger
 *   /services:
 *     get:
 *       tags:
 *         - Services
 *       summary: Get all services
 *       description: Get all services
 *       operationId: getAllServices
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
 *                   Services:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         BasePrice:
 *                           type: number
 *                           example: 75
 *                         Code:
 *                           type: string
 *                           example: STMTMP
 *                         Description:
 *                           type: string
 *                           example: Mail Processing
 *                         GLID:
 *                           type: string
 *                           example: '30105'
 *                         GUID:
 *                           type: string
 *                           example: 8F8EA8D4-9A82-43D5-A181-0D4F51A7475F
 *                         InventoryItem:
 *                           type: boolean
 *                           example: false
 *                         MarkupPercentage:
 *                           type: number
 *                           example: 0
 *                         MinimumPrice:
 *                           type: number
 *                           example: 70
 *                         RunRate:
 *                           type: number
 *                           example: 7
 *                         SetupFee:
 *                           type: number
 *                           example: 0
 *                         Taxable:
 *                           type: boolean
 *                           example: false
 *                         Type:
 *                           type: string
 *                           example: MAP
 *                         UnitCost:
 *                           type: number
 *                           example: 60
 *                         UserPerM:
 *                           type: boolean
 *                           example: true
 *                     example:
 *                       - Active: true
 *                         BasePrice: 75
 *                         Code: STMTMP
 *                         Description: Mail Processing
 *                         GLID: '30105'
 *                         GUID: 8F8EA8D4-9A82-43D5-A181-0D4F51A7475F
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 70
 *                         RunRate: 7
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: MAP
 *                         UnitCost: 60
 *                         UserPerM: true
 *                       - Active: true
 *                         BasePrice: 55
 *                         Code: code123
 *                         Description: some descript
 *                         GLID: '123456'
 *                         GUID: 1D8A56F7-862E-403F-93CA-BAB328C13B48
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 15
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: EPY
 *                         UnitCost: 0
 *                         UserPerM: true
 *                       - Active: true
 *                         BasePrice: 75
 *                         Code: CLR SIMP
 *                         Description: updatedDESC
 *                         GLID: '30103'
 *                         GUID: 3F7BAA3C-A269-4227-930E-26B60FB0D110
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 70
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: CLP
 *                         UnitCost: 65
 *                         UserPerM: true
 *                       - Active: true
 *                         BasePrice: 55
 *                         Code: code123
 *                         Description: some descript
 *                         GLID: '123456'
 *                         GUID: 612E3074-AB3C-4A4B-BC22-E267FC52C9D6
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 15
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: EPY
 *                         UnitCost: 0
 *                         UserPerM: true
 *                       - Active: true
 *                         BasePrice: 50
 *                         Code: ADDTLPGS
 *                         Description: Additional Pages
 *                         GLID: '30103'
 *                         GUID: 8D4BDCF4-21C8-43A5-861F-432C7100E361
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 40
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: CLP
 *                         UnitCost: 25
 *                         UserPerM: true
 *                       - Active: true
 *                         BasePrice: 0
 *                         Code: SENV 405i
 *                         Description: 'Indicia Standard #10 Outgoing Env'
 *                         GLID: '98765'
 *                         GUID: AD082BEC-8727-408D-B90B-63BF5BC680A6
 *                         InventoryItem: true
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 0
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: true
 *                         Type: SEN
 *                         UnitCost: 12
 *                         UserPerM: true
 *                       - Active: true
 *                         BasePrice: 55
 *                         Code: code123
 *                         Description: some descript
 *                         GLID: '123456'
 *                         GUID: CA97454B-8247-4C7B-A9C9-ABD44E0680A0
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 15
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: EPY
 *                         UnitCost: 0
 *                         UserPerM: true
 *               examples:
 *                 '200':
 *                   value:
 *                     Services:
 *                       - Active: true
 *                         BasePrice: 75
 *                         Code: STMTMP
 *                         Description: Mail Processing
 *                         GLID: '30105'
 *                         GUID: 8F8EA8D4-9A82-43D5-A181-0D4F51A7475F
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 70
 *                         RunRate: 7
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: MAP
 *                         UnitCost: 60
 *                         UserPerM: true
 *                       - Active: true
 *                         BasePrice: 55
 *                         Code: code123
 *                         Description: some descript
 *                         GLID: '123456'
 *                         GUID: 1D8A56F7-862E-403F-93CA-BAB328C13B48
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 15
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: EPY
 *                         UnitCost: 0
 *                         UserPerM: true
 *                       - Active: true
 *                         BasePrice: 75
 *                         Code: CLR SIMP
 *                         Description: updatedDESC
 *                         GLID: '30103'
 *                         GUID: 3F7BAA3C-A269-4227-930E-26B60FB0D110
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 70
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: CLP
 *                         UnitCost: 65
 *                         UserPerM: true
 *                       - Active: true
 *                         BasePrice: 55
 *                         Code: code123
 *                         Description: some descript
 *                         GLID: '123456'
 *                         GUID: 612E3074-AB3C-4A4B-BC22-E267FC52C9D6
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 15
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: EPY
 *                         UnitCost: 0
 *                         UserPerM: true
 *                       - Active: true
 *                         BasePrice: 50
 *                         Code: ADDTLPGS
 *                         Description: Additional Pages
 *                         GLID: '30103'
 *                         GUID: 8D4BDCF4-21C8-43A5-861F-432C7100E361
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 40
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: CLP
 *                         UnitCost: 25
 *                         UserPerM: true
 *                       - Active: true
 *                         BasePrice: 0
 *                         Code: SENV 405i
 *                         Description: 'Indicia Standard #10 Outgoing Env'
 *                         GLID: '98765'
 *                         GUID: AD082BEC-8727-408D-B90B-63BF5BC680A6
 *                         InventoryItem: true
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 0
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: true
 *                         Type: SEN
 *                         UnitCost: 12
 *                         UserPerM: true
 *                       - Active: true
 *                         BasePrice: 55
 *                         Code: code123
 *                         Description: some descript
 *                         GLID: '123456'
 *                         GUID: CA97454B-8247-4C7B-A9C9-ABD44E0680A0
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 15
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: EPY
 *                         UnitCost: 0
 *                         UserPerM: true
 */
router.get('/', dboperations.all_services)

/**
 * @swagger
 *   /services/{serviceid}:
 *     get:
 *       tags:
 *         - Services
 *       summary: Get service by serviceid
 *       description: Get service by serviceid
 *       operationId: getServiceByServiceid
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
 *                   Services:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         BasePrice:
 *                           type: number
 *                           example: 75
 *                         Code:
 *                           type: string
 *                           example: CLR SIMP
 *                         Description:
 *                           type: string
 *                           example: updatedDESC
 *                         GLID:
 *                           type: string
 *                           example: '30103'
 *                         GUID:
 *                           type: string
 *                           example: 3F7BAA3C-A269-4227-930E-26B60FB0D110
 *                         InventoryItem:
 *                           type: boolean
 *                           example: false
 *                         MarkupPercentage:
 *                           type: number
 *                           example: 0
 *                         MinimumPrice:
 *                           type: number
 *                           example: 70
 *                         RunRate:
 *                           type: number
 *                           example: 0
 *                         SetupFee:
 *                           type: number
 *                           example: 0
 *                         Taxable:
 *                           type: boolean
 *                           example: false
 *                         Type:
 *                           type: string
 *                           example: CLP
 *                         UnitCost:
 *                           type: number
 *                           example: 65
 *                         UserPerM:
 *                           type: boolean
 *                           example: true
 *                     example:
 *                       - Active: true
 *                         BasePrice: 75
 *                         Code: CLR SIMP
 *                         Description: updatedDESC
 *                         GLID: '30103'
 *                         GUID: 3F7BAA3C-A269-4227-930E-26B60FB0D110
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 70
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: CLP
 *                         UnitCost: 65
 *                         UserPerM: true
 *               examples:
 *                 '200':
 *                   value:
 *                     Services:
 *                       - Active: true
 *                         BasePrice: 75
 *                         Code: CLR SIMP
 *                         Description: updatedDESC
 *                         GLID: '30103'
 *                         GUID: 3F7BAA3C-A269-4227-930E-26B60FB0D110
 *                         InventoryItem: false
 *                         MarkupPercentage: 0
 *                         MinimumPrice: 70
 *                         RunRate: 0
 *                         SetupFee: 0
 *                         Taxable: false
 *                         Type: CLP
 *                         UnitCost: 65
 *                         UserPerM: true
 */
router.get('/:serviceid', dboperations.one_service)

/**
 * @swagger
 *   /services/{serviceid}:
 *     patch:
 *       tags:
 *         - Services
 *       summary: Update service by serviceid
 *       description: Update service by serviceid
 *       operationId: updateServiceByServiceid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Services:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       BasePrice:
 *                         type: number
 *                         example: 25
 *                       Code:
 *                         type: string
 *                         example: '81457'
 *                       Description:
 *                         type: string
 *                         example: ELITEGEN Perf
 *                       GLID:
 *                         type: string
 *                         example: '13245'
 *                       InventoryItem:
 *                         type: boolean
 *                         example: false
 *                       MarkupPercentage:
 *                         type: number
 *                         example: 25
 *                       MinimumPrice:
 *                         type: number
 *                         example: 10
 *                       RunRate:
 *                         type: number
 *                         example: 5000
 *                       SetupFee:
 *                         type: number
 *                         example: 0
 *                       Taxable:
 *                         type: boolean
 *                         example: true
 *                       Type:
 *                         type: string
 *                         example: 89165aad-54c9-4b69-9a60-4cfbdea3aa9c
 *                       UnitCost:
 *                         type: number
 *                         example: 13
 *                       UsePerM:
 *                         type: boolean
 *                         example: true
 *                   example:
 *                     - Active: true
 *                       BasePrice: 25
 *                       Code: '81457'
 *                       Description: ELITEGEN Perf
 *                       GLID: '13245'
 *                       InventoryItem: false
 *                       MarkupPercentage: 25
 *                       MinimumPrice: 10
 *                       RunRate: 5000
 *                       SetupFee: 0
 *                       Taxable: true
 *                       Type: 89165aad-54c9-4b69-9a60-4cfbdea3aa9c
 *                       UnitCost: 13
 *                       UsePerM: true
 *             example:
 *               Services:
 *                 - Active: true
 *                   BasePrice: 25
 *                   Code: '81457'
 *                   Description: ELITEGEN Perf
 *                   GLID: '13245'
 *                   InventoryItem: false
 *                   MarkupPercentage: 25
 *                   MinimumPrice: 10
 *                   RunRate: 5000
 *                   SetupFee: 0
 *                   Taxable: true
 *                   Type: 89165aad-54c9-4b69-9a60-4cfbdea3aa9c
 *                   UnitCost: 13
 *                   UsePerM: true
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Services:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         Description:
 *                           type: string
 *                           example: ELITEGEN Perf
 *                         GUID:
 *                           type: string
 *                           example: AD082BEC-8727-408D-B90B-63BF5BC680A6
 *                     example:
 *                       - Active: true
 *                         Description: ELITEGEN Perf
 *                         GUID: AD082BEC-8727-408D-B90B-63BF5BC680A6
 *               examples:
 *                 '200':
 *                   value:
 *                     Services:
 *                       - Active: true
 *                         Description: ELITEGEN Perf
 *                         GUID: AD082BEC-8727-408D-B90B-63BF5BC680A6
 *     parameters:
 *       - name: serviceid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: ad082bec-8727-408d-b90b-63bf5bc680a6
 */
router.patch('/:serviceid', dboperations.update_service)

/**
 * @swagger
 *   /services/{serviceid}:
 *     delete:
 *       tags:
 *         - Services
 *       summary: Delete service by serviceid
 *       description: Delete service by serviceid
 *       operationId: deleteServiceByServiceid
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
 *                   Services:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         Code:
 *                           type: string
 *                           example: '81457'
 *                         Description:
 *                           type: string
 *                           example: ELITEGEN Perf
 *                         GUID:
 *                           type: string
 *                           example: AD082BEC-8727-408D-B90B-63BF5BC680A6
 *                     example:
 *                       - Active: false
 *                         Code: '81457'
 *                         Description: ELITEGEN Perf
 *                         GUID: AD082BEC-8727-408D-B90B-63BF5BC680A6
 *               examples:
 *                 '200':
 *                   value:
 *                     Services:
 *                       - Active: false
 *                         Code: '81457'
 *                         Description: ELITEGEN Perf
 *                         GUID: AD082BEC-8727-408D-B90B-63BF5BC680A6
 */
router.delete('/:serviceid', dboperations.delete_service)

module.exports = router;