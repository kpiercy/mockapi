const yup = require('yup');
const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const urlRegExp =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

/**
 * @swagger
 * components:
 *   schemas:
 *     Channel:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: public id of the channel specs
 *         SpecID:
 *           type: int
 *           description: public id of the facility spec
 *         AmericanExpressAccepted:
 *           type: boolean
 *           description: Whether facility accepts AmericanExpress
 *         DiscoverAccepted:
 *           type: boolean
 *           description: Whether facility accepts Discover
 *         VisaAccepted:
 *           type: boolean
 *           description: Whether facility accepts Visa
 *         MasterCardAccepted:
 *           type: boolean
 *           description: Whether facility accepts MasterCard
 *         OtherAccepted:
 *           type: string
 *           description: Other payment form accepted
 *         MailPayments:
 *           type: boolean
 *           description: Whether allows mailing of payments
 *         MailTo:
 *           type: string
 *           description: Where payments should be mailed to
 *         PhonePayments:
 *           type: boolean
 *           description: Whether allows pay by phone
 *         PhoneLocal:
 *           type: string
 *           description: Local phone to call for payments
 *         PhoneTollFree:
 *           type: string
 *           description: Toll free phone for payments
 *         IVRPayments:
 *           type: boolean
 *           description: Whether facility allows payments by IVR
 *         IVRPhone:
 *           type: string
 *           description: Phone number for making IVR payments
 *         OnlinePayments:
 *           type: boolean
 *           description: Whether facility accepts payments online
 *         PaySite:
 *           type: string
 *           description: Site where payments can be made
 *         OtherPayChannels:
 *           type: string
 *           description: Site where payments can be made
 *       example:
 *         ID: 1
 *         SpecID: 55
 *         AmericanExpressAccepted: true
 *         VisaAccepted: true
 *         MasterCardAccepted: true
 *         DiscoverAccepted: true
 *         OtherAccepted:
 *         MailPayments: true
 *         MailTo: 4300 S Madison St, Muncie, IN 47302
 *         PhonePayments: true
 *         PhoneLocal: 765-347-5555
 *         PhoneTollFree: 800-555-1111
 *         IVRPayments: false
 *         IVRPhone: 
 *         OnlinePayments: true
 *         PaySite: https://facility.com/payus
 *         OtherPayChannels: 
 *     CreateChannelsBody:
 *       type: object
 *       properties:
 *         SpecID:
 *           type: int
 *           description: public id of the facility spec
 *         AmericanExpressAccepted:
 *           type: boolean
 *           description: Whether facility accepts AmericanExpress
 *         DiscoverAccepted:
 *           type: boolean
 *           description: Whether facility accepts Discover
 *         VisaAccepted:
 *           type: boolean
 *           description: Whether facility accepts Visa
 *         MasterCardAccepted:
 *           type: boolean
 *           description: Whether facility accepts MasterCard
 *         OtherAccepted:
 *           type: string
 *           description: Other payment form accepted
 *         MailPayments:
 *           type: boolean
 *           description: Whether allows mailing of payments
 *         MailTo:
 *           type: string
 *           description: Where payments should be mailed to
 *         PhonePayments:
 *           type: boolean
 *           description: Whether allows pay by phone
 *         PhoneLocal:
 *           type: string
 *           description: Local phone to call for payments
 *         PhoneTollFree:
 *           type: string
 *           description: Toll free phone for payments
 *         IVRPayments:
 *           type: boolean
 *           description: Whether facility allows payments by IVR
 *         IVRPhone:
 *           type: string
 *           description: Phone number for making IVR payments
 *         OnlinePayments:
 *           type: boolean
 *           description: Whether facility accepts payments online
 *         PaySite:
 *           type: string
 *           description: Site where payments can be made
 *         OtherPayChannels:
 *           type: string
 *           description: Site where payments can be made
 *       example:
 *         SpecID: 55
 *         AmericanExpressAccepted: true
 *         VisaAccepted: true
 *         MasterCardAccepted: true
 *         DiscoverAccepted: true
 *         OtherAccepted:
 *         MailPayments: true
 *         MailTo: 4300 S Madison St, Muncie, IN 47302
 *         PhonePayments: true
 *         PhoneLocal: 765-347-5555
 *         PhoneTollFree: 800-555-1111
 *         IVRPayments: false
 *         IVRPhone: 
 *         OnlinePayments: true
 *         PaySite: https://facility.com/payus
 *         OtherPayChannels: 
 *     UpdateChannelsBody:
 *       type: object
 *       properties:
 *         AmericanExpressAccepted:
 *           type: boolean
 *           description: Whether facility accepts AmericanExpress
 *         DiscoverAccepted:
 *           type: boolean
 *           description: Whether facility accepts Discover
 *         VisaAccepted:
 *           type: boolean
 *           description: Whether facility accepts Visa
 *         MasterCardAccepted:
 *           type: boolean
 *           description: Whether facility accepts MasterCard
 *         OtherAccepted:
 *           type: string
 *           description: Other payment form accepted
 *         MailPayments:
 *           type: boolean
 *           description: Whether allows mailing of payments
 *         MailTo:
 *           type: string
 *           description: Where payments should be mailed to
 *         PhonePayments:
 *           type: boolean
 *           description: Whether allows pay by phone
 *         PhoneLocal:
 *           type: string
 *           description: Local phone to call for payments
 *         PhoneTollFree:
 *           type: string
 *           description: Toll free phone for payments
 *         IVRPayments:
 *           type: boolean
 *           description: Whether facility allows payments by IVR
 *         IVRPhone:
 *           type: string
 *           description: Phone number for making IVR payments
 *         OnlinePayments:
 *           type: boolean
 *           description: Whether facility accepts payments online
 *         PaySite:
 *           type: string
 *           description: Site where payments can be made
 *         OtherPayChannels:
 *           type: string
 *           description: Site where payments can be made
 *       example:
 *         AmericanExpressAccepted: true
 *         VisaAccepted: true
 *         MasterCardAccepted: true
 *         DiscoverAccepted: true
 *         OtherAccepted:
 *         MailPayments: true
 *         MailTo: 4300 S Madison St, Muncie, IN 47302
 *         PhonePayments: true
 *         PhoneLocal: 765-347-5555
 *         PhoneTollFree: 800-555-1111
 *         IVRPayments: false
 *         IVRPhone: 
 *         OnlinePayments: true
 *         PaySite: https://facility.com/payus
 *         OtherPayChannels: 
 * 
 */

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