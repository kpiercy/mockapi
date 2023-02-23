const yup = require('yup')

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: public id of reporting requirements
 *         SpecID:
 *           type: int
 *           description: public id of facility spec
 *         SummaryReport:
 *           type: boolean
 *           description: Whether facility gets SummaryReports sent
 *         MovesReport:
 *           type: boolean
 *           description: Whether facility gets MovesReports sent
 *         SuppressionReport:
 *           type: boolean
 *           description: Whether facility gets SuppressionReports sent
 *         UndeliverablesReport:
 *           type: boolean
 *           description: Whether facility gets UndeliverablesReports sent
 *         NonCassReport:
 *           type: boolean
 *           description: Whether facility gets NonCassReports sent
 *         FacilityReport:
 *           type: boolean
 *           description: Whether facility gets FacilityReports sent
 *         FacilityPDFs:
 *           type: boolean
 *           description: Whether facility gets FacilityPDFs sent
 *         PrintPDFs:
 *           type: boolean
 *           description: Whether facility gets PrintPDFs sent
 *         AnomalyReport:
 *           type: boolean
 *           description: Whether facility gets AnomalyReports sent
 *         MonthlySummaryReport:
 *           type: boolean
 *           description: Whether facility gets MonthlySummaryReports sent
 *       example:
 *         ID: 1
 *         SpecID: 55
 *         SummaryReport: true
 *         MovesReport: true
 *         Suppressionreport: true
 *         UndeliverablesReport: true
 *         NonCassReport: true
 *         FacilityReport: false
 *         FacilityPDFs: false
 *         PrintPDFs: false
 *         AnomalyReport: true
 *         MonthlySummaryReport: false
 *     CreateReportsBody:
 *       type: object
 *       properties:
 *         SpecID:
 *           type: int
 *           description: public id of facility spec
 *         SummaryReport:
 *           type: boolean
 *           description: Whether facility gets SummaryReports sent
 *         MovesReport:
 *           type: boolean
 *           description: Whether facility gets MovesReports sent
 *         SuppressionReport:
 *           type: boolean
 *           description: Whether facility gets SuppressionReports sent
 *         UndeliverablesReport:
 *           type: boolean
 *           description: Whether facility gets UndeliverablesReports sent
 *         NonCassReport:
 *           type: boolean
 *           description: Whether facility gets NonCassReports sent
 *         FacilityReport:
 *           type: boolean
 *           description: Whether facility gets FacilityReports sent
 *         FacilityPDFs:
 *           type: boolean
 *           description: Whether facility gets FacilityPDFs sent
 *         PrintPDFs:
 *           type: boolean
 *           description: Whether facility gets PrintPDFs sent
 *         AnomalyReport:
 *           type: boolean
 *           description: Whether facility gets AnomalyReports sent
 *         MonthlySummaryReport:
 *           type: boolean
 *           description: Whether facility gets MonthlySummaryReports sent
 *       example:
 *         SpecID: 55
 *         SummaryReport: true
 *         MovesReport: true
 *         Suppressionreport: true
 *         UndeliverablesReport: true
 *         NonCassReport: true
 *         FacilityReport: false
 *         FacilityPDFs: false
 *         PrintPDFs: false
 *         AnomalyReport: true
 *         MonthlySummaryReport: false
 */

module.exports = yup.object().shape({
  Reports: yup.array().of(
    yup.object().shape({
      SpecID: yup.number().integer().required('SpecID is required.'),
      SummaryReport: yup
        .boolean()
        .default(false)
        .required('SummaryReport will default to false if not included.'),
      MovesReport: yup
        .boolean()
        .default(false)
        .required('MovesReport will default to false if not included.'),
      SuppressionReport: yup
        .boolean()
        .default(false)
        .required('SuppressionReport will default to false if not included.'),
      UndeliverablesReport: yup
        .boolean()
        .default(false)
        .required('UndeliverablesReport will default to false if not included.'),
      NonCassReport: yup
        .boolean()
        .default(false)
        .required('NonCassReport will default to false if not included.'),
      FacilityReport: yup
        .boolean()
        .default(false)
        .required('FacilityReport will default to false if not included.'),
      FacilityPDFs: yup
        .boolean()
        .default(false)
        .required('FacilityPDFs will default to false if not included.'),
      PrintPDFs: yup
        .boolean()
        .default(false)
        .required('PrintPDFs will default to false if not included.'),
    })
  ),
})
