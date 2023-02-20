const yup = require('yup')

/**
 * @swagger
 * components:
 *   schemas:
 *     Changes:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the change
 *         JobID:
 *           type: int
 *           description: The public id of the client's job
 *         Status:
 *           type: int
 *           description: The status of the change
 *         RequestedBy:
 *           type: int
 *           description: The public id of the requesting user
 *         ChangeType:
 *           type: int
 *           description: The public id of the change type being requested
 *         FacilitySpecific:
 *           type: boolean
 *           description: Whether the change request is facility specific
 *         FacilityID:
 *           type: string
 *           description: The public FacilityID for which the change should be made
 *         DueDate:
 *           type: string
 *           description: The date the change should be implemented by
 *         Description:
 *           type: string
 *           description: The text description of the change to make
 *         ProofRequested:
 *           type: boolean
 *           description: Whether the requester wishes to receive a proof of the change or not
 *         Attachment:
 *           type: string
 *           format: binary
 *           description: Attachment(s) to facilitate the change being requested
 *         EstimatedHours:
 *           type: number
 *           description: The estimated hours for completion
 *         TemporaryChange:
 *           type: boolean
 *           description: Whether the change being requested is temporary and should revert to Job defaults after specific date
 *         StartDate:
 *           type: string
 *           description: The start date of any temporary change
 *         EndDate:
 *           type: string
 *           description: The ending date of any temporary change
 *       example:
 *         ID: 9999
 *         JobID: 101
 *         Status: 2
 *         RequestedBy: 1011
 *         ChangeType: 3
 *         FacilitySpecific: true
 *         FacilityID: 222
 *         DueDate: 2023-05-01
 *         Description: Some long-format text describing the change needed
 *         ProofRequested: true
 *         Attachement: 
 *         EstimatedHours: 3
 *         TemporaryChange: true
 *         StartDate: 2023-05-01
 *         EndDate: 2023-05-30
 *     CreateChangeBody:
 *       type: object
 *       properties:
 *         JobID:
 *           type: int
 *           description: The public id of the client's job
 *         Status:
 *           type: int
 *           description: The status of the change
 *         RequestedBy:
 *           type: int
 *           description: The public id of the requesting user
 *         ChangeType:
 *           type: int
 *           description: The public id of the change type being requested
 *         FacilitySpecific:
 *           type: boolean
 *           description: Whether the change request is facility specific
 *         FacilityID:
 *           type: string
 *           description: The public FacilityID for which the change should be made
 *         DueDate:
 *           type: string
 *           description: The date the change should be implemented by
 *         Description:
 *           type: string
 *           description: The text description of the change to make
 *         ProofRequested:
 *           type: boolean
 *           description: Whether the requester wishes to receive a proof of the change or not
 *         Attachment:
 *           type: string
 *           format: binary
 *           description: Attachment(s) to facilitate the change being requested
 *         EstimatedHours:
 *           type: number
 *           description: The estimated hours for completion
 *         TemporaryChange:
 *           type: boolean
 *           description: Whether the change being requested is temporary and should revert to Job defaults after specific date
 *         StartDate:
 *           type: string
 *           description: The start date of any temporary change
 *         EndDate:
 *           type: string
 *           description: The ending date of any temporary change
 *       example:
 *         JobID: 101
 *         Status: 2
 *         RequestedBy: 1011
 *         ChangeType: 3
 *         FacilitySpecific: true
 *         FacilityID: 222
 *         DueDate: 2023-05-01
 *         Description: Some long-format text describing the change needed
 *         ProofRequested: true
 *         Attachement: 
 *         EstimatedHours: 3
 *         TemporaryChange: true
 *         StartDate: 2023-05-01
 *         EndDate: 2023-05-30
 *     DeleteChangeResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the change
 *         JobID:
 *           type: int
 *           description: The public id of the client's job 
 *       example:
 *         ID: 9999
 *         JobID: 101
 */

module.exports = yup
  .object()
  .required()
  .shape({
    Charts: yup.array().of(
      yup.object().shape({
        SpecID: yup.number().integer().required('SpecID is required.'),
        SourceField: yup.string().required('SourceField for the change is required'),
        ConsumptionText: yup
          .string()
          .required('Consumption Text to be displayed with the change is required.'),
        UsageField: yup.string().required('Usage field for the change is required'),
      })
    ),
  })
