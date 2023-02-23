/**
 * @swagger
 * components:
 *   schemas:
 *     Process:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: public id of the process
 *         JobID:
 *           type: int
 *           description: public id of the job
 *         Active:
 *           type: boolean
 *           description: whether the process is active or not
 *         ProcessIn:
 *           type: string
 *           description: local directory where processing will occur
 *         ArchiveTo:
 *           type: string
 *           description: local directory where files will be archived to after download
 *         WaitBeforeProcessing:
 *           type: int
 *           description: whole minute increments to wait before processing
 *         ParseMessage:
 *           type: string
 *           description: parse success message
 *         PrintMessage:
 *           type: string
 *           description: print success message
 *         MasterEnabled:
 *           type: boolean
 *           description: whether the job is master processor ready
 *         TimeBased:
 *           type: boolean
 *           description: whether the job is scheduled for specific run time
 *         TimeRan:
 *           type: string
 *           description: time in 24hr format the job should be processed
 *         DaysProcessed:
 *           type: int
 *           description: the days on which a job should be processed 1-7
 *         ReadyForProcessing:
 *           type: boolean
 *           description: whether the jobs files are ready to process
 *         ErrorsBypassed:
 *           type: boolean
 *           description: whether the job was processed with error checks bypassed
 *         ReqUnzip:
 *           type: boolean
 *           description: whether the job files require unzipping before processing
 *         PresortPageNum:
 *           type: int
 *           description: page number that the presort paperwork is on
 *         FilesReqdForProcessing:
 *           type: int
 *           description: number of files required before processing begins
 *         ChainJob:
 *           type: boolean
 *           description: whether the job files should run in a chain
 *         AutomateMoves:
 *           type: boolean
 *           description:
 *         GoMasterReady:
 *           type: boolean
 *           description: whether the job is ready to process through GA master processor
 *         RunOncePerDay:
 *           type: boolean
 *           description: whether the job should only run once per day
 *         RanToday:
 *           type: boolean
 *           description: whether the job was ran today or not, reset at midnight
 *       example:
 *         ID: 99
 *         JobID: 123
 *         Active: true
 *         ProcessIn: C:\clients\P\PFS_zAdena\Filestoprocess
 *         ArchiveTo: C:\clients\P\PFS_zAdena\Download
 *         WaitBeforeProcessing: 10
 *         ParseMessage: 
 *         PrintMessage: 
 *         MasterEnabled: true
 *         TimeBased: false
 *         TimeRan: 
 *         DaysProcessed: 1234567
 *         ReadyForProcessing: false
 *         ErrorBypassed: false
 *         ReqUnzip: false
 *         PresortPageNum: 1
 *         FilesReqdForProcessing: 1
 *         ChainJob: false
 *         AutomateMoves: false
 *         GoMasterReady: false
 *         RunOncePerDay: false
 *         RanToday: true
 *     CreateProcessesBody:
 *       type: object
 *       properties:
 *         JobID:
 *           type: int
 *           description: public id of the job
 *         Active:
 *           type: boolean
 *           description: whether the process is active or not
 *         ProcessIn:
 *           type: string
 *           description: local directory where processing will occur
 *         ArchiveTo:
 *           type: string
 *           description: local directory where files will be archived to after download
 *         WaitBeforeProcessing:
 *           type: int
 *           description: whole minute increments to wait before processing
 *         ParseMessage:
 *           type: string
 *           description: parse success message
 *         PrintMessage:
 *           type: string
 *           description: print success message
 *         MasterEnabled:
 *           type: boolean
 *           description: whether the job is master processor ready
 *         TimeBased:
 *           type: boolean
 *           description: whether the job is scheduled for specific run time
 *         TimeRan:
 *           type: string
 *           description: time in 24hr format the job should be processed
 *         DaysProcessed:
 *           type: int
 *           description: the days on which a job should be processed 1-7
 *         ReadyForProcessing:
 *           type: boolean
 *           description: whether the jobs files are ready to process
 *         ErrorsBypassed:
 *           type: boolean
 *           description: whether the job was processed with error checks bypassed
 *         ReqUnzip:
 *           type: boolean
 *           description: whether the job files require unzipping before processing
 *         PresortPageNum:
 *           type: int
 *           description: page number that the presort paperwork is on
 *         FilesReqdForProcessing:
 *           type: int
 *           description: number of files required before processing begins
 *         ChainJob:
 *           type: boolean
 *           description: whether the job files should run in a chain
 *         AutomateMoves:
 *           type: boolean
 *           description:
 *         GoMasterReady:
 *           type: boolean
 *           description: whether the job is ready to process through GA master processor
 *         RunOncePerDay:
 *           type: boolean
 *           description: whether the job should only run once per day
 *         RanToday:
 *           type: boolean
 *           description: whether the job was ran today or not, reset at midnight
 *       example:
 *         JobID: 123
 *         Active: true
 *         ProcessIn: C:\clients\P\PFS_zAdena\Filestoprocess
 *         ArchiveTo: C:\clients\P\PFS_zAdena\Download
 *         WaitBeforeProcessing: 10
 *         ParseMessage: 
 *         PrintMessage: 
 *         MasterEnabled: true
 *         TimeBased: false
 *         TimeRan: 
 *         DaysProcessed: 1234567
 *         ReadyForProcessing: false
 *         ErrorBypassed: false
 *         ReqUnzip: false
 *         PresortPageNum: 1
 *         FilesReqdForProcessing: 1
 *         ChainJob: false
 *         AutomateMoves: false
 *         GoMasterReady: false
 *         RunOncePerDay: false
 *         RanToday: true
 *     UpdateProcessesBody:
 *       type: object
 *       properties:
 *         Active:
 *           type: boolean
 *           description: whether the process is active or not
 *         ProcessIn:
 *           type: string
 *           description: local directory where processing will occur
 *         ArchiveTo:
 *           type: string
 *           description: local directory where files will be archived to after download
 *         WaitBeforeProcessing:
 *           type: int
 *           description: whole minute increments to wait before processing
 *         ParseMessage:
 *           type: string
 *           description: parse success message
 *         PrintMessage:
 *           type: string
 *           description: print success message
 *         MasterEnabled:
 *           type: boolean
 *           description: whether the job is master processor ready
 *         TimeBased:
 *           type: boolean
 *           description: whether the job is scheduled for specific run time
 *         TimeRan:
 *           type: string
 *           description: time in 24hr format the job should be processed
 *         DaysProcessed:
 *           type: int
 *           description: the days on which a job should be processed 1-7
 *         ReadyForProcessing:
 *           type: boolean
 *           description: whether the jobs files are ready to process
 *         ErrorsBypassed:
 *           type: boolean
 *           description: whether the job was processed with error checks bypassed
 *         ReqUnzip:
 *           type: boolean
 *           description: whether the job files require unzipping before processing
 *         PresortPageNum:
 *           type: int
 *           description: page number that the presort paperwork is on
 *         FilesReqdForProcessing:
 *           type: int
 *           description: number of files required before processing begins
 *         ChainJob:
 *           type: boolean
 *           description: whether the job files should run in a chain
 *         AutomateMoves:
 *           type: boolean
 *           description:
 *         GoMasterReady:
 *           type: boolean
 *           description: whether the job is ready to process through GA master processor
 *         RunOncePerDay:
 *           type: boolean
 *           description: whether the job should only run once per day
 *         RanToday:
 *           type: boolean
 *           description: whether the job was ran today or not, reset at midnight
 *       example:
 *         Active: true
 *         ProcessIn: C:\clients\P\PFS_zAdena\Filestoprocess
 *         ArchiveTo: C:\clients\P\PFS_zAdena\Download
 *         WaitBeforeProcessing: 10
 *         ParseMessage: 
 *         PrintMessage: 
 *         MasterEnabled: true
 *         TimeBased: false
 *         TimeRan: 
 *         DaysProcessed: 1234567
 *         ReadyForProcessing: false
 *         ErrorBypassed: false
 *         ReqUnzip: false
 *         PresortPageNum: 1
 *         FilesReqdForProcessing: 1
 *         ChainJob: false
 *         AutomateMoves: false
 *         GoMasterReady: false
 *         RunOncePerDay: false
 *         RanToday: true
 *     DeleteProcessesResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: public id of the processes
 *         Active:
 *           type: boolean
 *           description: whether the process is active or not
 *       example:
 *         JobID: 99
 *         Active: false
 */

  module.exports = yup
    .object()
    .required()
    .shape({
      Processes: yup.array().of(
        yup.object().shape({
          JobID: yup.number().integer().required('Client_GUID is required.'),
          Active: yup.boolean().default(false),
          ProcessIn: yup.string().required('local directory to ProcessIn is required'),
          ArchiveTo: yup.string().required('local directory to ArchiveTo is required'),
          WaitBeforeProcessing: yup.number().integer().default(0),
          ParseMessage: yup.string().required('ParseMessage is required'),
          PrintMessage: yup.string().nullable(),
          MasterEnabled: yup.boolean().default(false),
          TimeBased: yup.boolean().default(false),
          TimeRan: yup.string().nullable(),
          DaysProcessed: yup.string().default('1234567'),
          ReadyForProcessing: yup.boolean().default(false),
          ChainJob: yup.boolean().default(false),
          AutomateMoves: yup.boolean().default(false),
          GoMasterReady: yup.boolean().default(false),
          RunOncePerDay: yup.boolean().default(false),
          RanToday: yup.boolean().default(false)
        })
      ),
    })
