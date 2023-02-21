const yup = require('yup')

/**
 * @swagger
 * components:
 *   schemas:
 *     Deposit:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the deposit
 *         InvoiceID:
 *           type: int
 *           description: The InvoiceID the deposit is applied to
 *         Active:
 *           type: boolean
 *           description: Whether the deposit is active or not
 *         CheckingAccount:
 *           type: string
 *           description: 
 *         CheckNumber:
 *           type: string
 *           description: check number for deposit
 *         ReceivedFrom:
 *           type: string
 *           description: client name the check was received from
 *         AcctNumber:
 *           type: string
 *           description: accounting customer code
 *         ERPCode:
 *           type: string
 *           description: Customer code from ERP
 *         ERPCustomerID:
 *           type: int
 *           description: CustomerID from ERP 
 *         OrderNumber:
 *           type: string
 *           description: OrderNumber the deposit is paying for
 *         Amount:
 *           type: number
 *           format: double
 *           description: The dollar value to be deposited for invoice
 *         Discount:
 *           type: number
 *           format: double
 *           description: Dollar value to discount
 *         DiscountAcct:
 *           type: string
 *           description: acct number the discount should be applied to
 *       example:
 *         ID: 60
 *         InvoiceID: 300
 *         Active: true
 *         CheckingAccount: 123CHASE
 *         CheckNumber: "2314"
 *         ReceivedFrom: PFS zAdena
 *         AcctNumber: 2068
 *         ERPCode: 2068-1
 *         ERPCustomerID: 14321
 *         OrderNumber: "182456"
 *         Amount: 3256.52
 *         Discount: 0.00
 *         DiscountAcct: 
 *     CreateDepositsBody:
 *       type: object
 *       properties:
 *         InvoiceID:
 *           type: int
 *           description: The InvoiceID the deposit is applied to
 *         Active:
 *           type: boolean
 *           description: Whether the deposit is active or not
 *         CheckingAccount:
 *           type: string
 *           description: 
 *         CheckNumber:
 *           type: string
 *           description: check number for deposit
 *         ReceivedFrom:
 *           type: string
 *           description: client name the check was received from
 *         AcctNumber:
 *           type: string
 *           description: accounting customer code
 *         ERPCode:
 *           type: string
 *           description: Customer code from ERP
 *         ERPCustomerID:
 *           type: int
 *           description: CustomerID from ERP 
 *         OrderNumber:
 *           type: string
 *           description: OrderNumber the deposit is paying for
 *         Amount:
 *           type: number
 *           format: double
 *           description: The dollar value to be deposited for invoice
 *         Discount:
 *           type: number
 *           format: double
 *           description: Dollar value to discount
 *         DiscountAcct:
 *           type: string
 *           description: acct number the discount should be applied to
 *       example:
 *         InvoiceID: 300
 *         Active: true
 *         CheckingAccount: 123CHASE
 *         CheckNumber: "2314"
 *         ReceivedFrom: PFS zAdena
 *         AcctNumber: 2068
 *         ERPCode: 2068-1
 *         ERPCustomerID: 14321
 *         OrderNumber: "182456"
 *         Amount: 3256.52
 *         Discount: 0.00
 *         DiscountAcct:
 *     UpdateDepositsBody:
 *       type: object
 *       properties:
 *         Active:
 *           type: boolean
 *           description: Whether the deposit is active or not
 *         CheckingAccount:
 *           type: string
 *           description: 
 *         CheckNumber:
 *           type: string
 *           description: check number for deposit
 *         ReceivedFrom:
 *           type: string
 *           description: client name the check was received from
 *         AcctNumber:
 *           type: string
 *           description: accounting customer code
 *         ERPCode:
 *           type: string
 *           description: Customer code from ERP
 *         ERPCustomerID:
 *           type: int
 *           description: CustomerID from ERP 
 *         OrderNumber:
 *           type: string
 *           description: OrderNumber the deposit is paying for
 *         Amount:
 *           type: number
 *           format: double
 *           description: The dollar value to be deposited for invoice
 *         Discount:
 *           type: number
 *           format: double
 *           description: Dollar value to discount
 *         DiscountAcct:
 *           type: string
 *           description: acct number the discount should be applied to
 *       example:
 *         Active: true
 *         CheckingAccount: 123CHASE
 *         CheckNumber: "2314"
 *         ReceivedFrom: PFS zAdena
 *         AcctNumber: 2068
 *         ERPCode: 2068-1
 *         ERPCustomerID: 14321
 *         OrderNumber: "182456"
 *         Amount: 3256.52
 *         Discount: 0.00
 *         DiscountAcct:
 *     DeleteDepositResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the deposit deleted
 *         Active:
 *           type: boolean
 *           description: Whether the deposit is active or not
 *       example:
 *         ID: 60
 *         Active: false
 */

module.exports = yup
  .object()
  .required()
  .shape({
    Deposits: yup.array().of(
      yup.object().shape({
        InvoiceID: yup.number().integer().required('InvoiceID is required.'),
        Active: yup
          .boolean()
          .default(false)
          .required('Active is required, default to false otherwise.'),
        CheckingAccount: yup.string().required('CheckingAccount is required'),
        CheckNumber: yup.string().required('CheckNumber is required'),
        ReceivedFrom: yup.string().nullable(),
        AcctNumber: yup.string().nullable(),
        ERPCode: yup.string().required('ERPCode is required'),
        ERPCustomerID: yup.number().integer().required('ERPCustomerID is required'),
        OrderNumber: yup.string().required('OrderNumber is required'),
        Amount: yup.number().nullable().default(0.0),
        Discount: yup.number().nullable().default(0.0),
        DiscountAcct: yup.string().nullable().default(null)
      })
    ),
  })
