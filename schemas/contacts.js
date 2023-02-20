const yup = require('yup')
const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the contact
 *         Active:
 *           type: boolean
 *           description: Whether the contact is active or not
 *         ContactType:
 *           type: string
 *           description: The contact type
 *         FirstName:
 *           type: string
 *           description: Contacts first name
 *         LastName:
 *           type: string
 *           description: Contacts last name
 *         Phone:
 *           type: string
 *           description: Contacts phone number
 *         Email:
 *           type: string
 *           description: Contacts email address
 *       example:
 *         Active: true
 *         ContactType: StmtProcessing
 *         FirstName: Bobby
 *         LastName: Brown
 *         Phone: 765-745-5555
 *         Email: bobby.brown@someplace.com
 *     CreateContactsBody:
 *       type: object
 *       properties:
 *         JobID:
 *           type: int
 *           description: JobID for the contact to be created for
 *         Active:
 *           type: boolean
 *           description: Whether the contact is active or not
 *         ContactType:
 *           type: string
 *           description: The contact type
 *         FirstName:
 *           type: string
 *           description: Contacts first name
 *         LastName:
 *           type: string
 *           description: Contacts last name
 *         Phone:
 *           type: string
 *           description: Contacts phone number
 *         Email:
 *           type: string
 *           description: Contacts email address
 *       example:
 *         JobID: 101
 *         Active: true
 *         ContactType: StmtProcessing
 *         FirstName: Bobby
 *         LastName: Brown
 *         Phone: 765-745-5555
 *         Email: bobby.brown@someplace.com
 *     UpdateContactsBody:
 *       type: object
 *       properties:
 *         Active:
 *           type: boolean
 *           description: Whether the contact is active or not
 *         ContactType:
 *           type: string
 *           description: The contact type
 *         FirstName:
 *           type: string
 *           description: Contacts first name
 *         LastName:
 *           type: string
 *           description: Contacts last name
 *         Phone:
 *           type: string
 *           description: Contacts phone number
 *         Email:
 *           type: string
 *           description: Contacts email address
 *       example:
 *         Active: true
 *         ContactType: StmtProcessing
 *         FirstName: Bobby
 *         LastName: Brown
 *         Phone: 765-745-5555
 *         Email: bobby.brown@someplace.com
 *     DeleteContactResponse:
 *       type: object
 *       properties:
 *         ID:
 *           type: int
 *           description: The public id of the contact deleted
 *         Active:
 *           type: boolean
 *           description: Whether the contact is active or not
 *       example:
 *         ID: 9999
 *         Active: false
 */

module.exports = yup
  .object()
  .required()
  .shape({
    Contacts: yup.array().of(
      yup.object().shape({
        JobID: yup.number().integer().required('JobID is required.'),
        Active: yup
          .boolean()
          .default(false)
          .required('Active is required, default to false otherwise.'),
        ContactType: yup.number().integer().required('ContactType is required'),
        FirstName: yup.string().required('FirstName is required'),
        LastName: yup.string().required('LastName is required'),
        Phone: yup.string()
            .matches(phoneRegExp, 'Please enter properly formatted phone number')
            .nullable(),
        Email: yup.email().required('Email is required')
      })
    ),
  })
