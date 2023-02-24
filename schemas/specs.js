const yup = require("yup");
const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const urlRegExp =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

/**
 * @swagger
 * components:
 *   schemas:
 *     Spec:
 *       type: object
 *       properties:
 *         ID: 
 *             type: int
 *             description: the public id of the spec
 *         JobID: 
 *             type: int
 *             description: public jobid
 *         FacilityID: 
 *             type: int
 *             description: public facilityid
 *         Software:
 *             type: string
 *             description: Software the facility uses
 *         APIAvailable:
 *             type: boolean
 *             description: Whether the client has an api available to retrieve data
 *         APIDocumentation:
 *             type: string
 *             description: Site where client API Docs can be found
 *         ExtractErrors:
 *             type: boolean
 *             description: Whether the client wants errors extracted and remainder of file processed
 *         HoldErrors:
 *             type: boolean
 *             description: Whether client wants file held with errors and not processed
 *         CrosswalkProvided:
 *             type: boolean
 *             description: Whether the client provided a data crosswalk
 *         DataFileProvided:
 *             type: boolean
 *             description: Whether client provided a data file
 *         PDFFileProvided:
 *             type: boolean
 *             description: Whether client provided pdf file in lieu of data file
 *         LockboxIntegration:
 *             type: boolean
 *             description: Whether client has lockbox integration
 *         LockboxBank:
 *             type: string
 *             description: Name of bank to be used for lockbox integration
 *         LockboxAddress:
 *             type: string
 *             description: City State and ZIP of bank being used for lockbox
 *         ClientProvidedSpecSheet:
 *             type: boolean
 *             description: Whether the client provided a spec sheet for the file
 *         Channels:
 *           $ref: '#/components/schemas/Channel'
 *         Logos:
 *           $ref: '#/components/schemas/Logo'
 *         Reports:
 *           $ref: '#/components/schemas/Report'
 *       example:
 *         ID: 55
 *         JobID: 300
 *         FacilityID: 123
 *         Software: EPIC
 *         APIAvailable: true
 *         APIDocumentation: https://facility.com/api/docs
 *         ExtractErrors: true
 *         HoldErrors: false
 *         DataCrosswalkProvided: true
 *         DataFileProvided: true
 *         PDFFileProvided: false
 *         LockboxIntegration: false
 *         LockboxBank: 
 *         LockboxAddress: 
 *         ClientProvidedSpecSheet: true
 *         Channels:
 *               AmericanExpressAccepted: true
 *               VisaAccepted: true
 *               MasterCardAccepted: true
 *               DiscoverAccepted: true
 *               OtherAccepted:
 *               MailPayments: true
 *               MailTo: 4300 S Madison St, Muncie, IN 47302
 *               PhonePayments: true
 *               PhoneLocal: 765-347-5555
 *               PhoneTollFree: 800-555-1111
 *               IVRPayments: false
 *               IVRPhone: 
 *               OnlinePayments: true
 *               PaySite: https://facility.com/payus
 *               OtherPayChannels: 
 *         Reports:
 *               SummaryReport: true
 *               MovesReport: true
 *               Suppressionreport: true
 *               UndeliverablesReport: true
 *               NonCassReport: true
 *               FacilityReport: false
 *               FacilityPDFs: false
 *               PrintPDFs: false
 *               AnomalyReport: true
 *               MonthlySummaryReport: false
 *         Logos:
 *               Location: C:\clients\P\PFS_zAdena\Logos\
 *     CreateSpecsBody:
 *       type: object
 *       properties:
 *         JobID: 
 *             type: int
 *             description: public jobid
 *         FacilityID: 
 *             type: int
 *             description: public facilityid
 *         Software:
 *             type: string
 *             description: Software the facility uses
 *         APIAvailable:
 *             type: boolean
 *             description: Whether the client has an api available to retrieve data
 *         APIDocumentation:
 *             type: string
 *             description: Site where client API Docs can be found
 *         ExtractErrors:
 *             type: boolean
 *             description: Whether the client wants errors extracted and remainder of file processed
 *         HoldErrors:
 *             type: boolean
 *             description: Whether client wants file held with errors and not processed
 *         CrosswalkProvided:
 *             type: boolean
 *             description: Whether the client provided a data crosswalk
 *         DataFileProvided:
 *             type: boolean
 *             description: Whether client provided a data file
 *         PDFFileProvided:
 *             type: boolean
 *             description: Whether client provided pdf file in lieu of data file
 *         LockboxIntegration:
 *             type: boolean
 *             description: Whether client has lockbox integration
 *         LockboxBank:
 *             type: string
 *             description: Name of bank to be used for lockbox integration
 *         LockboxAddress:
 *             type: string
 *             description: City State and ZIP of bank being used for lockbox
 *         ClientProvidedSpecSheet:
 *             type: boolean
 *             description: Whether the client provided a spec sheet for the file
 *         Channels:
 *           $ref: '#/components/schemas/Channel'
 *         Logos:
 *           $ref: '#/components/schemas/Logo'
 *         Reports:
 *           $ref: '#/components/schemas/Report'
 *       example:
 *         JobID: 300
 *         FacilityID: 123
 *         Software: EPIC
 *         APIAvailable: true
 *         APIDocumentation: https://facility.com/api/docs
 *         ExtractErrors: true
 *         HoldErrors: false
 *         DataCrosswalkProvided: true
 *         DataFileProvided: true
 *         PDFFileProvided: false
 *         LockboxIntegration: false
 *         LockboxBank: 
 *         LockboxAddress: 
 *         ClientProvidedSpecSheet: true
 *         Channels:
 *               AmericanExpressAccepted: true
 *               VisaAccepted: true
 *               MasterCardAccepted: true
 *               DiscoverAccepted: true
 *               OtherAccepted:
 *               MailPayments: true
 *               MailTo: 4300 S Madison St, Muncie, IN 47302
 *               PhonePayments: true
 *               PhoneLocal: 765-347-5555
 *               PhoneTollFree: 800-555-1111
 *               IVRPayments: false
 *               IVRPhone: 
 *               OnlinePayments: true
 *               PaySite: https://facility.com/payus
 *               OtherPayChannels: 
 *         Reports:
 *               SummaryReport: true
 *               MovesReport: true
 *               Suppressionreport: true
 *               UndeliverablesReport: true
 *               NonCassReport: true
 *               FacilityReport: false
 *               FacilityPDFs: false
 *               PrintPDFs: false
 *               AnomalyReport: true
 *               MonthlySummaryReport: false
 *         Logos:
 *               Location: C:\clients\P\PFS_zAdena\Logos\
 *     UpdateSpecsBody:
 *       type: object
 *       properties:
 *         Software:
 *             type: string
 *             description: Software the facility uses
 *         APIAvailable:
 *             type: boolean
 *             description: Whether the client has an api available to retrieve data
 *         APIDocumentation:
 *             type: string
 *             description: Site where client API Docs can be found
 *         ExtractErrors:
 *             type: boolean
 *             description: Whether the client wants errors extracted and remainder of file processed
 *         HoldErrors:
 *             type: boolean
 *             description: Whether client wants file held with errors and not processed
 *         CrosswalkProvided:
 *             type: boolean
 *             description: Whether the client provided a data crosswalk
 *         DataFileProvided:
 *             type: boolean
 *             description: Whether client provided a data file
 *         PDFFileProvided:
 *             type: boolean
 *             description: Whether client provided pdf file in lieu of data file
 *         LockboxIntegration:
 *             type: boolean
 *             description: Whether client has lockbox integration
 *         LockboxBank:
 *             type: string
 *             description: Name of bank to be used for lockbox integration
 *         LockboxAddress:
 *             type: string
 *             description: City State and ZIP of bank being used for lockbox
 *         ClientProvidedSpecSheet:
 *             type: boolean
 *             description: Whether the client provided a spec sheet for the file
 *       example:
 *         Software: EPIC
 *         APIAvailable: true
 *         APIDocumentation: https://facility.com/api/docs
 *         ExtractErrors: true
 *         HoldErrors: false
 *         DataCrosswalkProvided: true
 *         DataFileProvided: true
 *         PDFFileProvided: false
 *         LockboxIntegration: false
 *         LockboxBank: 
 *         LockboxAddress: 
 *         ClientProvidedSpecSheet: true
 *     DeleteSpecsResponse:
 *       type: object
 *       properties:
 *         ID: 
 *             type: int
 *             description: the public id of the spec
 *         FacilityID: 
 *             type: int
 *             description: public facilityid
 *         Active:
 *             type: boolean
 *             description: whether the facility spec is active or not
 *       example:
 *         ID: 55
 *         FacilityID: 123
 *         Active: false
 */

  module.exports = yup
    .object()
    .required()
    .shape({
      Specs: yup.array().of(
        yup.object().shape({
            JobID: yup.number().integer().required('JobID is required'),
            FacilityID: yup.number().integer().required('FacilityID is required'),
            Software: yup.string().trim(),
            APIAvailable: yup.boolean().default(false),
            APIDocumentation: yup
                .string()
                .nullable()
                .when("APIAvailable", {
                is: true,
                then: yup
                    .string()
                    .required(
                    "APIDocumentation website is required when APIAvailable is True"
                    )
                    .matches(urlRegExp, "Please enter properly formatted url."),
                }),
            ExtractErrors: yup.boolean().default(true).required(),
            HoldErrors: yup.boolean().default(false).required(),
            DataCrosswalkProvided: yup.boolean().default(false),
            DataFileProvided: yup.boolean().required(),
            PDFFileProvided: yup.boolean().required(),
            LockboxIntegration: yup.boolean().default(false).required(),
            LockboxBank: yup.string().when("LockboxIntegration", {
                is: true,
                then: yup
                    .string()
                    .required('LockboxBank is required when LockboxIntegration is True.'),
                otherwise: yup.string().nullable()
            }),
            LockboxCSZ: yup.string().when("LockboxIntegration", {
                is: true,
                then: yup
                    .string()
                    .required("LockboxCSZ is required when LockboxIntegration is True."),
                otherwise: yup.string().nullable()
            }),
            ClientProvidedSpecSheet: yup.boolean().default(false),
            Reports: yup.object().shape({
                SummaryReport: yup.boolean().default(false),
                MovesReport: yup.boolean().default(false),
                SuppressionReport: yup.boolean().default(false),
                UndeliverablesReport: yup.boolean().default(false),
                NonCassReport: yup.boolean().default(false),
                FacilityReport: yup.boolean().default(false),
                FacilityPDFs: yup.boolean().default(false),
                PrintPDFs: yup.boolean().default(false),
            }),
            Channels: yup.object().shape({
                AmericanExpress: yup.boolean().default(true),
                Visa: yup.boolean().default(true),
                MasterCard: yup.boolean().default(true),
                Discover: yup.boolean().default(true),
                OtherAccepted: yup.string().nullable(),
                MailPayments: yup.boolean().default(true),
                MailTo: yup.string().when("MailPayments", {
                is: true,
                then: yup
                    .string()
                    .required(
                    "MailTo address is required when MailPayments is True"
                    ),
                }),
                PhonePayments: yup.boolean().default(false),
                PhoneLocal: yup.string().when("PhonePayments", {
                is: true,
                then: yup
                    .string()
                    .matches(
                    phoneRegExp,
                    "Please enter properly formatted phone number"
                    )
                    .required("PhoneLocal is required when PhonePayments is True"),
                }),
                PhoneTollFree: yup.string().when("PhonePayments", {
                is: true,
                then: yup
                    .string()
                    .matches(
                    phoneRegExp,
                    "Please enter properly formatted phone number"
                    )
                    .required(
                    "PhoneTollFree is required when PhonePayments is True"
                    ),
                }),
                IVRPayments: yup.boolean().default(false),
                IVRPhone: yup
                .string()
                .nullable()
                .when("IVRPayments", {
                    is: true,
                    then: yup
                    .string()
                    .matches(
                        phoneRegExp,
                        "Please enter properly formatted phone number"
                    )
                    .required("IVRPhone is required when IVRPayments is True"),
                }),
                OnlinePayments: yup.boolean().default(false),
                OnlineSite: yup
                .string()
                .nullable()
                .when("OnlinePayments", {
                    is: true,
                    then: yup
                    .string()
                    .matches(urlRegExp, "Please enter properly formatted url.")
                    .required(
                        "OnlineSite is required when OnlinePayments is True"
                    ),
                }),
                OtherChannels: yup.string().nullable(),
            }),
            Logos: yup.object().shape({
                Location: yup.string(),
            }),
        })
      ),
    });