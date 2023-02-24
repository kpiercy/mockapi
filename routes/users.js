require('dotenv').config()

//2FA notes: store pubIP to DB during registration/setup, if requesting pubIP does not match stored value, send email during /auth or /refresh to user email with link containing /me/confirm route and token that expires in 1 day, during /me/confirm route, append the new pubIp to their pubIp field, ALSO add windows scheduler script that reset each users "confirmed" status to false every xx days to make them redo 2FA

const express = require('express')
const pubip = require("express-ip");
const router = express.Router({ mergeParams: true })

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
 * /clients/users/login:
 *  post:
 *      summary: User login for access token creation
 *      tags: [Users]
 *      description: Generates an AccessToken and RefreshToken for the user after verification.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersLoginBody'
 *      responses:
 *          200:
 *              description: Access and refresh tokens generated for user
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UsersLoginResponse'
 *          400:
 *              description: Bad request
 */
router.post('/login', dboperations.user_auth)

/**
 * @swagger
 * /clients/users/refresh:
 *  post:
 *      summary: Refresh login for user
 *      tags: [Users]
 *      description: Generates an AccessToken for the user after RefreshToken verification.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersRefreshBody'
 *      responses:
 *          200:
 *              description: Access token generated for user
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UsersRefreshResponse'
 *          400:
 *              description: Bad request
 */
router.post('/refresh', authenticateToken, authAccess, authIP, dboperations.user_refresh)

/**
 * @swagger
 * /clients/users/me:
 *  get:
 *      summary: Get your user info by token
 *      tags: [Users]
 *      description: For testing your access to the api, but also returns your user gid and
 *         permissions for reference for use elsewhere.
 *      responses:
 *          200:
 *              description: Found user(s)
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Users:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/User'
 *          404:
 *              description: No users found
 */
router.get('/me', authenticateToken, authAccess, authIP, dboperations.find_me)

/**
 * @swagger
 * /clients/{clientid}/users:
 *  get:
 *      summary: Get all users by clientid or parentid
 *      tags: [Users]
 *      description: Finds all users by clientid/parentid
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID or ParentID of data to find
 *      responses:
 *          200:
 *              description: Found user(s)
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Users:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/User'
 *          404:
 *              description: No users found for clientid
 */
router.get('/', authenticateToken, authAccess, authIP, dboperations.find_users)

/**
 * @swagger
 * /clients/users/{userid}:
 *  get:
 *      summary: Get user by id
 *      tags: [Users]
 *      description: Finds user by id
 *      parameters:
 *        - in: path
 *          name: userid
 *          schema: 
 *              type: int
 *          required: true
 *          description: UserID of data to find
 *      responses:
 *          200:
 *              description: Found user(s)
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Users:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/User'
 *          404:
 *              description: No users found for id
 */
router.get('/:userid', authenticateToken, authLvl, authAccess, authIP, dboperations.find_user)

/**
 * @swagger
 * /clients/{clientid}/users:
 *  post:
 *      summary: Create one or more users for clientid
 *      tags: [Users]
 *      description: Creates users for client
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID or ParentID of data to assign users to
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Users:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/CreateUsersBody'
 *      responses:
 *          200:
 *              description: Created user(s)
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Users:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/User'
 *          400:
 *              description: Username already taken
 */
router.post('/', authenticateToken, authAccess, authIP, validateDto(userDto), dboperations.create_users)

/**
 * @swagger
 *   /clients/users/{userid}:
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
 *           type: integer
 *           example: 101
 */
router.patch('/:userid', authenticateToken, authLvl, authAccess, authIP, dboperations.update_user)

/**
 * @swagger
 * /clients/{clientid}/users:
 *  delete:
 *      summary: Delete all users associated with clientid
 *      tags: [Users]
 *      description: Removes api access for all users associated to specified client id. Requires
 *         specific permissions to execute.
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of users to delete
 *      responses:
 *          202:
 *              description: Deleted user(s)
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Users:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/DeleteUsersResponse'
 *          400:
 *              description: No users to delete by clientid
 */
router.delete('/', authenticateToken, authLvl, authAccess, authIP, dboperations.delete_client_users)

/**
 * @swagger
 * /clients/{clientid}/users/{userid}:
 *  delete:
 *      summary: Delete user by id
 *      tags: [Users]
 *      description: Removes api access for user specified by id
 *      parameters:
 *        - in: path
 *          name: clientid
 *          schema: 
 *              type: int
 *          required: true
 *          description: ClientID of users to delete
 *      responses:
 *          202:
 *              description: Deleted user
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            Users:
 *                              type: array
 *                              items:
 *                                $ref: '#/components/schemas/DeleteUsersResponse'
 *          400:
 *              description: No users to delete by id
 */
router.delete('/:userid', authenticateToken, authAccess, authIP, dboperations.delete_user)

/**
 * 
 */
//router.get('/me/picture', authenticateToken, authAccess, authIP, dboperations.find_picture)

//revoke api access of a single user by userid
//router.delete('/:userid', authenticateToken, authLvl, authAccess, authIP, dboperations.delete_user)

// //get your userid, username and permissionLvl
// router.post('/me/confirm', authenticateToken, authAccess, async (req, res) => {
//     console.log('Successful')
//     res.status(200).send('Successful')
// })

module.exports = router;