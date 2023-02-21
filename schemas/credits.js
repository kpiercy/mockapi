const yup = require('yup')

/**
 * @swagger
 * components:
 *   schemas:
 *     Credit:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the credit
 *         InvoiceID:
 *           type: int
 *           description: The InvoiceID the credit is applied to
 *         Active:
 *           type: boolean
 *           description: Whether the credit is active or not
 *         OrderNumber:
 *           type: string
 *           description: OrderNumber that the credit is applied to
 *         Amount:
 *           type: number
 *           format: double
 *           description: The dollar value to be credited to the invoice
 *         CreditPercentage:
 *           type: number
 *           format: double
 *           description: The percentage value to be credited to the invoice
 *       example:
 *         ID: 35
 *         InvoiceID: 300
 *         Active: true
 *         OrderNumber: 182456
 *         Amount: 200.00
 *         CreditPercentage: 0
 *     CreateCreditsBody:
 *       type: object
 *       properties:
 *         InvoiceID:
 *           type: int
 *           description: The InvoiceID the credit is applied to
 *         Active:
 *           type: boolean
 *           description: Whether the credit is active or not
 *         OrderNumber:
 *           type: string
 *           description: OrderNumber that the credit is applied to
 *         Amount:
 *           type: number
 *           format: double
 *           description: The dollar value to be credited to the invoice
 *         CreditPercentage:
 *           type: number
 *           format: double
 *           description: The percentage value to be credited to the invoice
 *       example:
 *         InvoiceID: 300
 *         Active: true
 *         OrderNumber: "182456"
 *         Amount: 200.00
 *         CreditPercentage: 0
 *     UpdateCreditsBody:
 *       type: object
 *       properties:
 *         Active:
 *           type: boolean
 *           description: Whether the credit is active or not
 *         OrderNumber:
 *           type: string
 *           description: OrderNumber that the credit is applied to
 *         Amount:
 *           type: number
 *           format: double
 *           description: The dollar value to be credited to the invoice
 *         CreditPercentage:
 *           type: number
 *           format: double
 *           description: The percentage value to be credited to the invoice
 *       example:
 *         Active: true
 *         OrderNumber: "182456"
 *         Amount: 200.00
 *         CreditPercentage: 0
 *     DeleteCreditResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the credit deleted
 *         Active:
 *           type: boolean
 *           description: Whether the credit is active or not
 *       example:
 *         ID: 35
 *         Active: false
 */

module.exports = yup
  .object()
  .required()
  .shape({
    Credits: yup.array().of(
      yup.object().shape({
        InvoiceID: yup.number().integer().required('InvoiceID is required.'),
        Active: yup
          .boolean()
          .default(false)
          .required('Active is required, default to false otherwise.'),
        OrderNumber: yup.string().required('OrderNumber is required'),
        Amount: yup.number().nullable().default(0.0),
        CreditPercentage: yup.number().nullable().default(0.0)
      })
    ),
  })