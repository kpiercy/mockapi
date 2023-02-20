const yup = require('yup')

/**
 * @swagger
 * components:
 *   schemas:
 *     Charts:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the chart
 *         SpecID:
 *           type: int
 *           description: The public id of the client's job facility spec
 *         SourceField:
 *           type: string
 *           description: The source field for the chart data
 *         ConsumptionText:
 *           type: int
 *           description: The consumption text to be displayed on the chart
 *         UsageField:
 *           type: int
 *           description: The field of the file that contains current usage
 *       example:
 *         ID: 9999
 *         SpecID: 101
 *         SourceField: chart_source
 *         ConsumptionText: consumption_descriptor
 *         UsageField: current_usage
 *     CreateChartBody:
 *       type: object
 *       properties:
 *         SpecID:
 *           type: int
 *           description: The public id of the client's job facility spec
 *         SourceField:
 *           type: string
 *           description: The source field for the chart data
 *         ConsumtpionText:
 *           type: string
 *           description: The consumption text to be displayed on the chart
 *         UsageField:
 *           type: string
 *           description: The field of the file that contains current usage
 *       example:
 *         SpecID: 101
 *         SourceField: chart_source 
 *         ConsumptionText: consumption_descriptor
 *         UsageField: current_usage
 *     UpdateChartBody:
 *       type: object
 *       properties:
 *         SourceField:
 *           type: string
 *           description: The source field for the chart data
 *         ConsumptionText:
 *           type: int
 *           description: The consumption text to be displayed on the chart
 *         UsageField:
 *           type: int
 *           description: The field of the file that contains current usage
 *       example:
 *         SourceField: chart_source
 *         ConsumptionText: consumption_descriptor
 *         UsageField: current_usage
 *     DeleteChartResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the chart
 *         SpecID:
 *           type: int
 *           description: The public id of the client's job facility spec
 *       example:
 *         ID: 9999
 *         SpecID: 101   
 */

module.exports = yup
  .object()
  .required()
  .shape({
    Charts: yup.array().of(
      yup.object().shape({
        SpecID: yup.number().integer().required('SpecID is required.'),
        SourceField: yup.string().required('SourceField for the chart is required'),
        ConsumptionText: yup.string().required('Consumption Text to be displayed with the chart is required.'),
        UsageField: yup.string().required('Usage field for the chart is required'),
      })
    ),
  })