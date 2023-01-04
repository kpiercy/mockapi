require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const contractsDto = require('../schemas/contracts')

//child routes
const priceRoutes = require("./prices");

//controller
const dboperations = require("../controllers/contracts");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use("/:contractid/prices", priceRoutes);

/**
 * @swagger
 *   /clients/{clientid}/contracts:
 *     get:
 *       tags:
 *         - Contracts
 *       summary: Get all contracts by clientid
 *       description: Get all contracts by clientid
 *       operationId: getAllContractsByClientid
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
 *             example: '1'
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
 *                   Contracts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         ClientRep1:
 *                           type: string
 *                           example: ''
 *                         ClientRep2:
 *                           type: string
 *                           example: ''
 *                         Client_GUID:
 *                           type: string
 *                           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         DateEffective:
 *                           type: string
 *                           example: '1900-01-01T00:00:00'
 *                         DatePresented:
 *                           type: string
 *                           example: '1900-01-01T00:00:00'
 *                         DateSigned:
 *                           type: string
 *                           example: '1900-01-01T00:00:00'
 *                         EliteRep1:
 *                           type: string
 *                           example: ''
 *                         EliteRep2:
 *                           type: string
 *                           example: ''
 *                         GUID:
 *                           type: string
 *                           example: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         Prices:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               GUID:
 *                                 type: string
 *                                 example: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                               ItemPrice:
 *                                 type: number
 *                                 example: 100
 *                               Service:
 *                                 type: string
 *                                 example: Additional Pages
 *                           example:
 *                             - GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                               ItemPrice: 100
 *                               Service: Additional Pages
 *                             - GUID: 14310FA2-D174-4148-9D61-9C84A6934BCA
 *                               ItemPrice: 100
 *                               Service: updatedDESC
 *                     example:
 *                       - Active: true
 *                         ClientRep1: ''
 *                         ClientRep2: ''
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         DateEffective: '1900-01-01T00:00:00'
 *                         DatePresented: '1900-01-01T00:00:00'
 *                         DateSigned: '1900-01-01T00:00:00'
 *                         EliteRep1: ''
 *                         EliteRep2: ''
 *                         GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         Prices:
 *                           - GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                             ItemPrice: 100
 *                             Service: Additional Pages
 *                           - GUID: 14310FA2-D174-4148-9D61-9C84A6934BCA
 *                             ItemPrice: 100
 *                             Service: updatedDESC
 *               examples:
 *                 '200':
 *                   value:
 *                     Contracts:
 *                       - Active: true
 *                         ClientRep1: ''
 *                         ClientRep2: ''
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         DateEffective: '1900-01-01T00:00:00'
 *                         DatePresented: '1900-01-01T00:00:00'
 *                         DateSigned: '1900-01-01T00:00:00'
 *                         EliteRep1: ''
 *                         EliteRep2: ''
 *                         GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         Prices:
 *                           - GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                             ItemPrice: 100
 *                             Service: Additional Pages
 *                           - GUID: 14310FA2-D174-4148-9D61-9C84A6934BCA
 *                             ItemPrice: 100
 *                             Service: updatedDESC
 */
router.get("/", checkReach, dboperations.all_contracts);

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}:
 *     get:
 *       tags:
 *         - Contracts
 *       summary: Get contract by contractid
 *       description: Get contract by contractid
 *       operationId: getContractByContractid
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
 *                   Contracts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         ClientRep1:
 *                           type: string
 *                           example: ''
 *                         ClientRep2:
 *                           type: string
 *                           example: ''
 *                         Client_GUID:
 *                           type: string
 *                           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         DateEffective:
 *                           type: string
 *                           example: '1900-01-01T00:00:00'
 *                         DatePresented:
 *                           type: string
 *                           example: '1900-01-01T00:00:00'
 *                         DateSigned:
 *                           type: string
 *                           example: '1900-01-01T00:00:00'
 *                         EliteRep1:
 *                           type: string
 *                           example: ''
 *                         EliteRep2:
 *                           type: string
 *                           example: ''
 *                         GUID:
 *                           type: string
 *                           example: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         Prices:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               GUID:
 *                                 type: string
 *                                 example: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                               ItemPrice:
 *                                 type: number
 *                                 example: 100
 *                               Service:
 *                                 type: string
 *                                 example: Additional Pages
 *                           example:
 *                             - GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                               ItemPrice: 100
 *                               Service: Additional Pages
 *                             - GUID: 14310FA2-D174-4148-9D61-9C84A6934BCA
 *                               ItemPrice: 100
 *                               Service: updatedDESC
 *                     example:
 *                       - Active: true
 *                         ClientRep1: ''
 *                         ClientRep2: ''
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         DateEffective: '1900-01-01T00:00:00'
 *                         DatePresented: '1900-01-01T00:00:00'
 *                         DateSigned: '1900-01-01T00:00:00'
 *                         EliteRep1: ''
 *                         EliteRep2: ''
 *                         GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         Prices:
 *                           - GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                             ItemPrice: 100
 *                             Service: Additional Pages
 *                           - GUID: 14310FA2-D174-4148-9D61-9C84A6934BCA
 *                             ItemPrice: 100
 *                             Service: updatedDESC
 *               examples:
 *                 '200':
 *                   value:
 *                     Contracts:
 *                       - Active: true
 *                         ClientRep1: ''
 *                         ClientRep2: ''
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         DateEffective: '1900-01-01T00:00:00'
 *                         DatePresented: '1900-01-01T00:00:00'
 *                         DateSigned: '1900-01-01T00:00:00'
 *                         EliteRep1: ''
 *                         EliteRep2: ''
 *                         GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                         Prices:
 *                           - GUID: A8E2C7CA-D75C-45DB-96B6-DD05ACC880B8
 *                             ItemPrice: 100
 *                             Service: Additional Pages
 *                           - GUID: 14310FA2-D174-4148-9D61-9C84A6934BCA
 *                             ItemPrice: 100
 *                             Service: updatedDESC
 */
router.get("/:contractid", checkReach, dboperations.one_contract);

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}:
 *     patch:
 *       tags:
 *         - Contracts
 *       summary: /:contractid
 *       description: /:contractid
 *       operationId: contractid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Contracts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       ClientRep1:
 *                         type: string
 *                         example: Franky Boi
 *                       ClientRep2:
 *                         type: string
 *                         example: Johnny
 *                       DateEffective:
 *                         type: string
 *                         example: '2023-02-01 00:00:00'
 *                       DatePresented:
 *                         type: string
 *                         example: '2023-01-02 12:00:00'
 *                       DateSigned:
 *                         type: string
 *                         example: '2022-12-30 12:00:00'
 *                       EliteRep1:
 *                         type: string
 *                         example: GW
 *                       EliteRep2:
 *                         type: string
 *                         example: TS
 *                   example:
 *                     - Active: true
 *                       ClientRep1: Franky Boi
 *                       ClientRep2: Johnny
 *                       DateEffective: '2023-02-01 00:00:00'
 *                       DatePresented: '2023-01-02 12:00:00'
 *                       DateSigned: '2022-12-30 12:00:00'
 *                       EliteRep1: GW
 *                       EliteRep2: TS
 *             example:
 *               Contracts:
 *                 - Active: true
 *                   ClientRep1: Franky Boi
 *                   ClientRep2: Johnny
 *                   DateEffective: '2023-02-01 00:00:00'
 *                   DatePresented: '2023-01-02 12:00:00'
 *                   DateSigned: '2022-12-30 12:00:00'
 *                   EliteRep1: GW
 *                   EliteRep2: TS
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Contracts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         DateEffective:
 *                           type: string
 *                           example: '2023-02-01T00:00:00.000Z'
 *                         GUID:
 *                           type: string
 *                           example: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                     example:
 *                       - DateEffective: '2023-02-01T00:00:00.000Z'
 *                         GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *               examples:
 *                 '200':
 *                   value:
 *                     Contracts:
 *                       - DateEffective: '2023-02-01T00:00:00.000Z'
 *                         GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *       - name: contractid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 507e3fcf-f79b-4b74-b675-6bd829e8e3ec
 */
router.patch("/:contractid", checkReach, dboperations.update_contract);

/**
 * @swagger
 *   /clients/{clientid}/contracts:
 *     post:
 *       tags:
 *         - Contracts
 *       summary: Create contract
 *       description: Create contract
 *       operationId: createContract
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Contracts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       ClientRep1:
 *                         type: string
 *                         example: Bob Dole
 *                       ClientRep2:
 *                         nullable: true
 *                         example: null
 *                       Client_GUID:
 *                         type: string
 *                         example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *                       DateEffective:
 *                         type: string
 *                         example: '2022-11-25 14:19:00'
 *                       DatePresented:
 *                         type: string
 *                         example: '2022-11-25 14:19:00'
 *                       DateSigned:
 *                         type: string
 *                         example: '2022-11-25 14:19:00'
 *                       EliteRep1:
 *                         type: string
 *                         example: GW
 *                       EliteRep2:
 *                         type: string
 *                         example: TS
 *                       Prices:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             Price:
 *                               type: number
 *                               example: 50
 *                             Service_GUID:
 *                               type: string
 *                               example: 3f7baa3c-a269-4227-930e-26b60fb0d110
 *                         example:
 *                           - Price: 50
 *                             Service_GUID: 3f7baa3c-a269-4227-930e-26b60fb0d110
 *                           - Price: 50
 *                             Service_GUID: 8f8ea8d4-9a82-43d5-a181-0d4f51a7475f
 *                   example:
 *                     - Active: true
 *                       ClientRep1: Bob Dole
 *                       ClientRep2: null
 *                       Client_GUID: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *                       DateEffective: '2022-11-25 14:19:00'
 *                       DatePresented: '2022-11-25 14:19:00'
 *                       DateSigned: '2022-11-25 14:19:00'
 *                       EliteRep1: GW
 *                       EliteRep2: TS
 *                       Prices:
 *                         - Price: 50
 *                           Service_GUID: 3f7baa3c-a269-4227-930e-26b60fb0d110
 *                         - Price: 50
 *                           Service_GUID: 8f8ea8d4-9a82-43d5-a181-0d4f51a7475f
 *             example:
 *               Contracts:
 *                 - Active: true
 *                   ClientRep1: Bob Dole
 *                   ClientRep2: null
 *                   Client_GUID: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 *                   DateEffective: '2022-11-25 14:19:00'
 *                   DatePresented: '2022-11-25 14:19:00'
 *                   DateSigned: '2022-11-25 14:19:00'
 *                   EliteRep1: GW
 *                   EliteRep2: TS
 *                   Prices:
 *                     - Price: 50
 *                       Service_GUID: 3f7baa3c-a269-4227-930e-26b60fb0d110
 *                     - Price: 50
 *                       Service_GUID: 8f8ea8d4-9a82-43d5-a181-0d4f51a7475f
 *       responses:
 *         '201':
 *           description: '201'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Contracts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         ClientRep:
 *                           type: string
 *                           example: Bob Dole
 *                         DateEffective:
 *                           type: string
 *                           example: '2022-11-25T19:19:00'
 *                         DateSigned:
 *                           type: string
 *                           example: '2022-11-25T19:19:00'
 *                         EliteRep:
 *                           type: string
 *                           example: GW
 *                         GUID:
 *                           type: string
 *                           example: D94C359E-5812-45B4-BD44-2E88CBDB14F9
 *                         Prices:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               GUID:
 *                                 type: string
 *                                 example: E8D3785B-E018-4ED3-831B-B195CD52E641
 *                               Price:
 *                                 type: number
 *                                 example: 50
 *                               Service:
 *                                 type: string
 *                                 example: Mail Processing
 *                           example:
 *                             - GUID: E8D3785B-E018-4ED3-831B-B195CD52E641
 *                               Price: 50
 *                               Service: Mail Processing
 *                             - GUID: C3737499-D36C-4135-A971-0F277D72D33D
 *                               Price: 50
 *                               Service: updatedDESC
 *                     example:
 *                       - Active: true
 *                         ClientRep: Bob Dole
 *                         DateEffective: '2022-11-25T19:19:00'
 *                         DateSigned: '2022-11-25T19:19:00'
 *                         EliteRep: GW
 *                         GUID: D94C359E-5812-45B4-BD44-2E88CBDB14F9
 *                         Prices:
 *                           - GUID: E8D3785B-E018-4ED3-831B-B195CD52E641
 *                             Price: 50
 *                             Service: Mail Processing
 *                           - GUID: C3737499-D36C-4135-A971-0F277D72D33D
 *                             Price: 50
 *                             Service: updatedDESC
 *               examples:
 *                 '201':
 *                   value:
 *                     Contracts:
 *                       - Active: true
 *                         ClientRep: Bob Dole
 *                         DateEffective: '2022-11-25T19:19:00'
 *                         DateSigned: '2022-11-25T19:19:00'
 *                         EliteRep: GW
 *                         GUID: D94C359E-5812-45B4-BD44-2E88CBDB14F9
 *                         Prices:
 *                           - GUID: E8D3785B-E018-4ED3-831B-B195CD52E641
 *                             Price: 50
 *                             Service: Mail Processing
 *                           - GUID: C3737499-D36C-4135-A971-0F277D72D33D
 *                             Price: 50
 *                             Service: updatedDESC
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: de33ba44-dbd3-4b52-9a7e-0a031b8872c7
 */
router.post("/", checkReach, validateDto(contractsDto), dboperations.create_contract);

/**
 * @swagger
 *   /clients/{clientid}/contracts/{contractid}:
 *     delete:
 *       tags:
 *         - Contracts
 *       summary: /:contractid
 *       description: /:contractid
 *       operationId: contractid1
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
 *                   Contracts:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         GUID:
 *                           type: string
 *                           example: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *                     example:
 *                       - Active: false
 *                         GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 *               examples:
 *                 '200':
 *                   value:
 *                     Contracts:
 *                       - Active: false
 *                         GUID: 507E3FCF-F79B-4B74-B675-6BD829E8E3EC
 */
router.delete("/:contractid", checkReach, authLvl, dboperations.delete_contract);

module.exports = router;
