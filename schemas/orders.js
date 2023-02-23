const yup = require('yup')

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the order
 *         JobID: 
 *           type: int
 *           description: The public id of the job
 *         OrderTemplate:
 *           type: string
 *           description: the order number of the template from ERp that will be use to create new monthly orders
 *         CurrentOrder:
 *           type: string
 *           description: the currently active order number in ERP that will have versions added to it
 *         TemplateVersionID:
 *           type: int
 *           description: the version suffix to copy for new versions
 *         BillingType:
 *           type: int
 *           description: 1 is billed simplex equals mail processing, 2 is billed for additional pages line item
 *         OrdersAutomated:
 *           type: boolean
 *           description: whether the order version creation is automated
 *         PreviousOrder:
 *           type: string
 *           description: the previous order number
 *         NextOrder:
 *           type: string
 *           description: the next order number to use in lieu of creating a new monthly order
 *         InvoicesAutomated:
 *           type: boolean
 *           description: whether or not the PreviousOrder will be processed by BulkOrderClose and invoicing processes
 *       example:
 *         ID: 99
 *         JobID: 101
 *         OrderTemplate: T1234
 *         CurrentOrder: "182555"
 *         TemplateVersionID: 0
 *         BillingType: 1
 *         OrdersAutomated: true
 *         PreviousOrder: 
 *         NextOrder: 
 *         InvoicesAutomated: true
 *     CreateOrdersBody:
 *       type: object
 *       properties:
 *         JobID: 
 *           type: int
 *           description: The public id of the job
 *         OrderTemplate:
 *           type: string
 *           description: the order number of the template from ERp that will be use to create new monthly orders
 *         CurrentOrder:
 *           type: string
 *           description: the currently active order number in ERP that will have versions added to it
 *         TemplateVersionID:
 *           type: int
 *           description: the version suffix to copy for new versions
 *         BillingType:
 *           type: int
 *           description: 1 is billed simplex equals mail processing, 2 is billed for additional pages line item
 *         OrdersAutomated:
 *           type: boolean
 *           description: whether the order version creation is automated
 *         InvoicesAutomated:
 *           type: boolean
 *           description: whether or not the PreviousOrder will be processed by BulkOrderClose and invoicing processes
 *       example:
 *         JobID: 101
 *         OrderTemplate: T1234
 *         CurrentOrder: "182555"
 *         TemplateVersionID: 0
 *         BillingType: 1
 *         OrdersAutomated: true
 *         InvoicesAutomated: true
 *     UpdateOrdersBody:
 *       type: object
 *       properties:
 *         OrderTemplate:
 *           type: string
 *           description: the order number of the template from ERp that will be use to create new monthly orders
 *         CurrentOrder:
 *           type: string
 *           description: the currently active order number in ERP that will have versions added to it
 *         TemplateVersionID:
 *           type: int
 *           description: the version suffix to copy for new versions
 *         BillingType:
 *           type: int
 *           description: 1 is billed simplex equals mail processing, 2 is billed for additional pages line item
 *         OrdersAutomated:
 *           type: boolean
 *           description: whether the order version creation is automated
 *         TriggerNewOrder:
 *           type: boolean
 *           description: trigger creation of new monthly order
 *         PreviousOrder:
 *           type: string
 *           description: previous order number populated after TriggerNewOrder is ran
 *         NextOrder:
 *           type: string
 *           description: the next order number to use in lieu of creating a new monthly order
 *         InvoicesAutomated:
 *           type: boolean
 *           description: whether or not the PreviousOrder will be processed by BulkOrderClose and invoicing processes
 *       example:
 *         OrderTemplate: T1234
 *         CurrentOrder: "182555"
 *         TemplateVersionID: 0
 *         BillingType: 1
 *         OrdersAutomated: true
 *         TriggerNewOrder: false
 *         PreviousOrder: 
 *         NextOrder: 
 *         InvoicesAutomated: true
 *     DeleteOrderResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the order
 *         Active:
 *           type: boolean
 *           description: Whether the order is active or not
 *       example:
 *         ID: 9999
 *         Active: false 
 */


  module.exports = yup
    .object()
    .required()
    .shape({
      Orders: yup.array().of(
        yup.object().shape({
            JobID: yup.number().integer().required('Client_GUID is required.'),
            OrderTemplate: yup.string().required('OrderTemplate is required'),
            CurrentOrder: yup.string().default('0'),
            TemplateVersionID: yup.number().integer().default(0),
            BillingType: yup
                .number()
                .integer()
                .required(
                'BillingType is required, 1 for MailProcessing or 2 for AdditionalPg billing'
                ),
            OrdersAutomated: yup.boolean().default(false),
            PreviousOrder: yup.string().default('0'),
            NextOrder: yup.string().default('0'),
            InvoicesAutomated: yup.boolean().default(false)
        })
      ),
    })