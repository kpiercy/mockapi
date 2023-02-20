const yup = require('yup')

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
