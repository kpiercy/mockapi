const yup = require('yup');
const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const urlRegExp =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

module.exports = yup.object().shape({
  Channels: yup.array().of(
    yup.object().shape({
        Facility_GUID: yup.string().uuid().trim().required('Facility_GUID is required.'),
        Spec_GUID: yup.string().uuid().trim().required('Spec_GUID is required.'),
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
    })
  ),
})