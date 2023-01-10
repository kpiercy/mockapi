require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const channelDto = require('../schemas/channels')

//child routes

//controller
const dboperations = require("../controllers/paychannels");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all paychannels for this job
//router.get("/", checkReach, dboperations.all_paychannels);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/channels/{channelid}:
 *     get:
 *       tags:
 *         - Channels
 *       summary: Get channels by channelid
 *       description: Get channels by channelid
 *       operationId: getChannelsByChannelid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Channels:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AmericanExpress:
 *                           type: boolean
 *                           example: true
 *                         Discover:
 *                           type: boolean
 *                           example: true
 *                         Facility_GUID:
 *                           type: string
 *                           example: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         GUID:
 *                           type: string
 *                           example: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                         IVRPayments:
 *                           type: boolean
 *                           example: false
 *                         MailPayments:
 *                           type: boolean
 *                           example: true
 *                         MailTo:
 *                           type: string
 *                           example: some new address
 *                         MasterCard:
 *                           type: boolean
 *                           example: true
 *                         OnlinePayments:
 *                           type: boolean
 *                           example: true
 *                         OtherAccepted:
 *                           type: string
 *                           example: NA
 *                         PaySite:
 *                           type: string
 *                           example: www.paymesucka.com/now
 *                         PhoneLocal:
 *                           type: string
 *                           example: 123-456-78
 *                         PhonePayments:
 *                           type: boolean
 *                           example: true
 *                         PhoneTollFree:
 *                           type: string
 *                           example: 789-654-32
 *                         Spec_GUID:
 *                           type: string
 *                           example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                         Visa:
 *                           type: boolean
 *                           example: true
 *                     example:
 *                       - AmericanExpress: true
 *                         Discover: true
 *                         Facility_GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                         IVRPayments: false
 *                         MailPayments: true
 *                         MailTo: some new address
 *                         MasterCard: true
 *                         OnlinePayments: true
 *                         OtherAccepted: NA
 *                         PaySite: www.paymesucka.com/now
 *                         PhoneLocal: 123-456-78
 *                         PhonePayments: true
 *                         PhoneTollFree: 789-654-32
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                         Visa: true
 *               examples:
 *                 '200':
 *                   value:
 *                     Channels:
 *                       - AmericanExpress: true
 *                         Discover: true
 *                         Facility_GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                         IVRPayments: false
 *                         MailPayments: true
 *                         MailTo: some new address
 *                         MasterCard: true
 *                         OnlinePayments: true
 *                         OtherAccepted: NA
 *                         PaySite: www.paymesucka.com/now
 *                         PhoneLocal: 123-456-78
 *                         PhonePayments: true
 *                         PhoneTollFree: 789-654-32
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                         Visa: true
 */
router.get("/:paychannelid", checkReach, dboperations.one_paychannel);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/channels/{channelid}:
 *     patch:
 *       tags:
 *         - Channels
 *       summary: Update channels by channelid
 *       description: Update channels by channelid
 *       operationId: updateChannelsByChannelid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Channels:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AmericanExpress:
 *                         type: boolean
 *                         example: true
 *                       Discover:
 *                         type: boolean
 *                         example: true
 *                       IVRPayments:
 *                         type: boolean
 *                         example: false
 *                       IVRPhone:
 *                         nullable: true
 *                         example: null
 *                       MailPayments:
 *                         type: boolean
 *                         example: true
 *                       MailTo:
 *                         type: string
 *                         example: some new address
 *                       MasterCard:
 *                         type: boolean
 *                         example: true
 *                       OnlinePayments:
 *                         type: boolean
 *                         example: true
 *                       OnlineSite:
 *                         type: string
 *                         example: www.paymeupdatedSite.com/now
 *                       OtherAccepted:
 *                         type: string
 *                         example: NA
 *                       OtherChannels:
 *                         nullable: true
 *                         example: null
 *                       PhoneLocal:
 *                         type: string
 *                         example: 123-456-7890
 *                       PhonePayments:
 *                         type: boolean
 *                         example: true
 *                       PhoneTollFree:
 *                         type: string
 *                         example: 789-654-3210
 *                       Visa:
 *                         type: boolean
 *                         example: true
 *                   example:
 *                     - AmericanExpress: true
 *                       Discover: true
 *                       IVRPayments: false
 *                       IVRPhone: null
 *                       MailPayments: true
 *                       MailTo: some new address
 *                       MasterCard: true
 *                       OnlinePayments: true
 *                       OnlineSite: www.paymeupdatedSite.com/now
 *                       OtherAccepted: NA
 *                       OtherChannels: null
 *                       PhoneLocal: 123-456-7890
 *                       PhonePayments: true
 *                       PhoneTollFree: 789-654-3210
 *                       Visa: true
 *             example:
 *               Channels:
 *                 - AmericanExpress: true
 *                   Discover: true
 *                   IVRPayments: false
 *                   IVRPhone: null
 *                   MailPayments: true
 *                   MailTo: some new address
 *                   MasterCard: true
 *                   OnlinePayments: true
 *                   OnlineSite: www.paymeupdatedSite.com/now
 *                   OtherAccepted: NA
 *                   OtherChannels: null
 *                   PhoneLocal: 123-456-7890
 *                   PhonePayments: true
 *                   PhoneTollFree: 789-654-3210
 *                   Visa: true
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Channels:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AmericanExpress:
 *                           type: boolean
 *                           example: true
 *                         Discover:
 *                           type: boolean
 *                           example: true
 *                         Facility_GUID:
 *                           type: string
 *                           example: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         GUID:
 *                           type: string
 *                           example: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                         IVRPayments:
 *                           type: boolean
 *                           example: false
 *                         IVRPhone:
 *                           nullable: true
 *                           example: null
 *                         MailPayments:
 *                           type: boolean
 *                           example: true
 *                         MailTo:
 *                           type: string
 *                           example: some new address
 *                         MasterCard:
 *                           type: boolean
 *                           example: true
 *                         OnlinePayments:
 *                           type: boolean
 *                           example: true
 *                         OtherAccepted:
 *                           type: string
 *                           example: NA
 *                         OtherChannels:
 *                           nullable: true
 *                           example: null
 *                         PaySite:
 *                           type: string
 *                           example: www.paymeupdatedSite.com/now
 *                         PhoneLocal:
 *                           type: string
 *                           example: 123-456-78
 *                         PhonePayments:
 *                           type: boolean
 *                           example: true
 *                         PhoneTollFree:
 *                           type: string
 *                           example: 789-654-32
 *                         Spec_GUID:
 *                           type: string
 *                           example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                         Visa:
 *                           type: boolean
 *                           example: true
 *                     example:
 *                       - AmericanExpress: true
 *                         Discover: true
 *                         Facility_GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                         IVRPayments: false
 *                         IVRPhone: null
 *                         MailPayments: true
 *                         MailTo: some new address
 *                         MasterCard: true
 *                         OnlinePayments: true
 *                         OtherAccepted: NA
 *                         OtherChannels: null
 *                         PaySite: www.paymeupdatedSite.com/now
 *                         PhoneLocal: 123-456-78
 *                         PhonePayments: true
 *                         PhoneTollFree: 789-654-32
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                         Visa: true
 *               examples:
 *                 '200':
 *                   value:
 *                     Channels:
 *                       - AmericanExpress: true
 *                         Discover: true
 *                         Facility_GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                         GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                         IVRPayments: false
 *                         IVRPhone: null
 *                         MailPayments: true
 *                         MailTo: some new address
 *                         MasterCard: true
 *                         OnlinePayments: true
 *                         OtherAccepted: NA
 *                         OtherChannels: null
 *                         PaySite: www.paymeupdatedSite.com/now
 *                         PhoneLocal: 123-456-78
 *                         PhonePayments: true
 *                         PhoneTollFree: 789-654-32
 *                         Spec_GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                         Visa: true
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
 *       - name: channelid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: c696b0ac-5be6-4a91-97ab-a53d31bd3926
 */
router.patch("/:paychannelid", checkReach, dboperations.update_paychannel);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/facilities/{facilityid}/specs/{specid}/channels:
 *     post:
 *       tags:
 *         - Channels
 *       summary: Create paychannels for a facility spec
 *       description: Create paychannels for a facility spec
 *       operationId: '6'
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Channels:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AmericanExpress:
 *                         type: boolean
 *                         example: true
 *                       Discover:
 *                         type: boolean
 *                         example: true
 *                       Facility_GUID:
 *                         type: string
 *                         example: 1f80ff20-5afc-44d5-9407-910ab3c63eca
 *                       IVRPayments:
 *                         type: boolean
 *                         example: false
 *                       IVRPhone:
 *                         nullable: true
 *                         example: null
 *                       MailPayments:
 *                         type: boolean
 *                         example: true
 *                       MailTo:
 *                         type: string
 *                         example: some physical address
 *                       MasterCard:
 *                         type: boolean
 *                         example: true
 *                       OnlinePayments:
 *                         type: boolean
 *                         example: true
 *                       OtherAccepted:
 *                         type: string
 *                         example: NA
 *                       OtherChannels:
 *                         nullable: true
 *                         example: null
 *                       PaySite:
 *                         type: string
 *                         example: www.paymesucka.com/now
 *                       PhoneLocal:
 *                         type: string
 *                         example: 123-456-7890
 *                       PhonePayments:
 *                         type: boolean
 *                         example: true
 *                       PhoneTollFree:
 *                         type: string
 *                         example: 789-654-3210
 *                       Spec_GUID:
 *                         type: string
 *                         example: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *                       Visa:
 *                         type: boolean
 *                         example: true
 *                   example:
 *                     - AmericanExpress: true
 *                       Discover: true
 *                       Facility_GUID: 1f80ff20-5afc-44d5-9407-910ab3c63eca
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
 *                       Spec_GUID: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *                       Visa: true
 *             example:
 *               Channels:
 *                 - AmericanExpress: true
 *                   Discover: true
 *                   Facility_GUID: 1f80ff20-5afc-44d5-9407-910ab3c63eca
 *                   IVRPayments: false
 *                   IVRPhone: null
 *                   MailPayments: true
 *                   MailTo: some physical address
 *                   MasterCard: true
 *                   OnlinePayments: true
 *                   OtherAccepted: NA
 *                   OtherChannels: null
 *                   PaySite: www.paymesucka.com/now
 *                   PhoneLocal: 123-456-7890
 *                   PhonePayments: true
 *                   PhoneTollFree: 789-654-3210
 *                   Spec_GUID: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 *                   Visa: true
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
 *       - name: specid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: e3f4c842-623b-4e7d-a049-11c51e19d6fb
 */
router.post("/", checkReach, authLvl, validateDto(channelDto), dboperations.create_paychannel);

//delete paychannel for this job
router.delete("/:paychannelid", checkReach, authLvl, dboperations.delete_paychannel);

module.exports = router;
