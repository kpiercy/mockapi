require('dotenv').config()

//2FA notes: store pubIP to DB during registration/setup, if requesting pubIP does not match stored value, send email during /auth or /refresh to user email with link containing /me/confirm route and token that expires in 1 day, during /me/confirm route, append the new pubIp to their pubIp field, ALSO add windows scheduler script that reset each users "confirmed" status to false every xx days to make them redo 2FA

const express = require('express')
const pubip = require("express-ip");
const router = express.Router({ mergeParams: true });

//middleware
const authlimiter = require('../middleware/authlimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl')
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const validateDto = require('../middleware/validateDto')
const userDto = require("../schemas/users");

//controller
const dboperations = require('../controllers/users')

router.use(pubip().getIpInfoMiddleware)
router.all('*', authlimiter)

 /**
  * @swagger
  * tags:
  *   name: Users
  *   description: 
  */

/**
 * @swagger
 *   /clients/users/login:
 *     post:
 *       tags:
 *         - Users
 *       summary: Login user
 *       description: >-
 *         Generates an AccessToken and RefreshToken for the user if they exist in
 *         the DB, also stores to users record. Can be used subsequent times, but
 *         typically only for initial access, then use /refresh afterwards to get
 *         new access token.
 *       operationId: loginUser
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password:
 *                   type: string
 *                   example: 76D%L!H02wr6O@m
 *                 username:
 *                   type: string
 *                   example: kpiercy
 *             example:
 *               password: 76D%L!H02wr6O@m
 *               username: kpiercy
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   accessExpiresIn:
 *                     type: string
 *                     example: 30min
 *                   client:
 *                     type: string
 *                     example: 6A0AD3CB-D41E-492C-8B48-970060A22136
 *                   parent:
 *                     nullable: true
 *                     example: null
 *                   permissions:
 *                     type: string
 *                     example: Admin
 *                   refreshExpiresIn:
 *                     type: string
 *                     example: 8hrs
 *                   refreshToken:
 *                     type: string
 *                     example: >-
 *                       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia3BpZXJjeSIsInBhc3N3b3JkIjoiJDJiJDEwJHRlRS5uQ0IxbkRERXFKUUV4MGtKWE9IcWtsd0ZISlF5eThmdjIyLm1JWFBHN2tHZ3pvcklPIiwiaWF0IjoxNjcyNzcwMjg0LCJleHAiOjE2NzI3OTkwODR9.zMEX6EWVvRiRO8CLezklpTtKYCeV60F2nyVB3bUNiW4
 *                   token:
 *                     type: string
 *                     example: >-
 *                       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia3BpZXJjeSIsInBhc3N3b3JkIjoiJDJiJDEwJHRlRS5uQ0IxbkRERXFKUUV4MGtKWE9IcWtsd0ZISlF5eThmdjIyLm1JWFBHN2tHZ3pvcklPIiwiaWF0IjoxNjcyNzcwMjg0LCJleHAiOjE2NzI3NzIwODR9.U1Cpvr3q9eNrXdadoAbBsszK6NDAZHtEmLz2K4UT3iU
 *               examples:
 *                 '200':
 *                   value:
 *                     accessExpiresIn: 30min
 *                     client: 6A0AD3CB-D41E-492C-8B48-970060A22136
 *                     parent: null
 *                     permissions: Admin
 *                     refreshExpiresIn: 8hrs
 *                     refreshToken: >-
 *                       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia3BpZXJjeSIsInBhc3N3b3JkIjoiJDJiJDEwJHRlRS5uQ0IxbkRERXFKUUV4MGtKWE9IcWtsd0ZISlF5eThmdjIyLm1JWFBHN2tHZ3pvcklPIiwiaWF0IjoxNjcyNzcwMjg0LCJleHAiOjE2NzI3OTkwODR9.zMEX6EWVvRiRO8CLezklpTtKYCeV60F2nyVB3bUNiW4
 *                     token: >-
 *                       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia3BpZXJjeSIsInBhc3N3b3JkIjoiJDJiJDEwJHRlRS5uQ0IxbkRERXFKUUV4MGtKWE9IcWtsd0ZISlF5eThmdjIyLm1JWFBHN2tHZ3pvcklPIiwiaWF0IjoxNjcyNzcwMjg0LCJleHAiOjE2NzI3NzIwODR9.U1Cpvr3q9eNrXdadoAbBsszK6NDAZHtEmLz2K4UT3iU
 *         '403':
 *           description: '403'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Error:
 *                     type: string
 *                     example: Username or password incorrect
 *               examples:
 *                 '403':
 *                   value:
 *                     Error: Username or password incorrect
 */
router.post('/login', dboperations.user_auth)

/**
 * @swagger
 *   /clients/users/refresh:
 *     post:
 *       tags:
 *         - Users
 *       summary: Refresh user
 *       description: get new accesstoken using refresh token
 *       operationId: refreshUser
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: >-
 *                     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia3BpZXJjeSIsInBhc3N3b3JkIjoiJDJiJDEwJDlFRWRiVGJ0VWdCUGJBQ2VoYkxuNU9mUzN6d2Y2LzVrdWZ1ZUVjcnliMi5MWnREeEJlRDJlIiwiaWF0IjoxNjcyNzcwNDI4LCJleHAiOjE2NzI3OTkyMjh9.A7Y7Qoh8-EsJckb2NgaDl2a_YgAj8Y6W35wm9B0nSMk
 *             example:
 *               token: >-
 *                 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia3BpZXJjeSIsInBhc3N3b3JkIjoiJDJiJDEwJDlFRWRiVGJ0VWdCUGJBQ2VoYkxuNU9mUzN6d2Y2LzVrdWZ1ZUVjcnliMi5MWnREeEJlRDJlIiwiaWF0IjoxNjcyNzcwNDI4LCJleHAiOjE2NzI3OTkyMjh9.A7Y7Qoh8-EsJckb2NgaDl2a_YgAj8Y6W35wm9B0nSMk
 *       responses:
 *         '201':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   accessToken:
 *                     type: string
 *                     example: >-
 *                       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzI3NzA0ODcsImV4cCI6MTY3Mjc3MjI4N30.bEhO6IXTXq_B6UJEnVYhYPttJbdhGW5HT0k6ciQYe0Y
 *               examples:
 *                 '200':
 *                   value:
 *                     accessToken: >-
 *                       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzI3NzA0ODcsImV4cCI6MTY3Mjc3MjI4N30.bEhO6IXTXq_B6UJEnVYhYPttJbdhGW5HT0k6ciQYe0Y
 */
router.post('/refresh', authenticateToken, authAccess, authIP, dboperations.user_refresh)

/**
 * @swagger
 *   /clients/users/me:
 *     get:
 *       tags:
 *         - Users
 *       summary: Get my user
 *       description: >-
 *         For testing your access to the api, but also returns your user gid and
 *         permissions for reference or use elsewhere.
 *       operationId: getMyUser
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Users:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         Client_GUID:
 *                           type: string
 *                           example: 6A0AD3CB-D41E-492C-8B48-970060A22136
 *                         GUID:
 *                           type: string
 *                           example: 659FBB77-3094-494C-88FB-F742A93A5EC0
 *                         PermissionLvl:
 *                           type: string
 *                           example: Admin
 *                         Username:
 *                           type: string
 *                           example: kpiercy
 *                     example:
 *                       - Active: true
 *                         Client_GUID: 6A0AD3CB-D41E-492C-8B48-970060A22136
 *                         GUID: 659FBB77-3094-494C-88FB-F742A93A5EC0
 *                         PermissionLvl: Admin
 *                         Username: kpiercy
 *               examples:
 *                 '200':
 *                   value:
 *                     Users:
 *                       - Active: true
 *                         Client_GUID: 6A0AD3CB-D41E-492C-8B48-970060A22136
 *                         GUID: 659FBB77-3094-494C-88FB-F742A93A5EC0
 *                         PermissionLvl: Admin
 *                         Username: kpiercy
 */
router.get('/me', authenticateToken, authAccess, authIP, dboperations.find_me)

/**
 * @swagger
 *   /clients/{clientid}/users:
 *     get:
 *       tags:
 *         - Users
 *       summary: Get all users by clientid
 *       description: Get all users in DB, requires specific permissions.
 *       operationId: getAllUsersByClientid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Users:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         Client_GUID:
 *                           type: string
 *                           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         GUID:
 *                           type: string
 *                           example: 42FF060A-F176-47CB-AAD0-DBE6E4701191
 *                         PermissionLvl:
 *                           type: string
 *                           example: Parent
 *                         Username:
 *                           type: string
 *                           example: someParent
 *                     example:
 *                       - Active: true
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         GUID: 42FF060A-F176-47CB-AAD0-DBE6E4701191
 *                         PermissionLvl: Parent
 *                         Username: someParent
 *               examples:
 *                 '200':
 *                   value:
 *                     Users:
 *                       - Active: true
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         GUID: 42FF060A-F176-47CB-AAD0-DBE6E4701191
 *                         PermissionLvl: Parent
 *                         Username: someParent
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 */
router.get('/', authenticateToken, authAccess, authIP, dboperations.find_users)

/**
 * @swagger
 *   /clients/users/{userid}:
 *     get:
 *       tags:
 *         - Users
 *       summary: Get user by userid
 *       description: >-
 *         For testing your access to the api, but also returns your user gid and
 *         permissions for reference or use elsewhere.
 *       operationId: getUserByUserid
 *       responses:
 *         '200':
 *           description: '200'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Users:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Active:
 *                           type: boolean
 *                           example: true
 *                         Client_GUID:
 *                           type: string
 *                           example: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         GUID:
 *                           type: string
 *                           example: 42FF060A-F176-47CB-AAD0-DBE6E4701191
 *                         PermissionLvl:
 *                           type: string
 *                           example: Parent
 *                         Username:
 *                           type: string
 *                           example: someParent
 *                     example:
 *                       - Active: true
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         GUID: 42FF060A-F176-47CB-AAD0-DBE6E4701191
 *                         PermissionLvl: Parent
 *                         Username: someParent
 *               examples:
 *                 '200':
 *                   value:
 *                     Users:
 *                       - Active: true
 *                         Client_GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *                         GUID: 42FF060A-F176-47CB-AAD0-DBE6E4701191
 *                         PermissionLvl: Parent
 *                         Username: someParent
 */
router.get('/:userid', authenticateToken, authLvl, authAccess, authIP, dboperations.find_user)

/**
 * @swagger
 *   /clients/users:
 *     post:
 *       tags:
 *         - Users
 *       summary: Create user
 *       description: This endpoint requires specific permissions to access.
 *       operationId: createUser
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       AllowableIP:
 *                         type: string
 *                         example: '::1'
 *                       ApiAccess:
 *                         type: boolean
 *                         example: true
 *                       Client_GUID:
 *                         type: string
 *                         example: 7133CAAC-3635-48F0-B116-14CAB71FBCB6
 *                       Email:
 *                         type: string
 *                         example: kpiercy@gmail.com
 *                       Password:
 *                         type: string
 *                         example: asdlkfgjasdl1234fghfghrty
 *                       PermissionLvl:
 *                         type: string
 *                         example: 94dbbb6d-1e17-4769-9ebe-ddfe745cd01f
 *                       Username:
 *                         type: string
 *                         example: readyuser
 *                   example:
 *                     - AllowableIP: '::1'
 *                       ApiAccess: true
 *                       Client_GUID: 7133CAAC-3635-48F0-B116-14CAB71FBCB6
 *                       Email: kpiercy@gmail.com
 *                       Password: asdlkfgjasdl1234fghfghrty
 *                       PermissionLvl: 94dbbb6d-1e17-4769-9ebe-ddfe745cd01f
 *                       Username: readyuser
 *             example:
 *               Users:
 *                 - AllowableIP: '::1'
 *                   ApiAccess: true
 *                   Client_GUID: 7133CAAC-3635-48F0-B116-14CAB71FBCB6
 *                   Email: kpiercy@gmail.com
 *                   Password: asdlkfgjasdl1234fghfghrty
 *                   PermissionLvl: 94dbbb6d-1e17-4769-9ebe-ddfe745cd01f
 *                   Username: readyuser
 *       responses:
 *         '201':
 *           description: '201'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Users:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         Access:
 *                           type: boolean
 *                           example: true
 *                         Client_GUID:
 *                           type: string
 *                           example: 7133CAAC-3635-48F0-B116-14CAB71FBCB6
 *                         GUID:
 *                           type: string
 *                           example: DC23DBB5-E8CA-428C-BAF3-F6D8D623B4D9
 *                         PermissionLvl:
 *                           type: string
 *                           example: 94DBBB6D-1E17-4769-9EBE-DDFE745CD01F
 *                         Username:
 *                           type: string
 *                           example: readyuser
 *                     example:
 *                       - Access: true
 *                         Client_GUID: 7133CAAC-3635-48F0-B116-14CAB71FBCB6
 *                         GUID: DC23DBB5-E8CA-428C-BAF3-F6D8D623B4D9
 *                         PermissionLvl: 94DBBB6D-1E17-4769-9EBE-DDFE745CD01F
 *                         Username: readyuser
 *               examples:
 *                 '201':
 *                   value:
 *                     Users:
 *                       - Access: true
 *                         Client_GUID: 7133CAAC-3635-48F0-B116-14CAB71FBCB6
 *                         GUID: DC23DBB5-E8CA-428C-BAF3-F6D8D623B4D9
 *                         PermissionLvl: 94DBBB6D-1E17-4769-9EBE-DDFE745CD01F
 *                         Username: readyuser
 *         '400':
 *           description: '400'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Error:
 *                     type: string
 *                     example: username already taken
 *               examples:
 *                 '400':
 *                   value:
 *                     Error: username already taken
 */
router.post('/', authenticateToken, authAccess, authIP, validateDto(userDto), dboperations.create_users)

/**
 * @swagger
 *   /clients/users:
 *     patch:
 *       tags:
 *         - Users
 *       summary: Update user by userid
 *       description: >-
 *         For testing your access to the api, but also returns your user gid and
 *         permissions for reference or use elsewhere.
 *       operationId: updateUserByUserid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       APIAccess:
 *                         type: boolean
 *                         example: true
 *                       AllowedIPs:
 *                         type: string
 *                         example: '::35'
 *                   example:
 *                     - APIAccess: true
 *                       AllowedIPs: '::35'
 *             example:
 *               Users:
 *                 - APIAccess: true
 *                   AllowedIPs: '::35'
 *       responses:
 *         '200':
 *           description: ''
 *     parameters:
 *       - name: userid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 6a102a8e-547c-4a1d-b2e1-404d51144eee
 */
router.patch('/:userid', authenticateToken, authLvl, authAccess, authIP, dboperations.update_user)

/**
 * @swagger
 *   /clients/users:
 *     delete:
 *       tags:
 *         - Users
 *       summary: Delete users by clientid
 *       description: >-
 *         Removes api access for users associated to specified client id. Requires
 *         specific permissions to execute.
 *       operationId: deleteUsersByClientid
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientid:
 *                   type: string
 *                   example: 7133CAAC-3635-48F0-B116-14CAB71FBCB6
 *             example:
 *               clientid: 7133CAAC-3635-48F0-B116-14CAB71FBCB6
 *       responses:
 *         '202':
 *           description: '202'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Users:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         User_GUID:
 *                           type: string
 *                           example: 6A102A8E-547C-4A1D-B2E1-404D51144EEE
 *                         Username:
 *                           type: string
 *                           example: kpiercy456
 *                     example:
 *                       - User_GUID: 6A102A8E-547C-4A1D-B2E1-404D51144EEE
 *                         Username: kpiercy456
 *                       - User_GUID: FF4E30D9-0EEC-4D89-B1D8-E07A861DA682
 *                         Username: kpiercy123
 *               examples:
 *                 '202':
 *                   value:
 *                     Users:
 *                       - User_GUID: 6A102A8E-547C-4A1D-B2E1-404D51144EEE
 *                         Username: kpiercy456
 *                       - User_GUID: FF4E30D9-0EEC-4D89-B1D8-E07A861DA682
 *                         Username: kpiercy123
 */
router.delete('/', authenticateToken, authLvl, authAccess, authIP, dboperations.delete_client_users)

/**
 * @swagger
 *   /clients/{clientid}/users/{userid}:
 *     delete:
 *       tags:
 *         - Users
 *       summary: Delete user by userid
 *       description: >-
 *         Removes api access for users associated to specified client id. Requires
 *         specific permissions to execute.
 *       operationId: deleteUserByUserid
 *       requestBody:
 *         content:
 *           text/plain:
 *             example: ''
 *       responses:
 *         '202':
 *           description: '202'
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   Users:
 *                     type: array
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           User_GUID:
 *                             type: string
 *                             example: FF4E30D9-0EEC-4D89-B1D8-E07A861DA682
 *                           Username:
 *                             type: string
 *                             example: kpiercy123
 *                       example:
 *                         - User_GUID: FF4E30D9-0EEC-4D89-B1D8-E07A861DA682
 *                           Username: kpiercy123
 *                     example:
 *                       - - User_GUID: FF4E30D9-0EEC-4D89-B1D8-E07A861DA682
 *                           Username: kpiercy123
 *               examples:
 *                 '202':
 *                   value:
 *                     Users:
 *                       - - User_GUID: FF4E30D9-0EEC-4D89-B1D8-E07A861DA682
 *                           Username: kpiercy123
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: 7133caac-3635-48f0-b116-14cab71fbcb6
 *       - name: userid
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: ff4e30d9-0eec-4d89-b1d8-e07a861da682
 */
router.delete('/:userid', authenticateToken, authAccess, authIP, dboperations.delete_user)

//revoke api access of a single user by userid
//router.delete('/:userid', authenticateToken, authLvl, authAccess, authIP, dboperations.delete_user)

// //get your userid, username and permissionLvl
// router.post('/me/confirm', authenticateToken, authAccess, async (req, res) => {
//     console.log('Successful')
//     res.status(200).send('Successful')
// })

module.exports = router;