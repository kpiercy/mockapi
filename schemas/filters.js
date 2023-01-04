const yup = require('yup')

module.exports = yup.object().shape({
  Filters: yup.array().of(
    yup.object().shape({
      Active: yup.boolean().default(false).required('Active is required as true or false'),
      FilterOnField: yup.string().trim().required('FilterOnField is required.'),
      FilterValue: yup.string().trim().required('FilterValue is required.')
    })
  ),
})
