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
