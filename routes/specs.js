require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const specDto = require('../schemas/specs')

//child routes
const groupRoutes = require("./groups")
const reportRoutes = require("./reports")
const filterRoutes = require("./filters")
const channelRoutes = require('./paychannels')
const logoRoutes = require("./logos")
const chartRoutes = require("./charts")
const insertRoutes = require("./inserts")
const layoutRoutes = require("./layouts")

//controller
const dboperations = require("../controllers/specs");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
router.use("/:specid/groups", groupRoutes)
router.use("/:specid/reports", reportRoutes)
router.use("/:specid/filters", filterRoutes)
router.use('/:specid/channels', channelRoutes)
router.use("/:specid/logos", logoRoutes)
router.use("/:specid/charts", chartRoutes)
router.use("/:specid/inserts", insertRoutes)
router.use("/:specid/layouts", layoutRoutes)

/**
 * 
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs:
 *     get:
 *       tags:
 *         - Specs
 *       summary: Get spec by facilityid
 *       description: Get spec by facilityid
 *       operationId: getSpecByFacilityid
 *       responses:
 *         '200':
 *           description: ''
 */
router.get("/", checkReach, dboperations.all_specs);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}:
 *     get:
 *       tags:
 *         - Specs
 *       summary: Get spec by specid
 *       description: Get spec by specid
 *       operationId: getSpecBySpecid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Specs:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         APIAvailable:
 *                           type: boolean
 *                           example: false
 *                         Channels:
 *                           type: object
 *                           properties:
 *                             AmericanExpressAccepted:
 *                               type: boolean
 *                               example: true
 *                             DiscoverAccepted:
 *                               type: boolean
 *                               example: true
 *                             GUID:
 *                               type: string
 *                               example: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                             MailPaymentsTo:
 *                               type: string
 *                               example: some new address
 *                             MasterCardAccepted:
 *                               type: boolean
 *                               example: true
 *                             OtherAccepted:
 *                               type: string
 *                               example: NA
 *                             PayByIVR:
 *                               type: boolean
 *                               example: false
 *                             PayByMail:
 *                               type: boolean
 *                               example: true
 *                             PayByPhone:
 *                               type: boolean
 *                               example: true
 *                             PayOnline:
 *                               type: boolean
 *                               example: true
 *                             PaySite:
 *                               type: string
 *                               example: www.paymesucka.com/now
 *                             PhoneLocal:
 *                               type: string
 *                               example: 123-456-78
 *                             PhoneTollFree:
 *                               type: string
 *                               example: 789-654-32
 *                             VisaAccepted:
 *                               type: boolean
 *                               example: true
 *                         ClientProvidedSpecSheet:
 *                           type: boolean
 *                           example: false
 *                         DataCrosswalkProvided:
 *                           type: boolean
 *                           example: false
 *                         DataFileProvided:
 *                           type: boolean
 *                           example: false
 *                         ExtractErrors:
 *                           type: boolean
 *                           example: true
 *                         Facility_GUID:
 *                           type: string
 *                           example: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         GUID:
 *                           type: string
 *                           example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                         HoldErrors:
 *                           type: boolean
 *                           example: false
 *                         LockboxIntegration:
 *                           type: boolean
 *                           example: true
 *                         Logos:
 *                           type: object
 *                           properties:
 *                             GUID:
 *                               type: string
 *                               example: 9355A342-17B3-4164-A0E8-69D732030171
 *                             Location:
 *                               type: string
 *                               example: C:\clients\P\PFS_zAdena\Logos\THEadena.jpg
 *                         PDFFileProvided:
 *                           type: boolean
 *                           example: false
 *                         Reports:
 *                           type: object
 *                           properties:
 *                             FacilityPDFs:
 *                               type: boolean
 *                               example: false
 *                             FacilityReport:
 *                               type: boolean
 *                               example: false
 *                             GUID:
 *                               type: string
 *                               example: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                             MovesReport:
 *                               type: boolean
 *                               example: false
 *                             NonCassReport:
 *                               type: boolean
 *                               example: false
 *                             PrintPDFs:
 *                               type: boolean
 *                               example: false
 *                             SummaryReport:
 *                               type: boolean
 *                               example: false
 *                             SuppressionReport:
 *                               type: boolean
 *                               example: false
 *                             UndeliverablesReport:
 *                               type: boolean
 *                               example: false
 *                         Software:
 *                           type: string
 *                           example: software012
 *                     example:
 *                       - APIAvailable: false
 *                         Channels:
 *                           AmericanExpressAccepted: true
 *                           DiscoverAccepted: true
 *                           GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                           MailPaymentsTo: some new address
 *                           MasterCardAccepted: true
 *                           OtherAccepted: NA
 *                           PayByIVR: false
 *                           PayByMail: true
 *                           PayByPhone: true
 *                           PayOnline: true
 *                           PaySite: www.paymesucka.com/now
 *                           PhoneLocal: 123-456-78
 *                           PhoneTollFree: 789-654-32
 *                           VisaAccepted: true
 *                         ClientProvidedSpecSheet: false
 *                         DataCrosswalkProvided: false
 *                         DataFileProvided: false
 *                         ExtractErrors: true
 *                         Facility_GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                         HoldErrors: false
 *                         LockboxIntegration: true
 *                         Logos:
 *                           GUID: 9355A342-17B3-4164-A0E8-69D732030171
 *                           Location: C:\clients\P\PFS_zAdena\Logos\THEadena.jpg
 *                         PDFFileProvided: false
 *                         Reports:
 *                           FacilityPDFs: false
 *                           FacilityReport: false
 *                           GUID: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                           MovesReport: false
 *                           NonCassReport: false
 *                           PrintPDFs: false
 *                           SummaryReport: false
 *                           SuppressionReport: false
 *                           UndeliverablesReport: false
 *                         Software: software012
 *               examples:
 *                 '200':
 *                   value:
 *                     Specs:
 *                       - APIAvailable: false
 *                         Channels:
 *                           AmericanExpressAccepted: true
 *                           DiscoverAccepted: true
 *                           GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                           MailPaymentsTo: some new address
 *                           MasterCardAccepted: true
 *                           OtherAccepted: NA
 *                           PayByIVR: false
 *                           PayByMail: true
 *                           PayByPhone: true
 *                           PayOnline: true
 *                           PaySite: www.paymesucka.com/now
 *                           PhoneLocal: 123-456-78
 *                           PhoneTollFree: 789-654-32
 *                           VisaAccepted: true
 *                         ClientProvidedSpecSheet: false
 *                         DataCrosswalkProvided: false
 *                         DataFileProvided: false
 *                         ExtractErrors: true
 *                         Facility_GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                         HoldErrors: false
 *                         LockboxIntegration: true
 *                         Logos:
 *                           GUID: 9355A342-17B3-4164-A0E8-69D732030171
 *                           Location: C:\clients\P\PFS_zAdena\Logos\THEadena.jpg
 *                         PDFFileProvided: false
 *                         Reports:
 *                           FacilityPDFs: false
 *                           FacilityReport: false
 *                           GUID: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                           MovesReport: false
 *                           NonCassReport: false
 *                           PrintPDFs: false
 *                           SummaryReport: false
 *                           SuppressionReport: false
 *                           UndeliverablesReport: false
 *                         Software: software012
 */
router.get("/:specid", checkReach, dboperations.one_spec);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}:
 *     patch:
 *       tags:
 *         - Specs
 *       summary: Update spec by specid
 *       description: Update spec by specid
 *       operationId: updateSpecBySpecid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Specs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       APIAvailable:
 *                         type: boolean
 *                         example: false
 *                       ClientProvidedSpecSheet:
 *                         type: boolean
 *                         example: false
 *                       DataCrosswalkProvided:
 *                         type: boolean
 *                         example: false
 *                       DataFileProvided:
 *                         type: boolean
 *                         example: false
 *                       ExtractErrors:
 *                         type: boolean
 *                         example: true
 *                       HoldErrors:
 *                         type: boolean
 *                         example: false
 *                       LockboxIntegration:
 *                         type: boolean
 *                         example: true
 *                       PDFFileProvided:
 *                         type: boolean
 *                         example: false
 *                       Software:
 *                         type: string
 *                         example: software015
 *                   example:
 *                     - APIAvailable: false
 *                       ClientProvidedSpecSheet: false
 *                       DataCrosswalkProvided: false
 *                       DataFileProvided: false
 *                       ExtractErrors: true
 *                       HoldErrors: false
 *                       LockboxIntegration: true
 *                       PDFFileProvided: false
 *                       Software: software015
 *             example:
 *               Specs:
 *                 - APIAvailable: false
 *                   ClientProvidedSpecSheet: false
 *                   DataCrosswalkProvided: false
 *                   DataFileProvided: false
 *                   ExtractErrors: true
 *                   HoldErrors: false
 *                   LockboxIntegration: true
 *                   PDFFileProvided: false
 *                   Software: software015
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Specs:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         GUID:
 *                           type: string
 *                           example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                         Software:
 *                           type: string
 *                           example: software015
 *                     example:
 *                       - GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                         Software: software015
 *               examples:
 *                 '200':
 *                   value:
 *                     Specs:
 *                       - GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                         Software: software015
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
 *       - name: specid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 */
router.patch("/:specid", checkReach, dboperations.update_spec);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs:
 *     post:
 *       tags:
 *         - Specs
 *       summary: Create specs for facility
 *       description: Create specs for facility
 *       operationId: '2'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Specs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       APIAvailable:
 *                         type: boolean
 *                         example: false
 *                       Channels:
 *                         type: object
 *                         properties:
 *                           AmericanExpress:
 *                             type: boolean
 *                             example: true
 *                           Discover:
 *                             type: boolean
 *                             example: true
 *                           IVRPayments:
 *                             type: boolean
 *                             example: false
 *                           IVRPhone:
 *                             nullable: true
 *                             example: null
 *                           MailPayments:
 *                             type: boolean
 *                             example: true
 *                           MailTo:
 *                             type: string
 *                             example: some physical address
 *                           MasterCard:
 *                             type: boolean
 *                             example: true
 *                           OnlinePayments:
 *                             type: boolean
 *                             example: true
 *                           OnlineSite:
 *                             type: string
 *                             example: www.paymesucka.com/now
 *                           OtherAccepted:
 *                             type: string
 *                             example: NA
 *                           OtherChannels:
 *                             nullable: true
 *                             example: null
 *                           PhoneLocal:
 *                             type: string
 *                             example: 123-456-7890
 *                           PhonePayments:
 *                             type: boolean
 *                             example: true
 *                           PhoneTollFree:
 *                             type: string
 *                             example: 789-654-3210
 *                           Visa:
 *                             type: boolean
 *                             example: true
 *                       ClientProvidedSpecSheet:
 *                         type: boolean
 *                         example: false
 *                       DataCrosswalkProvided:
 *                         type: boolean
 *                         example: false
 *                       DataFileProvided:
 *                         type: boolean
 *                         example: false
 *                       ExtractErrors:
 *                         type: boolean
 *                         example: true
 *                       HoldErrors:
 *                         type: boolean
 *                         example: false
 *                       LockboxIntegration:
 *                         type: boolean
 *                         example: true
 *                       Logos:
 *                         type: object
 *                         properties:
 *                           Location:
 *                             type: string
 *                             example: C:\clients\P\PFS_zAdena\Logos\THEadena.jpg
 *                       PDFFileProvided:
 *                         type: boolean
 *                         example: false
 *                       Reports:
 *                         type: object
 *                         properties:
 *                           FacilityPDFs:
 *                             type: boolean
 *                             example: false
 *                           FacilityReport:
 *                             type: boolean
 *                             example: false
 *                           MovesReport:
 *                             type: boolean
 *                             example: false
 *                           NonCassReport:
 *                             type: boolean
 *                             example: false
 *                           PrintPDFs:
 *                             type: boolean
 *                             example: false
 *                           SummaryReport:
 *                             type: boolean
 *                             example: false
 *                           SuppressionReport:
 *                             type: boolean
 *                             example: false
 *                           UndeliverablesReport:
 *                             type: boolean
 *                             example: false
 *                       Software:
 *                         type: string
 *                         example: software012
 *                   example:
 *                     - APIAvailable: false
 *                       Channels:
 *                         AmericanExpress: true
 *                         Discover: true
 *                         IVRPayments: false
 *                         IVRPhone: null
 *                         MailPayments: true
 *                         MailTo: some physical address
 *                         MasterCard: true
 *                         OnlinePayments: true
 *                         OnlineSite: www.paymesucka.com/now
 *                         OtherAccepted: NA
 *                         OtherChannels: null
 *                         PhoneLocal: 123-456-7890
 *                         PhonePayments: true
 *                         PhoneTollFree: 789-654-3210
 *                         Visa: true
 *                       ClientProvidedSpecSheet: false
 *                       DataCrosswalkProvided: false
 *                       DataFileProvided: false
 *                       ExtractErrors: true
 *                       HoldErrors: false
 *                       LockboxIntegration: true
 *                       Logos:
 *                         Location: C:\clients\P\PFS_zAdena\Logos\THEadena.jpg
 *                       PDFFileProvided: false
 *                       Reports:
 *                         FacilityPDFs: false
 *                         FacilityReport: false
 *                         MovesReport: false
 *                         NonCassReport: false
 *                         PrintPDFs: false
 *                         SummaryReport: false
 *                         SuppressionReport: false
 *                         UndeliverablesReport: false
 *                       Software: software012
 *             example:
 *               Specs:
 *                 - APIAvailable: false
 *                   Channels:
 *                     AmericanExpress: true
 *                     Discover: true
 *                     IVRPayments: false
 *                     IVRPhone: null
 *                     MailPayments: true
 *                     MailTo: some physical address
 *                     MasterCard: true
 *                     OnlinePayments: true
 *                     OnlineSite: www.paymesucka.com/now
 *                     OtherAccepted: NA
 *                     OtherChannels: null
 *                     PhoneLocal: 123-456-7890
 *                     PhonePayments: true
 *                     PhoneTollFree: 789-654-3210
 *                     Visa: true
 *                   ClientProvidedSpecSheet: false
 *                   DataCrosswalkProvided: false
 *                   DataFileProvided: false
 *                   ExtractErrors: true
 *                   HoldErrors: false
 *                   LockboxIntegration: true
 *                   Logos:
 *                     Location: C:\clients\P\PFS_zAdena\Logos\THEadena.jpg
 *                   PDFFileProvided: false
 *                   Reports:
 *                     FacilityPDFs: false
 *                     FacilityReport: false
 *                     MovesReport: false
 *                     NonCassReport: false
 *                     PrintPDFs: false
 *                     SummaryReport: false
 *                     SuppressionReport: false
 *                     UndeliverablesReport: false
 *                   Software: software012
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
 *       - name: facilityid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 1f80ff20-5afc-44d5-9407-910ab3c63eca
 */
router.post("/", checkReach, authLvl, validateDto(specDto), dboperations.create_spec);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}:
 *     delete:
 *       tags:
 *         - Specs
 *       summary: Delete spec by specid
 *       description: Delete spec by specid
 *       operationId: deleteSpecBySpecid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Specs:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         Facility_GUID:
 *                           type: string
 *                           example: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         GUID:
 *                           type: string
 *                           example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                     example:
 *                       - Active: false
 *                         Facility_GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *               examples:
 *                 '200':
 *                   value:
 *                     Specs:
 *                       - Active: false
 *                         Facility_GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 */
router.delete("/:specid", checkReach, authLvl, dboperations.delete_spec);

module.exports = router;
