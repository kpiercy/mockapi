require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/orbipays')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 *   /api/v1/clients/{clientid}/jobs/{jobid}/orbipays:
 *     get:
 *       tags:
 *         - Orbipays
 *       summary: Get all alacriti params by jobid
 *       description: Get all alacriti params by jobid
 *       operationId: getAllAlacritiParamsByJobid
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
 *             example: '2'
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
 *                   Orbipays:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AMFMask:
 *                           type: string
 *                           example: 123456789.AMF.*.DAT.pgp
 *                         ChainJob:
 *                           type: boolean
 *                           example: false
 *                         DAFMask:
 *                           type: string
 *                           example: 123456789.ENHDAF.*.DAT
 *                         EDMSMask1:
 *                           type: string
 *                           example: 123456789.EDMS.*.DAT.pgp
 *                         EncryptReturnFiles:
 *                           type: boolean
 *                           example: true
 *                         FileCountRequired:
 *                           type: number
 *                           example: 1
 *                         FileID:
 *                           type: string
 *                           example: '123'
 *                         GUID:
 *                           type: string
 *                           example: 840E1362-BC9F-4749-B6A3-70D0A22DD333
 *                         HasReports:
 *                           type: boolean
 *                           example: false
 *                         Job_GUID:
 *                           type: string
 *                           example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory:
 *                           type: string
 *                           example: C:\AlacritiDAF\
 *                         LocalReportDirectory:
 *                           type: string
 *                           example: C:\clients\P\PFS_Adena\Summaries\
 *                         LogFile:
 *                           type: string
 *                           example: AutomateRunSeqLog.txt
 *                         Name:
 *                           type: string
 *                           example: zAdena DAF
 *                         PDFZipMask:
 *                           type: string
 *                           example: ''
 *                         ParseSuccessMsg:
 *                           type: string
 *                           example: some parse success msg
 *                         PartnerID:
 *                           type: string
 *                           example: '123456789'
 *                         PaymentMask:
 *                           type: string
 *                           example: ORBI.*.ACHPAY.123456789.*.pgp.csv
 *                         PaymentRemoteDirectory:
 *                           type: string
 *                           example: /PFS/Adena/PaymentFile/
 *                         ProcessingMask:
 *                           type: string
 *                           example: '*.pdf'
 *                         ReportMask:
 *                           type: string
 *                           example: '*reportname*.csv'
 *                         Status:
 *                           type: string
 *                           example: Hold
 *                         Type:
 *                           type: string
 *                           example: DAF
 *                         Wait:
 *                           type: boolean
 *                           example: false
 *                         WaitLength:
 *                           type: number
 *                           example: 20
 *                     example:
 *                       - ChainJob: false
 *                         DAFMask: 123456789.ENHDAF.*.DAT
 *                         EncryptReturnFiles: true
 *                         FileCountRequired: 1
 *                         GUID: 840E1362-BC9F-4749-B6A3-70D0A22DD333
 *                         HasReports: false
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C:\AlacritiDAF\
 *                         Name: zAdena DAF
 *                         PartnerID: '123456789'
 *                         Status: Hold
 *                         Type: DAF
 *                         Wait: false
 *                       - AMFMask: 123456789.AMF.*.DAT.pgp
 *                         ChainJob: false
 *                         DAFMask: ''
 *                         EDMSMask1: 123456789.EDMS.*.DAT.pgp
 *                         EncryptReturnFiles: true
 *                         FileCountRequired: 1
 *                         FileID: '123'
 *                         GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                         HasReports: true
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                         LocalReportDirectory: C:\clients\P\PFS_Adena\Summaries\
 *                         LogFile: AutomateRunSeqLog.txt
 *                         Name: I updated the name
 *                         PDFZipMask: ''
 *                         ParseSuccessMsg: some parse success msg
 *                         PartnerID: '1234567'
 *                         PaymentMask: ORBI.*.ACHPAY.123456789.*.pgp.csv
 *                         PaymentRemoteDirectory: /PFS/Adena/PaymentFile/
 *                         ProcessingMask: '*.pdf'
 *                         ReportMask: '*reportname*.csv'
 *                         Status: Active
 *                         Type: amfINV
 *                         Wait: false
 *                         WaitLength: 20
 *                       - AMFMask: some AMF mask
 *                         ChainJob: false
 *                         DAFMask: some DAF mask
 *                         EDMSMask1: some EDMS mask
 *                         EncryptReturnFiles: true
 *                         FileCountRequired: 1
 *                         FileID: '456'
 *                         GUID: 12752C0C-DD9C-4843-B824-4D5411603AD6
 *                         HasReports: true
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                         LocalReportDirectory: the report directory
 *                         LogFile: AutomateRunSeqLog.txt
 *                         Name: zAdena Statements
 *                         PDFZipMask: zip file naming
 *                         ParseSuccessMsg: some parse success msg
 *                         PartnerID: '1234567'
 *                         PaymentMask: some PAY mask
 *                         ProcessingMask: '*.pdf'
 *                         ReportMask: '*reportname*.csv'
 *                         Status: Active
 *                         Type: newTYPE
 *                         Wait: false
 *                         WaitLength: 20
 *                       - AMFMask: some AMF mask
 *                         ChainJob: false
 *                         DAFMask: some DAF mask
 *                         EDMSMask1: some EDMS mask
 *                         EncryptReturnFiles: true
 *                         FileCountRequired: 1
 *                         FileID: '123'
 *                         GUID: 0FF743DF-8419-4F0C-843F-3823DF61632D
 *                         HasReports: true
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                         LocalReportDirectory: the report directory
 *                         LogFile: AutomateRunSeqLog.txt
 *                         Name: zAdena Statements
 *                         PDFZipMask: zip file naming
 *                         ParseSuccessMsg: some parse success msg
 *                         PartnerID: '1234567'
 *                         PaymentMask: some PAY mask
 *                         ProcessingMask: '*.pdf'
 *                         ReportMask: '*reportname*.csv'
 *                         Status: Active
 *                         Type: amfINV
 *                         Wait: false
 *                         WaitLength: 20
 *               examples:
 *                 '200':
 *                   value:
 *                     Orbipays:
 *                       - ChainJob: false
 *                         DAFMask: 123456789.ENHDAF.*.DAT
 *                         EncryptReturnFiles: true
 *                         FileCountRequired: 1
 *                         GUID: 840E1362-BC9F-4749-B6A3-70D0A22DD333
 *                         HasReports: false
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C:\AlacritiDAF\
 *                         Name: zAdena DAF
 *                         PartnerID: '123456789'
 *                         Status: Hold
 *                         Type: DAF
 *                         Wait: false
 *                       - AMFMask: 123456789.AMF.*.DAT.pgp
 *                         ChainJob: false
 *                         DAFMask: ''
 *                         EDMSMask1: 123456789.EDMS.*.DAT.pgp
 *                         EncryptReturnFiles: true
 *                         FileCountRequired: 1
 *                         FileID: '123'
 *                         GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                         HasReports: true
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                         LocalReportDirectory: C:\clients\P\PFS_Adena\Summaries\
 *                         LogFile: AutomateRunSeqLog.txt
 *                         Name: I updated the name
 *                         PDFZipMask: ''
 *                         ParseSuccessMsg: some parse success msg
 *                         PartnerID: '1234567'
 *                         PaymentMask: ORBI.*.ACHPAY.123456789.*.pgp.csv
 *                         PaymentRemoteDirectory: /PFS/Adena/PaymentFile/
 *                         ProcessingMask: '*.pdf'
 *                         ReportMask: '*reportname*.csv'
 *                         Status: Active
 *                         Type: amfINV
 *                         Wait: false
 *                         WaitLength: 20
 *                       - AMFMask: some AMF mask
 *                         ChainJob: false
 *                         DAFMask: some DAF mask
 *                         EDMSMask1: some EDMS mask
 *                         EncryptReturnFiles: true
 *                         FileCountRequired: 1
 *                         FileID: '456'
 *                         GUID: 12752C0C-DD9C-4843-B824-4D5411603AD6
 *                         HasReports: true
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                         LocalReportDirectory: the report directory
 *                         LogFile: AutomateRunSeqLog.txt
 *                         Name: zAdena Statements
 *                         PDFZipMask: zip file naming
 *                         ParseSuccessMsg: some parse success msg
 *                         PartnerID: '1234567'
 *                         PaymentMask: some PAY mask
 *                         ProcessingMask: '*.pdf'
 *                         ReportMask: '*reportname*.csv'
 *                         Status: Active
 *                         Type: newTYPE
 *                         Wait: false
 *                         WaitLength: 20
 *                       - AMFMask: some AMF mask
 *                         ChainJob: false
 *                         DAFMask: some DAF mask
 *                         EDMSMask1: some EDMS mask
 *                         EncryptReturnFiles: true
 *                         FileCountRequired: 1
 *                         FileID: '123'
 *                         GUID: 0FF743DF-8419-4F0C-843F-3823DF61632D
 *                         HasReports: true
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                         LocalReportDirectory: the report directory
 *                         LogFile: AutomateRunSeqLog.txt
 *                         Name: zAdena Statements
 *                         PDFZipMask: zip file naming
 *                         ParseSuccessMsg: some parse success msg
 *                         PartnerID: '1234567'
 *                         PaymentMask: some PAY mask
 *                         ProcessingMask: '*.pdf'
 *                         ReportMask: '*reportname*.csv'
 *                         Status: Active
 *                         Type: amfINV
 *                         Wait: false
 *                         WaitLength: 20
 */
router.get('/', checkReach, dboperations.all_orbipays)

/**
 * 
 *   /clients/{clientid}/jobs/{jobid}/orbipays/{orbipayid}:
 *     get:
 *       tags:
 *         - Orbipays
 *       summary: Get alacriti parms by orbipayid
 *       description: Get alacriti parms by orbipayid
 *       operationId: getAlacritiParmsByOrbipayid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Orbipays:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AMFMask:
 *                           type: string
 *                           example: 123456789.AMF.*.DAT.pgp
 *                         ChainJob:
 *                           type: boolean
 *                           example: false
 *                         DAFMask:
 *                           type: string
 *                           example: ''
 *                         EDMSMask1:
 *                           type: string
 *                           example: 123456789.EDMS.*.DAT.pgp
 *                         EncryptReturnFiles:
 *                           type: boolean
 *                           example: true
 *                         FileCountRequired:
 *                           type: number
 *                           example: 1
 *                         FileID:
 *                           type: string
 *                           example: '123'
 *                         GUID:
 *                           type: string
 *                           example: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                         HasReports:
 *                           type: boolean
 *                           example: true
 *                         Job_GUID:
 *                           type: string
 *                           example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory:
 *                           type: string
 *                           example: C://clients/P/zAdena/BuildAlacritiFiles
 *                         LocalReportDirectory:
 *                           type: string
 *                           example: C:\clients\P\PFS_Adena\Summaries\
 *                         LogFile:
 *                           type: string
 *                           example: AutomateRunSeqLog.txt
 *                         Name:
 *                           type: string
 *                           example: I updated the name
 *                         PDFZipMask:
 *                           type: string
 *                           example: ''
 *                         ParseSuccessMsg:
 *                           type: string
 *                           example: some parse success msg
 *                         PartnerID:
 *                           type: string
 *                           example: '1234567'
 *                         PaymentMask:
 *                           type: string
 *                           example: ORBI.*.ACHPAY.123456789.*.pgp.csv
 *                         PaymentRemoteDirectory:
 *                           type: string
 *                           example: /PFS/Adena/PaymentFile/
 *                         ProcessingMask:
 *                           type: string
 *                           example: '*.pdf'
 *                         ReportMask:
 *                           type: string
 *                           example: '*reportname*.csv'
 *                         Status:
 *                           type: string
 *                           example: Active
 *                         Type:
 *                           type: string
 *                           example: amfINV
 *                         Wait:
 *                           type: boolean
 *                           example: false
 *                         WaitLength:
 *                           type: number
 *                           example: 20
 *                     example:
 *                       - AMFMask: 123456789.AMF.*.DAT.pgp
 *                         ChainJob: false
 *                         DAFMask: ''
 *                         EDMSMask1: 123456789.EDMS.*.DAT.pgp
 *                         EncryptReturnFiles: true
 *                         FileCountRequired: 1
 *                         FileID: '123'
 *                         GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                         HasReports: true
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                         LocalReportDirectory: C:\clients\P\PFS_Adena\Summaries\
 *                         LogFile: AutomateRunSeqLog.txt
 *                         Name: I updated the name
 *                         PDFZipMask: ''
 *                         ParseSuccessMsg: some parse success msg
 *                         PartnerID: '1234567'
 *                         PaymentMask: ORBI.*.ACHPAY.123456789.*.pgp.csv
 *                         PaymentRemoteDirectory: /PFS/Adena/PaymentFile/
 *                         ProcessingMask: '*.pdf'
 *                         ReportMask: '*reportname*.csv'
 *                         Status: Active
 *                         Type: amfINV
 *                         Wait: false
 *                         WaitLength: 20
 *               examples:
 *                 '200':
 *                   value:
 *                     Orbipays:
 *                       - AMFMask: 123456789.AMF.*.DAT.pgp
 *                         ChainJob: false
 *                         DAFMask: ''
 *                         EDMSMask1: 123456789.EDMS.*.DAT.pgp
 *                         EncryptReturnFiles: true
 *                         FileCountRequired: 1
 *                         FileID: '123'
 *                         GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                         HasReports: true
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                         LocalReportDirectory: C:\clients\P\PFS_Adena\Summaries\
 *                         LogFile: AutomateRunSeqLog.txt
 *                         Name: I updated the name
 *                         PDFZipMask: ''
 *                         ParseSuccessMsg: some parse success msg
 *                         PartnerID: '1234567'
 *                         PaymentMask: ORBI.*.ACHPAY.123456789.*.pgp.csv
 *                         PaymentRemoteDirectory: /PFS/Adena/PaymentFile/
 *                         ProcessingMask: '*.pdf'
 *                         ReportMask: '*reportname*.csv'
 *                         Status: Active
 *                         Type: amfINV
 *                         Wait: false
 *                         WaitLength: 20
 */
router.get('/:orbipayid', checkReach, dboperations.one_orbipay)

/**
 * @swagger
 *   /api/v1/clients/{clientid}/jobs/{jobid}/orbipays:
 *     post:
 *       tags:
 *         - Orbipays
 *       summary: Create alacriti params
 *       description: Create alacriti params
 *       operationId: createAlacritiParams
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Orbipays:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AMF_Mask:
 *                         type: string
 *                         example: some AMF mask
 *                       Chained:
 *                         type: string
 *                         example: '0'
 *                       DAF_Mask:
 *                         type: string
 *                         example: some DAF mask
 *                       EDMS_Mask1:
 *                         type: string
 *                         example: some EDMS mask
 *                       EncryptReturnFiles:
 *                         type: number
 *                         example: 1
 *                       FileCountRequired:
 *                         type: number
 *                         example: 1
 *                       FileID:
 *                         type: string
 *                         example: '123'
 *                       HasReports:
 *                         type: number
 *                         example: 1
 *                       Job_GUID:
 *                         type: string
 *                         example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LocalDirectory:
 *                         type: string
 *                         example: C://clients/P/zAdena/BuildAlacritiFiles
 *                       LogFile:
 *                         type: string
 *                         example: AutomateRunSeqLog.txt
 *                       Name:
 *                         type: string
 *                         example: zAdena Statements
 *                       PAY_Mask:
 *                         type: string
 *                         example: some PAY mask
 *                       ParseSuccessMsg:
 *                         type: string
 *                         example: some parse success msg
 *                       PartnerID:
 *                         type: string
 *                         example: '1234567'
 *                       ReportDirectory:
 *                         type: string
 *                         example: the report directory
 *                       ReportMask:
 *                         type: string
 *                         example: '*reportname*.csv'
 *                       Status:
 *                         type: string
 *                         example: Active
 *                       TriggerMask:
 *                         type: string
 *                         example: '*.pdf'
 *                       Type:
 *                         type: string
 *                         example: amfINV
 *                       Wait:
 *                         type: number
 *                         example: 0
 *                       WaitLength:
 *                         type: number
 *                         example: 20
 *                       ZipMask:
 *                         type: string
 *                         example: zip file naming
 *                   example:
 *                     - AMF_Mask: some AMF mask
 *                       Chained: '0'
 *                       DAF_Mask: some DAF mask
 *                       EDMS_Mask1: some EDMS mask
 *                       EncryptReturnFiles: 1
 *                       FileCountRequired: 1
 *                       FileID: '123'
 *                       HasReports: 1
 *                       Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                       LogFile: AutomateRunSeqLog.txt
 *                       Name: zAdena Statements
 *                       PAY_Mask: some PAY mask
 *                       ParseSuccessMsg: some parse success msg
 *                       PartnerID: '1234567'
 *                       ReportDirectory: the report directory
 *                       ReportMask: '*reportname*.csv'
 *                       Status: Active
 *                       TriggerMask: '*.pdf'
 *                       Type: amfINV
 *                       Wait: 0
 *                       WaitLength: 20
 *                       ZipMask: zip file naming
 *             example:
 *               Orbipays:
 *                 - AMF_Mask: some AMF mask
 *                   Chained: '0'
 *                   DAF_Mask: some DAF mask
 *                   EDMS_Mask1: some EDMS mask
 *                   EncryptReturnFiles: 1
 *                   FileCountRequired: 1
 *                   FileID: '123'
 *                   HasReports: 1
 *                   Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                   LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                   LogFile: AutomateRunSeqLog.txt
 *                   Name: zAdena Statements
 *                   PAY_Mask: some PAY mask
 *                   ParseSuccessMsg: some parse success msg
 *                   PartnerID: '1234567'
 *                   ReportDirectory: the report directory
 *                   ReportMask: '*reportname*.csv'
 *                   Status: Active
 *                   TriggerMask: '*.pdf'
 *                   Type: amfINV
 *                   Wait: 0
 *                   WaitLength: 20
 *                   ZipMask: zip file naming
 *       responses:
 *         '201':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Orbipays:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         GUID:
 *                           type: string
 *                           example: C9C8E271-52C6-4956-8B90-3EB028A5F476
 *                         Name:
 *                           type: string
 *                           example: zAdena Statements
 *                         PartnerID:
 *                           type: string
 *                           example: '1234567'
 *                         Type:
 *                           type: string
 *                           example: amfINV
 *                     example:
 *                       - GUID: C9C8E271-52C6-4956-8B90-3EB028A5F476
 *                         Name: zAdena Statements
 *                         PartnerID: '1234567'
 *                         Type: amfINV
 *               examples:
 *                 '200':
 *                   value:
 *                     Orbipays:
 *                       - GUID: C9C8E271-52C6-4956-8B90-3EB028A5F476
 *                         Name: zAdena Statements
 *                         PartnerID: '1234567'
 *                         Type: amfINV
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
router.post('/', checkReach, authLvl, dboperations.create_orbipay)

/**
 * 
 *   /clients/{clientid}/jobs/{jobid}/orbipays/{orbipayid}:
 *     patch:
 *       tags:
 *         - Orbipays
 *       summary: Update orbipay by orbipayid
 *       description: Update orbipay by orbipayid
 *       operationId: updateOrbipayByOrbipayid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Orbipays:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AMF_Mask:
 *                         type: string
 *                         example: some AMF mask
 *                       ChainJob:
 *                         type: number
 *                         example: 0
 *                       DAF_Mask:
 *                         type: string
 *                         example: some DAF mask
 *                       EDMS_Mask1:
 *                         type: string
 *                         example: some EDMS mask
 *                       EncryptReturnFiles:
 *                         type: number
 *                         example: 1
 *                       FileCountRequired:
 *                         type: number
 *                         example: 1
 *                       FileID:
 *                         type: string
 *                         example: '123'
 *                       HasReports:
 *                         type: number
 *                         example: 1
 *                       LocalDirectory:
 *                         type: string
 *                         example: C://clients/P/zAdena/BuildAlacritiFiles
 *                       LogFile:
 *                         type: string
 *                         example: AutomateRunSeqLog.txt
 *                       Name:
 *                         type: string
 *                         example: I updated the name
 *                       PAY_Mask:
 *                         type: string
 *                         example: some PAY mask
 *                       PAY_RemoteDirectory:
 *                         type: string
 *                         example: some remote directory
 *                       ParseSuccessMsg:
 *                         type: string
 *                         example: some parse success msg
 *                       PartnerID:
 *                         type: string
 *                         example: '1234567'
 *                       ProcessingMask:
 *                         type: string
 *                         example: '*.pdf'
 *                       ReportDirectory:
 *                         type: string
 *                         example: the report directory
 *                       ReportMask:
 *                         type: string
 *                         example: '*reportname*.csv'
 *                       Status:
 *                         type: string
 *                         example: Active
 *                       Type:
 *                         type: string
 *                         example: amfINV
 *                       Wait:
 *                         type: number
 *                         example: 0
 *                       WaitLength:
 *                         type: number
 *                         example: 20
 *                       ZipMask:
 *                         type: string
 *                         example: zip file naming
 *                   example:
 *                     - AMF_Mask: some AMF mask
 *                       ChainJob: 0
 *                       DAF_Mask: some DAF mask
 *                       EDMS_Mask1: some EDMS mask
 *                       EncryptReturnFiles: 1
 *                       FileCountRequired: 1
 *                       FileID: '123'
 *                       HasReports: 1
 *                       LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                       LogFile: AutomateRunSeqLog.txt
 *                       Name: I updated the name
 *                       PAY_Mask: some PAY mask
 *                       PAY_RemoteDirectory: some remote directory
 *                       ParseSuccessMsg: some parse success msg
 *                       PartnerID: '1234567'
 *                       ProcessingMask: '*.pdf'
 *                       ReportDirectory: the report directory
 *                       ReportMask: '*reportname*.csv'
 *                       Status: Active
 *                       Type: amfINV
 *                       Wait: 0
 *                       WaitLength: 20
 *                       ZipMask: zip file naming
 *             example:
 *               Orbipays:
 *                 - AMF_Mask: some AMF mask
 *                   ChainJob: 0
 *                   DAF_Mask: some DAF mask
 *                   EDMS_Mask1: some EDMS mask
 *                   EncryptReturnFiles: 1
 *                   FileCountRequired: 1
 *                   FileID: '123'
 *                   HasReports: 1
 *                   LocalDirectory: C://clients/P/zAdena/BuildAlacritiFiles
 *                   LogFile: AutomateRunSeqLog.txt
 *                   Name: I updated the name
 *                   PAY_Mask: some PAY mask
 *                   PAY_RemoteDirectory: some remote directory
 *                   ParseSuccessMsg: some parse success msg
 *                   PartnerID: '1234567'
 *                   ProcessingMask: '*.pdf'
 *                   ReportDirectory: the report directory
 *                   ReportMask: '*reportname*.csv'
 *                   Status: Active
 *                   Type: amfINV
 *                   Wait: 0
 *                   WaitLength: 20
 *                   ZipMask: zip file naming
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Orbipays:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Job_GUID:
 *                           type: string
 *                           example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         Orbipay_GUID:
 *                           type: string
 *                           example: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                         Status:
 *                           type: string
 *                           example: Active
 *                         Type:
 *                           type: string
 *                           example: amfINV
 *                     example:
 *                       - Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         Orbipay_GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                         Status: Active
 *                         Type: amfINV
 *               examples:
 *                 '200':
 *                   value:
 *                     Orbipays:
 *                       - Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         Orbipay_GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                         Status: Active
 *                         Type: amfINV
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
 *       - name: orbipayid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 */
router.patch('/:orbipayid', checkReach, authLvl, dboperations.update_orbipay)

/**
 * 
 *   /clients/{clientid}/jobs/{jobid}/orbipays/{orbipayid}:
 *     delete:
 *       tags:
 *         - Orbipays
 *       summary: Delete alacriti params
 *       description: Delete alacriti params
 *       operationId: deleteAlacritiParams
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Orbipays:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         GUID:
 *                           type: string
 *                           example: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                         Name:
 *                           type: string
 *                           example: I updated the name
 *                         Status:
 *                           type: string
 *                           example: INACTIVE
 *                     example:
 *                       - GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                         Name: I updated the name
 *                         Status: INACTIVE
 *               examples:
 *                 '200':
 *                   value:
 *                     Orbipays:
 *                       - GUID: 2073E46B-A2F4-461C-88EA-B8260B3823E0
 *                         Name: I updated the name
 *                         Status: INACTIVE
 */
router.delete("/:orbipayid", checkReach, authLvl, dboperations.delete_orbipay);

module.exports = router;