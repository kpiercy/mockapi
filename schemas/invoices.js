const yup = require("yup");
const multiEmailRegExp =
  /^(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*;\s*|\s*$))*$/;

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the invoice
 *         ParentID:
 *           type: int
 *           description: The ParentID the invoice is belongs to
 *         ClientID:
 *           type: int
 *           description: The ClientID the invoice belongs to
 *         Active:
 *           type: boolean
 *           description: Whether the invoice is active or not
 *         OrderID:
 *           type: int
 *           description: ERP Order ID
 *         OrderNumber:
 *           type: string
 *           description: ERP Order number
 *         Project:
 *           type: string
 *           description: Project name from order number
 *         StartDate:
 *           type: string
 *           description: Start date of the order from ERP
 *         EndDate:
 *           type: string
 *           description: Ending date of the order from ERP
 *         Customer:
 *           type: string
 *           description: Customer name from ERP
 *         EmailInvoicesTo:
 *           type: string
 *           description: Emails invoices were sent to
 *         TotalStatements:
 *           type: number
 *           format: double
 *           description: Total statements of order
 *         TotalNCOA:
 *           type: number
 *           format: double
 *           description: Total ncoa of order
 *         NCOASell:
 *           type: number
 *           format: double
 *           description: NCOA sell value
 *         TotalSimplex:
 *           type: number
 *           format: double
 *           description: Total simplex of order
 *         SimplexSell:
 *           type: number
 *           format: double
 *           description: Simplex sell value
 *         TotalDuplex:
 *           type: number
 *           format: double
 *           description: Total duplex of order
 *         DuplexSell:
 *           type: number
 *           format: double
 *           description: Duplex sell value
 *         TotalAddtlpgs:
 *           type: number
 *           format: double
 *           description: Total addtlpgs of order
 *         AddtlpgsSell:
 *           type: number
 *           format: double
 *           description: Addtlpgs sell value
 *         TotalPaper:
 *           type: number
 *           format: double
 *           description: Total paper of order
 *         PaperSell:
 *           type: number
 *           format: double
 *           description: Paper sell value
 *         TotalOutgoing:
 *           type: number
 *           format: double
 *           description: Total outgoing of order
 *         OutgoingSell:
 *           type: number
 *           format: double
 *           description: Outgoing sell value
 *         TotalReturns:
 *           type: number
 *           format: double
 *           description: Total returns of order
 *         ReturnsSell:
 *           type: number
 *           format: double
 *           description: Returns sell value
 *         TotalHandInsert:
 *           type: number
 *           format: double
 *           description: Total hand inserts of order
 *         HandInsertSell:
 *           type: number
 *           format: double
 *           description: Hand inserts sell value
 *         TotalEpay:
 *           type: number
 *           format: double
 *           description: Total epay of order
 *         EpaySell:
 *           type: number
 *           format: double
 *           description: Epay sell value
 *         TotalPostage:
 *           type: number
 *           format: double
 *           description: Total postage of order
 *         TotalServices:
 *           type: number
 *           format: double
 *           description: Total services of order
 *         TotalTaxes:
 *           type: number
 *           format: double
 *           description: Total taxes of order
 *       example:
 *         ID: 60
 *         ParentID: 10
 *         ClientID: 101
 *         Active: true
 *         OrderID: 13201
 *         OrderNumber: "182311"
 *         Project: PFS_zAdena - January 2023
 *         StartDate: 2022-12-30 12:00:00'
 *         EndDate: 2023-01-30 12:00:00'
 *         Customer: PFS zAdena
 *         EmailInvoicesTo: gwatson@eliteps.com, lwatson@eliteps.com
 *         TotalStatements: 2.000
 *         TotalNCOA: 2.000
 *         NCOASell: 0.000
 *         TotalSimplex: 2.500
 *         SimplexSell: 312.5
 *         TotalDuplex: 1.200
 *         DuplexSell: 0.000
 *         TotalAddtlpgs: 0.500
 *         AddtlpgsSell: 50.000
 *         TotalPaper: 2.500
 *         PaperSell: 0.000
 *         TotalOutgoing: 2.000
 *         OutgoingSell: 0.000
 *         TotalReturns: 2.000
 *         ReturnsSell: 0.000
 *         TotalHandInsert: 0.000
 *         HandInsertSell: 0.000
 *         TotalEpay: 1.000
 *         EpaySell: 5.50
 *         TotalPostage: 962.00
 *         TotalServices: 368.00
 *         TotalTaxes: 0.000
 *     CreateInvoicesBody:
 *       type: object
 *       properties:
 *         ParentID:
 *           type: int
 *           description: The ParentID the invoice is belongs to
 *         ClientID:
 *           type: int
 *           description: The ClientID the invoice belongs to
 *         Active:
 *           type: boolean
 *           description: Whether the invoice is active or not
 *         OrderID:
 *           type: int
 *           description: ERP Order ID
 *         OrderNumber:
 *           type: string
 *           description: ERP Order number
 *         Project:
 *           type: string
 *           description: Project name from order number
 *         StartDate:
 *           type: string
 *           description: Start date of the order from ERP
 *         EndDate:
 *           type: string
 *           description: Ending date of the order from ERP
 *         Customer:
 *           type: string
 *           description: Customer name from ERP
 *         EmailInvoicesTo:
 *           type: string
 *           description: Emails invoices were sent to
 *         TotalStatements:
 *           type: number
 *           format: double
 *           description: Total statements of order
 *         TotalNCOA:
 *           type: number
 *           format: double
 *           description: Total ncoa of order
 *         NCOASell:
 *           type: number
 *           format: double
 *           description: NCOA sell value
 *         TotalSimplex:
 *           type: number
 *           format: double
 *           description: Total simplex of order
 *         SimplexSell:
 *           type: number
 *           format: double
 *           description: Simplex sell value
 *         TotalDuplex:
 *           type: number
 *           format: double
 *           description: Total duplex of order
 *         DuplexSell:
 *           type: number
 *           format: double
 *           description: Duplex sell value
 *         TotalAddtlpgs:
 *           type: number
 *           format: double
 *           description: Total addtlpgs of order
 *         AddtlpgsSell:
 *           type: number
 *           format: double
 *           description: Addtlpgs sell value
 *         TotalPaper:
 *           type: number
 *           format: double
 *           description: Total paper of order
 *         PaperSell:
 *           type: number
 *           format: double
 *           description: Paper sell value
 *         TotalOutgoing:
 *           type: number
 *           format: double
 *           description: Total outgoing of order
 *         OutgoingSell:
 *           type: number
 *           format: double
 *           description: Outgoing sell value
 *         TotalReturns:
 *           type: number
 *           format: double
 *           description: Total returns of order
 *         ReturnsSell:
 *           type: number
 *           format: double
 *           description: Returns sell value
 *         TotalHandInsert:
 *           type: number
 *           format: double
 *           description: Total hand inserts of order
 *         HandInsertSell:
 *           type: number
 *           format: double
 *           description: Hand inserts sell value
 *         TotalEpay:
 *           type: number
 *           format: double
 *           description: Total epay of order
 *         EpaySell:
 *           type: number
 *           format: double
 *           description: Epay sell value
 *         TotalPostage:
 *           type: number
 *           format: double
 *           description: Total postage of order
 *         TotalServices:
 *           type: number
 *           format: double
 *           description: Total services of order
 *         TotalTaxes:
 *           type: number
 *           format: double
 *           description: Total taxes of order
 *       example:
 *         ParentID: 10
 *         ClientID: 101
 *         Active: true
 *         OrderID: 13201
 *         OrderNumber: "182311"
 *         Project: PFS_zAdena - January 2023
 *         StartDate: 2022-12-30 12:00:00'
 *         EndDate: 2023-01-30 12:00:00'
 *         Customer: PFS zAdena
 *         EmailInvoicesTo: gwatson@eliteps.com, lwatson@eliteps.com
 *         TotalStatements: 2.000
 *         TotalNCOA: 2.000
 *         NCOASell: 0.000
 *         TotalSimplex: 2.500
 *         SimplexSell: 312.5
 *         TotalDuplex: 1.200
 *         DuplexSell: 0.000
 *         TotalAddtlpgs: 0.500
 *         AddtlpgsSell: 50.000
 *         TotalPaper: 2.500
 *         PaperSell: 0.000
 *         TotalOutgoing: 2.000
 *         OutgoingSell: 0.000
 *         TotalReturns: 2.000
 *         ReturnsSell: 0.000
 *         TotalHandInsert: 0.000
 *         HandInsertSell: 0.000
 *         TotalEpay: 1.000
 *         EpaySell: 5.50
 *         TotalPostage: 962.00
 *         TotalServices: 368.00
 *         TotalTaxes: 0.000
 *     UpdateInvoicesBody:
 *       type: object
 *       properties:
 *         Active:
 *           type: boolean
 *           description: Whether the invoice is active or not
 *         OrderID:
 *           type: int
 *           description: ERP Order ID
 *         OrderNumber:
 *           type: string
 *           description: ERP Order number
 *         Project:
 *           type: string
 *           description: Project name from order number
 *         StartDate:
 *           type: string
 *           description: Start date of the order from ERP
 *         EndDate:
 *           type: string
 *           description: Ending date of the order from ERP
 *         Customer:
 *           type: string
 *           description: Customer name from ERP
 *         EmailInvoicesTo:
 *           type: string
 *           description: Emails invoices were sent to
 *         TotalStatements:
 *           type: number
 *           format: double
 *           description: Total statements of order
 *         TotalNCOA:
 *           type: number
 *           format: double
 *           description: Total ncoa of order
 *         NCOASell:
 *           type: number
 *           format: double
 *           description: NCOA sell value
 *         TotalSimplex:
 *           type: number
 *           format: double
 *           description: Total simplex of order
 *         SimplexSell:
 *           type: number
 *           format: double
 *           description: Simplex sell value
 *         TotalDuplex:
 *           type: number
 *           format: double
 *           description: Total duplex of order
 *         DuplexSell:
 *           type: number
 *           format: double
 *           description: Duplex sell value
 *         TotalAddtlpgs:
 *           type: number
 *           format: double
 *           description: Total addtlpgs of order
 *         AddtlpgsSell:
 *           type: number
 *           format: double
 *           description: Addtlpgs sell value
 *         TotalPaper:
 *           type: number
 *           format: double
 *           description: Total paper of order
 *         PaperSell:
 *           type: number
 *           format: double
 *           description: Paper sell value
 *         TotalOutgoing:
 *           type: number
 *           format: double
 *           description: Total outgoing of order
 *         OutgoingSell:
 *           type: number
 *           format: double
 *           description: Outgoing sell value
 *         TotalReturns:
 *           type: number
 *           format: double
 *           description: Total returns of order
 *         ReturnsSell:
 *           type: number
 *           format: double
 *           description: Returns sell value
 *         TotalHandInsert:
 *           type: number
 *           format: double
 *           description: Total hand inserts of order
 *         HandInsertSell:
 *           type: number
 *           format: double
 *           description: Hand inserts sell value
 *         TotalEpay:
 *           type: number
 *           format: double
 *           description: Total epay of order
 *         EpaySell:
 *           type: number
 *           format: double
 *           description: Epay sell value
 *         TotalPostage:
 *           type: number
 *           format: double
 *           description: Total postage of order
 *         TotalServices:
 *           type: number
 *           format: double
 *           description: Total services of order
 *         TotalTaxes:
 *           type: number
 *           format: double
 *           description: Total taxes of order
 *       example:
 *         Active: true
 *         OrderID: 13201
 *         OrderNumber: "182311"
 *         Project: PFS_zAdena - January 2023
 *         StartDate: 2022-12-30 12:00:00'
 *         EndDate: 2023-01-30 12:00:00'
 *         Customer: PFS zAdena
 *         EmailInvoicesTo: gwatson@eliteps.com, lwatson@eliteps.com
 *         TotalStatements: 2.000
 *         TotalNCOA: 2.000
 *         NCOASell: 0.000
 *         TotalSimplex: 2.500
 *         SimplexSell: 312.5
 *         TotalDuplex: 1.200
 *         DuplexSell: 0.000
 *         TotalAddtlpgs: 0.500
 *         AddtlpgsSell: 50.000
 *         TotalPaper: 2.500
 *         PaperSell: 0.000
 *         TotalOutgoing: 2.000
 *         OutgoingSell: 0.000
 *         TotalReturns: 2.000
 *         ReturnsSell: 0.000
 *         TotalHandInsert: 0.000
 *         HandInsertSell: 0.000
 *         TotalEpay: 1.000
 *         EpaySell: 5.50
 *         TotalPostage: 962.00
 *         TotalServices: 368.00
 *         TotalTaxes: 0.000
 *     DeleteInvoiceResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the invoice deleted
 *         Active:
 *           type: boolean
 *           description: Whether the invoice is active or not
 *       example:
 *         ID: 60
 *         Active: false
 */

  module.exports = yup
    .object()
    .required()
    .shape({
      Invoices: yup.array().of(
        yup.object().shape({
          ClientID: yup.number().integer().required('Client_GUID is required.'),
          Parent_GUID: yup.number().integer().notRequired(),
          OrderID: yup.number().integer().required('OrderID is required.'),
          OrderNumber: yup.string().required('OrderNumber is required.'),
          Project: yup.string().required('Project is required.'),
          StartDate: yup.date().required('StartDate is required'),
          EndDate: yup.date().required('EndDate is required'),
          Customer: yup.string().required('Customer name is required'),
          EmailInvoicesTo: yup
            .string()
            .matches(multiEmailRegExp, 'Please enter valid emails separated by commas'),
          TotalStatements: yup.number().positive().required('TotalStatements is required'),
          TotalNCOA: yup.number().positive().default(0.0),
          NCOASell: yup.number().positive().default(0.0),
          TotalSimplex: yup.number().positive().default(0.0),
          SimplexSell: yup.number().positive().default(0.0),
          TotalDuplex: yup.number().positive().default(0.0),
          DuplexSell: yup.number().positive().default(0.0),
          TotalAddtlpgs: yup.number().positive().default(0.0),
          AddtlpgsSell: yup.number().positive().default(0.0),
          TotalPaper: yup.number().positive().default(0.0),
          PaperSell: yup.number().positive().default(0.0),
          TotalOutgoing: yup.number().positive().default(0.0),
          OutgoingSell: yup.number().positive().default(0.0),
          TotalReturns: yup.number().positive().default(0.0),
          ReturnsSell: yup.number().positive().default(0.0),
          TotalHandInsert: yup.number().positive().default(0.0),
          HandInsertSell: yup.number().positive().default(0.0),
          TotalEpay: yup.number().positive().default(0.0),
          EpaySell: yup.number().positive().default(0.0),
          TotalPostage: yup.number().positive().default(0.0),
          TotalServices: yup.number().positive().default(0.0),
          TotalTaxes: yup.number().positive().default(0.0)
        })
      ),
    })