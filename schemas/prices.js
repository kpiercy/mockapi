const yup = require("yup");

module.exports = yup
  .object()
  .required()
  .shape({
    Prices: yup.array().of(
      yup.object().shape({
        ContractID: yup.number().integer().required('ContractID is required'),
        ServiceID: yup.number().integer().required('ServiceID is required'),
        ItemPrice: yup.number().default(0.00)
      })
    ),
  });
