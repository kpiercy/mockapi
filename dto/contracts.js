const yup = require("yup");

module.exports = yup.object()
.required()
.shape({
    Contracts: yup.array().of(
        yup.object().shape({
            Client_GUID: yup.string().uuid().required('Client_GUID is required.'),
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