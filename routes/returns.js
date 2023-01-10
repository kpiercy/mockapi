require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes


//controller
const dboperations = require("../controllers/returns");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/returns:
 *     get:
 *       tags:
 *         - Returns
 *       summary: Get all returns by jobid
 *       description: Get all returns by jobid
 *       operationId: getAllReturnsByJobid
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
 *                   Returns:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AdditionalTask:
 *                           type: string
 *                           example: ''
 *                         DaysToReturn:
 *                           type: string
 *                           example: "1234567\0\0\0"
 *                         GUID:
 *                           type: string
 *                           example: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 *                         Job_GUID:
 *                           type: string
 *                           example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory:
 *                           type: string
 *                           example: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                         Mask:
 *                           type: string
 *                           example: Summary_
 *                         MultiRemoteDirectory:
 *                           type: string
 *                           example: ''
 *                         MultiServerID:
 *                           type: number
 *                           example: 0
 *                         MultiUpload:
 *                           type: boolean
 *                           example: false
 *                         RemoteDirectory:
 *                           type: string
 *                           example: /PFS/zAdena/Reports
 *                         ReturnZipName:
 *                           type: string
 *                           example: ''
 *                         ServerID:
 *                           type: number
 *                           example: 0
 *                         TimeBased:
 *                           type: boolean
 *                           example: false
 *                         TimeToReturn:
 *                           type: string
 *                           example: '00:00:00'
 *                         Type:
 *                           type: number
 *                           example: 4
 *                     example:
 *                       - AdditionalTask: ''
 *                         DaysToReturn: "1234567\0\0\0"
 *                         GUID: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                         Mask: Summary_
 *                         MultiRemoteDirectory: ''
 *                         MultiServerID: 0
 *                         MultiUpload: false
 *                         RemoteDirectory: /PFS/zAdena/Reports
 *                         ReturnZipName: ''
 *                         ServerID: 0
 *                         TimeBased: false
 *                         TimeToReturn: '00:00:00'
 *                         Type: 4
 *               examples:
 *                 '200':
 *                   value:
 *                     Returns:
 *                       - AdditionalTask: ''
 *                         DaysToReturn: "1234567\0\0\0"
 *                         GUID: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                         Mask: Summary_
 *                         MultiRemoteDirectory: ''
 *                         MultiServerID: 0
 *                         MultiUpload: false
 *                         RemoteDirectory: /PFS/zAdena/Reports
 *                         ReturnZipName: ''
 *                         ServerID: 0
 *                         TimeBased: false
 *                         TimeToReturn: '00:00:00'
 *                         Type: 4
 */
router.get("/", checkReach, dboperations.all_returns);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/returns/{returnid}:
 *     get:
 *       tags:
 *         - Returns
 *       summary: Get return by id
 *       description: Get return by id
 *       operationId: getReturnById
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Returns:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         AdditionalTask:
 *                           type: string
 *                           example: ''
 *                         DaysToReturn:
 *                           type: string
 *                           example: '1234567'
 *                         GUID:
 *                           type: string
 *                           example: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 *                         Job_GUID:
 *                           type: string
 *                           example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory:
 *                           type: string
 *                           example: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                         Mask:
 *                           type: string
 *                           example: Summary_
 *                         MultiRemoteDirectory:
 *                           type: string
 *                           example: ''
 *                         MultiServerID:
 *                           type: number
 *                           example: 0
 *                         MultiUpload:
 *                           type: boolean
 *                           example: false
 *                         RemoteDirectory:
 *                           type: string
 *                           example: /PFS/zAdena/Reports
 *                         ReturnZipName:
 *                           type: string
 *                           example: ''
 *                         ServerID:
 *                           type: number
 *                           example: 0
 *                         TimeBased:
 *                           type: boolean
 *                           example: false
 *                         TimeToReturn:
 *                           type: string
 *                           example: '00:00:00'
 *                         Type:
 *                           type: number
 *                           example: 4
 *                     example:
 *                       - AdditionalTask: ''
 *                         DaysToReturn: '1234567'
 *                         GUID: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                         Mask: Summary_
 *                         MultiRemoteDirectory: ''
 *                         MultiServerID: 0
 *                         MultiUpload: false
 *                         RemoteDirectory: /PFS/zAdena/Reports
 *                         ReturnZipName: ''
 *                         ServerID: 0
 *                         TimeBased: false
 *                         TimeToReturn: '00:00:00'
 *                         Type: 4
 *               examples:
 *                 '200':
 *                   value:
 *                     Returns:
 *                       - AdditionalTask: ''
 *                         DaysToReturn: '1234567'
 *                         GUID: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                         Mask: Summary_
 *                         MultiRemoteDirectory: ''
 *                         MultiServerID: 0
 *                         MultiUpload: false
 *                         RemoteDirectory: /PFS/zAdena/Reports
 *                         ReturnZipName: ''
 *                         ServerID: 0
 *                         TimeBased: false
 *                         TimeToReturn: '00:00:00'
 *                         Type: 4
 */
router.get("/:returnid", checkReach, dboperations.one_return);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/returns/{returnid}:
 *     patch:
 *       tags:
 *         - Returns
 *       summary: Update return by id
 *       description: Update return by id
 *       operationId: updateReturnById
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Returns:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AdditionalTask:
 *                         type: string
 *                         example: new task
 *                       LocalDirectory:
 *                         type: string
 *                         example: new local
 *                       Mask:
 *                         type: string
 *                         example: new return mask
 *                       MultiRemoteDirectory:
 *                         type: string
 *                         example: new multi
 *                       MultiServer:
 *                         type: number
 *                         example: 0
 *                       MultiUpload:
 *                         type: boolean
 *                         example: false
 *                       Password:
 *                         type: string
 *                         example: some fancy password
 *                       RemoteDirectory:
 *                         type: string
 *                         example: new remotedir
 *                       ReturnTime:
 *                         type: string
 *                         example: '11:00:00'
 *                       Server:
 *                         type: number
 *                         example: 5
 *                       TimeBased:
 *                         type: number
 *                         example: 0
 *                       Type:
 *                         type: number
 *                         example: 0
 *                       ZipName:
 *                         type: string
 *                         example: new zipname
 *                   example:
 *                     - AdditionalTask: new task
 *                       LocalDirectory: new local
 *                       Mask: new return mask
 *                       MultiRemoteDirectory: new multi
 *                       MultiServer: 0
 *                       MultiUpload: false
 *                       Password: some fancy password
 *                       RemoteDirectory: new remotedir
 *                       ReturnTime: '11:00:00'
 *                       Server: 5
 *                       TimeBased: 0
 *                       Type: 0
 *                       ZipName: new zipname
 *             example:
 *               Returns:
 *                 - AdditionalTask: new task
 *                   LocalDirectory: new local
 *                   Mask: new return mask
 *                   MultiRemoteDirectory: new multi
 *                   MultiServer: 0
 *                   MultiUpload: false
 *                   Password: some fancy password
 *                   RemoteDirectory: new remotedir
 *                   ReturnTime: '11:00:00'
 *                   Server: 5
 *                   TimeBased: 0
 *                   Type: 0
 *                   ZipName: new zipname
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Returns:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         DaysToReturn:
 *                           type: string
 *                           example: '1234567'
 *                         GUID:
 *                           type: string
 *                           example: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 *                         Mask:
 *                           type: string
 *                           example: new return mask
 *                         RemoteDirectory:
 *                           type: string
 *                           example: new remotedir
 *                         ReturnTime:
 *                           type: string
 *                           example: '1970-01-01T11:00:00.000Z'
 *                         Server:
 *                           type: number
 *                           example: 5
 *                         TimeBased:
 *                           type: boolean
 *                           example: false
 *                         Type:
 *                           type: number
 *                           example: 0
 *                     example:
 *                       - DaysToReturn: '1234567'
 *                         GUID: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 *                         Mask: new return mask
 *                         RemoteDirectory: new remotedir
 *                         ReturnTime: '1970-01-01T11:00:00.000Z'
 *                         Server: 5
 *                         TimeBased: false
 *                         Type: 0
 *               examples:
 *                 '200':
 *                   value:
 *                     Returns:
 *                       - DaysToReturn: '1234567'
 *                         GUID: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 *                         Mask: new return mask
 *                         RemoteDirectory: new remotedir
 *                         ReturnTime: '1970-01-01T11:00:00.000Z'
 *                         Server: 5
 *                         TimeBased: false
 *                         Type: 0
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
 *       - name: returnid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 */
router.patch("/:returnid", checkReach, authLvl, dboperations.update_return);

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/returns:
 *     post:
 *       tags:
 *         - Returns
 *       summary: Create returns for job
 *       description: Create returns for job
 *       operationId: createReturnsForJob
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Returns:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AdditionalTask:
 *                         type: string
 *                         example: ''
 *                       DaysToReturn:
 *                         type: number
 *                         example: 1234567
 *                       Job_GUID:
 *                         type: string
 *                         example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LocalDirectory:
 *                         type: string
 *                         example: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                       Mask:
 *                         type: string
 *                         example: Summary_
 *                       MultiRemoteDirectory:
 *                         type: string
 *                         example: ''
 *                       MultiServer:
 *                         type: number
 *                         example: 0
 *                       MultiUpload:
 *                         type: number
 *                         example: 0
 *                       Password:
 *                         type: string
 *                         example: ''
 *                       RemoteDirectory:
 *                         type: string
 *                         example: /PFS/zAdena/Reports
 *                       ReturnTime:
 *                         type: string
 *                         example: ''
 *                       Server:
 *                         type: number
 *                         example: 0
 *                       TimeBased:
 *                         type: number
 *                         example: 0
 *                       Type:
 *                         type: number
 *                         example: 4
 *                       ZipName:
 *                         type: string
 *                         example: ''
 *                   example:
 *                     - AdditionalTask: ''
 *                       DaysToReturn: 1234567
 *                       Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                       Mask: Summary_
 *                       MultiRemoteDirectory: ''
 *                       MultiServer: 0
 *                       MultiUpload: 0
 *                       Password: ''
 *                       RemoteDirectory: /PFS/zAdena/Reports
 *                       ReturnTime: ''
 *                       Server: 0
 *                       TimeBased: 0
 *                       Type: 4
 *                       ZipName: ''
 *             example:
 *               Returns:
 *                 - AdditionalTask: ''
 *                   DaysToReturn: 1234567
 *                   Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                   LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *                   Mask: Summary_
 *                   MultiRemoteDirectory: ''
 *                   MultiServer: 0
 *                   MultiUpload: 0
 *                   Password: ''
 *                   RemoteDirectory: /PFS/zAdena/Reports
 *                   ReturnTime: ''
 *                   Server: 0
 *                   TimeBased: 0
 *                   Type: 4
 *                   ZipName: ''
 *       responses:
 *         '201':
 *           description: '201'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Returns:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         DaysToReturn:
 *                           type: string
 *                           example: '1234567'
 *                         GUID:
 *                           type: string
 *                           example: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 *                         Mask:
 *                           type: string
 *                           example: Summary_
 *                         RemoteDirectory:
 *                           type: string
 *                           example: /PFS/zAdena/Reports
 *                         ReturnTime:
 *                           type: string
 *                           example: '1971-01-01T00:00:00.000Z'
 *                         Server:
 *                           type: number
 *                           example: 0
 *                         TimeBased:
 *                           type: boolean
 *                           example: false
 *                         Type:
 *                           type: number
 *                           example: 4
 *                     example:
 *                       - DaysToReturn: '1234567'
 *                         GUID: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 *                         Mask: Summary_
 *                         RemoteDirectory: /PFS/zAdena/Reports
 *                         ReturnTime: '1971-01-01T00:00:00.000Z'
 *                         Server: 0
 *                         TimeBased: false
 *                         Type: 4
 *               examples:
 *                 '201':
 *                   value:
 *                     Returns:
 *                       - DaysToReturn: '1234567'
 *                         GUID: 039F4137-0C8E-40F3-9AF8-3EFB145F7A6A
 *                         Mask: Summary_
 *                         RemoteDirectory: /PFS/zAdena/Reports
 *                         ReturnTime: '1971-01-01T00:00:00.000Z'
 *                         Server: 0
 *                         TimeBased: false
 *                         Type: 4
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
router.post("/", checkReach, authLvl, dboperations.create_return);

//delete return
router.delete("/:returnid", checkReach, authLvl, dboperations.delete_return);

module.exports = router;
