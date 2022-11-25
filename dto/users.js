const yup = require("yup");

module.exports = yup.object().shape({
  Users: yup.array().of(
    yup.object().shape({
      Client_GUID: yup.string().uuid().required(),
      Email: yup.string().trim().email().required(),
      Username: yup.string().trim().lowercase().required(),
      Password: yup.string().min(16).required(),
      ApiAccess: yup.boolean().default(false).required(),
      AllowableIP: yup.string().trim().required()
    })
  ),
});
