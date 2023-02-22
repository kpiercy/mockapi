const yup = require('yup')
const timeRegExp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the group
 *         ParentID:
 *           type: int
 *           description: The public id of the parent client for job
 *         ClientID:
 *           type: int
 *           description: The public id of the client for job
 *         Active:
 *           type: boolean
 *           description: whether the Job is active
 *         Name:
 *           type: string
 *           description: Name of the job type, such as Statements, Paperless, etc
 *         RootPath:
 *           type: string
 *           description: local base directory for the client job
 *         Workflows:
 *           $ref: '#/components/schemas/Workflow'
 *         Processes:
 *           $ref: '#/components/schemas/Process'
 *         Downloads:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Download' 
 *         Contacts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Contact' 
 *         Returns:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Return'      
 *       example:
 *         ID: 123
 *         ParentID: 10
 *         ClientID: 101
 *         Active: true
 *         Name: Statements
 *         RootPath: C:\clients\P\PFS_zAdena\
 *         Workflows:
 *           ID: 99
 *           JobID: 123
 *           Active: true
 *           AlacritiEnabled: true
 *           PaperlessEnabled: false
 *           PrintToPath: C:\colorfilestoprint\
 *           EstmtPath: C:\clients\P\PFS_zAdena\Estmts\
 *           UNCPath:
 *           RunMode: Live
 *           SubprocessReqd: true
 *           BatchInSetsOf: 2000
 *           Design: PFS_zAdena.ptk
 *           PrintPDFReturnEnabled: false
 *           FacilityPDFReturnEnabled: false
 *           TableUpdate: false
 *           UseStoredProc: false
 *           DataSource: 
 *           StoredProc: 
 *           TableName:
 *         Processes:
 *           ID: 66
 *           JobID: 123
 *           Active: true
 *           ProcessIn: C:\clients\P\PFS_zAdena\Filestoprocess
 *           ArchiveTo: C:\clients\P\PFS_zAdena\Download
 *           WaitBeforeProcessing: 10
 *           ParseMessage: 
 *           PrintMessage: 
 *           MasterEnabled: true
 *           TimeBased: false
 *           TimeRan: 
 *           DaysProcessed: 1234567
 *           ReadyForProcessing: false
 *           ErrorBypassed: false
 *           ReqUnzip: false
 *           PresortPageNum: 1
 *           FilesReqdForProcessing: 1
 *           ChainJob: false
 *           AutomateMoves: false
 *           GoMasterReady: false
 *           RunOncePerDay: false
 *           RanToday: true
 *         Downloads:
 *           - ID: 60
 *             JobID: 123
 *             Active: true
 *             RemoteDirectory: /PFS/zAdena/
 *             Mask: "*.xlsx"
 *             AdditionalTask: "trigger.txt"
 *             Password: 
 *             LocalDirectory: C:\clients\P\PFS_zAdena\Filestoprocess
 *             Server: 0
 *             IgnoreMask: 
 *             Timestamped: true
 *             Renamed: false
 *             NewFilename: 
 *             AppendValue: 
 *             Convert: true
 *             ConvertToDelimiter: tab
 *             ConvertToExtension: csv
 *         Contacts:
 *           - ID: 23
 *             Active: true
 *             FirstName: Bobby
 *             LastName: Brown
 *             Phone: 765-499-5050
 *             Email: bobby.brown@jobname.com
 *         Returns:
 *           - ID: 460
 *             JobID: 123
 *             RemoteDirectory: /PFS/zAdena/Reports/
 *             Mask: Summary_
 *             AdditionalTask: 
 *             Password: 
 *             LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *             ServerID: 0
 *             TimeBased: false
 *             TimeToReturn: 
 *             DaysToReturn: 1234567
 *             Type: 4
 *             ReturnZipName: 
 *             MultiUpload: false
 *             MultiServerID: 
 *             MultiRemoteDirectory: 
 *     JobWithFacilities:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the group
 *         ParentID:
 *           type: int
 *           description: The public id of the parent client for job
 *         ClientID:
 *           type: int
 *           description: The public id of the client for job
 *         Active:
 *           type: boolean
 *           description: whether the Job is active
 *         Name:
 *           type: string
 *           description: Name of the job type, such as Statements, Paperless, etc
 *         RootPath:
 *           type: string
 *           description: local base directory for the client job
 *         Workflows:
 *           $ref: '#/components/schemas/Workflow'
 *         Processes:
 *           $ref: '#/components/schemas/Process'
 *         Downloads:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Download' 
 *         Contacts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Contact' 
 *         Returns:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Return'
 *         Facilities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FacilityWithSpec'      
 *       example:
 *         ID: 123
 *         ParentID: 10
 *         ClientID: 101
 *         Active: true
 *         Name: Statements
 *         RootPath: C:\clients\P\PFS_zAdena\
 *         Workflows:
 *           ID: 99
 *           JobID: 123
 *           Active: true
 *           AlacritiEnabled: true
 *           PaperlessEnabled: false
 *           PrintToPath: C:\colorfilestoprint\
 *           EstmtPath: C:\clients\P\PFS_zAdena\Estmts\
 *           UNCPath:
 *           RunMode: Live
 *           SubprocessReqd: true
 *           BatchInSetsOf: 2000
 *           Design: PFS_zAdena.ptk
 *           PrintPDFReturnEnabled: false
 *           FacilityPDFReturnEnabled: false
 *           TableUpdate: false
 *           UseStoredProc: false
 *           DataSource: 
 *           StoredProc: 
 *           TableName:
 *         Processes:
 *           ID: 66
 *           JobID: 123
 *           Active: true
 *           ProcessIn: C:\clients\P\PFS_zAdena\Filestoprocess
 *           ArchiveTo: C:\clients\P\PFS_zAdena\Download
 *           WaitBeforeProcessing: 10
 *           ParseMessage: 
 *           PrintMessage: 
 *           MasterEnabled: true
 *           TimeBased: false
 *           TimeRan: 
 *           DaysProcessed: 1234567
 *           ReadyForProcessing: false
 *           ErrorBypassed: false
 *           ReqUnzip: false
 *           PresortPageNum: 1
 *           FilesReqdForProcessing: 1
 *           ChainJob: false
 *           AutomateMoves: false
 *           GoMasterReady: false
 *           RunOncePerDay: false
 *           RanToday: true
 *         Downloads:
 *           - ID: 60
 *             JobID: 123
 *             Active: true
 *             RemoteDirectory: /PFS/zAdena/
 *             Mask: "*.xlsx"
 *             AdditionalTask: "trigger.txt"
 *             Password: 
 *             LocalDirectory: C:\clients\P\PFS_zAdena\Filestoprocess
 *             Server: 0
 *             IgnoreMask: 
 *             Timestamped: true
 *             Renamed: false
 *             NewFilename: 
 *             AppendValue: 
 *             Convert: true
 *             ConvertToDelimiter: tab
 *             ConvertToExtension: csv
 *         Contacts:
 *           - ID: 23
 *             Active: true
 *             FirstName: Bobby
 *             LastName: Brown
 *             Phone: 765-499-5050
 *             Email: bobby.brown@jobname.com
 *         Returns:
 *           - ID: 460
 *             JobID: 123
 *             RemoteDirectory: /PFS/zAdena/Reports/
 *             Mask: Summary_
 *             AdditionalTask: 
 *             Password: 
 *             LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *             ServerID: 0
 *             TimeBased: false
 *             TimeToReturn: 
 *             DaysToReturn: 1234567
 *             Type: 4
 *             ReturnZipName: 
 *             MultiUpload: false
 *             MultiServerID: 
 *             MultiRemoteDirectory: 
 *         Facilities:
 *           - ID: 60
 *             JobID: 123
 *             Name: SomeFacilityName
 *             Specs:
 *               - ID: 55
 *                 JobID: 123
 *                 Software: EPIC
 *                 APIAvailable: true
 *                 APIDocumentation: https://facility.com/api/docs
 *                 ExtractErrors: true
 *                 HoldErrors: false
 *                 DataCrosswalkProvided: true
 *                 DataFileProvided: true
 *                 PDFFileProvided: false
 *                 LockboxIntegration: false
 *                 LockboxBank: 
 *                 LockboxAddress: 
 *                 ClientProvidedSpecSheet: true
 *                 Channels:
 *                       ID: 1
 *                       SpecID: 55
 *                       AmericanExpressAccepted: true
 *                       VisaAccepted: true
 *                       MasterCardAccepted: true
 *                       DiscoverAccepted: true
 *                       OtherAccepted:
 *                       MailPayments: true
 *                       MailTo: 4300 S Madison St, Muncie, IN 47302
 *                       PhonePayments: true
 *                       PhoneLocal: 765-347-5555
 *                       PhoneTollFree: 800-555-1111
 *                       IVRPayments: false
 *                       IVRPhone: 
 *                       OnlinePayments: true
 *                       PaySite: https://facility.com/payus
 *                       OtherPayChannels: 
 *                 Reports:
 *                       ID: 1
 *                       SpecID: 55
 *                       SummaryReport: true
 *                       MovesReport: true
 *                       Suppressionreport: true
 *                       UndeliverablesReport: true
 *                       NonCassReport: true
 *                       FacilityReport: false
 *                       FacilityPDFs: false
 *                       PrintPDFs: false
 *                       AnomalyReport: true
 *                       MonthlySummaryReport: false
 *                 Logos:
 *                       ID: 1
 *                       SpecID: 55
 *                       Location: C:\clients\P\PFS_zAdena\Logos\
 *     CreateJobsBody:
 *       type: object
 *       properties:
 *         ParentID:
 *           type: int
 *           description: The public id of the parent client for job
 *         ClientID:
 *           type: int
 *           description: The public id of the client for job
 *         Active:
 *           type: boolean
 *           description: whether the Job is active
 *         Name:
 *           type: string
 *           description: Name of the job type, such as Statements, Paperless, etc
 *         RootPath:
 *           type: string
 *           description: local base directory for the client job
 *         Workflows:
 *           $ref: '#/components/schemas/CreateWorkflowsBody'
 *         Processes:
 *           $ref: '#/components/schemas/CreateProcessesBody'
 *         Downloads:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateDownloadsBody' 
 *         Contacts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateContactsBody' 
 *         Returns:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CreateReturnsBody'      
 *       example:
 *         ParentID: 10
 *         ClientID: 101
 *         Active: true
 *         Name: Statements
 *         RootPath: C:\clients\P\PFS_zAdena\
 *         Workflows:
 *           JobID: 123
 *           Active: true
 *           AlacritiEnabled: true
 *           PaperlessEnabled: false
 *           PrintToPath: C:\colorfilestoprint\
 *           EstmtPath: C:\clients\P\PFS_zAdena\Estmts\
 *           UNCPath:
 *           RunMode: Live
 *           SubprocessReqd: true
 *           BatchInSetsOf: 2000
 *           Design: PFS_zAdena.ptk
 *           PrintPDFReturnEnabled: false
 *           FacilityPDFReturnEnabled: false
 *           TableUpdate: false
 *           UseStoredProc: false
 *           DataSource: 
 *           StoredProc: 
 *           TableName:
 *         Processes:
 *           JobID: 123
 *           Active: true
 *           ProcessIn: C:\clients\P\PFS_zAdena\Filestoprocess
 *           ArchiveTo: C:\clients\P\PFS_zAdena\Download
 *           WaitBeforeProcessing: 10
 *           ParseMessage: 
 *           PrintMessage: 
 *           MasterEnabled: true
 *           TimeBased: false
 *           TimeRan: 
 *           DaysProcessed: 1234567
 *           ReadyForProcessing: false
 *           ErrorBypassed: false
 *           ReqUnzip: false
 *           PresortPageNum: 1
 *           FilesReqdForProcessing: 1
 *           ChainJob: false
 *           AutomateMoves: false
 *           GoMasterReady: false
 *           RunOncePerDay: false
 *           RanToday: true
 *         Downloads:
 *           - JobID: 123
 *             Active: true
 *             RemoteDirectory: /PFS/zAdena/
 *             Mask: "*.xlsx"
 *             AdditionalTask: "trigger.txt"
 *             Password: 
 *             LocalDirectory: C:\clients\P\PFS_zAdena\Filestoprocess
 *             Server: 0
 *             IgnoreMask: 
 *             Timestamped: true
 *             Renamed: false
 *             NewFilename: 
 *             AppendValue: 
 *             Convert: true
 *             ConvertToDelimiter: tab
 *             ConvertToExtension: csv
 *         Contacts:
 *           - JobID: 123
 *             Active: true
 *             FirstName: Bobby
 *             LastName: Brown
 *             Phone: 765-499-5050
 *             Email: bobby.brown@jobname.com
 *         Returns:
 *           - JobID: 123
 *             RemoteDirectory: /PFS/zAdena/Reports/
 *             Mask: Summary_
 *             AdditionalTask: 
 *             Password: 
 *             LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *             ServerID: 0
 *             TimeBased: false
 *             TimeToReturn: 
 *             DaysToReturn: 1234567
 *             Type: 4
 *             ReturnZipName: 
 *             MultiUpload: false
 *             MultiServerID: 
 *             MultiRemoteDirectory: 
 *     UpdateJobsBody:
 *       type: object
 *       properties:
 *         Active:
 *           type: boolean
 *           description: whether the Job is active
 *       example:
 *         Active: true
 *     DeleteJobsResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the job
 *         ClientID:
 *           type: int
 *           description: The public id of the client
 *         Active:
 *           type: boolean
 *           description: Whether the job is active or not
 *       example:
 *         ID: 123
 *         ClientID: 101
 *         Active: false 
 */

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
