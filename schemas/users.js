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
 *        ClientID:
 *          type: integer
 *        Active:
 *          type: boolean
 *        Username:
 *          type: string
 *        PermissionLvl:
 *          type: string
 *      example:
 *        ID: 100
 *        ClientID: 9999
 *        Active: true
 *        Username: yourusername
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
 *        password: yourpassword
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
 *        parent: 20
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
 *        token: yourCurrentAccessToken
 *    UsersRefreshResponse:
 *      type: object
 *      properties:
 *        accessToken:
 *          type: string
 *      example:
 *        accessToken: aNewAccessToken
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
