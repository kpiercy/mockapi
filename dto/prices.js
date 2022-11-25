const yup = require("yup");

module.exports = yup
  .object()
  .required()
  .shape({
    Prices: yup.array().of(
      yup.object().shape({
        Contract_GUID: yup.string().uuid().required('Contract_GUID is required'),
        Service_GUID: yup.string().uuid().required('Service_GUID is required'),
        ItemPrice: yup.number().default(0.00)
      })
    ),
  });
