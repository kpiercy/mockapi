/**
 * @swagger
 * components:
 *   schemas:
 *     Return:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: public id of the retun
 *         JobID:
 *           type: int
 *           description: public id of the job
 *         RemoteDirectory:
 *           type: string
 *           description: remote directory to upload report to
 *         Mask:
 *           type: string
 *           description: file mask of the report to return
 *         AdditionalTask:
 *           type: string
 *           description: create additional file 
 *         Password:
 *           type: string
 *           description: password to encrypt uploaded files with
 *         LocalDirectory:
 *           type: string
 *           description: local directory where reports will exist to upload from
 *         ServerID:
 *           type: int
 *           description: server id to upload to
 *         TimeBased:
 *           type: boolean
 *           description: whether the upload should happen at specific time
 *         TimeToReturn: 
 *           type: string
 *           description: time to upload reports at in 24hr format
 *         DaysToReturn:
 *           type: int
 *           description: days of week report should be uploaded 1-7
 *         Type:
 *           type: int
 *           description: report type 
 *         ReturnZipName:
 *           type: string
 *           description: the filename to use for zipping reports
 *         MultiUpload:
 *           type: boolean
 *           description: whether teh same report should be uploaded to secondary location
 *         MultiServerID:
 *           type: int
 *           description: server id to upload to secondarily
 *         MultiRemoteDirectory:
 *           type: string
 *           description: secondary remote directory to upload report to
 *       example:
 *         ID: 99
 *         JobID: 123
 *         RemoteDirectory: /PFS/zAdena/Reports/
 *         Mask: Summary_
 *         AdditionalTask: 
 *         Password: 
 *         LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *         ServerID: 0
 *         TimeBased: false
 *         TimeToReturn: 
 *         DaysToReturn: 1234567
 *         Type: 4
 *         ReturnZipName: 
 *         MultiUpload: false
 *         MultiServerID: 
 *         MultiRemoteDirectory: 
 *     CreateReturnsBody:
 *       type: object
 *       properties:
 *         JobID:
 *           type: int
 *           description: public id of the job
 *         RemoteDirectory:
 *           type: string
 *           description: remote directory to upload report to
 *         Mask:
 *           type: string
 *           description: file mask of the report to return
 *         AdditionalTask:
 *           type: string
 *           description: create additional file 
 *         Password:
 *           type: string
 *           description: password to encrypt uploaded files with
 *         LocalDirectory:
 *           type: string
 *           description: local directory where reports will exist to upload from
 *         ServerID:
 *           type: int
 *           description: server id to upload to
 *         TimeBased:
 *           type: boolean
 *           description: whether the upload should happen at specific time
 *         TimeToReturn: 
 *           type: string
 *           description: time to upload reports at in 24hr format
 *         DaysToReturn:
 *           type: int
 *           description: days of week report should be uploaded 1-7
 *         Type:
 *           type: int
 *           description: report type 
 *         ReturnZipName:
 *           type: string
 *           description: the filename to use for zipping reports
 *         MultiUpload:
 *           type: boolean
 *           description: whether teh same report should be uploaded to secondary location
 *         MultiServerID:
 *           type: int
 *           description: server id to upload to secondarily
 *         MultiRemoteDirectory:
 *           type: string
 *           description: secondary remote directory to upload report to
 *       example:
 *         JobID: 123
 *         RemoteDirectory: /PFS/zAdena/Reports/
 *         Mask: Summary_
 *         AdditionalTask: 
 *         Password: 
 *         LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *         ServerID: 0
 *         TimeBased: false
 *         TimeToReturn: 
 *         DaysToReturn: 1234567
 *         Type: 4
 *         ReturnZipName: 
 *         MultiUpload: false
 *         MultiServerID: 
 *         MultiRemoteDirectory:
 *     UpdateReturnsBody:
 *       type: object
 *       properties:
 *         RemoteDirectory:
 *           type: string
 *           description: remote directory to upload report to
 *         Mask:
 *           type: string
 *           description: file mask of the report to return
 *         AdditionalTask:
 *           type: string
 *           description: create additional file 
 *         Password:
 *           type: string
 *           description: password to encrypt uploaded files with
 *         LocalDirectory:
 *           type: string
 *           description: local directory where reports will exist to upload from
 *         ServerID:
 *           type: int
 *           description: server id to upload to
 *         TimeBased:
 *           type: boolean
 *           description: whether the upload should happen at specific time
 *         TimeToReturn: 
 *           type: string
 *           description: time to upload reports at in 24hr format
 *         DaysToReturn:
 *           type: int
 *           description: days of week report should be uploaded 1-7
 *         Type:
 *           type: int
 *           description: report type 
 *         ReturnZipName:
 *           type: string
 *           description: the filename to use for zipping reports
 *         MultiUpload:
 *           type: boolean
 *           description: whether teh same report should be uploaded to secondary location
 *         MultiServerID:
 *           type: int
 *           description: server id to upload to secondarily
 *         MultiRemoteDirectory:
 *           type: string
 *           description: secondary remote directory to upload report to
 *       example:
 *         RemoteDirectory: /PFS/zAdena/Reports/
 *         Mask: Summary_
 *         AdditionalTask: 
 *         Password: 
 *         LocalDirectory: C:\clients\P\PFS_zAdena\SummaryFiles\
 *         ServerID: 0
 *         TimeBased: false
 *         TimeToReturn: 
 *         DaysToReturn: 1234567
 *         Type: 4
 *         ReturnZipName: 
 *         MultiUpload: false
 *         MultiServerID: 
 *         MultiRemoteDirectory:
 */


module.exports = yup.object().shape({
  Returns: yup.array().of(
    yup.object().shape({
      SpecID: yup.number().integer().required('SpecID is required.'),
      RemoteDirectory: yup.string().required('RemoteDirectory is required'),
      Mask: yup.string().required('File Mask is required'),
      AdditionalTask: yup.string().nullable().default(null),
      Password: yup.string().nullable().default(null),
      LocalDirectory: yup.string().required('LocalDirectory is required'),
      ServerID: yup.number().integer().required('ServerID is required')
        .oneOf([0,1,2,3,4,5,6,7,8,9,10]),
      TimeBased: yup.boolean().default(false),
      TimeToReturn: yup.string().nullable().default(null),
      DaysToReturn: yup.string().default('1234567'),
      Type: yup.number().integer()
        .oneOf([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]),
      ReturnZipName: yup.string().nullable().default(null),
      MultiUpload: yup.boolean().default(false),
      MultiServerID: yup.number().integer()
        .when('MultiUpload', {
            is: true,
            then: yup
                .number()
                .integer()
                .oneOf([0,1,2,3,4,5,6,7,8,9,10])
                .required('MultiServerID is required when MultiUpload is true'),
            otherwise: yup.number().integer().nullable().default(null)
        }),
      MultiRemoteDirectory: yup.string()
        .when('MultiUpload', {
            is: true,
            then: yup
                .string()
                .required('MultiRemoteDirectory is required when MultiUpload is true'),
            otherwise: yup.string().nullable().default(null)
        })
    })
  ),
})
