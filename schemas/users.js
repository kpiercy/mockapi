const yup = require("yup");

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        GUID:
 *          type: string
 *        Client_GUID:
 *          type: string
 *        Active:
 *          type: boolean
 *        Username:
 *          type: string
 *        PermissionLvl:
 *          type: string
 *      example:
 *        GUID: userid
 *        Client_GUID: clientid
 *        Active: true
 *        Username: yourusername
 *        PermissionLvl: Standard
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
 *          type: string
 *        parent:
 *          type: string
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
 *        client: clientid
 *        parent: parentid
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
      Client_GUID: yup.string().uuid().required(),
      Email: yup.string().trim().email().required(),
      Username: yup.string().trim().lowercase().required(),
      Password: yup.string().min(16).required(),
      PermissionLvl: yup.string().uuid().required('Must choose a PermissionLvl'),
      ApiAccess: yup.boolean().default(false).required(),
      AllowableIP: yup.string().trim().required(),
    })
  ),
})
