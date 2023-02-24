/**
 * @swagger
 * components:
 *   schemas:
 *     Workflow:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: public id of the workflow
 *         JobID:
 *           type: int
 *           description: public id of the job
 *         Active:
 *           type: boolean
 *           description: whether the workflow is active or not
 *         AlacritiEnabled:
 *           type: boolean
 *           description: whether the job has Alacriti features
 *         PaperlessEnabled:
 *           type: boolean
 *           description: whether the job has paperless statements
 *         PrintToPath:
 *           type: string
 *           description: the path where print-ready files will be sent
 *         EstmtPath:
 *           type: string
 *           description: the path where estmt PDFs will be placed
 *         UNCPath:
 *           type: string
 *           description: unc path for use in specific programs
 *         RunMode:
 *           type: string
 *           description: runmode of the job, Live, Sample, etc
 *         SubprocessReq:
 *           type: boolean
 *           description: whether the job required a subprocess
 *         BatchInSetsOf:
 *           type: int
 *           description: batch size of PDFs for output
 *         Design:
 *           type: string
 *           description: the design filename
 *         PrintPDFReturnEnabled:
 *           type: boolean
 *           description: whether or not the job should send back PrintPDFs
 *         FacilityPDFReturnEnabled:
 *           type: boolean
 *           description: whether or not the job should sent back FacilityPDFs
 *         TableUpdate:
 *           type: boolean
 *         UseStoredProc:
 *           type: boolean
 *         DataSource:
 *           type: string
 *         StoredProc:
 *           type: string
 *         TableName:
 *           type: string
 *       example:
 *         ID: 99
 *         JobID: 123
 *         Active: true
 *         AlacritiEnabled: true
 *         PaperlessEnabled: false
 *         PrintToPath: C:\colorfilestoprint\
 *         EstmtPath: C:\clients\P\PFS_zAdena\Estmts\
 *         UNCPath:
 *         RunMode: Live
 *         SubprocessReqd: true
 *         BatchInSetsOf: 2000
 *         Design: PFS_zAdena.ptk
 *         PrintPDFReturnEnabled: false
 *         FacilityPDFReturnEnabled: false
 *         TableUpdate: false
 *         UseStoredProc: false
 *         DataSource: 
 *         StoredProc: 
 *         TableName: 
 *     CreateWorkflowsBody:
 *       type: object
 *       properties:
 *         JobID:
 *           type: int
 *           description: public id of the job
 *         Active:
 *           type: boolean
 *           description: whether the workflow is active or not
 *         AlacritiEnabled:
 *           type: boolean
 *           description: whether the job has Alacriti features
 *         PaperlessEnabled:
 *           type: boolean
 *           description: whether the job has paperless statements
 *         PrintToPath:
 *           type: string
 *           description: the path where print-ready files will be sent
 *         EstmtPath:
 *           type: string
 *           description: the path where estmt PDFs will be placed
 *         UNCPath:
 *           type: string
 *           description: unc path for use in specific programs
 *         RunMode:
 *           type: string
 *           description: runmode of the job, Live, Sample, etc
 *         SubprocessReq:
 *           type: boolean
 *           description: whether the job required a subprocess
 *         BatchInSetsOf:
 *           type: int
 *           description: batch size of PDFs for output
 *         Design:
 *           type: string
 *           description: the design filename
 *         PrintPDFReturnEnabled:
 *           type: boolean
 *           description: whether or not the job should send back PrintPDFs
 *         FacilityPDFReturnEnabled:
 *           type: boolean
 *           description: whether or not the job should sent back FacilityPDFs
 *         TableUpdate:
 *           type: boolean
 *         UseStoredProc:
 *           type: boolean
 *         DataSource:
 *           type: string
 *         StoredProc:
 *           type: string
 *         TableName:
 *           type: string
 *       example:
 *         JobID: 123
 *         Active: true
 *         AlacritiEnabled: true
 *         PaperlessEnabled: false
 *         PrintToPath: C:\colorfilestoprint\
 *         EstmtPath: C:\clients\P\PFS_zAdena\Estmts\
 *         UNCPath:
 *         RunMode: Live
 *         SubprocessReqd: true
 *         BatchInSetsOf: 2000
 *         Design: PFS_zAdena.ptk
 *         PrintPDFReturnEnabled: false
 *         FacilityPDFReturnEnabled: false
 *         TableUpdate: false
 *         UseStoredProc: false
 *         DataSource: 
 *         StoredProc: 
 *         TableName: 
 *     UpdateWorkflowsBody:
 *       type: object
 *       properties:
 *         Active:
 *           type: boolean
 *           description: whether the workflow is active or not
 *         AlacritiEnabled:
 *           type: boolean
 *           description: whether the job has Alacriti features
 *         PaperlessEnabled:
 *           type: boolean
 *           description: whether the job has paperless statements
 *         PrintToPath:
 *           type: string
 *           description: the path where print-ready files will be sent
 *         EstmtPath:
 *           type: string
 *           description: the path where estmt PDFs will be placed
 *         UNCPath:
 *           type: string
 *           description: unc path for use in specific programs
 *         RunMode:
 *           type: string
 *           description: runmode of the job, Live, Sample, etc
 *         SubprocessReq:
 *           type: boolean
 *           description: whether the job required a subprocess
 *         BatchInSetsOf:
 *           type: int
 *           description: batch size of PDFs for output
 *         Design:
 *           type: string
 *           description: the design filename
 *         PrintPDFReturnEnabled:
 *           type: boolean
 *           description: whether or not the job should send back PrintPDFs
 *         FacilityPDFReturnEnabled:
 *           type: boolean
 *           description: whether or not the job should sent back FacilityPDFs
 *         TableUpdate:
 *           type: boolean
 *         UseStoredProc:
 *           type: boolean
 *         DataSource:
 *           type: string
 *         StoredProc:
 *           type: string
 *         TableName:
 *           type: string
 *       example:
 *         Active: true
 *         AlacritiEnabled: true
 *         PaperlessEnabled: false
 *         PrintToPath: C:\colorfilestoprint\
 *         EstmtPath: C:\clients\P\PFS_zAdena\Estmts\
 *         UNCPath:
 *         RunMode: Live
 *         SubprocessReqd: true
 *         BatchInSetsOf: 2000
 *         Design: PFS_zAdena.ptk
 *         PrintPDFReturnEnabled: false
 *         FacilityPDFReturnEnabled: false
 *         TableUpdate: false
 *         UseStoredProc: false
 *         DataSource: 
 *         StoredProc: 
 *         TableName: 
 *     DeleteWorkflowsResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: public id of the workflow
 *         JobID:
 *           type: int
 *           description: public id of the job
 *         Active:
 *           type: boolean
 *           description: whether the workflow is active or not
 *       example:
 *         ID: 99
 *         JobID: 123
 *         Active: false
 */