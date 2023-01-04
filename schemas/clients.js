const yup = require('yup');

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         GUID:
 *           type: string
 *           description: The public id of the client
 *         Parent_GUID:
 *           type: string
 *           description: The public id of the parent client if applicable
 *         Name:
 *           type: string
 *           description: The client name
 *         Status:
 *           type: string
 *           description: Either Active or Inactive
 *         ERPID:
 *           type: int
 *           format: int64
 *           description: The clientid inside of the ERP system
 *         ERPParentID:
 *           type: int
 *           format: int64
 *           description: The parentid inside of the ERP system
 *         ERPCode:
 *           type: string
 *           description: Client Code from inside of the ERP system
 *         ERPSvcsCode: 
 *           type: string
 *           description: AltCode from within ERP system
 *         ERPPostageCode:
 *           type: string
 *           description: PosCode(CustomerUDF28) from within ERP system
 *         Type:
 *           type: string
 *           description: Either Reseller, Direct or AdHoc
 *         Term:
 *           type: string
 *           default: NET30
 *           description: Either NET10, NET30, NET60 or NET90
 *         Taxable:
 *           type: boolean
 *           default: true
 *           description: Whether the client is taxable or not
 *         TaxExempt:
 *           type: boolean
 *           default: false
 *           description: Whether the client is tax exempt or not
 *         PostageCost: 
 *           type: number
 *           format: double
 *           description: current postage cost for all clients
 *         PostagePrice:
 *           type: number
 *           format: double
 *           description: postage price for this customer
 *         AllInOneInvoicing:
 *           type: boolean
 *           default: false
 *           description: Whether or not the client wants their Services and Postage grouped on the same invoice
 *         ZeroSellHiding: 
 *           type: boolean
 *           default: true
 *           description: Whether or not the client wants to see cost only items
 *         BulkBillEnabled:
 *           type: boolean
 *           default: false
 *           description: Whether or not the client will receive a bulk bill for all related children
 *       example:
 *         GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *         Name: zAdena
 *         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *         Status: Active
 *         ERPID: 1234
 *         ERPParentID: 777
 *         ERPCode: 2068-1
 *         ERPSvcsCode: 2068
 *         ERPPosCode: 2068
 *         Type: Reseller
 *         Terms: NET90
 *         Taxable: false
 *         TaxExempt: true
 *         PostageCost: 0.481
 *         PostagePrice: 0.510
 *         AllInOneInvoicing: true
 *         ZeroSellHiding: true
 *         BulkBillEnabled: true 
 *     CreateClientsBody:
 *       type: object
 *       properties:
 *         Parent_GUID:
 *           type: string
 *           description: The public id of the parent client if applicable
 *         Name:
 *           type: string
 *           description: The client name
 *         Status:
 *           type: string
 *           description: Either Active or Inactive
 *         ERPID:
 *           type: int
 *           format: int64
 *           description: The clientid inside of the ERP system
 *         ERPParentID:
 *           type: int
 *           format: int64
 *           description: The parentid inside of the ERP system
 *         ERPCode:
 *           type: string
 *           description: Client Code from inside of the ERP system
 *         ERPSvcsCode: 
 *           type: string
 *           description: AltCode from within ERP system
 *         ERPPosCode:
 *           type: string
 *           description: PosCode(CustomerUDF28) from within ERP system
 *         Type:
 *           type: string
 *           description: Either Reseller, Direct or AdHoc
 *         Terms:
 *           type: string
 *           default: NET30
 *           description: Either NET10, NET30, NET60 or NET90
 *         Taxable:
 *           type: boolean
 *           default: true
 *           description: Whether the client is taxable or not
 *         TaxExempt:
 *           type: boolean
 *           default: false
 *           description: Whether the client is tax exempt or not
 *         PostageCost: 
 *           type: number
 *           format: double
 *           description: current postage cost for all clients
 *         PostagePrice:
 *           type: number
 *           format: double
 *           description: postage price for this customer
 *         AllInOneInvoicing:
 *           type: boolean
 *           default: false
 *           description: Whether or not the client wants their Services and Postage grouped on the same invoice
 *         ZeroSellHiding: 
 *           type: boolean
 *           default: true
 *           description: Whether or not the client wants to see cost only items
 *         BulkBillEnabled:
 *           type: boolean
 *           default: false
 *           description: Whether or not the client will receive a bulk bill for all related children
 *       example:
 *         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *         Name: zAdena
 *         Status: Active
 *         ERPID: 1234
 *         ERPParentID: 777
 *         ERPCode: 2068-1
 *         ERPSvcsCode: 2068
 *         ERPPosCode: 2068
 *         Type: Reseller
 *         Terms: NET90
 *         Taxable: false
 *         TaxExempt: true
 *         PostageCost: 0.481
 *         PostagePrice: 0.510
 *         AllInOneInvoicing: true
 *         ZeroSellHiding: true
 *         BulkBillEnabled: true       
 *     DeleteClientsResponse:
 *       type: object
 *       properties:
 *         GUID:
 *           type: string
 *           description: The public id of the client
 *         Parent_GUID:
 *           type: string
 *           description: The public id of the parent client if applicable
 *         Status:
 *           type: string
 *           description: Either Active or Inactive
 *         ERPID:
 *           type: int
 *           format: int64
 *           description: The clientid inside of the ERP system 
 *       example:
 *         GUID: DE33BA44-DBD3-4B52-9A7E-0A031B8872C7
 *         Parent_GUID: 8DD82A1A-105C-4FED-B157-AE18684EECC1
 *         Status: Inactive
 *         ERPID: 1234
 */

module.exports = yup.object().shape({
    Clients: yup.array().of(
        yup.object().shape({
            Parent_GUID: yup.string().uuid(),
            Name: yup.string().trim().required('ClientName is a required field.'),
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