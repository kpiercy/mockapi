const yup = require("yup")

/**
 * @swagger
 * components:
 *   schemas:
 *     Contract:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the contract
 *         ClientID:
 *           type: int
 *           description: The clientid the contract belong to
 *         Active:
 *           type: boolean
 *           description: Whether the contract is active or not
 *         DatePresented:
 *           type: string
 *           description: The datetime the contract was presented
 *         DateSigned:
 *           type: string
 *           description: The datetime the contract was signed
 *         EliteRep1:
 *           type: string
 *           description: Primary EliteRep responsible
 *         EliteRep2:
 *           type: string
 *           description: Secondary EliteRep responsible
 *         ClientRep1:
 *           type: string
 *           description: Primary ClientRep responsible
 *         ClientRep2:
 *           type: string
 *           description: Secondary ClientRep responsible
 *         DateEffective:
 *           type: string
 *           description: datetime the contract is in effect
 *       example:
 *         ID: 230
 *         ClientID: 9999
 *         Active: true
 *         DatePresented: 2022-11-15 12:00:00
 *         DateSigned: 2022-12-01 10:31:30
 *         EliteRep1: GW
 *         EliteRep2: TS
 *         ClientRep1: Bobby Brown
 *         ClientRep2: 
 *         DateEffective: 2023-12-31 23:59:59
 *     ContractWithPrices:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the contract
 *         ClientID:
 *           type: int
 *           description: The clientid the contract belong to
 *         Active:
 *           type: boolean
 *           description: Whether the contract is active or not
 *         DatePresented:
 *           type: string
 *           description: The datetime the contract was presented
 *         DateSigned:
 *           type: string
 *           description: The datetime the contract was signed
 *         EliteRep1:
 *           type: string
 *           description: Primary EliteRep responsible
 *         EliteRep2:
 *           type: string
 *           description: Secondary EliteRep responsible
 *         ClientRep1:
 *           type: string
 *           description: Primary ClientRep responsible
 *         ClientRep2:
 *           type: string
 *           description: Secondary ClientRep responsible
 *         DateEffective:
 *           type: string
 *           description: datetime the contract is in effect
 *         Prices:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  Service:
 *                      type: string
 *                      description: Service for which the contract has a price override
 *                  ItemPrice:
 *                      type: number
 *                      format: double
 *                      description: Price of the service on the contract
 *       example:
 *         ID: 230
 *         ClientID: 9999
 *         Active: true
 *         DatePresented: 2022-11-15 12:00:00
 *         DateSigned: 2022-12-01 10:31:30
 *         EliteRep1: GW
 *         EliteRep2: TS
 *         ClientRep1: Bobby Brown
 *         ClientRep2: 
 *         DateEffective: 2023-12-31 23:59:59
 *         Prices:
 *             - Service: Mail Processing
 *               ItemPrice: 125.00
 *     CreateContractWithPrices:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the contract
 *         ClientID:
 *           type: int
 *           description: The clientid the contract belong to
 *         Active:
 *           type: boolean
 *           description: Whether the contract is active or not
 *         DatePresented:
 *           type: string
 *           description: The datetime the contract was presented
 *         DateSigned:
 *           type: string
 *           description: The datetime the contract was signed
 *         EliteRep1:
 *           type: string
 *           description: Primary EliteRep responsible
 *         EliteRep2:
 *           type: string
 *           description: Secondary EliteRep responsible
 *         ClientRep1:
 *           type: string
 *           description: Primary ClientRep responsible
 *         ClientRep2:
 *           type: string
 *           description: Secondary ClientRep responsible
 *         DateEffective:
 *           type: string
 *           description: datetime the contract is in effect
 *         Prices:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                  Service:
 *                      type: int
 *                      description: ServiceID for the price to override
 *                  ItemPrice:
 *                      type: number
 *                      format: double
 *                      description: Price of the service on the contract
 *       example:
 *         ID: 230
 *         ClientID: 9999
 *         Active: true
 *         DatePresented: 2022-11-15 12:00:00
 *         DateSigned: 2022-12-01 10:31:30
 *         EliteRep1: GW
 *         EliteRep2: TS
 *         ClientRep1: Bobby Brown
 *         ClientRep2: 
 *         DateEffective: 2023-12-31 23:59:59
 *         Prices:
 *             - Service: 30
 *               ItemPrice: 125.50
 *     UpdateContractsBody:
 *       type: object
 *       properties:
 *         Active:
 *           type: boolean
 *           description: Whether the contract is active or not
 *         ContractType:
 *           type: string
 *           description: The contract type
 *         FirstName:
 *           type: string
 *           description: Contracts first name
 *         LastName:
 *           type: string
 *           description: Contracts last name
 *         Phone:
 *           type: string
 *           description: Contracts phone number
 *         Email:
 *           type: string
 *           description: Contracts email address
 *       example:
 *         Active: true
 *         ContractType: StmtProcessing
 *         FirstName: Bobby
 *         LastName: Brown
 *         Phone: 765-745-5555
 *         Email: bobby.brown@someplace.com
 *     DeleteContractResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the contract deleted
 *         Active:
 *           type: boolean
 *           description: Whether the contract is active or not
 *       example:
 *         ID: 230
 *         Active: false
 */

module.exports = yup.object()
.required()
.shape({
    Contracts: yup.array().of(
        yup.object().shape({
            ClientID: yup.number().integer().required('ClientID is required.'),
            DatePresented: yup.date().default(() => new Date()),
            DateSigned: yup.date().default(() => new Date()),
            EliteRep1: yup.string().default('EB').required('EliteRep1 is required.'),
            EliteRep2: yup.string().nullable().notRequired(),
            ClientRep1: yup.string().required('ClientRep1 is required.'),
            ClientRep2: yup.string().nullable().notRequired(),
            DateEffective: yup.date().default(() => new Date()),
            Active: yup.boolean().default(false).required('Active is required, default to false otherwise.')
        })
    )
})