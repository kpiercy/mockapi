const yup = require("yup");
const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const urlRegExp =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

  module.exports = yup
    .object()
    .required()
    .shape({
      Specs: yup.array().of(
        yup.object().shape({
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
                PaySite: yup
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