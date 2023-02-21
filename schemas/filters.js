const yup = require('yup')

/**
 * @swagger
 * components:
 *   schemas:
 *     Filter:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the filter
 *         SpecID:
 *           type: int
 *           description: The public id of the client's job facility spec
 *         FilterOnField:
 *           type: string
 *           description: The field within the client file that should be filtered on
 *         FilterValue:
 *           type: string
 *           description: The value or mask to filter with
 *       example:
 *         ID: 9999
 *         SpecID: 101
 *         FilterOnField: FIELD_TO_FILTER
 *         FilterValue: SomeValueToFilterBy
 *     CreateFiltersBody:
 *       type: object
 *       properties:
 *         SpecID:
 *           type: int
 *           description: The public id of the client's job facility spec
 *         FilterOnField:
 *           type: string
 *           description: The field within the client file that should be filtered on
 *         FilterValue:
 *           type: string
 *           description: The value or mask to filter with
 *       example:
 *         SpecID: 101
 *         FilterOnField: FIELD_TO_FILTER
 *         FilterValue: SomeValueToFilterBy
 *     UpdateFiltersBody:
 *       type: object
 *       properties:
 *         FilterOnField:
 *           type: string
 *           description: The field within the client file that should be filtered on
 *         FilterValue:
 *           type: string
 *           description: The value or mask to filter with
 *       example:
 *         FilterOnField: FIELD_TO_FILTER
 *         FilterValue: SomeValueToFilterBy
 *     DeleteFilterResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the filter
 *         Active:
 *           type: boolean
 *           description: Whether the filter is active or not
 *       example:
 *         ID: 9999
 *         Active: false 
 */

module.exports = yup.object().shape({
  Filters: yup.array().of(
    yup.object().shape({
      Active: yup.boolean().default(false).required('Active is required as true or false'),
      FilterOnField: yup.string().trim().required('FilterOnField is required.'),
      FilterValue: yup.string().trim().required('FilterValue is required.')
    })
  ),
})
