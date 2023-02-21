const yup = require('yup')

/**
 * @swagger
 * components:
 *   schemas:
 *     Group:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the group
 *         SpecID:
 *           type: int
 *           description: The public id of the client's job facility spec
 *         Active:
 *           type: boolean
 *           description: whether the Grouping is active
 *         GroupOnField1:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *         GroupOnField2:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *         GroupOnField3:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *         GroupOnField4:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *         GroupOnField5:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *       example:
 *         ID: 9999
 *         SpecID: 101
 *         Active: true
 *         GroupOnField1: NAME
 *         GroupOnField2: ADDRESS1
 *         GroupOnField3: CITY
 *         GroupOnField4: STATE
 *         GroupOnField5: ZIP
 *     CreateGroupsBody:
 *       type: object
 *       properties:
 *         SpecID:
 *           type: int
 *           description: The public id of the client's job facility spec
 *         Active:
 *           type: boolean
 *           description: whether the Grouping is active
 *         GroupOnField1:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *         GroupOnField2:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *         GroupOnField3:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *         GroupOnField4:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *         GroupOnField5:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *       example:
 *         SpecID: 101
 *         Active: true
 *         GroupOnField1: NAME
 *         GroupOnField2: ADDRESS1
 *         GroupOnField3: CITY
 *         GroupOnField4: STATE
 *         GroupOnField5: ZIP
 *     UpdateGroupsBody:
 *       type: object
 *       properties:
 *         Active:
 *           type: boolean
 *           description: whether the Grouping is active
 *         GroupOnField1:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *         GroupOnField2:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *         GroupOnField3:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *         GroupOnField4:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *         GroupOnField5:
 *           type: string
 *           description: A field within the client file that should be grouped on
 *       example:
 *         Active: true
 *         GroupOnField1: NAME
 *         GroupOnField2: ADDRESS1
 *         GroupOnField3: CITY
 *         GroupOnField4: STATE
 *         GroupOnField5: ZIP
 *     DeleteGroupResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the group
 *         Active:
 *           type: boolean
 *           description: Whether the group is active or not
 *       example:
 *         ID: 9999
 *         Active: false 
 */

module.exports = yup.object().shape({
  Groups: yup.array().of(
    yup.object().shape({
      GroupOnField1: yup.string().trim().required('At least GroupOnField1 is required to create.'),
      GroupOnField2: yup.string().trim().notRequired(),
      GroupOnField3: yup.string().trim().notRequired(),
      GroupOnField4: yup.string().trim().notRequired(),
      GroupOnField5: yup.string().trim().notRequired(),
    })
  ),
})