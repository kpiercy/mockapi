const yup = require("yup");
const multiEmailRegExp =
  /^(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*;\s*|\s*$))*$/;

  module.exports= yup.object().required().shape({
    Invoices: yup.array().of(
        yup.object().shape({
            Client_GUID: yup.string().uuid().required('Client_GUID is required.'),
            Parent_GUID: yup.string().uuid().notRequired(),
            OrderID: yup.number().integer().required('OrderID is required.'),
            OrderNumber: yup.string().required('OrderNumber is required.'),
            Project: yup.string().required('Project is required.'),
            
        })
    )
  })