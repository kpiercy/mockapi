const yup = require('yup')

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: public id of the retun
 *         Code:
 *           type: string
 *           description: service code from ERP
 *         Description:
 *           type: string
 *           description: service description
 *         Active:
 *           type: boolean
 *           description: whether or not service is active
 *         Taxable:
 *           type: boolean
 *           description: whether the item is taxable or not
 *         Type: 
 *           type: string
 *           description: service type grouping
 *         InventoryItem:
 *           type: boolean
 *           description: whether the service is an inventory item or not, if true, setup product for service afterwards
 *         GLID:
 *           type: string
 *           description: accounting GLID
 *         UsePerM:
 *           type: boolean
 *           description: whether the service item should use Per M number format
 *         BasePrice:
 *           type: number
 *           format: double
 *           description: base price of the service above cost
 *         MinimumPrice: 
 *           type: number
 *           format: double
 *           description: minimum price of service, usually cost
 *         SetupFee:
 *           type: number
 *           format: double
 *           description: setup fee for service, charged as per each/hour
 *         UnitCost:
 *           type: number
 *           format: double
 *           description: cost of the service
 *         RunRate:
 *           type: number
 *           format: double
 *           description: run rate of the service, if applicable otherwise 0.00
 *         MarkupPercentage:
 *           type: number
 *           format: double
 *           description: markup percentage for service above cost
 *       example:
 *         ID: 45
 *         Code: STMTMP
 *         Description: MailProcessing
 *         Active: true
 *         Taxable: false
 *         Type: MAP
 *         InventoryItem: false
 *         GLID: 12345
 *         UserPerM: true
 *         BasePrice: 50.00
 *         MinimumPrice: 40.00
 *         SetupFee: 0.00
 *         UnitCost: 40.00
 *         RunRate: 7.000
 *         MarkupPercentage: 0.00
 *     CreateServicesBody:
 *       type: object
 *       properties:
 *         Code:
 *           type: string
 *           description: service code from ERP
 *         Description:
 *           type: string
 *           description: service description
 *         Active:
 *           type: boolean
 *           description: whether or not service is active
 *         Taxable:
 *           type: boolean
 *           description: whether the item is taxable or not
 *         Type: 
 *           type: string
 *           description: service type grouping
 *         InventoryItem:
 *           type: boolean
 *           description: whether the service is an inventory item or not, if true, setup product for service afterwards
 *         GLID:
 *           type: string
 *           description: accounting GLID
 *         UsePerM:
 *           type: boolean
 *           description: whether the service item should use Per M number format
 *         BasePrice:
 *           type: number
 *           format: double
 *           description: base price of the service above cost
 *         MinimumPrice: 
 *           type: number
 *           format: double
 *           description: minimum price of service, usually cost
 *         SetupFee:
 *           type: number
 *           format: double
 *           description: setup fee for service, charged as per each/hour
 *         UnitCost:
 *           type: number
 *           format: double
 *           description: cost of the service
 *         RunRate:
 *           type: number
 *           format: double
 *           description: run rate of the service, if applicable otherwise 0.00
 *         MarkupPercentage:
 *           type: number
 *           format: double
 *           description: markup percentage for service above cost
 *       example:
 *         Code: STMTMP
 *         Description: MailProcessing
 *         Active: true
 *         Taxable: false
 *         Type: MAP
 *         InventoryItem: false
 *         GLID: 12345
 *         UserPerM: true
 *         BasePrice: 50.00
 *         MinimumPrice: 40.00
 *         SetupFee: 0.00
 *         UnitCost: 40.00
 *         RunRate: 7.000
 *         MarkupPercentage: 0.00
 *     UpdateServicesBody:
 *       type: object
 *       properties:
 *         Code:
 *           type: string
 *           description: service code from ERP
 *         Description:
 *           type: string
 *           description: service description
 *         Active:
 *           type: boolean
 *           description: whether or not service is active
 *         Taxable:
 *           type: boolean
 *           description: whether the item is taxable or not
 *         Type: 
 *           type: string
 *           description: service type grouping
 *         InventoryItem:
 *           type: boolean
 *           description: whether the service is an inventory item or not, if true, setup product for service afterwards
 *         GLID:
 *           type: string
 *           description: accounting GLID
 *         UsePerM:
 *           type: boolean
 *           description: whether the service item should use Per M number format
 *         BasePrice:
 *           type: number
 *           format: double
 *           description: base price of the service above cost
 *         MinimumPrice: 
 *           type: number
 *           format: double
 *           description: minimum price of service, usually cost
 *         SetupFee:
 *           type: number
 *           format: double
 *           description: setup fee for service, charged as per each/hour
 *         UnitCost:
 *           type: number
 *           format: double
 *           description: cost of the service
 *         RunRate:
 *           type: number
 *           format: double
 *           description: run rate of the service, if applicable otherwise 0.00
 *         MarkupPercentage:
 *           type: number
 *           format: double
 *           description: markup percentage for service above cost
 *       example:
 *         Code: STMTMP
 *         Description: MailProcessing
 *         Active: true
 *         Taxable: false
 *         Type: MAP
 *         InventoryItem: false
 *         GLID: 12345
 *         UserPerM: true
 *         BasePrice: 50.00
 *         MinimumPrice: 40.00
 *         SetupFee: 0.00
 *         UnitCost: 40.00
 *         RunRate: 7.000
 *         MarkupPercentage: 0.00
 *     DeleteServicesResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: public id of the retun
 *         Code:
 *           type: string
 *           description: service code from ERP
 *         Description:
 *           type: string
 *           description: service description
 *         Active:
 *           type: boolean
 *           description: whether or not service is active
 *       example:
 *         ID: 45
 *         Code: STMTMP
 *         Description: MailProcessing
 *         Active: false
 */

module.exports = yup.object().shape({
  Returns: yup.array().of(
    yup.object().shape({
      Code: yup.string().required('Service code is required'),
      Description: yup.string().required('Service description is required'),
      Active: yup.boolean().default(false),
      Taxable: yup.boolean().default(true),
      Type: yup
        .number()
        .integer()
        .required('Service type is required, must match existing type')
        .oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      InventoryItem: yup.boolean().default(false),
      GLID: yup.string().required('Accounting GLID is required'),
      UsePerM: yup.boolean().default(true),
      BasePrice: yup.number().positive().required('Base price is required'),
      MinimumPrice: yup.number().positive().required('Minimum price is required'),
      SetupFee: yup.number().default(0.0),
      UnitCost: yup.number().positive().required('Unit Cost is required'),
      Runrate: yup.number().default(0.0),
      BasePrice: yup.number().default(0.0)
    })
  ),
})