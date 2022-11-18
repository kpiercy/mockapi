const yup = require('yup');

module.exports = yup.object().shape({
    Parent_GUID: yup.string().uuid(),
    ClientName: yup.string().trim().required(),
    Active: yup.boolean().required().default(false),
    ErpID: yup.number().integer(),
    ErpParentID: yup.number().integer().default(0),
    ErpCode: yup.string().trim(),
    ErpSvcCode: yup.string().trim(),
    ErpPosCode: yup.string().trim(),
    Type: yup.string().trim().default('DirectClient'),
    Term: yup.string().trim().default('NET30'),
    PostageCost: yup.number().default(0.481),
    PostagePrice: yup.number().default(0.510),
    AllInOneInvoicing: yup.boolean().default(false),
    ZeroSellHiding: yup.boolean().default(true),
    BulkBillEnabled: yup.boolean().default(false)
});