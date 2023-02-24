const yup = require("yup");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        ID:
 *          type: integer
 *          description: public id of a user
 *        ParentID:
 *          type: integer
 *          description: public parentid user is assigned to
 *        ClientID:
 *          type: integer
 *          description: public clientid user is assigned to
 *        Active:
 *          type: boolean
 *          description: whether or not the user is active
 *        Username:
 *          type: string
 *          description: username assigned to user, typically first portion of email
 *        PermissionLvl:
 *          type: string
 *          description: description of user's access level
 *      example:
 *        ID: 100
 *        ParentID: 30
 *        ClientID: 9999
 *        Active: true
 *        Username: yourusername
 *        PermissionLvl: Standard
 *    CreateUsersBody:
 *      type: object
 *      properties:
 *        ParentID:
 *          type: integer
 *          description: public parentid user is assigned to
 *        ClientID:
 *          type: integer
 *          description: public clientid user is assigned to
 *        Active:
 *          type: boolean
 *          description: whether or not the user is active
 *        Email:
 *          type: string
 *          description: email address of user
 *        Username:
 *          type: string
 *          description: username assigned to user, typically first portion of email
 *        Password:
 *          type: string
 *          description: plain text of password to encrypt and store for verification
 *        PermissionLvl:
 *          type: int
 *          description: permission type id to assign to user
 *      example:
 *        ParentID: 30
 *        ClientID: 9999
 *        Active: true
 *        Email: yourusername@somedomain.com
 *        Username: yourusername
 *        Password: strongP45sw0rdH3re!
 *        PermissionLvl: 3
 *    UsersLoginBody:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *        password:
 *          type: password
 *      example:
 *        username: yourusername
 *        password: strongP45sw0rdH3re!
 *    UsersLoginResponse:
 *      type: object
 *      properties:
 *        accessExpiresIn:
 *          type: string
 *        client:
 *          type: integer
 *        parent:
 *          type: integer
 *        permissions:
 *          type: string
 *        refreshExpiresIn:
 *          type: string
 *        refreshToken:
 *          type: string
 *        acccessToken:
 *          type: string
 *      example:
 *        accessExpiresIn: 30min
 *        client: 9999
 *        parent: 30
 *        permissions: Standard
 *        refreshExpiresIn: 8hrs
 *        refreshToken: refreshjwt
 *        acccessToken: accessjwt
 *    UsersRefreshBody:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          required: true
 *      example:
 *        token: yourCurrentRefreshToken
 *    UsersRefreshResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *      example:
 *        accessToken: aNewAccessToken
 *    DeleteUsersResponse:
 *      type: object
 *      properties:
 *        ID:
 *          type: integer
 *          description: public id of a user
 *        ParentID:
 *          type: integer
 *          description: public parentid user is assigned to
 *        ClientID:
 *          type: integer
 *          description: public clientid user is assigned to
 *        Active:
 *          type: boolean
 *          description: whether or not the user is active
 *        Username:
 *          type: string
 *          description: username assigned to user, typically first portion of email
 *      example:
 *        ID: 100
 *        ParentID: 30
 *        ClientID: 9999
 *        Active: false
 *        Username: yourusername
 */

module.exports = yup.object().shape({
  Users: yup.array().of(
    yup.object().shape({
      ClientID: yup.number().integer().required(),
      Email: yup.string().trim().email().required(),
      Username: yup.string().trim().lowercase().required(),
      Password: yup.string().min(16).required(),
      PermissionLvl: yup.number().integer().required('Must choose a PermissionLvl'),
      ApiAccess: yup.boolean().default(false).required(),
      AllowableIP: yup.string().trim().required(),
    })
  ),
})
