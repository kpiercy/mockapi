require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/processes");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/processes:
 *     get:
 *       tags:
 *         - Processes
 *       summary: Get all process params by jobid
 *       description: Get all process params by jobid
 *       operationId: getAllProcessParamsByJobid
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
 *                   Processes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         ArchiveDirectory:
 *                           type: string
 *                           example: C:\clients\P\PFS_Adena\download\
 *                         AutoMoves:
 *                           type: boolean
 *                           example: true
 *                         ChainJob:
 *                           type: boolean
 *                           example: false
 *                         DaysProcessed:
 *                           type: string
 *                           example: '1234567'
 *                         ErrorsBypassed:
 *                           type: boolean
 *                           example: false
 *                         FilesReqdForProcessing:
 *                           type: number
 *                           example: 1
 *                         GAReady:
 *                           type: boolean
 *                           example: true
 *                         GUID:
 *                           type: string
 *                           example: AEB286FD-A077-4B64-9323-DA52968B63E8
 *                         Job_GUID:
 *                           type: string
 *                           example: 4BC5DEEE-0243-4CB0-BE02-094616D02D4B
 *                         LocalDirectory:
 *                           type: string
 *                           example: C:\clients\P\PFS_Adena\Filestoprocess\
 *                         MasterEnabled:
 *                           type: boolean
 *                           example: false
 *                         ParseMessage:
 *                           type: string
 *                           example: Successfully parsed Adena
 *                         PresortPageNum:
 *                           type: number
 *                           example: 1
 *                         PrintMessage:
 *                           type: string
 *                           example: Successfully printed Adena
 *                         RanToday:
 *                           type: boolean
 *                           example: false
 *                         ReadyForProcessing:
 *                           type: boolean
 *                           example: false
 *                         ReqUnzip:
 *                           type: boolean
 *                           example: false
 *                         RunOncePerDay:
 *                           type: boolean
 *                           example: false
 *                         TimeBased:
 *                           type: boolean
 *                           example: false
 *                         Wait:
 *                           type: number
 *                           example: 20
 *                     example:
 *                       - ArchiveDirectory: C:\clients\P\PFS_Adena\download\
 *                         AutoMoves: true
 *                         ChainJob: false
 *                         DaysProcessed: '1234567'
 *                         ErrorsBypassed: false
 *                         FilesReqdForProcessing: 1
 *                         GAReady: true
 *                         GUID: AEB286FD-A077-4B64-9323-DA52968B63E8
 *                         Job_GUID: 4BC5DEEE-0243-4CB0-BE02-094616D02D4B
 *                         LocalDirectory: C:\clients\P\PFS_Adena\Filestoprocess\
 *                         MasterEnabled: false
 *                         ParseMessage: Successfully parsed Adena
 *                         PresortPageNum: 1
 *                         PrintMessage: Successfully printed Adena
 *                         RanToday: false
 *                         ReadyForProcessing: false
 *                         ReqUnzip: false
 *                         RunOncePerDay: false
 *                         TimeBased: false
 *                         Wait: 20
 *                       - AutoMoves: true
 *                         ChainJob: false
 *                         DaysProcessed: '1234567'
 *                         ErrorsBypassed: false
 *                         FilesReqdForProcessing: 1
 *                         GAReady: true
 *                         GUID: E08A2B3C-15C6-43A2-A420-A9545FEF6A8B
 *                         Job_GUID: 4BC5DEEE-0243-4CB0-BE02-094616D02D4B
 *                         MasterEnabled: false
 *                         ParseMessage: Successfully parsed Adena
 *                         PresortPageNum: 1
 *                         PrintMessage: Successfully printed Adena
 *                         RanToday: false
 *                         ReadyForProcessing: false
 *                         ReqUnzip: false
 *                         RunOncePerDay: false
 *                         TimeBased: false
 *                         Wait: 20
 *               examples:
 *                 '200':
 *                   value:
 *                     Processes:
 *                       - ArchiveDirectory: C:\clients\P\PFS_Adena\download\
 *                         AutoMoves: true
 *                         ChainJob: false
 *                         DaysProcessed: '1234567'
 *                         ErrorsBypassed: false
 *                         FilesReqdForProcessing: 1
 *                         GAReady: true
 *                         GUID: AEB286FD-A077-4B64-9323-DA52968B63E8
 *                         Job_GUID: 4BC5DEEE-0243-4CB0-BE02-094616D02D4B
 *                         LocalDirectory: C:\clients\P\PFS_Adena\Filestoprocess\
 *                         MasterEnabled: false
 *                         ParseMessage: Successfully parsed Adena
 *                         PresortPageNum: 1
 *                         PrintMessage: Successfully printed Adena
 *                         RanToday: false
 *                         ReadyForProcessing: false
 *                         ReqUnzip: false
 *                         RunOncePerDay: false
 *                         TimeBased: false
 *                         Wait: 20
 *                       - AutoMoves: true
 *                         ChainJob: false
 *                         DaysProcessed: '1234567'
 *                         ErrorsBypassed: false
 *                         FilesReqdForProcessing: 1
 *                         GAReady: true
 *                         GUID: E08A2B3C-15C6-43A2-A420-A9545FEF6A8B
 *                         Job_GUID: 4BC5DEEE-0243-4CB0-BE02-094616D02D4B
 *                         MasterEnabled: false
 *                         ParseMessage: Successfully parsed Adena
 *                         PresortPageNum: 1
 *                         PrintMessage: Successfully printed Adena
 *                         RanToday: false
 *                         ReadyForProcessing: false
 *                         ReqUnzip: false
 *                         RunOncePerDay: false
 *                         TimeBased: false
 *                         Wait: 20
 */
router.get("/", checkReach, dboperations.all_processes);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/processes/{processid}:
 *     get:
 *       tags:
 *         - Processes
 *       summary: Get process params by processid
 *       description: Get process params by processid
 *       operationId: getProcessParamsByProcessid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Processes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         ArchiveDirectory:
 *                           type: string
 *                           example: C:\clients\P\PFS_Adena\download\
 *                         AutoMoves:
 *                           type: boolean
 *                           example: true
 *                         ChainJob:
 *                           type: boolean
 *                           example: false
 *                         DaysProcessed:
 *                           type: string
 *                           example: '1234567'
 *                         ErrorsBypassed:
 *                           type: boolean
 *                           example: false
 *                         FilesReqdForProcessing:
 *                           type: number
 *                           example: 1
 *                         GAReady:
 *                           type: boolean
 *                           example: true
 *                         GUID:
 *                           type: string
 *                           example: 2A8F586D-9B95-4BA0-BB8E-FE6478F5C478
 *                         Job_GUID:
 *                           type: string
 *                           example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory:
 *                           type: string
 *                           example: C:\clients\P\PFS_Adena\Filestoprocess\
 *                         MasterEnabled:
 *                           type: boolean
 *                           example: false
 *                         ParseMessage:
 *                           type: string
 *                           example: Successfully parsed Adena
 *                         PresortPageNum:
 *                           type: number
 *                           example: 1
 *                         PrintMessage:
 *                           type: string
 *                           example: Successfully printed Adena
 *                         RanToday:
 *                           type: boolean
 *                           example: false
 *                         ReadyForProcessing:
 *                           type: boolean
 *                           example: false
 *                         ReqUnzip:
 *                           type: boolean
 *                           example: false
 *                         RunOncePerDay:
 *                           type: boolean
 *                           example: false
 *                         TimeBased:
 *                           type: boolean
 *                           example: false
 *                         Wait:
 *                           type: number
 *                           example: 20
 *                     example:
 *                       - ArchiveDirectory: C:\clients\P\PFS_Adena\download\
 *                         AutoMoves: true
 *                         ChainJob: false
 *                         DaysProcessed: '1234567'
 *                         ErrorsBypassed: false
 *                         FilesReqdForProcessing: 1
 *                         GAReady: true
 *                         GUID: 2A8F586D-9B95-4BA0-BB8E-FE6478F5C478
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C:\clients\P\PFS_Adena\Filestoprocess\
 *                         MasterEnabled: false
 *                         ParseMessage: Successfully parsed Adena
 *                         PresortPageNum: 1
 *                         PrintMessage: Successfully printed Adena
 *                         RanToday: false
 *                         ReadyForProcessing: false
 *                         ReqUnzip: false
 *                         RunOncePerDay: false
 *                         TimeBased: false
 *                         Wait: 20
 *               examples:
 *                 '200':
 *                   value:
 *                     Processes:
 *                       - ArchiveDirectory: C:\clients\P\PFS_Adena\download\
 *                         AutoMoves: true
 *                         ChainJob: false
 *                         DaysProcessed: '1234567'
 *                         ErrorsBypassed: false
 *                         FilesReqdForProcessing: 1
 *                         GAReady: true
 *                         GUID: 2A8F586D-9B95-4BA0-BB8E-FE6478F5C478
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C:\clients\P\PFS_Adena\Filestoprocess\
 *                         MasterEnabled: false
 *                         ParseMessage: Successfully parsed Adena
 *                         PresortPageNum: 1
 *                         PrintMessage: Successfully printed Adena
 *                         RanToday: false
 *                         ReadyForProcessing: false
 *                         ReqUnzip: false
 *                         RunOncePerDay: false
 *                         TimeBased: false
 *                         Wait: 20
 */
router.get("/:processid", checkReach, dboperations.one_process);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/processes/{processid}:
 *     patch:
 *       tags:
 *         - Processes
 *       summary: Update process params by processid
 *       description: Updates only the properties provided
 *       operationId: updateProcessParamsByProcessid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Processes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ArchiveDirectory:
 *                         type: string
 *                         example: C:\clients\P\PFS_Adena\download\
 *                       AutoMoves:
 *                         type: boolean
 *                         example: true
 *                       ChainJob:
 *                         type: boolean
 *                         example: false
 *                       DaysProcessed:
 *                         type: string
 *                         example: '12345'
 *                       ErrorsBypassed:
 *                         type: boolean
 *                         example: false
 *                       FilesReqdForProcessing:
 *                         type: number
 *                         example: 1
 *                       GAReady:
 *                         type: boolean
 *                         example: true
 *                       LocalDirectory:
 *                         type: string
 *                         example: C:\clients\P\PFS_Adena\Filestoprocess\
 *                       MasterEnabled:
 *                         type: boolean
 *                         example: true
 *                       ParseMessage:
 *                         type: string
 *                         example: Successfully updated parse for adena
 *                       PresortPageNum:
 *                         type: number
 *                         example: 1
 *                       PrintMessage:
 *                         type: string
 *                         example: Successfully updated printed msg Adena
 *                       RanToday:
 *                         type: boolean
 *                         example: false
 *                       ReadyForProcessing:
 *                         type: boolean
 *                         example: false
 *                       ReqUnzip:
 *                         type: boolean
 *                         example: false
 *                       RunOncePerDay:
 *                         type: boolean
 *                         example: false
 *                       TimeBased:
 *                         type: boolean
 *                         example: false
 *                   example:
 *                     - ArchiveDirectory: C:\clients\P\PFS_Adena\download\
 *                       AutoMoves: true
 *                       ChainJob: false
 *                       DaysProcessed: '12345'
 *                       ErrorsBypassed: false
 *                       FilesReqdForProcessing: 1
 *                       GAReady: true
 *                       LocalDirectory: C:\clients\P\PFS_Adena\Filestoprocess\
 *                       MasterEnabled: true
 *                       ParseMessage: Successfully updated parse for adena
 *                       PresortPageNum: 1
 *                       PrintMessage: Successfully updated printed msg Adena
 *                       RanToday: false
 *                       ReadyForProcessing: false
 *                       ReqUnzip: false
 *                       RunOncePerDay: false
 *                       TimeBased: false
 *             example:
 *               Processes:
 *                 - ArchiveDirectory: C:\clients\P\PFS_Adena\download\
 *                   AutoMoves: true
 *                   ChainJob: false
 *                   DaysProcessed: '12345'
 *                   ErrorsBypassed: false
 *                   FilesReqdForProcessing: 1
 *                   GAReady: true
 *                   LocalDirectory: C:\clients\P\PFS_Adena\Filestoprocess\
 *                   MasterEnabled: true
 *                   ParseMessage: Successfully updated parse for adena
 *                   PresortPageNum: 1
 *                   PrintMessage: Successfully updated printed msg Adena
 *                   RanToday: false
 *                   ReadyForProcessing: false
 *                   ReqUnzip: false
 *                   RunOncePerDay: false
 *                   TimeBased: false
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Processes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         ArchiveDirectory:
 *                           type: string
 *                           example: C:\clients\P\PFS_Adena\download\
 *                         AutoMoves:
 *                           type: boolean
 *                           example: true
 *                         ChainJob:
 *                           type: boolean
 *                           example: false
 *                         DaysProcessed:
 *                           type: string
 *                           example: '12345'
 *                         ErrorsBypassed:
 *                           type: boolean
 *                           example: false
 *                         FilesReqdForProcessing:
 *                           type: number
 *                           example: 1
 *                         GAReady:
 *                           type: boolean
 *                           example: true
 *                         GUID:
 *                           type: string
 *                           example: 2A8F586D-9B95-4BA0-BB8E-FE6478F5C478
 *                         Job_GUID:
 *                           type: string
 *                           example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory:
 *                           type: string
 *                           example: C:\clients\P\PFS_Adena\Filestoprocess\
 *                         MasterEnabled:
 *                           type: boolean
 *                           example: true
 *                         ParseMessage:
 *                           type: string
 *                           example: Successfully updated parse for adena
 *                         PresortPageNum:
 *                           type: number
 *                           example: 1
 *                         PrintMessage:
 *                           type: string
 *                           example: Successfully updated printed msg Adena
 *                         RanToday:
 *                           type: boolean
 *                           example: false
 *                         ReadyForProcessing:
 *                           type: boolean
 *                           example: false
 *                         ReqUnzip:
 *                           type: boolean
 *                           example: false
 *                         RunOncePerDay:
 *                           type: boolean
 *                           example: false
 *                         TimeBased:
 *                           type: boolean
 *                           example: false
 *                         TimeRan:
 *                           nullable: true
 *                           example: null
 *                         Wait:
 *                           type: number
 *                           example: 20
 *                     example:
 *                       - Active: true
 *                         ArchiveDirectory: C:\clients\P\PFS_Adena\download\
 *                         AutoMoves: true
 *                         ChainJob: false
 *                         DaysProcessed: '12345'
 *                         ErrorsBypassed: false
 *                         FilesReqdForProcessing: 1
 *                         GAReady: true
 *                         GUID: 2A8F586D-9B95-4BA0-BB8E-FE6478F5C478
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C:\clients\P\PFS_Adena\Filestoprocess\
 *                         MasterEnabled: true
 *                         ParseMessage: Successfully updated parse for adena
 *                         PresortPageNum: 1
 *                         PrintMessage: Successfully updated printed msg Adena
 *                         RanToday: false
 *                         ReadyForProcessing: false
 *                         ReqUnzip: false
 *                         RunOncePerDay: false
 *                         TimeBased: false
 *                         TimeRan: null
 *                         Wait: 20
 *               examples:
 *                 '200':
 *                   value:
 *                     Processes:
 *                       - Active: true
 *                         ArchiveDirectory: C:\clients\P\PFS_Adena\download\
 *                         AutoMoves: true
 *                         ChainJob: false
 *                         DaysProcessed: '12345'
 *                         ErrorsBypassed: false
 *                         FilesReqdForProcessing: 1
 *                         GAReady: true
 *                         GUID: 2A8F586D-9B95-4BA0-BB8E-FE6478F5C478
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C:\clients\P\PFS_Adena\Filestoprocess\
 *                         MasterEnabled: true
 *                         ParseMessage: Successfully updated parse for adena
 *                         PresortPageNum: 1
 *                         PrintMessage: Successfully updated printed msg Adena
 *                         RanToday: false
 *                         ReadyForProcessing: false
 *                         ReqUnzip: false
 *                         RunOncePerDay: false
 *                         TimeBased: false
 *                         TimeRan: null
 *                         Wait: 20
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: eef6168f-10f2-4c6a-a456-f756f36808a8
 *       - name: jobid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 3aad5759-477e-4de8-bf5a-530f4a21e5d5
 *       - name: processid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 3778ef2b-085a-47b1-839a-2c0f94559e2d
 */
router.patch("/:processid", checkReach, dboperations.update_process);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/processes:
 *     post:
 *       tags:
 *         - Processes
 *       summary: Create processing params for job
 *       description: Create processing params for job
 *       operationId: createProcessingParamsForJob
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Processes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       AutoMoves:
 *                         type: boolean
 *                         example: true
 *                       ChainJob:
 *                         type: boolean
 *                         example: false
 *                       DaysProcessed:
 *                         type: string
 *                         example: '1234567'
 *                       Directory:
 *                         type: string
 *                         example: C:\clients\P\PFS_Adena\Filestoprocess\
 *                       FileArchive:
 *                         type: string
 *                         example: C:\clients\P\PFS_Adena\download\
 *                       FilesRequired:
 *                         type: number
 *                         example: 1
 *                       GAMasterEnabled:
 *                         type: boolean
 *                         example: true
 *                       Job_GUID:
 *                         type: string
 *                         example: 4bc5deee-0243-4cb0-be02-094616d02d4b
 *                       MasterEnabled:
 *                         type: boolean
 *                         example: false
 *                       ParseMessage:
 *                         type: string
 *                         example: Successfully parsed Adena
 *                       PresortPageNum:
 *                         type: number
 *                         example: 1
 *                       PrintMessage:
 *                         type: string
 *                         example: Successfully printed Adena
 *                       RunOncePerDay:
 *                         type: boolean
 *                         example: false
 *                       TimeBased:
 *                         type: boolean
 *                         example: false
 *                       UnzipRequired:
 *                         type: boolean
 *                         example: false
 *                       Wait:
 *                         type: number
 *                         example: 20
 *                   example:
 *                     - Active: true
 *                       AutoMoves: true
 *                       ChainJob: false
 *                       DaysProcessed: '1234567'
 *                       Directory: C:\clients\P\PFS_Adena\Filestoprocess\
 *                       FileArchive: C:\clients\P\PFS_Adena\download\
 *                       FilesRequired: 1
 *                       GAMasterEnabled: true
 *                       Job_GUID: 4bc5deee-0243-4cb0-be02-094616d02d4b
 *                       MasterEnabled: false
 *                       ParseMessage: Successfully parsed Adena
 *                       PresortPageNum: 1
 *                       PrintMessage: Successfully printed Adena
 *                       RunOncePerDay: false
 *                       TimeBased: false
 *                       UnzipRequired: false
 *                       Wait: 20
 *             example:
 *               Processes:
 *                 - Active: true
 *                   AutoMoves: true
 *                   ChainJob: false
 *                   DaysProcessed: '1234567'
 *                   Directory: C:\clients\P\PFS_Adena\Filestoprocess\
 *                   FileArchive: C:\clients\P\PFS_Adena\download\
 *                   FilesRequired: 1
 *                   GAMasterEnabled: true
 *                   Job_GUID: 4bc5deee-0243-4cb0-be02-094616d02d4b
 *                   MasterEnabled: false
 *                   ParseMessage: Successfully parsed Adena
 *                   PresortPageNum: 1
 *                   PrintMessage: Successfully printed Adena
 *                   RunOncePerDay: false
 *                   TimeBased: false
 *                   UnzipRequired: false
 *                   Wait: 20
 *       responses:
 *         '201':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Processes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         ArchiveDirectory:
 *                           nullable: true
 *                           example: null
 *                         AutoMoves:
 *                           type: boolean
 *                           example: true
 *                         ChainJob:
 *                           type: boolean
 *                           example: false
 *                         DaysProcessed:
 *                           type: string
 *                           example: '1234567'
 *                         FilesRequired:
 *                           type: number
 *                           example: 1
 *                         GAMasterEnabled:
 *                           type: boolean
 *                           example: true
 *                         GUID:
 *                           type: string
 *                           example: E08A2B3C-15C6-43A2-A420-A9545FEF6A8B
 *                         Job_GUID:
 *                           type: string
 *                           example: 4BC5DEEE-0243-4CB0-BE02-094616D02D4B
 *                         MasterEnabled:
 *                           type: boolean
 *                           example: false
 *                         ParseMessage:
 *                           type: string
 *                           example: Successfully parsed Adena
 *                         PresortPageNum:
 *                           type: number
 *                           example: 1
 *                         PrintMessage:
 *                           type: string
 *                           example: Successfully printed Adena
 *                         ProcessDirectory:
 *                           nullable: true
 *                           example: null
 *                         RunOncePerDay:
 *                           type: boolean
 *                           example: false
 *                         RunTime:
 *                           nullable: true
 *                           example: null
 *                         TimeBased:
 *                           type: boolean
 *                           example: false
 *                         UnzipRequired:
 *                           type: boolean
 *                           example: false
 *                         Wait:
 *                           type: number
 *                           example: 20
 *                     example:
 *                       - Active: true
 *                         ArchiveDirectory: null
 *                         AutoMoves: true
 *                         ChainJob: false
 *                         DaysProcessed: '1234567'
 *                         FilesRequired: 1
 *                         GAMasterEnabled: true
 *                         GUID: E08A2B3C-15C6-43A2-A420-A9545FEF6A8B
 *                         Job_GUID: 4BC5DEEE-0243-4CB0-BE02-094616D02D4B
 *                         MasterEnabled: false
 *                         ParseMessage: Successfully parsed Adena
 *                         PresortPageNum: 1
 *                         PrintMessage: Successfully printed Adena
 *                         ProcessDirectory: null
 *                         RunOncePerDay: false
 *                         RunTime: null
 *                         TimeBased: false
 *                         UnzipRequired: false
 *                         Wait: 20
 *               examples:
 *                 '200':
 *                   value:
 *                     Processes:
 *                       - Active: true
 *                         ArchiveDirectory: null
 *                         AutoMoves: true
 *                         ChainJob: false
 *                         DaysProcessed: '1234567'
 *                         FilesRequired: 1
 *                         GAMasterEnabled: true
 *                         GUID: E08A2B3C-15C6-43A2-A420-A9545FEF6A8B
 *                         Job_GUID: 4BC5DEEE-0243-4CB0-BE02-094616D02D4B
 *                         MasterEnabled: false
 *                         ParseMessage: Successfully parsed Adena
 *                         PresortPageNum: 1
 *                         PrintMessage: Successfully printed Adena
 *                         ProcessDirectory: null
 *                         RunOncePerDay: false
 *                         RunTime: null
 *                         TimeBased: false
 *                         UnzipRequired: false
 *                         Wait: 20
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
 *           example: 4bc5deee-0243-4cb0-be02-094616d02d4b
 */
router.post("/", checkReach, authLvl, dboperations.create_processes);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/processes/{processid}:
 *     delete:
 *       tags:
 *         - Processes
 *       summary: Delete process params by processid
 *       description: Delete process params by processid
 *       operationId: deleteProcessParamsByProcessid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Processes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         GUID:
 *                           type: string
 *                           example: 3778EF2B-085A-47B1-839A-2C0F94559E2D
 *                     example:
 *                       - Active: false
 *                         GUID: 3778EF2B-085A-47B1-839A-2C0F94559E2D
 *               examples:
 *                 '200':
 *                   value:
 *                     Processes:
 *                       - Active: false
 *                         GUID: 3778EF2B-085A-47B1-839A-2C0F94559E2D
 */
router.delete("/:processid", checkReach, authLvl, dboperations.delete_process);

module.exports = router;
