const yup = require('yup')

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
