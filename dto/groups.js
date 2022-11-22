const yup = require('yup');

module.exports = yup.object().shape({
  Clients: yup.array().of(
    yup.object().shape({
      GroupOnField1: yup.string().trim().required('At least GroupOnField1 is required to create.'),
      GroupOnField2: yup.string().trim().notRequired(),
      GroupOnField3: yup.string().trim().notRequired(),
      GroupOnField4: yup.string().trim().notRequired(),
      GroupOnField5: yup.string().trim().notRequired(),
    })
  ),
})