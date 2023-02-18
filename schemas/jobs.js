const yup = require('yup')
const timeRegExp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

module.exports = yup.object().shape({
  Jobs: yup.array().of(
    yup.object().shape({
      ClientID: yup.number().integer().required('ClientID is required for Job'),
      Name: yup.string().trim().required('Name is required for Job'),
      RootPath: yup.string().trim().required('RootPath is required'),
      Workflows: yup.object().shape({
        AlacritiEnabled: yup.boolean().default(false),
        PaperlessEnabled: yup.boolean().default(false),
        PrintToPath: yup.string().trim().default('C:/colorfilestoprint'),
        UNCPath: yup.string().trim().required('UNCPath is required'),
        RunMode: yup.string().oneOf(['Hold', 'Live', 'DISABLED']).required(),
        SubprocessReqd: yup.boolean().default(false),
        BatchInSetsOf: yup.number().default(2000),
        Design: yup.string().trim().required('Design filename is required'),
      }),
      Processes: yup.object().shape({
        Active: yup.boolean().default(false),
        Directory: yup.string().trim().required('Processing directory is required'),
        FileArchive: yup.string().trim().required('FileArchive location is required for Processes'),
        Wait: yup.number().default(0),
        ParseMessage: yup
          .string()
          .trim()
          .required('At least a ParseMessage is required for Processes'),
        PrintMessage: yup.string().nullable(),
        MasterEnabled: yup.boolean().default(false),
        TimeBased: yup.boolean().default(false),
        RunTime: yup
          .string()
          .nullable()
          .when('TimeBased', {
            is: true,
            then: yup
              .string()
              .required()
              .matches(timeRegExp, 'Please enter properly formatted time using 24hr format.'),
            otherwise: yup.string(null),
          }),
        DaysProcessed: yup.string().trim().default('1234567'),
        UnzipRequired: yup.boolean().default(false),
        PresortPageNum: yup.number().default(1),
        FilesRequired: yup.number().default(1),
        ChainJob: yup.boolean().default(false),
        AutoMoves: yup.boolean().default(false),
        GAMasterEnabled: yup.boolean().default(false),
        RunOncePerDay: yup.boolean().default(false),
      }),
      Downloads: yup.array().of(
        yup.object().shape({
          Active: yup.boolean().default(true),
          RemoteDirectory: yup
            .string()
            .trim()
            .required('RemoteDirectory is required for Downloads'),
          Mask: yup.string().required('Mask is required for Downloads'),
          AdditionalTask: yup.string().nullable().default(null),
          Password: yup.string().nullable(),
          LocalDirectory: yup.string().trim().required('LocalDirectory is required for Downloads'),
          Server: yup
            .number()
            .oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            .required('ServerID is required for Downloads'),
          IgnoreMask: yup.string().nullable(),
          Timestamped: yup.boolean().default(false),
          Renamed: yup.boolean().default(false),
          NewFilename: yup
            .string()
            .nullable()
            .when('Renamed', {
              is: true,
              then: yup.string().trim().required('NewFilename is required when Renamed is true'),
              otherwise: yup.string().nullable().default(null),
            }),
          AppendValue: yup.string().nullable().default(null),
          Convert: yup.boolean().default(false),
          ConvertToDelimiter: yup.string().nullable().default(null),
          ConvertToExtension: yup.string().nullable().default(null),
          ConvertToColumns: yup.number().nullable().default(0),
        })
      ),
      Returns: yup.array().of(
        yup.object().shape({
          RemoteDirectory: yup.string().trim().required('RemoteDirectory is required for Returns'),
          Mask: yup.string().required('Mask is required for Returns'),
          AdditionalTask: yup.string().default(null),
          Password: yup.string().nullable(),
          LocalDirectory: yup.string().trim().required('LocalDirectory is required for Returns'),
          Server: yup
            .number()
            .oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            .required('ServerID is required for Returns'),
          TimeBased: yup.boolean().default(false),
          UploadAt: yup
            .string()
            .nullable()
            .when('TimeBased', {
              is: true,
              then: yup
                .string()
                .required()
                .matches(timeRegExp, 'Please enter properly formatted time using 24hr format.'),
              otherwise: yup.string(null),
            }),
          DaysUploaded: yup.string().trim().default('1234567'),
          Type: yup
            .number()
            .oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
            .required('Type is required for Returns'),
          ZipFilename: yup.string().nullable().default(null),
          MultiUpload: yup.boolean().default(false),
          MultiServerID: yup
            .number()
            .nullable()
            .when('MultiUpload', {
              is: true,
              then: yup
                .number()
                .oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                .required('MultiServerID is required when MultiUpload is true'),
              otherwise: yup.number().default(null),
            }),
          MultiRemoteDirectory: yup
            .string()
            .nullable()
            .when('MultiUpload', {
              is: true,
              then: yup
                .string()
                .trim()
                .required('MultiRemoteDirectory is required when MultiUpload is true'),
              otherwise: yup.string().nullable().notRequired(),
            }),
        })
      ),
      Contacts: yup.array().of(
        yup.object().shape({
          Active: yup.boolean().default(true),
          Type: yup
            .number()
            .oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
            .required('Type is required for Returns'),
          FirstName: yup.string().required(),
          LastName: yup.string().required(),
          PhoneNumber: yup
            .string()
            .matches(phoneRegExp, 'Please enter properly formatted phone number'),
          Email: yup.string().email().required('Email is required for Contacts'),
        })
      ),
    })
  ),
})
