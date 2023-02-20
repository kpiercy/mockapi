require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')
const validateDto = require('../middleware/validateDto')
const jobDto = require('../schemas/jobs')

//child routes
const fileRoutes = require('./files')
const downloadRoutes = require('./downloads')
const returnRoutes = require('./returns')
const contactRoutes = require('./contacts')
const orbipayRoutes = require('./orbipays')
const proofRoutes = require('./proofs')
const processRoutes = require('./processes')
const workflowRoutes = require('./workflows')
const facilityRoutes = require('./facilities')
const orderRoutes = require('./orders')
const changeRoutes = require('./changes')

//controller
const dboperations = require('../controllers/jobs')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use('/:jobid/facilities', facilityRoutes)
router.use('/:jobid/orders', orderRoutes)
router.use('/:jobid/files', fileRoutes)
router.use('/:jobid/downloads', downloadRoutes)
router.use('/:jobid/returns', returnRoutes)
router.use('/:jobid/contacts', contactRoutes)
router.use('/:jobid/orbipays', orbipayRoutes) //convert to be a job of Client rather than standalone route
router.use('/:jobid/proofs', proofRoutes)
router.use('/:jobid/processes', processRoutes)
router.use('/:jobid/workflows', workflowRoutes)
router.use('/:jobid/changes', changeRoutes)

/**
 * @swagger
 *   /clients/{clientid}/jobs:
 *     get:
 *       tags:
 *         - Jobs
 *       summary: Get all jobs by clientid
 *       description: Get all jobs by clientid
 *       operationId: getAllJobsByClientid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Jobs:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Client_GUID:
 *                           type: string
 *                           example: 1DDA9E6B-6A49-44C9-B23A-C399E264B77A
 *                         Facilities:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               Facility:
 *                                 type: string
 *                                 example: RWJEBC
 *                               GUID:
 *                                 type: string
 *                                 example: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                               Orders:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     AutoMonthlyOrders:
 *                                       type: boolean
 *                                       example: true
 *                                     AutoOrders:
 *                                       type: boolean
 *                                       example: true
 *                                     BillLogic:
 *                                       type: number
 *                                       example: 1
 *                                     CurrentOrder:
 *                                       type: string
 *                                       example: '1612'
 *                                     GUID:
 *                                       type: string
 *                                       example: 6C0661BB-F80E-4859-89B8-362B987DFDAD
 *                                     TemplateNumber:
 *                                       type: string
 *                                       example: tempOrderNum
 *                                     TemplateVersion:
 *                                       type: number
 *                                       example: 0
 *                                 example:
 *                                   - AutoMonthlyOrders: true
 *                                     AutoOrders: true
 *                                     BillLogic: 1
 *                                     CurrentOrder: '1612'
 *                                     GUID: 6C0661BB-F80E-4859-89B8-362B987DFDAD
 *                                     TemplateNumber: tempOrderNum
 *                                     TemplateVersion: 0
 *                               Specs:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     APIEnabled:
 *                                       type: boolean
 *                                       example: false
 *                                     CrosswalkProvided:
 *                                       type: boolean
 *                                       example: false
 *                                     ExtractIssues:
 *                                       type: boolean
 *                                       example: true
 *                                     GUID:
 *                                       type: string
 *                                       example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                                     HoldIssues:
 *                                       type: boolean
 *                                       example: false
 *                                     PayChannels:
 *                                       type: object
 *                                       properties:
 *                                         AmericanExpressAccepted:
 *                                           type: boolean
 *                                           example: true
 *                                         DiscoverAccepted:
 *                                           type: boolean
 *                                           example: true
 *                                         GUID:
 *                                           type: string
 *                                           example: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                                         MasterCardAccepted:
 *                                           type: boolean
 *                                           example: true
 *                                         VisaAccepted:
 *                                           type: boolean
 *                                           example: true
 *                                     Reporting:
 *                                       type: object
 *                                       properties:
 *                                         GUID:
 *                                           type: string
 *                                           example: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                                         ReturnFacilityPDFs:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnFacilityRpt:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnMovesRpt:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnNonCassRpt:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnPrintPDFs:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnSummaryRpt:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnSuppressionsRpt:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnUndeliverableRpt:
 *                                           type: boolean
 *                                           example: false
 *                                     SoftwareUsed:
 *                                       type: string
 *                                       example: software012
 *                                     isDataJob:
 *                                       type: boolean
 *                                       example: false
 *                                     isLockboxIntegrated:
 *                                       type: boolean
 *                                       example: true
 *                                     isPDFJob:
 *                                       type: boolean
 *                                       example: false
 *                                 example:
 *                                   - APIEnabled: false
 *                                     CrosswalkProvided: false
 *                                     ExtractIssues: true
 *                                     GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                                     HoldIssues: false
 *                                     PayChannels:
 *                                       AmericanExpressAccepted: true
 *                                       DiscoverAccepted: true
 *                                       GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                                       MasterCardAccepted: true
 *                                       VisaAccepted: true
 *                                     Reporting:
 *                                       GUID: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                                       ReturnFacilityPDFs: false
 *                                       ReturnFacilityRpt: false
 *                                       ReturnMovesRpt: false
 *                                       ReturnNonCassRpt: false
 *                                       ReturnPrintPDFs: false
 *                                       ReturnSummaryRpt: false
 *                                       ReturnSuppressionsRpt: false
 *                                       ReturnUndeliverableRpt: false
 *                                     SoftwareUsed: software012
 *                                     isDataJob: false
 *                                     isLockboxIntegrated: true
 *                                     isPDFJob: false
 *                           example:
 *                             - Facility: RWJEBC
 *                               GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                               Orders:
 *                                 - AutoMonthlyOrders: true
 *                                   AutoOrders: true
 *                                   BillLogic: 1
 *                                   CurrentOrder: '1612'
 *                                   GUID: 6C0661BB-F80E-4859-89B8-362B987DFDAD
 *                                   TemplateNumber: tempOrderNum
 *                                   TemplateVersion: 0
 *                               Specs:
 *                                 - APIEnabled: false
 *                                   CrosswalkProvided: false
 *                                   ExtractIssues: true
 *                                   GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                                   HoldIssues: false
 *                                   PayChannels:
 *                                     AmericanExpressAccepted: true
 *                                     DiscoverAccepted: true
 *                                     GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                                     MasterCardAccepted: true
 *                                     VisaAccepted: true
 *                                   Reporting:
 *                                     GUID: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                                     ReturnFacilityPDFs: false
 *                                     ReturnFacilityRpt: false
 *                                     ReturnMovesRpt: false
 *                                     ReturnNonCassRpt: false
 *                                     ReturnPrintPDFs: false
 *                                     ReturnSummaryRpt: false
 *                                     ReturnSuppressionsRpt: false
 *                                     ReturnUndeliverableRpt: false
 *                                   SoftwareUsed: software012
 *                                   isDataJob: false
 *                                   isLockboxIntegrated: true
 *                                   isPDFJob: false
 *                         GUID:
 *                           type: string
 *                           example: D58F9D23-7AB1-41A8-91E8-38F640BC4A88
 *                         Invoices:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               GUID:
 *                                 type: string
 *                                 example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                               InvoiceNumber:
 *                                 type: string
 *                                 example: '188111'
 *                               OrderID:
 *                                 type: number
 *                                 example: 123456
 *                               PeriodDesc:
 *                                 type: string
 *                                 example: zAdena - November 2022
 *                               PeriodEnd:
 *                                 type: string
 *                                 example: '2022-11-30T00:00:00'
 *                               PeriodStart:
 *                                 type: string
 *                                 example: '2022-11-01T00:00:00'
 *                               PostageTotalDue:
 *                                 type: number
 *                                 example: 509.49
 *                               ServicesTotalDue:
 *                                 type: number
 *                                 example: 185.573
 *                               TaxesTotalDue:
 *                                 type: number
 *                                 example: 0
 *                           example:
 *                             - GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                               InvoiceNumber: '188111'
 *                               OrderID: 123456
 *                               PeriodDesc: zAdena - November 2022
 *                               PeriodEnd: '2022-11-30T00:00:00'
 *                               PeriodStart: '2022-11-01T00:00:00'
 *                               PostageTotalDue: 509.49
 *                               ServicesTotalDue: 185.573
 *                               TaxesTotalDue: 0
 *                         Name:
 *                           type: string
 *                           example: zPFS RockinHospital
 *                         OrbiPayments:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               FileID:
 *                                 type: string
 *                                 example: '123'
 *                               GUID:
 *                                 type: string
 *                                 example: 840E1362-BC9F-4749-B6A3-70D0A22DD333
 *                               JobName:
 *                                 type: string
 *                                 example: zAdena DAF
 *                               PartnerID:
 *                                 type: string
 *                                 example: '123456789'
 *                               Status:
 *                                 type: string
 *                                 example: Hold
 *                               Type:
 *                                 type: string
 *                                 example: DAF
 *                           example:
 *                             - GUID: 840E1362-BC9F-4749-B6A3-70D0A22DD333
 *                               JobName: zAdena DAF
 *                               PartnerID: '123456789'
 *                               Status: Hold
 *                               Type: DAF
 *                             - FileID: '123'
 *                               GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                               JobName: I updated the name
 *                               PartnerID: '1234567'
 *                               Status: Active
 *                               Type: amfINV
 *                             - FileID: '456'
 *                               GUID: 12752C0C-DD9C-4843-B824-4D5411603AD6
 *                               JobName: zAdena Statements
 *                               PartnerID: '1234567'
 *                               Status: Active
 *                               Type: newTYPE
 *                             - FileID: '123'
 *                               GUID: 0FF743DF-8419-4F0C-843F-3823DF61632D
 *                               JobName: zAdena Statements
 *                               PartnerID: '1234567'
 *                               Status: Active
 *                               Type: amfINV
 *                         Processes:
 *                           type: object
 *                           properties:
 *                             AutoMoves:
 *                               type: boolean
 *                               example: true
 *                             ChainJob:
 *                               type: boolean
 *                               example: false
 *                             DaysProcessed:
 *                               type: string
 *                               example: '1234567'
 *                             ErrorsBypassed:
 *                               type: boolean
 *                               example: false
 *                             FilesReqdForProcesses:
 *                               type: number
 *                               example: 1
 *                             GAReady:
 *                               type: boolean
 *                               example: true
 *                             GUID:
 *                               type: string
 *                               example: 3778EF2B-085A-47B1-839A-2C0F94559E2D
 *                             MasterEnabled:
 *                               type: boolean
 *                               example: false
 *                             ParseMessage:
 *                               type: string
 *                               example: Successfully parsed Adena
 *                             PresortPageNum:
 *                               type: number
 *                               example: 1
 *                             PrintMessage:
 *                               type: string
 *                               example: Successfully printed Adena
 *                             RanToday:
 *                               type: boolean
 *                               example: false
 *                             ReadyForProcesses:
 *                               type: boolean
 *                               example: false
 *                             ReqUnzip:
 *                               type: boolean
 *                               example: false
 *                             RunOncePerDay:
 *                               type: boolean
 *                               example: false
 *                             TimeBased:
 *                               type: boolean
 *                               example: false
 *                             Wait:
 *                               type: number
 *                               example: 20
 *                         RootPath:
 *                           type: string
 *                           example: C:\clients\P\PFS RockinHospital
 *                     example:
 *                       - Client_GUID: 1DDA9E6B-6A49-44C9-B23A-C399E264B77A
 *                         GUID: D58F9D23-7AB1-41A8-91E8-38F640BC4A88
 *                         Name: zPFS RockinHospital
 *                         RootPath: C:\clients\P\PFS RockinHospital
 *                       - Client_GUID: EEF6168F-10F2-4C6A-A456-F756F36808A8
 *                         GUID: 3AAD5759-477E-4DE8-BF5A-530F4A21E5D5
 *                         Name: zPFS Barnabas
 *                         Processes:
 *                           AutoMoves: true
 *                           ChainJob: false
 *                           DaysProcessed: '1234567'
 *                           ErrorsBypassed: false
 *                           FilesReqdForProcesses: 1
 *                           GAReady: true
 *                           GUID: 3778EF2B-085A-47B1-839A-2C0F94559E2D
 *                           MasterEnabled: false
 *                           ParseMessage: Successfully parsed Adena
 *                           PresortPageNum: 1
 *                           PrintMessage: Successfully printed Adena
 *                           RanToday: false
 *                           ReadyForProcesses: false
 *                           ReqUnzip: false
 *                           RunOncePerDay: false
 *                           TimeBased: false
 *                           Wait: 20
 *                         RootPath: C:\clients\P\PFS Barnabas
 *                       - Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Facilities:
 *                           - Facility: RWJEBC
 *                             GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                             Orders:
 *                               - AutoMonthlyOrders: true
 *                                 AutoOrders: true
 *                                 BillLogic: 1
 *                                 CurrentOrder: '1612'
 *                                 GUID: 6C0661BB-F80E-4859-89B8-362B987DFDAD
 *                                 TemplateNumber: tempOrderNum
 *                                 TemplateVersion: 0
 *                             Specs:
 *                               - APIEnabled: false
 *                                 CrosswalkProvided: false
 *                                 ExtractIssues: true
 *                                 GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                                 HoldIssues: false
 *                                 PayChannels:
 *                                   AmericanExpressAccepted: true
 *                                   DiscoverAccepted: true
 *                                   GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                                   MasterCardAccepted: true
 *                                   VisaAccepted: true
 *                                 Reporting:
 *                                   GUID: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                                   ReturnFacilityPDFs: false
 *                                   ReturnFacilityRpt: false
 *                                   ReturnMovesRpt: false
 *                                   ReturnNonCassRpt: false
 *                                   ReturnPrintPDFs: false
 *                                   ReturnSummaryRpt: false
 *                                   ReturnSuppressionsRpt: false
 *                                   ReturnUndeliverableRpt: false
 *                                 SoftwareUsed: software012
 *                                 isDataJob: false
 *                                 isLockboxIntegrated: true
 *                                 isPDFJob: false
 *                         GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         Invoices:
 *                           - GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                             InvoiceNumber: '188111'
 *                             OrderID: 123456
 *                             PeriodDesc: zAdena - November 2022
 *                             PeriodEnd: '2022-11-30T00:00:00'
 *                             PeriodStart: '2022-11-01T00:00:00'
 *                             PostageTotalDue: 509.49
 *                             ServicesTotalDue: 185.573
 *                             TaxesTotalDue: 0
 *                         Name: zPFS Adena
 *                         OrbiPayments:
 *                           - GUID: 840E1362-BC9F-4749-B6A3-70D0A22DD333
 *                             JobName: zAdena DAF
 *                             PartnerID: '123456789'
 *                             Status: Hold
 *                             Type: DAF
 *                           - FileID: '123'
 *                             GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                             JobName: I updated the name
 *                             PartnerID: '1234567'
 *                             Status: Active
 *                             Type: amfINV
 *                           - FileID: '456'
 *                             GUID: 12752C0C-DD9C-4843-B824-4D5411603AD6
 *                             JobName: zAdena Statements
 *                             PartnerID: '1234567'
 *                             Status: Active
 *                             Type: newTYPE
 *                           - FileID: '123'
 *                             GUID: 0FF743DF-8419-4F0C-843F-3823DF61632D
 *                             JobName: zAdena Statements
 *                             PartnerID: '1234567'
 *                             Status: Active
 *                             Type: amfINV
 *                         RootPath: C:\clients\P\PFS Adena
 *               examples:
 *                 '200':
 *                   value:
 *                     Jobs:
 *                       - Client_GUID: 1DDA9E6B-6A49-44C9-B23A-C399E264B77A
 *                         GUID: D58F9D23-7AB1-41A8-91E8-38F640BC4A88
 *                         Name: zPFS RockinHospital
 *                         RootPath: C:\clients\P\PFS RockinHospital
 *                       - Client_GUID: EEF6168F-10F2-4C6A-A456-F756F36808A8
 *                         GUID: 3AAD5759-477E-4DE8-BF5A-530F4A21E5D5
 *                         Name: zPFS Barnabas
 *                         Processes:
 *                           AutoMoves: true
 *                           ChainJob: false
 *                           DaysProcessed: '1234567'
 *                           ErrorsBypassed: false
 *                           FilesReqdForProcesses: 1
 *                           GAReady: true
 *                           GUID: 3778EF2B-085A-47B1-839A-2C0F94559E2D
 *                           MasterEnabled: false
 *                           ParseMessage: Successfully parsed Adena
 *                           PresortPageNum: 1
 *                           PrintMessage: Successfully printed Adena
 *                           RanToday: false
 *                           ReadyForProcesses: false
 *                           ReqUnzip: false
 *                           RunOncePerDay: false
 *                           TimeBased: false
 *                           Wait: 20
 *                         RootPath: C:\clients\P\PFS Barnabas
 *                       - Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Facilities:
 *                           - Facility: RWJEBC
 *                             GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                             Orders:
 *                               - AutoMonthlyOrders: true
 *                                 AutoOrders: true
 *                                 BillLogic: 1
 *                                 CurrentOrder: '1612'
 *                                 GUID: 6C0661BB-F80E-4859-89B8-362B987DFDAD
 *                                 TemplateNumber: tempOrderNum
 *                                 TemplateVersion: 0
 *                             Specs:
 *                               - APIEnabled: false
 *                                 CrosswalkProvided: false
 *                                 ExtractIssues: true
 *                                 GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                                 HoldIssues: false
 *                                 PayChannels:
 *                                   AmericanExpressAccepted: true
 *                                   DiscoverAccepted: true
 *                                   GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                                   MasterCardAccepted: true
 *                                   VisaAccepted: true
 *                                 Reporting:
 *                                   GUID: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                                   ReturnFacilityPDFs: false
 *                                   ReturnFacilityRpt: false
 *                                   ReturnMovesRpt: false
 *                                   ReturnNonCassRpt: false
 *                                   ReturnPrintPDFs: false
 *                                   ReturnSummaryRpt: false
 *                                   ReturnSuppressionsRpt: false
 *                                   ReturnUndeliverableRpt: false
 *                                 SoftwareUsed: software012
 *                                 isDataJob: false
 *                                 isLockboxIntegrated: true
 *                                 isPDFJob: false
 *                         GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         Invoices:
 *                           - GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                             InvoiceNumber: '188111'
 *                             OrderID: 123456
 *                             PeriodDesc: zAdena - November 2022
 *                             PeriodEnd: '2022-11-30T00:00:00'
 *                             PeriodStart: '2022-11-01T00:00:00'
 *                             PostageTotalDue: 509.49
 *                             ServicesTotalDue: 185.573
 *                             TaxesTotalDue: 0
 *                         Name: zPFS Adena
 *                         OrbiPayments:
 *                           - GUID: 840E1362-BC9F-4749-B6A3-70D0A22DD333
 *                             JobName: zAdena DAF
 *                             PartnerID: '123456789'
 *                             Status: Hold
 *                             Type: DAF
 *                           - FileID: '123'
 *                             GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                             JobName: I updated the name
 *                             PartnerID: '1234567'
 *                             Status: Active
 *                             Type: amfINV
 *                           - FileID: '456'
 *                             GUID: 12752C0C-DD9C-4843-B824-4D5411603AD6
 *                             JobName: zAdena Statements
 *                             PartnerID: '1234567'
 *                             Status: Active
 *                             Type: newTYPE
 *                           - FileID: '123'
 *                             GUID: 0FF743DF-8419-4F0C-843F-3823DF61632D
 *                             JobName: zAdena Statements
 *                             PartnerID: '1234567'
 *                             Status: Active
 *                             Type: amfINV
 *                         RootPath: C:\clients\P\PFS Adena
 */
router.get('/', checkReach, dboperations.all_jobs) //authLvl????

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}:
 *     get:
 *       tags:
 *         - Jobs
 *       summary: Get job by jobid
 *       description: Get job by jobid
 *       operationId: getJobByJobid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Jobs:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Client_GUID:
 *                           type: string
 *                           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Facilities:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               Facility:
 *                                 type: string
 *                                 example: RWJEBC
 *                               GUID:
 *                                 type: string
 *                                 example: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                               Orders:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     AutoMonthlyOrders:
 *                                       type: boolean
 *                                       example: true
 *                                     AutoOrders:
 *                                       type: boolean
 *                                       example: true
 *                                     BillLogic:
 *                                       type: number
 *                                       example: 1
 *                                     CurrentOrder:
 *                                       type: string
 *                                       example: '1612'
 *                                     GUID:
 *                                       type: string
 *                                       example: 6C0661BB-F80E-4859-89B8-362B987DFDAD
 *                                     TemplateNumber:
 *                                       type: string
 *                                       example: tempOrderNum
 *                                     TemplateVersion:
 *                                       type: number
 *                                       example: 0
 *                                 example:
 *                                   - AutoMonthlyOrders: true
 *                                     AutoOrders: true
 *                                     BillLogic: 1
 *                                     CurrentOrder: '1612'
 *                                     GUID: 6C0661BB-F80E-4859-89B8-362B987DFDAD
 *                                     TemplateNumber: tempOrderNum
 *                                     TemplateVersion: 0
 *                               Specs:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     APIEnabled:
 *                                       type: boolean
 *                                       example: false
 *                                     CrosswalkProvided:
 *                                       type: boolean
 *                                       example: false
 *                                     ExtractIssues:
 *                                       type: boolean
 *                                       example: true
 *                                     GUID:
 *                                       type: string
 *                                       example: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                                     HoldIssues:
 *                                       type: boolean
 *                                       example: false
 *                                     PayChannels:
 *                                       type: object
 *                                       properties:
 *                                         AmericanExpressAccepted:
 *                                           type: boolean
 *                                           example: true
 *                                         DiscoverAccepted:
 *                                           type: boolean
 *                                           example: true
 *                                         GUID:
 *                                           type: string
 *                                           example: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                                         MasterCardAccepted:
 *                                           type: boolean
 *                                           example: true
 *                                         VisaAccepted:
 *                                           type: boolean
 *                                           example: true
 *                                     Reporting:
 *                                       type: object
 *                                       properties:
 *                                         GUID:
 *                                           type: string
 *                                           example: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                                         ReturnFacilityPDFs:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnFacilityRpt:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnMovesRpt:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnNonCassRpt:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnPrintPDFs:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnSummaryRpt:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnSuppressionsRpt:
 *                                           type: boolean
 *                                           example: false
 *                                         ReturnUndeliverableRpt:
 *                                           type: boolean
 *                                           example: false
 *                                     SoftwareUsed:
 *                                       type: string
 *                                       example: software012
 *                                     isDataJob:
 *                                       type: boolean
 *                                       example: false
 *                                     isLockboxIntegrated:
 *                                       type: boolean
 *                                       example: true
 *                                     isPDFJob:
 *                                       type: boolean
 *                                       example: false
 *                                 example:
 *                                   - APIEnabled: false
 *                                     CrosswalkProvided: false
 *                                     ExtractIssues: true
 *                                     GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                                     HoldIssues: false
 *                                     PayChannels:
 *                                       AmericanExpressAccepted: true
 *                                       DiscoverAccepted: true
 *                                       GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                                       MasterCardAccepted: true
 *                                       VisaAccepted: true
 *                                     Reporting:
 *                                       GUID: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                                       ReturnFacilityPDFs: false
 *                                       ReturnFacilityRpt: false
 *                                       ReturnMovesRpt: false
 *                                       ReturnNonCassRpt: false
 *                                       ReturnPrintPDFs: false
 *                                       ReturnSummaryRpt: false
 *                                       ReturnSuppressionsRpt: false
 *                                       ReturnUndeliverableRpt: false
 *                                     SoftwareUsed: software012
 *                                     isDataJob: false
 *                                     isLockboxIntegrated: true
 *                                     isPDFJob: false
 *                           example:
 *                             - Facility: RWJEBC
 *                               GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                               Orders:
 *                                 - AutoMonthlyOrders: true
 *                                   AutoOrders: true
 *                                   BillLogic: 1
 *                                   CurrentOrder: '1612'
 *                                   GUID: 6C0661BB-F80E-4859-89B8-362B987DFDAD
 *                                   TemplateNumber: tempOrderNum
 *                                   TemplateVersion: 0
 *                               Specs:
 *                                 - APIEnabled: false
 *                                   CrosswalkProvided: false
 *                                   ExtractIssues: true
 *                                   GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                                   HoldIssues: false
 *                                   PayChannels:
 *                                     AmericanExpressAccepted: true
 *                                     DiscoverAccepted: true
 *                                     GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                                     MasterCardAccepted: true
 *                                     VisaAccepted: true
 *                                   Reporting:
 *                                     GUID: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                                     ReturnFacilityPDFs: false
 *                                     ReturnFacilityRpt: false
 *                                     ReturnMovesRpt: false
 *                                     ReturnNonCassRpt: false
 *                                     ReturnPrintPDFs: false
 *                                     ReturnSummaryRpt: false
 *                                     ReturnSuppressionsRpt: false
 *                                     ReturnUndeliverableRpt: false
 *                                   SoftwareUsed: software012
 *                                   isDataJob: false
 *                                   isLockboxIntegrated: true
 *                                   isPDFJob: false
 *                         GUID:
 *                           type: string
 *                           example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         Invoices:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               ERP_OrderID:
 *                                 type: number
 *                                 example: 123456
 *                               GUID:
 *                                 type: string
 *                                 example: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                               InvoiceNumber:
 *                                 type: string
 *                                 example: '188111'
 *                               PeriodDesc:
 *                                 type: string
 *                                 example: zAdena - November 2022
 *                               PeriodEnd:
 *                                 type: string
 *                                 example: '2022-11-30T00:00:00'
 *                               PeriodStart:
 *                                 type: string
 *                                 example: '2022-11-01T00:00:00'
 *                               PostageTotalDue:
 *                                 type: number
 *                                 example: 509.49
 *                               ServicesTotalDue:
 *                                 type: number
 *                                 example: 185.573
 *                               TaxesTotalDue:
 *                                 type: number
 *                                 example: 0
 *                           example:
 *                             - ERP_OrderID: 123456
 *                               GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                               InvoiceNumber: '188111'
 *                               PeriodDesc: zAdena - November 2022
 *                               PeriodEnd: '2022-11-30T00:00:00'
 *                               PeriodStart: '2022-11-01T00:00:00'
 *                               PostageTotalDue: 509.49
 *                               ServicesTotalDue: 185.573
 *                               TaxesTotalDue: 0
 *                         Name:
 *                           type: string
 *                           example: zPFS Adena
 *                         OrbiPayments:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               FileID:
 *                                 type: string
 *                                 example: '123'
 *                               GUID:
 *                                 type: string
 *                                 example: 840E1362-BC9F-4749-B6A3-70D0A22DD333
 *                               JobName:
 *                                 type: string
 *                                 example: zAdena DAF
 *                               PartnerID:
 *                                 type: string
 *                                 example: '123456789'
 *                               Status:
 *                                 type: string
 *                                 example: Hold
 *                               Type:
 *                                 type: string
 *                                 example: DAF
 *                           example:
 *                             - GUID: 840E1362-BC9F-4749-B6A3-70D0A22DD333
 *                               JobName: zAdena DAF
 *                               PartnerID: '123456789'
 *                               Status: Hold
 *                               Type: DAF
 *                             - FileID: '123'
 *                               GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                               JobName: I updated the name
 *                               PartnerID: '1234567'
 *                               Status: Active
 *                               Type: amfINV
 *                             - FileID: '456'
 *                               GUID: 12752C0C-DD9C-4843-B824-4D5411603AD6
 *                               JobName: zAdena Statements
 *                               PartnerID: '1234567'
 *                               Status: Active
 *                               Type: newTYPE
 *                             - FileID: '123'
 *                               GUID: 0FF743DF-8419-4F0C-843F-3823DF61632D
 *                               JobName: zAdena Statements
 *                               PartnerID: '1234567'
 *                               Status: Active
 *                               Type: amfINV
 *                         RootPath:
 *                           type: string
 *                           example: C:\clients\P\PFS Adena
 *                     example:
 *                       - Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Facilities:
 *                           - Facility: RWJEBC
 *                             GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                             Orders:
 *                               - AutoMonthlyOrders: true
 *                                 AutoOrders: true
 *                                 BillLogic: 1
 *                                 CurrentOrder: '1612'
 *                                 GUID: 6C0661BB-F80E-4859-89B8-362B987DFDAD
 *                                 TemplateNumber: tempOrderNum
 *                                 TemplateVersion: 0
 *                             Specs:
 *                               - APIEnabled: false
 *                                 CrosswalkProvided: false
 *                                 ExtractIssues: true
 *                                 GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                                 HoldIssues: false
 *                                 PayChannels:
 *                                   AmericanExpressAccepted: true
 *                                   DiscoverAccepted: true
 *                                   GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                                   MasterCardAccepted: true
 *                                   VisaAccepted: true
 *                                 Reporting:
 *                                   GUID: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                                   ReturnFacilityPDFs: false
 *                                   ReturnFacilityRpt: false
 *                                   ReturnMovesRpt: false
 *                                   ReturnNonCassRpt: false
 *                                   ReturnPrintPDFs: false
 *                                   ReturnSummaryRpt: false
 *                                   ReturnSuppressionsRpt: false
 *                                   ReturnUndeliverableRpt: false
 *                                 SoftwareUsed: software012
 *                                 isDataJob: false
 *                                 isLockboxIntegrated: true
 *                                 isPDFJob: false
 *                         GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         Invoices:
 *                           - ERP_OrderID: 123456
 *                             GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                             InvoiceNumber: '188111'
 *                             PeriodDesc: zAdena - November 2022
 *                             PeriodEnd: '2022-11-30T00:00:00'
 *                             PeriodStart: '2022-11-01T00:00:00'
 *                             PostageTotalDue: 509.49
 *                             ServicesTotalDue: 185.573
 *                             TaxesTotalDue: 0
 *                         Name: zPFS Adena
 *                         OrbiPayments:
 *                           - GUID: 840E1362-BC9F-4749-B6A3-70D0A22DD333
 *                             JobName: zAdena DAF
 *                             PartnerID: '123456789'
 *                             Status: Hold
 *                             Type: DAF
 *                           - FileID: '123'
 *                             GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                             JobName: I updated the name
 *                             PartnerID: '1234567'
 *                             Status: Active
 *                             Type: amfINV
 *                           - FileID: '456'
 *                             GUID: 12752C0C-DD9C-4843-B824-4D5411603AD6
 *                             JobName: zAdena Statements
 *                             PartnerID: '1234567'
 *                             Status: Active
 *                             Type: newTYPE
 *                           - FileID: '123'
 *                             GUID: 0FF743DF-8419-4F0C-843F-3823DF61632D
 *                             JobName: zAdena Statements
 *                             PartnerID: '1234567'
 *                             Status: Active
 *                             Type: amfINV
 *                         RootPath: C:\clients\P\PFS Adena
 *               examples:
 *                 '200':
 *                   value:
 *                     Jobs:
 *                       - Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         Facilities:
 *                           - Facility: RWJEBC
 *                             GUID: 1F80FF20-5AFC-44D5-9407-910AB3C63ECA
 *                             Orders:
 *                               - AutoMonthlyOrders: true
 *                                 AutoOrders: true
 *                                 BillLogic: 1
 *                                 CurrentOrder: '1612'
 *                                 GUID: 6C0661BB-F80E-4859-89B8-362B987DFDAD
 *                                 TemplateNumber: tempOrderNum
 *                                 TemplateVersion: 0
 *                             Specs:
 *                               - APIEnabled: false
 *                                 CrosswalkProvided: false
 *                                 ExtractIssues: true
 *                                 GUID: E3F4C842-623B-4E7D-A049-11C51E19D6FB
 *                                 HoldIssues: false
 *                                 PayChannels:
 *                                   AmericanExpressAccepted: true
 *                                   DiscoverAccepted: true
 *                                   GUID: C696B0AC-5BE6-4A91-97AB-A53D31BD3926
 *                                   MasterCardAccepted: true
 *                                   VisaAccepted: true
 *                                 Reporting:
 *                                   GUID: 6EEF0246-D8B6-4935-B036-0C5356E113F4
 *                                   ReturnFacilityPDFs: false
 *                                   ReturnFacilityRpt: false
 *                                   ReturnMovesRpt: false
 *                                   ReturnNonCassRpt: false
 *                                   ReturnPrintPDFs: false
 *                                   ReturnSummaryRpt: false
 *                                   ReturnSuppressionsRpt: false
 *                                   ReturnUndeliverableRpt: false
 *                                 SoftwareUsed: software012
 *                                 isDataJob: false
 *                                 isLockboxIntegrated: true
 *                                 isPDFJob: false
 *                         GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         Invoices:
 *                           - ERP_OrderID: 123456
 *                             GUID: AE069568-FDEB-4B17-BCCA-F8D2248B9BF2
 *                             InvoiceNumber: '188111'
 *                             PeriodDesc: zAdena - November 2022
 *                             PeriodEnd: '2022-11-30T00:00:00'
 *                             PeriodStart: '2022-11-01T00:00:00'
 *                             PostageTotalDue: 509.49
 *                             ServicesTotalDue: 185.573
 *                             TaxesTotalDue: 0
 *                         Name: zPFS Adena
 *                         OrbiPayments:
 *                           - GUID: 840E1362-BC9F-4749-B6A3-70D0A22DD333
 *                             JobName: zAdena DAF
 *                             PartnerID: '123456789'
 *                             Status: Hold
 *                             Type: DAF
 *                           - FileID: '123'
 *                             GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                             JobName: I updated the name
 *                             PartnerID: '1234567'
 *                             Status: Active
 *                             Type: amfINV
 *                           - FileID: '456'
 *                             GUID: 12752C0C-DD9C-4843-B824-4D5411603AD6
 *                             JobName: zAdena Statements
 *                             PartnerID: '1234567'
 *                             Status: Active
 *                             Type: newTYPE
 *                           - FileID: '123'
 *                             GUID: 0FF743DF-8419-4F0C-843F-3823DF61632D
 *                             JobName: zAdena Statements
 *                             PartnerID: '1234567'
 *                             Status: Active
 *                             Type: amfINV
 *                         RootPath: C:\clients\P\PFS Adena
 */
router.get('/:jobid', checkReach, dboperations.one_job) //authLvl????

/**
 * @swagger
 *   /clients/{clientid}/jobs:
 *     post:
 *       tags:
 *         - Jobs
 *       summary: Create jobs
 *       description: Create jobs
 *       operationId: ''
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Jobs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Client_GUID:
 *                         type: string
 *                         example: 787a2705-4d27-4585-aacd-f3f9d77e21dc
 *                       Contacts:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             Active:
 *                               type: boolean
 *                               example: true
 *                             Email:
 *                               type: string
 *                               example: kpiercy@eliteps.com
 *                             FirstName:
 *                               type: string
 *                               example: Kraig
 *                             LastName:
 *                               type: string
 *                               example: Piercy
 *                             PhoneNumber:
 *                               type: string
 *                               example: '7654990654'
 *                             Type:
 *                               type: string
 *                               example: 3A3C663F-AA44-4295-89F5-C24869689B34
 *                         example:
 *                           - Active: true
 *                             Email: kpiercy@eliteps.com
 *                             FirstName: Kraig
 *                             LastName: Piercy
 *                             PhoneNumber: '7654990654'
 *                             Type: 3A3C663F-AA44-4295-89F5-C24869689B34
 *                           - Active: true
 *                             Email: kpiercy@eliteps.com
 *                             FirstName: Kraig
 *                             LastName: Piercy
 *                             PhoneNumber: '7654990654'
 *                             Type: 3B8872A8-F895-4CD9-ADD2-A99704A57635
 *                       Downloads:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             Active:
 *                               type: boolean
 *                               example: true
 *                             AdditionalTask:
 *                               type: string
 *                               nullable: true
 *                               example: someadditionaltask
 *                             AppendValue:
 *                               nullable: true
 *                               example: null
 *                             Convert:
 *                               type: boolean
 *                               example: false
 *                             ConvertToColumns:
 *                               type: number
 *                               example: 0
 *                             ConvertToDelimiter:
 *                               nullable: true
 *                               example: null
 *                             ConvertToExtension:
 *                               nullable: true
 *                               example: null
 *                             IgnoreMask:
 *                               type: string
 *                               example: '*.bat'
 *                             LocalDirectory:
 *                               type: string
 *                               example: somelocaldirectory
 *                             Mask:
 *                               type: string
 *                               example: '*.anEXT'
 *                             NewFilename:
 *                               nullable: true
 *                               example: null
 *                             Password:
 *                               type: string
 *                               example: somegreatpassword1!
 *                             RemoteDirectory:
 *                               type: string
 *                               example: somedirectorythatsnew
 *                             Renamed:
 *                               type: boolean
 *                               example: false
 *                             Server:
 *                               type: number
 *                               example: 0
 *                             Timestamped:
 *                               type: boolean
 *                               example: true
 *                         example:
 *                           - Active: true
 *                             AdditionalTask: someadditionaltask
 *                             AppendValue: null
 *                             Convert: false
 *                             ConvertToColumns: 0
 *                             ConvertToDelimiter: null
 *                             ConvertToExtension: null
 *                             IgnoreMask: '*.bat'
 *                             LocalDirectory: somelocaldirectory
 *                             Mask: '*.anEXT'
 *                             NewFilename: null
 *                             Password: somegreatpassword1!
 *                             RemoteDirectory: somedirectorythatsnew
 *                             Renamed: false
 *                             Server: 0
 *                             Timestamped: true
 *                           - Active: true
 *                             AdditionalTask: null
 *                             AppendValue: null
 *                             Convert: false
 *                             ConvertToColumns: 0
 *                             ConvertToDelimiter: null
 *                             ConvertToExtension: null
 *                             IgnoreMask: '*.bat'
 *                             LocalDirectory: C:/clients/P/PFS Adena/Messages/
 *                             Mask: '*.anEXT'
 *                             NewFilename: null
 *                             Password: somegreatpassword1!
 *                             RemoteDirectory: ../testing/zAdena/Messages
 *                             Renamed: false
 *                             Server: 0
 *                             Timestamped: true
 *                       Name:
 *                         type: string
 *                         example: zPFS BummyPlace
 *                       Processes:
 *                         type: object
 *                         properties:
 *                           Active:
 *                             type: boolean
 *                             example: true
 *                           AutoMoves:
 *                             type: boolean
 *                             example: true
 *                           ChainJob:
 *                             type: boolean
 *                             example: false
 *                           DaysProcessed:
 *                             type: string
 *                             example: '1234567'
 *                           Directory:
 *                             type: string
 *                             example: C:\clients\P\PFS_Adena\Filestoprocess\
 *                           FileArchive:
 *                             type: string
 *                             example: C:\clients\P\PFS_Adena\download\
 *                           FilesRequired:
 *                             type: number
 *                             example: 1
 *                           GAMasterEnabled:
 *                             type: boolean
 *                             example: true
 *                           MasterEnabled:
 *                             type: boolean
 *                             example: false
 *                           ParseMessage:
 *                             type: string
 *                             example: Successfully parsed Adena
 *                           PresortPageNum:
 *                             type: number
 *                             example: 1
 *                           PrintMessage:
 *                             type: string
 *                             example: Successfully printed Adena
 *                           RunOncePerDay:
 *                             type: boolean
 *                             example: false
 *                           TimeBased:
 *                             type: boolean
 *                             example: false
 *                           UnzipRequired:
 *                             type: boolean
 *                             example: false
 *                           Wait:
 *                             type: number
 *                             example: 20
 *                       Returns:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             AdditionalTask:
 *                               type: string
 *                               example: trigger.txt
 *                             DaysUploaded:
 *                               type: string
 *                               example: '12345'
 *                             LocalDirectory:
 *                               type: string
 *                               example: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                             Mask:
 *                               type: string
 *                               example: Moves_PFS_zAdena
 *                             MultiRemoteDirectory:
 *                               nullable: true
 *                               example: null
 *                             MultiServerID:
 *                               type: number
 *                               example: 0
 *                             MultiUpload:
 *                               type: boolean
 *                               example: false
 *                             Password:
 *                               type: string
 *                               example: somepassword123!
 *                             RemoteDirectory:
 *                               type: string
 *                               example: /PFS_zAdena/
 *                             Server:
 *                               type: number
 *                               example: 0
 *                             TimeBased:
 *                               type: boolean
 *                               example: false
 *                             Type:
 *                               type: number
 *                               example: 5
 *                             UploadAt:
 *                               type: string
 *                               example: '10:00'
 *                             ZipFilename:
 *                               nullable: true
 *                               example: null
 *                         example:
 *                           - AdditionalTask: trigger.txt
 *                             DaysUploaded: '12345'
 *                             LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                             Mask: Moves_PFS_zAdena
 *                             MultiRemoteDirectory: null
 *                             MultiServerID: 0
 *                             MultiUpload: false
 *                             Password: somepassword123!
 *                             RemoteDirectory: /PFS_zAdena/
 *                             Server: 0
 *                             TimeBased: false
 *                             Type: 5
 *                             UploadAt: '10:00'
 *                             ZipFilename: null
 *                           - AdditionalTask: trigger.txt
 *                             DaysUploaded: '12345'
 *                             LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                             Mask: Summary_PFS_zAdena
 *                             MultiRemoteDirectory: null
 *                             MultiServerID: 0
 *                             MultiUpload: false
 *                             Password: somepassword123!
 *                             RemoteDirectory: /PFS_zAdena/
 *                             Server: 0
 *                             TimeBased: false
 *                             Type: 4
 *                             UploadAt: '10:00'
 *                             ZipFilename: null
 *                       RootPath:
 *                         type: string
 *                         example: C:\clients\P\PFS Adena
 *                       Workflows:
 *                         type: object
 *                         properties:
 *                           AlacritiEnabled:
 *                             type: boolean
 *                             example: false
 *                           BatchInSetsOf:
 *                             type: number
 *                             example: 2000
 *                           Design:
 *                             type: string
 *                             example: PFS_Adena.ptk
 *                           PaperlessEnabled:
 *                             type: boolean
 *                             example: false
 *                           PrintToPath:
 *                             type: string
 *                             example: \\inmuneliterds\c$\colorfilestoprint\
 *                           RunMode:
 *                             type: string
 *                             example: Hold
 *                           SubprocessReqd:
 *                             type: boolean
 *                             example: false
 *                           UNCPath:
 *                             type: string
 *                             example: \\INMUNELITERDS\C$\Clients\P\PFS_Adena\
 *                   example:
 *                     - Client_GUID: 787a2705-4d27-4585-aacd-f3f9d77e21dc
 *                       Contacts:
 *                         - Active: true
 *                           Email: kpiercy@eliteps.com
 *                           FirstName: Kraig
 *                           LastName: Piercy
 *                           PhoneNumber: '7654990654'
 *                           Type: 3A3C663F-AA44-4295-89F5-C24869689B34
 *                         - Active: true
 *                           Email: kpiercy@eliteps.com
 *                           FirstName: Kraig
 *                           LastName: Piercy
 *                           PhoneNumber: '7654990654'
 *                           Type: 3B8872A8-F895-4CD9-ADD2-A99704A57635
 *                       Downloads:
 *                         - Active: true
 *                           AdditionalTask: someadditionaltask
 *                           AppendValue: null
 *                           Convert: false
 *                           ConvertToColumns: 0
 *                           ConvertToDelimiter: null
 *                           ConvertToExtension: null
 *                           IgnoreMask: '*.bat'
 *                           LocalDirectory: somelocaldirectory
 *                           Mask: '*.anEXT'
 *                           NewFilename: null
 *                           Password: somegreatpassword1!
 *                           RemoteDirectory: somedirectorythatsnew
 *                           Renamed: false
 *                           Server: 0
 *                           Timestamped: true
 *                         - Active: true
 *                           AdditionalTask: null
 *                           AppendValue: null
 *                           Convert: false
 *                           ConvertToColumns: 0
 *                           ConvertToDelimiter: null
 *                           ConvertToExtension: null
 *                           IgnoreMask: '*.bat'
 *                           LocalDirectory: C:/clients/P/PFS Adena/Messages/
 *                           Mask: '*.anEXT'
 *                           NewFilename: null
 *                           Password: somegreatpassword1!
 *                           RemoteDirectory: ../testing/zAdena/Messages
 *                           Renamed: false
 *                           Server: 0
 *                           Timestamped: true
 *                       Name: zPFS BummyPlace
 *                       Processes:
 *                         Active: true
 *                         AutoMoves: true
 *                         ChainJob: false
 *                         DaysProcessed: '1234567'
 *                         Directory: C:\clients\P\PFS_Adena\Filestoprocess\
 *                         FileArchive: C:\clients\P\PFS_Adena\download\
 *                         FilesRequired: 1
 *                         GAMasterEnabled: true
 *                         MasterEnabled: false
 *                         ParseMessage: Successfully parsed Adena
 *                         PresortPageNum: 1
 *                         PrintMessage: Successfully printed Adena
 *                         RunOncePerDay: false
 *                         TimeBased: false
 *                         UnzipRequired: false
 *                         Wait: 20
 *                       Returns:
 *                         - AdditionalTask: trigger.txt
 *                           DaysUploaded: '12345'
 *                           LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                           Mask: Moves_PFS_zAdena
 *                           MultiRemoteDirectory: null
 *                           MultiServerID: 0
 *                           MultiUpload: false
 *                           Password: somepassword123!
 *                           RemoteDirectory: /PFS_zAdena/
 *                           Server: 0
 *                           TimeBased: false
 *                           Type: 5
 *                           UploadAt: '10:00'
 *                           ZipFilename: null
 *                         - AdditionalTask: trigger.txt
 *                           DaysUploaded: '12345'
 *                           LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                           Mask: Summary_PFS_zAdena
 *                           MultiRemoteDirectory: null
 *                           MultiServerID: 0
 *                           MultiUpload: false
 *                           Password: somepassword123!
 *                           RemoteDirectory: /PFS_zAdena/
 *                           Server: 0
 *                           TimeBased: false
 *                           Type: 4
 *                           UploadAt: '10:00'
 *                           ZipFilename: null
 *                       RootPath: C:\clients\P\PFS Adena
 *                       Workflows:
 *                         AlacritiEnabled: false
 *                         BatchInSetsOf: 2000
 *                         Design: PFS_Adena.ptk
 *                         PaperlessEnabled: false
 *                         PrintToPath: \\inmuneliterds\c$\colorfilestoprint\
 *                         RunMode: Hold
 *                         SubprocessReqd: false
 *                         UNCPath: \\INMUNELITERDS\C$\Clients\P\PFS_Adena\
 *             example:
 *               Jobs:
 *                 - Client_GUID: 787a2705-4d27-4585-aacd-f3f9d77e21dc
 *                   Contacts:
 *                     - Active: true
 *                       Email: kpiercy@eliteps.com
 *                       FirstName: Kraig
 *                       LastName: Piercy
 *                       PhoneNumber: '7654990654'
 *                       Type: 3A3C663F-AA44-4295-89F5-C24869689B34
 *                     - Active: true
 *                       Email: kpiercy@eliteps.com
 *                       FirstName: Kraig
 *                       LastName: Piercy
 *                       PhoneNumber: '7654990654'
 *                       Type: 3B8872A8-F895-4CD9-ADD2-A99704A57635
 *                   Downloads:
 *                     - Active: true
 *                       AdditionalTask: someadditionaltask
 *                       AppendValue: null
 *                       Convert: false
 *                       ConvertToColumns: 0
 *                       ConvertToDelimiter: null
 *                       ConvertToExtension: null
 *                       IgnoreMask: '*.bat'
 *                       LocalDirectory: somelocaldirectory
 *                       Mask: '*.anEXT'
 *                       NewFilename: null
 *                       Password: somegreatpassword1!
 *                       RemoteDirectory: somedirectorythatsnew
 *                       Renamed: false
 *                       Server: 0
 *                       Timestamped: true
 *                     - Active: true
 *                       AdditionalTask: null
 *                       AppendValue: null
 *                       Convert: false
 *                       ConvertToColumns: 0
 *                       ConvertToDelimiter: null
 *                       ConvertToExtension: null
 *                       IgnoreMask: '*.bat'
 *                       LocalDirectory: C:/clients/P/PFS Adena/Messages/
 *                       Mask: '*.anEXT'
 *                       NewFilename: null
 *                       Password: somegreatpassword1!
 *                       RemoteDirectory: ../testing/zAdena/Messages
 *                       Renamed: false
 *                       Server: 0
 *                       Timestamped: true
 *                   Name: zPFS BummyPlace
 *                   Processes:
 *                     Active: true
 *                     AutoMoves: true
 *                     ChainJob: false
 *                     DaysProcessed: '1234567'
 *                     Directory: C:\clients\P\PFS_Adena\Filestoprocess\
 *                     FileArchive: C:\clients\P\PFS_Adena\download\
 *                     FilesRequired: 1
 *                     GAMasterEnabled: true
 *                     MasterEnabled: false
 *                     ParseMessage: Successfully parsed Adena
 *                     PresortPageNum: 1
 *                     PrintMessage: Successfully printed Adena
 *                     RunOncePerDay: false
 *                     TimeBased: false
 *                     UnzipRequired: false
 *                     Wait: 20
 *                   Returns:
 *                     - AdditionalTask: trigger.txt
 *                       DaysUploaded: '12345'
 *                       LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                       Mask: Moves_PFS_zAdena
 *                       MultiRemoteDirectory: null
 *                       MultiServerID: 0
 *                       MultiUpload: false
 *                       Password: somepassword123!
 *                       RemoteDirectory: /PFS_zAdena/
 *                       Server: 0
 *                       TimeBased: false
 *                       Type: 5
 *                       UploadAt: '10:00'
 *                       ZipFilename: null
 *                     - AdditionalTask: trigger.txt
 *                       DaysUploaded: '12345'
 *                       LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                       Mask: Summary_PFS_zAdena
 *                       MultiRemoteDirectory: null
 *                       MultiServerID: 0
 *                       MultiUpload: false
 *                       Password: somepassword123!
 *                       RemoteDirectory: /PFS_zAdena/
 *                       Server: 0
 *                       TimeBased: false
 *                       Type: 4
 *                       UploadAt: '10:00'
 *                       ZipFilename: null
 *                   RootPath: C:\clients\P\PFS Adena
 *                   Workflows:
 *                     AlacritiEnabled: false
 *                     BatchInSetsOf: 2000
 *                     Design: PFS_Adena.ptk
 *                     PaperlessEnabled: false
 *                     PrintToPath: \\inmuneliterds\c$\colorfilestoprint\
 *                     RunMode: Hold
 *                     SubprocessReqd: false
 *                     UNCPath: \\INMUNELITERDS\C$\Clients\P\PFS_Adena\
 *       responses:
 *         '200':
 *           description: ''
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 8dd82a1a-105c-4fed-b157-ae18684eecc1
 */
router.post('/', checkReach, authLvl, validateDto(jobDto), dboperations.jobs_create)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}:
 *     delete:
 *       tags:
 *         - Jobs
 *       summary: Delete job by jobid
 *       description: Delete job by jobid
 *       operationId: deleteJobByJobid
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
 *                   Jobs:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         Client_GUID:
 *                           type: string
 *                           example: 787A2705-4D27-4585-AACD-F3F9D77E21DC
 *                         GUID:
 *                           type: string
 *                           example: 4BC5DEEE-0243-4CB0-BE02-094616D02D4B
 *                         Name:
 *                           type: string
 *                           example: zPFS BummyPlace
 *                     example:
 *                       - Active: false
 *                         Client_GUID: 787A2705-4D27-4585-AACD-F3F9D77E21DC
 *                         GUID: 4BC5DEEE-0243-4CB0-BE02-094616D02D4B
 *                         Name: zPFS BummyPlace
 *               examples:
 *                 '200':
 *                   value:
 *                     Jobs:
 *                       - Active: false
 *                         Client_GUID: 787A2705-4D27-4585-AACD-F3F9D77E21DC
 *                         GUID: 4BC5DEEE-0243-4CB0-BE02-094616D02D4B
 *                         Name: zPFS BummyPlace
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 787a2705-4d27-4585-aacd-f3f9d77e21dc
 *       - name: jobid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 4bc5deee-0243-4cb0-be02-094616d02d4b
 */
router.delete('/:jobid', checkReach, authLvl, dboperations.jobs_delete)

module.exports = router;

