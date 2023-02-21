const yup = require('yup')

/**
 * @swagger
 * components:
 *   schemas:
 *     Download:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the download
 *         JobID:
 *           type: int
 *           description: The JobID for the download
 *         Active:
 *           type: boolean
 *           description: Whether the download is active or not
 *         RemoteDirectory:
 *           type: string
 *           description: Remote directory to download from
 *         Mask:
 *           type: string
 *           description: File mask to use for downloading
 *         AdditionalTask:
 *           type: string
 *           description: Additional task to perform after download, typically set to trigger.txt
 *         Password:
 *           type: string
 *           description: Password to be used for decrypting the downloaded file
 *         LocalDirectory:
 *           type: string
 *           description: Local directory the file will be downloaded to
 *         Server:
 *           type: int
 *           description: Server id where files should be downloaded from
 *         IgnoreMask:
 *           type: string
 *           description: File mask to ignore during download
 *         Timestamped:
 *           type: boolean
 *           description: Whether or not he file should get a timestamp appeneded to filename
 *         Renamed:
 *           type: boolean
 *           description: Whether the file should be completely renamed after download
 *         NewFilename:
 *           type: string
 *           description: Filename to be renamed to
 *         AppendValue:
 *           type: string
 *           description: Text to be appended at very end of the filename
 *         Convert:
 *           type: boolean
 *           description: Whether or not the file needs to be converted to tab delim file before processing
 *         ConvertToDelimiter:
 *           type: string
 *           description: Delimiter to convert the file to before processing, typically tab
 *         ConvertToExtension:
 *           type: string
 *           description: Extension to use for the new file that is created, typically csv
 *       example:
 *         ID: 60
 *         JobID: 300
 *         Active: true
 *         RemoteDirectory: /PFS/zAdena/
 *         Mask: "*.xlsx"
 *         AdditionalTask: "trigger.txt"
 *         Password: 
 *         LocalDirectory: C:\clients\P\PFS_zAdena\Filestoprocess
 *         Server: 0
 *         IgnoreMask: 
 *         Timestamped: true
 *         Renamed: false
 *         NewFilename: 
 *         AppendValue: 
 *         Convert: true
 *         ConvertToDelimiter: tab
 *         CopnvertToExtension: csv
 *     CreateDownloadsBody:
 *       type: object
 *       properties:
 *         JobID:
 *           type: int
 *           description: The JobID for the download
 *         Active:
 *           type: boolean
 *           description: Whether the download is active or not
 *         RemoteDirectory:
 *           type: string
 *           description: Remote directory to download from
 *         Mask:
 *           type: string
 *           description: File mask to use for downloading
 *         AdditionalTask:
 *           type: string
 *           description: Additional task to perform after download, typically set to trigger.txt
 *         Password:
 *           type: string
 *           description: Password to be used for decrypting the downloaded file
 *         LocalDirectory:
 *           type: string
 *           description: Local directory the file will be downloaded to
 *         Server:
 *           type: int
 *           description: Server id where files should be downloaded from
 *         IgnoreMask:
 *           type: string
 *           description: File mask to ignore during download
 *         Timestamped:
 *           type: boolean
 *           description: Whether or not he file should get a timestamp appeneded to filename
 *         Renamed:
 *           type: boolean
 *           description: Whether the file should be completely renamed after download
 *         NewFilename:
 *           type: string
 *           description: Filename to be renamed to
 *         AppendValue:
 *           type: string
 *           description: Text to be appended at very end of the filename
 *         Convert:
 *           type: boolean
 *           description: Whether or not the file needs to be converted to tab delim file before processing
 *         ConvertToDelimiter:
 *           type: string
 *           description: Delimiter to convert the file to before processing, typically tab
 *         ConvertToExtension:
 *           type: string
 *           description: Extension to use for the new file that is created, typically csv
 *       example:
 *         JobID: 300
 *         Active: true
 *         RemoteDirectory: /PFS/zAdena/
 *         Mask: "*.xlsx"
 *         AdditionalTask: "trigger.txt"
 *         Password: 
 *         LocalDirectory: C:\clients\P\PFS_zAdena\Filestoprocess
 *         Server: 0
 *         IgnoreMask: 
 *         Timestamped: true
 *         Renamed: false
 *         NewFilename: 
 *         AppendValue: 
 *         Convert: true
 *         ConvertToDelimiter: tab
 *         CopnvertToExtension: csv
 *     UpdateDownloadsBody:
 *       type: object
 *       properties:
 *         Active:
 *           type: boolean
 *           description: Whether the download is active or not
 *         RemoteDirectory:
 *           type: string
 *           description: Remote directory to download from
 *         Mask:
 *           type: string
 *           description: File mask to use for downloading
 *         AdditionalTask:
 *           type: string
 *           description: Additional task to perform after download, typically set to trigger.txt
 *         Password:
 *           type: string
 *           description: Password to be used for decrypting the downloaded file
 *         LocalDirectory:
 *           type: string
 *           description: Local directory the file will be downloaded to
 *         Server:
 *           type: int
 *           description: Server id where files should be downloaded from
 *         IgnoreMask:
 *           type: string
 *           description: File mask to ignore during download
 *         Timestamped:
 *           type: boolean
 *           description: Whether or not he file should get a timestamp appeneded to filename
 *         Renamed:
 *           type: boolean
 *           description: Whether the file should be completely renamed after download
 *         NewFilename:
 *           type: string
 *           description: Filename to be renamed to
 *         AppendValue:
 *           type: string
 *           description: Text to be appended at very end of the filename
 *         Convert:
 *           type: boolean
 *           description: Whether or not the file needs to be converted to tab delim file before processing
 *         ConvertToDelimiter:
 *           type: string
 *           description: Delimiter to convert the file to before processing, typically tab
 *         ConvertToExtension:
 *           type: string
 *           description: Extension to use for the new file that is created, typically csv
 *       example:
 *         Active: true
 *         RemoteDirectory: /PFS/zAdena/
 *         Mask: "*.xlsx"
 *         AdditionalTask: "trigger.txt"
 *         Password: 
 *         LocalDirectory: C:\clients\P\PFS_zAdena\Filestoprocess
 *         Server: 0
 *         IgnoreMask: 
 *         Timestamped: true
 *         Renamed: false
 *         NewFilename: 
 *         AppendValue: 
 *         Convert: true
 *         ConvertToDelimiter: tab
 *         CopnvertToExtension: csv
 *     DeleteDownloadResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: Public id fo the download to be deleted
 *         Active:
 *           type: boolean
 *           description: Whether the download is active or not
 *       example:
 *         ID: 60
 *         Active: false
 */

module.exports = yup
  .object()
  .required()
  .shape({
    Downloads: yup.array().of(
      yup.object().shape({
        JobID: yup.number().integer().required('JobID is required.'),
        Active: yup
          .boolean()
          .default(false)
          .required('Active is required, default to false otherwise.'),
        RemoteDirectory: yup.string().required('RemoteDirectory is required'),
        Mask: yup.string().required('File mask is required'),
        AdditionalTask: yup.string().nullable().default(null),
        Password:  yup.string().nullable().default(null),
        LocalDirectory: yup.string().required('Local directory is required'),
        Server: yup.number().integer().required('Server id is required'),
        IgnoreMask: yup.string().nullable().default(null),
        Timestamped: yup.boolean().default(false),
        Renamed: yup.boolean().default(false),
        NewFilename: yup.string().nullable().default(null),
        AppendValue: yup.string().nullable().default(null),
        Convert: yup.boolean().default(false),
        ConvertToDelimiter: yup.string().nullable().default(null),
        ConvertToExtension: yup.string().nullable().default(null)
      })
    ),
  })