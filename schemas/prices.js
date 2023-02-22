const yup = require('yup')

/**
 * @swagger
 * components:
 *   schemas:
 *     Price:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the contact
 *         ClientID:
 *           type: int
 *           description: The clientid the contract belongs to
 *         ContractID:
 *           type: int
 *           description: The contractid the price is assigned to
 *         Service:
 *           type: string
 *           description: The service the price is assigned to
 *         ItemPrice:
 *           type: number
 *           format: double
 *           description: Whether the contract is active or not
 *       example:
 *         ID: 3100
 *         ClientID: 101
 *         ContractID: 230
 *         Service: Additional Pages
 *         ItemPrice: 100.00
 *     CreatePricesBody:
 *       type: object
 *       properties:
 *         ContractID:
 *           type: int
 *           description: The contractid the price is assigned to
 *         ServiceID:
 *           type: int
 *           description: The serviceid for the service the price will be overriding
 *         ItemPrice:
 *           type: number
 *           format: double
 *           description: Whether the contract is active or not
 *       example:
 *         ContractID: 230
 *         ServiceID: 3
 *         ItemPrice: 100.00
 *     UpdatePricesBody:
 *       type: object
 *       properties:
 *         ItemPrice:
 *           type: number
 *           format: double
 *           description: Whether the contract is active or not
 *       example:
 *         ItemPrice: 100.00
 *     DeletePriceResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The priceid set to zero
 *         ItemPrice:
 *           type: number
 *           format: double
 *           description: Whether the contract is active or not
 *       example:
 *         ID: 3100
 *         ItemPrice: 0.00
 */

module.exports = yup
  .object()
  .required()
  .shape({
    Prices: yup.array().of(
      yup.object().shape({
        ContractID: yup.number().integer().required('ContractID is required'),
        ServiceID: yup.number().integer().required('ServiceID is required'),
        ItemPrice: yup.number().default(0.0),
      })
    ),
  })
