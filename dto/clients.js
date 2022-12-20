const yup = require('yup');

module.exports = yup.object().shape({
    Clients: yup.array().of(
        yup.object().shape({
            Parent_GUID: yup.string().uuid(),
            ClientName: yup.string().trim().required('ClientName is a required field.'),
            Active: yup.boolean().required().default(false),
            ErpID: yup.number().integer().default(0),
            ErpParentID: yup.number().integer().default(0),
            ErpCode: yup.string().trim().default('0'),
            ErpSvcCode: yup.string().trim().default('0'),
            ErpPostageCode: yup.string().trim().default('0'),
            Type: yup.string()
                .oneOf(['DirectClient', 'ChannelPartner', 'NonProfit', 'AdHoc'])
                .default('DirectClient')
                .required('Please enter DirectClient, ChannelPartner, NonProfit or AdHoc'),
            Term: yup.string()
                .oneOf(['NET10', 'NET30', 'NET60', 'NET90'])
                .default('NET30')
                .required('Please enter NET10, NET30, NET60, or NET90.'),
            PostageCost: yup.number().default(0.481),
            PostagePrice: yup.number().default(0.510),
            AllInOneInvoicing: yup.boolean().default(false),
            ZeroSellHiding: yup.boolean().default(true),
            BulkBillEnabled: yup.boolean().default(false)
        })
    )
});