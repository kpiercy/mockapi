const yup = require('yup')

/**
 * @swagger
 * components:
 *   schemas:
 *     Orbipay:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the orbipay
 *         JobID:
 *           type: int
 *           description: The public id of the job
 *         Name:
 *           type: string
 *           description: Name of the orbipay job
 *         RunMode:
 *           type: int
 *           description: The RunMode of the job
 *         LocalDirectory:
 *           type: string
 *           description: the local base directory where files are processed
 *         PartnerID:
 *           type: string
 *           description: the alacriti partner id, can be sandbox key
 *         FileID: 
 *           type: string
 *           description: separate id field used for file naming and masks
 *         Type:
 *           type: int
 *           description: alacriti job type
 *         ChainJob:
 *           type: boolean
 *           description: whether the job should run as a chain or not, one after another
 *         FileCountRequired:
 *           type: int
 *           description: number of files required before processing will continue, 1 for chain jobs
 *         LogFile:
 *           type: string
 *           description: log filename, specific not a mask
 *         Wait:
 *           type: boolean
 *           description: whether or not the uploader should wait between uploads
 *         WaitLength: 
 *           type: int
 *           description: length in whole minutes for uploader to delay between files
 *         TriggerMask:
 *           type: string
 *           description: file mask to look for to begin processing
 *         AMFMask:
 *           type: string
 *           description: AMF mask post-processing to upload
 *         EDMSMask1:
 *           type: string
 *           description: EDMS mask post-processing to upload
 *         EDMSMask2:
 *           type: string
 *           description: additional EDMS mask post-processing to upload
 *         DAFMask:
 *           type: string
 *           description: DAF mask to process
 *         EncryptReturnFiles:
 *           type: boolean
 *           description: whether to PGP encrypt files being returned to Alacriti, default true
 *         ParseSuccessMsg:
 *           type: string
 *           description: parse success message to look for in LogFile to determine success of DBF processing
 *         HasReports:
 *           type: boolean
 *           description: whether or not the orbipay job requires reports be uploaded
 *         RemoteReportDirectory:
 *           type: string
 *           description: the remote directory to upload reports to
 *         ReportMask:
 *           type: string
 *           description: the mask to use to find reports for upload
 *         MoveReport:
 *           type: boolean
 *           description: whether or not the reports need moved to /SummaryFiles post-processing
 *         PaymentMask:
 *           type: string
 *           description: the mask to use for processing payment posting files
 *         RemotePaymentDirectory:
 *           type: string
 *           description: the remote directory to upload payment files to after decryption
 *         PDFZipMask:
 *           type: string
 *           description: the mask to use to find PDF zip files for upload on EDMS job
 *         ProcessPath:
 *           type: string
 *           description: the local directory where files process specifically
 *         Convert:
 *           type: boolean
 *           description: whether or not the initial file needs converted prior to processing
 *         ConvertType:
 *           type: int
 *           description: type of conversion to perform, controls logic use
 *         ConvertMask:
 *           type: string
 *           description: the mask to use to find files for conversions
 *         SandboxPartnerID: 
 *           type: string
 *           description: the sandbox partner key from alacriti, use for testing and setup
 *         ServerID:
 *           type: int
 *           description: the serverid to use for uploading reports
 *       example:
 *         ID: 9999
 *         JobID: 101
 *         Name: zAdena Daily Balance
 *         RunMode: 1
 *         LocalDirectory: C:\clients\P\PFS_zAdenaDBF\
 *         PartnerID: "831259358"
 *         FileID: 
 *         Type: 2
 *         ChainJob: false
 *         FileCountRequired: 1
 *         LogFile: AutomateRunSeqLog.txt
 *         Wait: false
 *         WaitLength: 0
 *         TriggerMask: zAdena_elite_daily*.txt
 *         AMFMask: 831259358.AMF.*.DAT.pgp
 *         EDMSMask1: 
 *         EDMSMask2:
 *         DAFMask: 
 *         EncryptReturnFiles: true
 *         ParseSuccessMsg: "|| Exiting zAdena DBF Parser"
 *         HasReports: false
 *         RemoteReportDirectory: 
 *         ReportMask: 
 *         MoveReport: false
 *         PaymentMask: 831259358.ALL.ENHPYMNTPOST.*.PGP
 *         RemotePaymentDirectory: /PFS/zAdena/Payments
 *         PDFZipMask: 
 *         ProcessPath: C:\clients\P\PFS_zAdenaDBF\AlacritiFiles\
 *         Convert: false
 *         ConvertType: 0
 *         ConvertMask: 
 *         SandboxPartnerID: "543678123"
 *         ServerID: 0
 *     CreateOrbipaysBody:
 *       type: object
 *       properties:
 *         JobID:
 *           type: int
 *           description: The public id of the job
 *         Name:
 *           type: string
 *           description: Name of the orbipay job
 *         RunMode:
 *           type: int
 *           description: The RunMode of the job
 *         LocalDirectory:
 *           type: string
 *           description: the local base directory where files are processed
 *         PartnerID:
 *           type: string
 *           description: the alacriti partner id, can be sandbox key
 *         FileID: 
 *           type: string
 *           description: separate id field used for file naming and masks
 *         Type:
 *           type: int
 *           description: alacriti job type
 *         ChainJob:
 *           type: boolean
 *           description: whether the job should run as a chain or not, one after another
 *         FileCountRequired:
 *           type: int
 *           description: number of files required before processing will continue, 1 for chain jobs
 *         LogFile:
 *           type: string
 *           description: log filename, specific not a mask
 *         Wait:
 *           type: boolean
 *           description: whether or not the uploader should wait between uploads
 *         WaitLength: 
 *           type: int
 *           description: length in whole minutes for uploader to delay between files
 *         TriggerMask:
 *           type: string
 *           description: file mask to look for to begin processing
 *         AMFMask:
 *           type: string
 *           description: AMF mask post-processing to upload
 *         EDMSMask1:
 *           type: string
 *           description: EDMS mask post-processing to upload
 *         EDMSMask2:
 *           type: string
 *           description: additional EDMS mask post-processing to upload
 *         DAFMask:
 *           type: string
 *           description: DAF mask to process
 *         EncryptReturnFiles:
 *           type: boolean
 *           description: whether to PGP encrypt files being returned to Alacriti, default true
 *         ParseSuccessMsg:
 *           type: string
 *           description: parse success message to look for in LogFile to determine success of DBF processing
 *         HasReports:
 *           type: boolean
 *           description: whether or not the orbipay job requires reports be uploaded
 *         RemoteReportDirectory:
 *           type: string
 *           description: the remote directory to upload reports to
 *         ReportMask:
 *           type: string
 *           description: the mask to use to find reports for upload
 *         MoveReport:
 *           type: boolean
 *           description: whether or not the reports need moved to /SummaryFiles post-processing
 *         PaymentMask:
 *           type: string
 *           description: the mask to use for processing payment posting files
 *         RemotePaymentDirectory:
 *           type: string
 *           description: the remote directory to upload payment files to after decryption
 *         PDFZipMask:
 *           type: string
 *           description: the mask to use to find PDF zip files for upload on EDMS job
 *         ProcessPath:
 *           type: string
 *           description: the local directory where files process specifically
 *         Convert:
 *           type: boolean
 *           description: whether or not the initial file needs converted prior to processing
 *         ConvertType:
 *           type: int
 *           description: type of conversion to perform, controls logic use
 *         ConvertMask:
 *           type: string
 *           description: the mask to use to find files for conversions
 *         SandboxPartnerID: 
 *           type: string
 *           description: the sandbox partner key from alacriti, use for testing and setup
 *         ServerID:
 *           type: int
 *           description: the serverid to use for uploading reports
 *       example:
 *         JobID: 101
 *         Name: zAdena Daily Balance
 *         RunMode: 1
 *         LocalDirectory: C:\clients\P\PFS_zAdenaDBF\
 *         PartnerID: "831259358"
 *         FileID: 
 *         Type: 2
 *         ChainJob: false
 *         FileCountRequired: 1
 *         LogFile: AutomateRunSeqLog.txt
 *         Wait: false
 *         WaitLength: 0
 *         TriggerMask: zAdena_elite_daily*.txt
 *         AMFMask: 831259358.AMF.*.DAT.pgp
 *         EDMSMask1: 
 *         EDMSMask2:
 *         DAFMask: 
 *         EncryptReturnFiles: true
 *         ParseSuccessMsg: "|| Exiting zAdena DBF Parser"
 *         HasReports: false
 *         RemoteReportDirectory: 
 *         ReportMask: 
 *         MoveReport: false
 *         PaymentMask: 831259358.ALL.ENHPYMNTPOST.*.PGP
 *         RemotePaymentDirectory: /PFS/zAdena/Payments
 *         PDFZipMask: 
 *         ProcessPath: C:\clients\P\PFS_zAdenaDBF\AlacritiFiles\
 *         Convert: false
 *         ConvertType: 0
 *         ConvertMask: 
 *         SandboxPartnerID: "543678123"
 *         ServerID: 0
 *     UpdateOrbipaysBody:
 *       type: object
 *       properties:
 *         Name:
 *           type: string
 *           description: Name of the orbipay job
 *         RunMode:
 *           type: int
 *           description: The RunMode of the job
 *         LocalDirectory:
 *           type: string
 *           description: the local base directory where files are processed
 *         PartnerID:
 *           type: string
 *           description: the alacriti partner id, can be sandbox key
 *         FileID: 
 *           type: string
 *           description: separate id field used for file naming and masks
 *         ChainJob:
 *           type: boolean
 *           description: whether the job should run as a chain or not, one after another
 *         FileCountRequired:
 *           type: int
 *           description: number of files required before processing will continue, 1 for chain jobs
 *         LogFile:
 *           type: string
 *           description: log filename, specific not a mask
 *         Wait:
 *           type: boolean
 *           description: whether or not the uploader should wait between uploads
 *         WaitLength: 
 *           type: int
 *           description: length in whole minutes for uploader to delay between files
 *         TriggerMask:
 *           type: string
 *           description: file mask to look for to begin processing
 *         AMFMask:
 *           type: string
 *           description: AMF mask post-processing to upload
 *         EDMSMask1:
 *           type: string
 *           description: EDMS mask post-processing to upload
 *         EDMSMask2:
 *           type: string
 *           description: additional EDMS mask post-processing to upload
 *         DAFMask:
 *           type: string
 *           description: DAF mask to process
 *         EncryptReturnFiles:
 *           type: boolean
 *           description: whether to PGP encrypt files being returned to Alacriti, default true
 *         ParseSuccessMsg:
 *           type: string
 *           description: parse success message to look for in LogFile to determine success of DBF processing
 *         HasReports:
 *           type: boolean
 *           description: whether or not the orbipay job requires reports be uploaded
 *         RemoteReportDirectory:
 *           type: string
 *           description: the remote directory to upload reports to
 *         ReportMask:
 *           type: string
 *           description: the mask to use to find reports for upload
 *         MoveReport:
 *           type: boolean
 *           description: whether or not the reports need moved to /SummaryFiles post-processing
 *         PaymentMask:
 *           type: string
 *           description: the mask to use for processing payment posting files
 *         RemotePaymentDirectory:
 *           type: string
 *           description: the remote directory to upload payment files to after decryption
 *         PDFZipMask:
 *           type: string
 *           description: the mask to use to find PDF zip files for upload on EDMS job
 *         ProcessPath:
 *           type: string
 *           description: the local directory where files process specifically
 *         Convert:
 *           type: boolean
 *           description: whether or not the initial file needs converted prior to processing
 *         ConvertType:
 *           type: int
 *           description: type of conversion to perform, controls logic use
 *         ConvertMask:
 *           type: string
 *           description: the mask to use to find files for conversions
 *         SandboxPartnerID: 
 *           type: string
 *           description: the sandbox partner key from alacriti, use for testing and setup
 *         ServerID:
 *           type: int
 *           description: the serverid to use for uploading reports
 *       example:
 *         Name: zAdena Daily Balance
 *         RunMode: 1
 *         LocalDirectory: C:\clients\P\PFS_zAdenaDBF\
 *         PartnerID: "831259358"
 *         FileID: 
 *         ChainJob: false
 *         FileCountRequired: 1
 *         LogFile: AutomateRunSeqLog.txt
 *         Wait: false
 *         WaitLength: 0
 *         TriggerMask: zAdena_elite_daily*.txt
 *         AMFMask: 831259358.AMF.*.DAT.pgp
 *         EDMSMask1: 
 *         EDMSMask2:
 *         DAFMask: 
 *         EncryptReturnFiles: true
 *         ParseSuccessMsg: "|| Exiting zAdena DBF Parser"
 *         HasReports: false
 *         RemoteReportDirectory: 
 *         ReportMask: 
 *         MoveReport: false
 *         PaymentMask: 831259358.ALL.ENHPYMNTPOST.*.PGP
 *         RemotePaymentDirectory: /PFS/zAdena/Payments
 *         PDFZipMask: 
 *         ProcessPath: C:\clients\P\PFS_zAdenaDBF\AlacritiFiles\
 *         Convert: false
 *         ConvertType: 0
 *         ConvertMask: 
 *         SandboxPartnerID: "543678123"
 *         ServerID: 0
 *     DeleteOrbipayResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the orbipay
 *         Active:
 *           type: boolean
 *           description: Whether the orbipay is active or not
 *       example:
 *         ID: 9999
 *         Active: false 
 */

module.exports = yup.object().shape({
  Orbipays: yup.array().of(
    yup.object().shape({
      Active: yup
        .boolean()
        .default(false)
        .required('Active is required as true or false'),
    })
  ),
})