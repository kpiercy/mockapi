require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require("../middleware/validateDto");
const facilityDto = require("../schemas/facilities");

//child routes
const specRoutes = require('./specs')

//controller
const dboperations = require("../controllers/facilities");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
router.use('/:facilityid/specs', specRoutes)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities:
 *     get:
 *       tags:
 *         - Facilities
 *       summary: Get all facilities by jobid
 *       description: Get all facilities by jobid
 *       operationId: getAllFacilitiesByJobid
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
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Facilities:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         Facility:
 *                           type: string
 *                           example: RWJEBC
 *                         GUID:
 *                           type: string
 *                           example: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         InsuranceTransferLanguage:
 *                           type: string
 *                           example: some description line
 *                         Job_GUID:
 *                           type: string
 *                           example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         MinimumBalance:
 *                           type: number
 *                           example: 75
 *                         PatientTransferLanguage:
 *                           type: string
 *                           example: a different description line
 *                         Specs:
 *                           type: object
 *                           properties:
 *                             GUID:
 *                               type: string
 *                               example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                             Software:
 *                               type: string
 *                               example: software012
 *                     example:
 *                       - Active: true
 *                         Facility: RWJEBC
 *                         GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         InsuranceTransferLanguage: some description line
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         MinimumBalance: 75
 *                         PatientTransferLanguage: a different description line
 *                         Specs:
 *                           GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                           Software: software012
 *               examples:
 *                 '200':
 *                   value:
 *                     Facilities:
 *                       - Active: true
 *                         Facility: RWJEBC
 *                         GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         InsuranceTransferLanguage: some description line
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         MinimumBalance: 75
 *                         PatientTransferLanguage: a different description line
 *                         Specs:
 *                           GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                           Software: software012
 */
router.get("/", checkReach, dboperations.all_facilities);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}:
 *     get:
 *       tags:
 *         - Facilities
 *       summary: Get facility by facilityid
 *       description: Get facility by facilityid
 *       operationId: getFacilityByFacilityid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Facilities:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         Facility:
 *                           type: string
 *                           example: RWJEBC
 *                         GUID:
 *                           type: string
 *                           example: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         InsuranceTransferLanguage:
 *                           type: string
 *                           example: some description line
 *                         Job_GUID:
 *                           type: string
 *                           example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         MinimumBalance:
 *                           type: number
 *                           example: 75
 *                         PatientTransferLanguage:
 *                           type: string
 *                           example: a different description line
 *                         Specs:
 *                           type: object
 *                           properties:
 *                             GUID:
 *                               type: string
 *                               example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                             Software:
 *                               type: string
 *                               example: software012
 *                     example:
 *                       - Active: true
 *                         Facility: RWJEBC
 *                         GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         InsuranceTransferLanguage: some description line
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         MinimumBalance: 75
 *                         PatientTransferLanguage: a different description line
 *                         Specs:
 *                           GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                           Software: software012
 *               examples:
 *                 '200':
 *                   value:
 *                     Facilities:
 *                       - Active: true
 *                         Facility: RWJEBC
 *                         GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         InsuranceTransferLanguage: some description line
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         MinimumBalance: 75
 *                         PatientTransferLanguage: a different description line
 *                         Specs:
 *                           GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                           Software: software012
 */
router.get("/:facilityid", checkReach, dboperations.one_facility);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}:
 *     patch:
 *       tags:
 *         - Facilities
 *       summary: Update facility by facilityid
 *       description: Update facility by facilityid
 *       operationId: updateFacilityByFacilityid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Facilities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       Facility:
 *                         type: string
 *                         example: RWJEBC
 *                       InsuranceTransferLanguage:
 *                         type: string
 *                         example: some description line
 *                       Job_GUID:
 *                         type: string
 *                         example: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *                       MinimumBalance:
 *                         type: number
 *                         example: 75
 *                       PatientTransferLanguage:
 *                         type: string
 *                         example: a different description line
 *                   example:
 *                     - Active: true
 *                       Facility: RWJEBC
 *                       InsuranceTransferLanguage: some description line
 *                       Job_GUID: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *                       MinimumBalance: 75
 *                       PatientTransferLanguage: a different description line
 *             example:
 *               Facilities:
 *                 - Active: true
 *                   Facility: RWJEBC
 *                   InsuranceTransferLanguage: some description line
 *                   Job_GUID: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *                   MinimumBalance: 75
 *                   PatientTransferLanguage: a different description line
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Facilities:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         Facility:
 *                           type: string
 *                           example: RWJEBC
 *                         GUID:
 *                           type: string
 *                           example: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         InsuranceTransferLanguage:
 *                           type: string
 *                           example: some description line
 *                         MinimumBalance:
 *                           type: number
 *                           example: 75
 *                         PatientTransferLanguage:
 *                           type: string
 *                           example: a different description line
 *                     example:
 *                       - Active: true
 *                         Facility: RWJEBC
 *                         GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         InsuranceTransferLanguage: some description line
 *                         MinimumBalance: 75
 *                         PatientTransferLanguage: a different description line
 *               examples:
 *                 '200':
 *                   value:
 *                     Facilities:
 *                       - Active: true
 *                         Facility: RWJEBC
 *                         GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         InsuranceTransferLanguage: some description line
 *                         MinimumBalance: 75
 *                         PatientTransferLanguage: a different description line
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
 *       - name: facilityid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 1f80ff20-5afc-44d5-9407-910ab3c63eca
 */
router.patch("/:facilityid", checkReach, dboperations.update_facility);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities:
 *     post:
 *       tags:
 *         - Facilities
 *       summary: /
 *       description: /
 *       operationId: '1'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Facilities:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       Facility:
 *                         type: string
 *                         example: RWJEBC
 *                       InsuranceTransferLanguage:
 *                         type: string
 *                         example: some description line
 *                       Job_GUID:
 *                         type: string
 *                         example: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *                       MinimumBalance:
 *                         type: number
 *                         example: 75
 *                       PatientTransferLanguage:
 *                         type: string
 *                         example: a different description line
 *                       Specs:
 *                         type: object
 *                         properties:
 *                           APIAvailable:
 *                             type: boolean
 *                             example: false
 *                           APIDocumentation:
 *                             nullable: true
 *                             example: null
 *                           Channels:
 *                             type: object
 *                             properties:
 *                               AmericanExpress:
 *                                 type: boolean
 *                                 example: true
 *                               Discover:
 *                                 type: boolean
 *                                 example: true
 *                               IVRPayments:
 *                                 type: boolean
 *                                 example: false
 *                               IVRPhone:
 *                                 nullable: true
 *                                 example: null
 *                               MailPayments:
 *                                 type: boolean
 *                                 example: true
 *                               MailTo:
 *                                 type: string
 *                                 example: some physical address
 *                               MasterCard:
 *                                 type: boolean
 *                                 example: true
 *                               OnlinePayments:
 *                                 type: boolean
 *                                 example: true
 *                               OtherAccepted:
 *                                 type: string
 *                                 example: NA
 *                               OtherChannels:
 *                                 nullable: true
 *                                 example: null
 *                               PaySite:
 *                                 type: string
 *                                 example: www.paymesucka.com/now
 *                               PhoneLocal:
 *                                 type: string
 *                                 example: 123-456-7890
 *                               PhonePayments:
 *                                 type: boolean
 *                                 example: true
 *                               PhoneTollFree:
 *                                 type: string
 *                                 example: 789-654-3210
 *                               Visa:
 *                                 type: boolean
 *                                 example: true
 *                           ClientProvidedSpecSheet:
 *                             type: boolean
 *                             example: false
 *                           DataCrosswalkProvided:
 *                             type: boolean
 *                             example: true
 *                           DataFileProvided:
 *                             type: boolean
 *                             example: true
 *                           ExtractErrors:
 *                             type: boolean
 *                             example: true
 *                           HoldErrors:
 *                             type: boolean
 *                             example: false
 *                           LockboxBank:
 *                             nullable: true
 *                             example: null
 *                           LockboxCSZ:
 *                             nullable: true
 *                             example: null
 *                           LockboxIntegration:
 *                             type: boolean
 *                             example: true
 *                           Logos:
 *                             type: object
 *                             properties:
 *                               Location:
 *                                 type: string
 *                                 example: >-
 *                                   C:\clients\P\PFS_zAdena\Logos\aFacilityLogo.jpg
 *                           PDFFileProvided:
 *                             type: boolean
 *                             example: false
 *                           Reports:
 *                             type: object
 *                             properties:
 *                               FacilityPDFs:
 *                                 type: boolean
 *                                 example: false
 *                               FacilityReport:
 *                                 type: boolean
 *                                 example: false
 *                               MovesReport:
 *                                 type: boolean
 *                                 example: false
 *                               NonCassReport:
 *                                 type: boolean
 *                                 example: false
 *                               PrintPDFs:
 *                                 type: boolean
 *                                 example: false
 *                               SummaryReport:
 *                                 type: boolean
 *                                 example: false
 *                               SuppressionReport:
 *                                 type: boolean
 *                                 example: false
 *                               UndeliverablesReport:
 *                                 type: boolean
 *                                 example: false
 *                           Software:
 *                             type: string
 *                             example: software123
 *                   example:
 *                     - Active: true
 *                       Facility: RWJEBC
 *                       InsuranceTransferLanguage: some description line
 *                       Job_GUID: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *                       MinimumBalance: 75
 *                       PatientTransferLanguage: a different description line
 *                       Specs:
 *                         APIAvailable: false
 *                         APIDocumentation: null
 *                         Channels:
 *                           AmericanExpress: true
 *                           Discover: true
 *                           IVRPayments: false
 *                           IVRPhone: null
 *                           MailPayments: true
 *                           MailTo: some physical address
 *                           MasterCard: true
 *                           OnlinePayments: true
 *                           OtherAccepted: NA
 *                           OtherChannels: null
 *                           PaySite: www.paymesucka.com/now
 *                           PhoneLocal: 123-456-7890
 *                           PhonePayments: true
 *                           PhoneTollFree: 789-654-3210
 *                           Visa: true
 *                         ClientProvidedSpecSheet: false
 *                         DataCrosswalkProvided: true
 *                         DataFileProvided: true
 *                         ExtractErrors: true
 *                         HoldErrors: false
 *                         LockboxBank: null
 *                         LockboxCSZ: null
 *                         LockboxIntegration: true
 *                         Logos:
 *                           Location: C:\clients\P\PFS_zAdena\Logos\aFacilityLogo.jpg
 *                         PDFFileProvided: false
 *                         Reports:
 *                           FacilityPDFs: false
 *                           FacilityReport: false
 *                           MovesReport: false
 *                           NonCassReport: false
 *                           PrintPDFs: false
 *                           SummaryReport: false
 *                           SuppressionReport: false
 *                           UndeliverablesReport: false
 *                         Software: software123
 *             example:
 *               Facilities:
 *                 - Active: true
 *                   Facility: RWJEBC
 *                   InsuranceTransferLanguage: some description line
 *                   Job_GUID: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *                   MinimumBalance: 75
 *                   PatientTransferLanguage: a different description line
 *                   Specs:
 *                     APIAvailable: false
 *                     APIDocumentation: null
 *                     Channels:
 *                       AmericanExpress: true
 *                       Discover: true
 *                       IVRPayments: false
 *                       IVRPhone: null
 *                       MailPayments: true
 *                       MailTo: some physical address
 *                       MasterCard: true
 *                       OnlinePayments: true
 *                       OtherAccepted: NA
 *                       OtherChannels: null
 *                       PaySite: www.paymesucka.com/now
 *                       PhoneLocal: 123-456-7890
 *                       PhonePayments: true
 *                       PhoneTollFree: 789-654-3210
 *                       Visa: true
 *                     ClientProvidedSpecSheet: false
 *                     DataCrosswalkProvided: true
 *                     DataFileProvided: true
 *                     ExtractErrors: true
 *                     HoldErrors: false
 *                     LockboxBank: null
 *                     LockboxCSZ: null
 *                     LockboxIntegration: true
 *                     Logos:
 *                       Location: C:\clients\P\PFS_zAdena\Logos\aFacilityLogo.jpg
 *                     PDFFileProvided: false
 *                     Reports:
 *                       FacilityPDFs: false
 *                       FacilityReport: false
 *                       MovesReport: false
 *                       NonCassReport: false
 *                       PrintPDFs: false
 *                       SummaryReport: false
 *                       SuppressionReport: false
 *                       UndeliverablesReport: false
 *                     Software: software123
 *       responses:
 *         '200':
 *           description: ''
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
router.post("/", checkReach, validateDto(facilityDto), dboperations.create_facility);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}:
 *     delete:
 *       tags:
 *         - Facilities
 *       summary: Delete facility by facilityid
 *       description: Delete facility by facilityid
 *       operationId: deleteFacilityByFacilityid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Facilities:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         Facility:
 *                           type: string
 *                           example: RWJEBC
 *                         GUID:
 *                           type: string
 *                           example: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                     example:
 *                       - Active: false
 *                         Facility: RWJEBC
 *                         GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *               examples:
 *                 '200':
 *                   value:
 *                     Facilities:
 *                       - Active: false
 *                         Facility: RWJEBC
 *                         GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 */
router.delete("/:facilityid", checkReach, authLvl, dboperations.delete_facility);

module.exports = router;
