require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes

//controller
const dboperations = require('../controllers/downloads')

//model

//router options and children
router.use(pubip().getIpInfoMiddleware)
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/downloads:
 *     get:
 *       tags:
 *         - Downloads
 *       summary: Get all downloads by jobid
 *       description: Get all downloads by jobid
 *       operationId: getAllDownloadsByJobid
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
 *                   Downloads:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         AdditionalTask:
 *                           type: string
 *                           example: someadditionaltask
 *                         AppendValue:
 *                           type: string
 *                           example: ''
 *                         Convert:
 *                           type: boolean
 *                           example: false
 *                         ConvertToDelimiter:
 *                           type: string
 *                           example: ''
 *                         ConvertToExtension:
 *                           type: string
 *                           example: ''
 *                         GUID:
 *                           type: string
 *                           example: B9C09CA8-3DA6-450D-A9A5-3168FF7404A1
 *                         IgnoreMask:
 *                           type: string
 *                           example: '*ignoreIt.csv'
 *                         Job_GUID:
 *                           type: string
 *                           example: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory:
 *                           type: string
 *                           example: C:\clients\P\PFS_zAdena\Filestoprocess\
 *                         Mask:
 *                           type: string
 *                           example: '*.anEXT'
 *                         NewFilename:
 *                           type: string
 *                           example: ''
 *                         Password:
 *                           type: string
 *                           example: a[pdfbnijp234509gk
 *                         RemoteDirectory:
 *                           type: string
 *                           example: /PFS/zAdena/
 *                         Renamed:
 *                           type: boolean
 *                           example: false
 *                         Server:
 *                           type: number
 *                           example: 0
 *                         Timestamped:
 *                           type: boolean
 *                           example: true
 *                     example:
 *                       - Active: true
 *                         AdditionalTask: someadditionaltask
 *                         AppendValue: ''
 *                         Convert: false
 *                         ConvertToDelimiter: ''
 *                         ConvertToExtension: ''
 *                         GUID: B9C09CA8-3DA6-450D-A9A5-3168FF7404A1
 *                         IgnoreMask: '*ignoreIt.csv'
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C:\clients\P\PFS_zAdena\Filestoprocess\
 *                         Mask: '*.anEXT'
 *                         NewFilename: ''
 *                         Password: a[pdfbnijp234509gk
 *                         RemoteDirectory: /PFS/zAdena/
 *                         Renamed: false
 *                         Server: 0
 *                         Timestamped: true
 *               examples:
 *                 '200':
 *                   value:
 *                     Downloads:
 *                       - Active: true
 *                         AdditionalTask: someadditionaltask
 *                         AppendValue: ''
 *                         Convert: false
 *                         ConvertToDelimiter: ''
 *                         ConvertToExtension: ''
 *                         GUID: B9C09CA8-3DA6-450D-A9A5-3168FF7404A1
 *                         IgnoreMask: '*ignoreIt.csv'
 *                         Job_GUID: 664C6B5E-334E-4368-988E-167E02C34EC9
 *                         LocalDirectory: C:\clients\P\PFS_zAdena\Filestoprocess\
 *                         Mask: '*.anEXT'
 *                         NewFilename: ''
 *                         Password: a[pdfbnijp234509gk
 *                         RemoteDirectory: /PFS/zAdena/
 *                         Renamed: false
 *                         Server: 0
 *                         Timestamped: true
 */
router.get('/', checkReach, dboperations.all_downloads)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/downloads/{downloadid}:
 *     get:
 *       tags:
 *         - Downloads
 *       summary: Get download by downloadid
 *       description: Get download by downloadid
 *       operationId: getDownloadByDownloadid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Downloads:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         Convert:
 *                           type: boolean
 *                           example: false
 *                         ConvertToColumns:
 *                           type: number
 *                           example: 0
 *                         GUID:
 *                           type: string
 *                           example: 90D3AD4F-FFEF-4772-8B63-12811216E39E
 *                         IgnoreMask:
 *                           type: string
 *                           example: '*.bat'
 *                         Job_GUID:
 *                           type: string
 *                           example: 815E61F0-98CE-4BCA-AFDA-DC1855312CD2
 *                         LocalDirectory:
 *                           type: string
 *                           example: C:/clients/P/PFS Adena/Messages/
 *                         Mask:
 *                           type: string
 *                           example: '*.anEXT'
 *                         Password:
 *                           type: string
 *                           example: somegreatpassword1!
 *                         RemoteDirectory:
 *                           type: string
 *                           example: ../testing/zAdena/Messages
 *                         Renamed:
 *                           type: boolean
 *                           example: false
 *                         Server:
 *                           type: number
 *                           example: 0
 *                         Timestamped:
 *                           type: boolean
 *                           example: true
 *                     example:
 *                       - Active: true
 *                         Convert: false
 *                         ConvertToColumns: 0
 *                         GUID: 90D3AD4F-FFEF-4772-8B63-12811216E39E
 *                         IgnoreMask: '*.bat'
 *                         Job_GUID: 815E61F0-98CE-4BCA-AFDA-DC1855312CD2
 *                         LocalDirectory: C:/clients/P/PFS Adena/Messages/
 *                         Mask: '*.anEXT'
 *                         Password: somegreatpassword1!
 *                         RemoteDirectory: ../testing/zAdena/Messages
 *                         Renamed: false
 *                         Server: 0
 *                         Timestamped: true
 *               examples:
 *                 '200':
 *                   value:
 *                     Downloads:
 *                       - Active: true
 *                         Convert: false
 *                         ConvertToColumns: 0
 *                         GUID: 90D3AD4F-FFEF-4772-8B63-12811216E39E
 *                         IgnoreMask: '*.bat'
 *                         Job_GUID: 815E61F0-98CE-4BCA-AFDA-DC1855312CD2
 *                         LocalDirectory: C:/clients/P/PFS Adena/Messages/
 *                         Mask: '*.anEXT'
 *                         Password: somegreatpassword1!
 *                         RemoteDirectory: ../testing/zAdena/Messages
 *                         Renamed: false
 *                         Server: 0
 *                         Timestamped: true
 */
router.get('/:downloadid', checkReach, dboperations.one_download)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/downloads/{downloadid}:
 *     patch:
 *       tags:
 *         - Downloads
 *       summary: Update download by downloadid
 *       description: Update download by downloadid
 *       operationId: updateDownloadByDownloadid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Downloads:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       Active:
 *                         type: boolean
 *                         example: true
 *                       AdditionalTask:
 *                         type: string
 *                         example: newTask.txt
 *                       AppendValue:
 *                         type: string
 *                         example: appendedValue
 *                       ConverToDelimiter:
 *                         type: string
 *                         example: pipe
 *                       Convert:
 *                         type: boolean
 *                         example: false
 *                       ConvertToColumns:
 *                         type: number
 *                         example: 100
 *                       ConvertToExtension:
 *                         type: string
 *                         example: .txt
 *                       IgnoreMask:
 *                         type: string
 *                         example: new ignore
 *                       LocalDirectory:
 *                         type: string
 *                         example: o.O new local
 *                       Mask:
 *                         type: string
 *                         example: updatedMask*.*
 *                       NewFilename:
 *                         type: string
 *                         example: gotanewname
 *                       Password:
 *                         type: string
 *                         example: anewpassword12345678
 *                       RemoteDirectory:
 *                         type: string
 *                         example: /updated/zAdena/updatedRemote
 *                       Renamed:
 *                         type: boolean
 *                         example: false
 *                       Server:
 *                         type: number
 *                         example: 4
 *                       Timestamped:
 *                         type: boolean
 *                         example: true
 *                   example:
 *                     - Active: true
 *                       AdditionalTask: newTask.txt
 *                       AppendValue: appendedValue
 *                       ConverToDelimiter: pipe
 *                       Convert: false
 *                       ConvertToColumns: 100
 *                       ConvertToExtension: .txt
 *                       IgnoreMask: new ignore
 *                       LocalDirectory: o.O new local
 *                       Mask: updatedMask*.*
 *                       NewFilename: gotanewname
 *                       Password: anewpassword12345678
 *                       RemoteDirectory: /updated/zAdena/updatedRemote
 *                       Renamed: false
 *                       Server: 4
 *                       Timestamped: true
 *             example:
 *               Downloads:
 *                 - Active: true
 *                   AdditionalTask: newTask.txt
 *                   AppendValue: appendedValue
 *                   ConverToDelimiter: pipe
 *                   Convert: false
 *                   ConvertToColumns: 100
 *                   ConvertToExtension: .txt
 *                   IgnoreMask: new ignore
 *                   LocalDirectory: o.O new local
 *                   Mask: updatedMask*.*
 *                   NewFilename: gotanewname
 *                   Password: anewpassword12345678
 *                   RemoteDirectory: /updated/zAdena/updatedRemote
 *                   Renamed: false
 *                   Server: 4
 *                   Timestamped: true
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Downloads:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         Convert:
 *                           type: boolean
 *                           example: false
 *                         GUID:
 *                           type: string
 *                           example: C79796E5-2FFC-4271-BEB6-3CF6FFE9C0EC
 *                         Mask:
 *                           type: string
 *                           example: updatedMask*.*
 *                         RemoteDirectory:
 *                           type: string
 *                           example: /updated/zAdena/updatedRemote
 *                         Renamed:
 *                           type: boolean
 *                           example: false
 *                         Server:
 *                           type: number
 *                           example: 4
 *                         Timestamped:
 *                           type: boolean
 *                           example: true
 *                     example:
 *                       - Active: true
 *                         Convert: false
 *                         GUID: C79796E5-2FFC-4271-BEB6-3CF6FFE9C0EC
 *                         Mask: updatedMask*.*
 *                         RemoteDirectory: /updated/zAdena/updatedRemote
 *                         Renamed: false
 *                         Server: 4
 *                         Timestamped: true
 *               examples:
 *                 '200':
 *                   value:
 *                     Downloads:
 *                       - Active: true
 *                         Convert: false
 *                         GUID: C79796E5-2FFC-4271-BEB6-3CF6FFE9C0EC
 *                         Mask: updatedMask*.*
 *                         RemoteDirectory: /updated/zAdena/updatedRemote
 *                         Renamed: false
 *                         Server: 4
 *                         Timestamped: true
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
 *       - name: downloadid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 90D3AD4F-FFEF-4772-8B63-12811216E39E
 */
router.patch('/:downloadid', checkReach, dboperations.update_download)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/downloads:
 *     post:
 *       tags:
 *         - Downloads
 *       summary: Create downloads for job
 *       description: Create downloads for job
 *       operationId: createDownloadsForJob
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Downloads:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AdditionalTask:
 *                         type: string
 *                         example: someadditionaltask
 *                       AppendValue:
 *                         type: string
 *                         example: ''
 *                       Convert:
 *                         type: number
 *                         example: 0
 *                       ConvertToDelimiter:
 *                         type: string
 *                         example: ''
 *                       ConvertToExtension:
 *                         type: string
 *                         example: ''
 *                       ConvertyToColumns:
 *                         type: number
 *                         example: 0
 *                       IgnoreMask:
 *                         type: string
 *                         example: '*ignoreIt.csv'
 *                       Job_GUID:
 *                         type: string
 *                         example: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LocalDirectory:
 *                         type: string
 *                         example: C:\clients\P\PFS_zAdena\Filestoprocess\
 *                       Mask:
 *                         type: string
 *                         example: '*.anEXT'
 *                       NewFilename:
 *                         type: string
 *                         example: ''
 *                       Password:
 *                         type: string
 *                         example: a[pdfbnijp234509gk
 *                       RemoteDirectory:
 *                         type: string
 *                         example: /PFS/zAdena/
 *                       Renamed:
 *                         type: number
 *                         example: 0
 *                       Server:
 *                         type: number
 *                         example: 0
 *                       Timestamped:
 *                         type: number
 *                         example: 1
 *                   example:
 *                     - AdditionalTask: someadditionaltask
 *                       AppendValue: ''
 *                       Convert: 0
 *                       ConvertToDelimiter: ''
 *                       ConvertToExtension: ''
 *                       ConvertyToColumns: 0
 *                       IgnoreMask: '*ignoreIt.csv'
 *                       Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                       LocalDirectory: C:\clients\P\PFS_zAdena\Filestoprocess\
 *                       Mask: '*.anEXT'
 *                       NewFilename: ''
 *                       Password: a[pdfbnijp234509gk
 *                       RemoteDirectory: /PFS/zAdena/
 *                       Renamed: 0
 *                       Server: 0
 *                       Timestamped: 1
 *             example:
 *               Downloads:
 *                 - AdditionalTask: someadditionaltask
 *                   AppendValue: ''
 *                   Convert: 0
 *                   ConvertToDelimiter: ''
 *                   ConvertToExtension: ''
 *                   ConvertyToColumns: 0
 *                   IgnoreMask: '*ignoreIt.csv'
 *                   Job_GUID: 664c6b5e-334e-4368-988e-167e02c34ec9
 *                   LocalDirectory: C:\clients\P\PFS_zAdena\Filestoprocess\
 *                   Mask: '*.anEXT'
 *                   NewFilename: ''
 *                   Password: a[pdfbnijp234509gk
 *                   RemoteDirectory: /PFS/zAdena/
 *                   Renamed: 0
 *                   Server: 0
 *                   Timestamped: 1
 *       responses:
 *         '201':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Downloads:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Convert:
 *                           type: boolean
 *                           example: false
 *                         GUID:
 *                           type: string
 *                           example: B9C09CA8-3DA6-450D-A9A5-3168FF7404A1
 *                         Mask:
 *                           type: string
 *                           example: '*.anEXT'
 *                         RemoteDirectory:
 *                           type: string
 *                           example: /PFS/zAdena/
 *                         Renamed:
 *                           type: boolean
 *                           example: false
 *                         Server:
 *                           type: number
 *                           example: 0
 *                         Timestamped:
 *                           type: boolean
 *                           example: true
 *                     example:
 *                       - Convert: false
 *                         GUID: B9C09CA8-3DA6-450D-A9A5-3168FF7404A1
 *                         Mask: '*.anEXT'
 *                         RemoteDirectory: /PFS/zAdena/
 *                         Renamed: false
 *                         Server: 0
 *                         Timestamped: true
 *               examples:
 *                 '200':
 *                   value:
 *                     Downloads:
 *                       - Convert: false
 *                         GUID: B9C09CA8-3DA6-450D-A9A5-3168FF7404A1
 *                         Mask: '*.anEXT'
 *                         RemoteDirectory: /PFS/zAdena/
 *                         Renamed: false
 *                         Server: 0
 *                         Timestamped: true
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
router.post('/', checkReach, authLvl, dboperations.create_download)

/**
 * @swagger
 *   /clients/{clientid}/jobs/{jobid}/downloads/{downloadid}:
 *     delete:
 *       tags:
 *         - Downloads
 *       summary: Delete download by id
 *       description: Delete download by id
 *       operationId: deleteDownloadById
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Downloads:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: false
 *                         GUID:
 *                           type: string
 *                           example: 90D3AD4F-FFEF-4772-8B63-12811216E39E
 *                     example:
 *                       - Active: false
 *                         GUID: 90D3AD4F-FFEF-4772-8B63-12811216E39E
 *               examples:
 *                 '200':
 *                   value:
 *                     Downloads:
 *                       - Active: false
 *                         GUID: 90D3AD4F-FFEF-4772-8B63-12811216E39E
 */
router.delete('/:downloadid', checkReach, authLvl, dboperations.delete_download)

module.exports = router;