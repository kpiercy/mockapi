require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//classes
const model = require('../models/contact')

const all_contacts = async (req, res, next) => {
  req.jobid = req.params.jobid
  req.params.jobid = req.jobid
  let jid = req.params.jobid
  req.clientid = req.params.clientid
  req.params.clientid = req.clientid
  let cid = req.params.clientid
  let pageIt = req.query.paginate

  if ( pageIt === 'true' ) {
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit)
      const startIndex = (page - 1) * limit
      const endIndex = page * limit

      if (jid == null) {
        next(
          ApiError.badRequest(
            'jobid must be specified in either the URL as a query param or in the request body.'
          )
        )
      } else {
        const results = {};

        if (endIndex < model.length) {
          let nextPage = page + 1;
          results.next =
            `${baseUrl.url}/clients/${cid}/jobs/${jid}/contacts?paginate=true&page=${nextPage}&limit=${limit}`
        }
        if (startIndex > 0) {
          let prevPage = page - 1;
          results.previous = `${baseUrl.url}/clients/${cid}/jobs/${jid}/contacts?paginate=true&page=${prevPage}&limit=${limit}`
        }
        try {
          let pool = await sql.connect(configJobData);
          results.data = await pool
            .request()
            .input("startindex", sql.Int, startIndex)
            .input("limit", sql.Int, limit)
            .input("jid", sql.Int, jid)
            .execute("GetPaginatedContacts");
          res.paginatedResults = results;
          res
            .status(200)
            .json(
              {
                Next: res.paginatedResults.next,
                Previous: res.paginatedResults.previous,
                Contacts: res.paginatedResults.data.recordset
              }
            );
          //res.paginatedResults
        } catch (err) {
          console.log({ Error: err.message })
          next(ApiError.internal(err))
        }
      }
  } else {
      try {
        const jobid = req.params.jobid
        let pool = await sql.connect(configJobData);
        let getContacts = await pool
          .request()
          .input("jobid", sql.Int, jobid)
          .execute("GetContacts");

        res
          .status(200)
          .json(
            JSON.parse(
              getContacts.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
            )
          );
      } catch (err) {
        console.log({ Error: err.message })
        next(ApiError.internal(err))
      }
    }
}

const one_contact = async (req, res, next) => {
    try {
      const contactid = req.params.contactid
      let pool = await sql.connect(configJobData);
      let getContact = await pool
        .request()
        .input("contactid", sql.Int, contactid)
        .execute("GetContact");

      res
        .status(200)
        .json(
          JSON.parse(
            getContact.recordset[0][
              "JSON_F52E2B61-18A1-11d1-B105-00805F49916B"
            ]
          )
        );
    } catch (err) {
      console.log({ Error: err.message })
      next(ApiError.internal(err))
    }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_contact = async (req, res, next) => {
    try {
      const contacts = JSON.stringify(req.body);
      const contactid = req.params.contactid
      let pool = await sql.connect(configJobData);
      let getContacts = await pool
        .request()
        .input("contacts", sql.NVarChar, contacts)
        .input("contactid", sql.Int, contactid)
        .execute("PutContacts");

      res
        .status(200)
        .json(
          { Contacts: getContacts.recordset }
        );
    } catch (err) {
      console.log({ Error: err.message })
      next(ApiError.internal(err))
    }
}

//create contact
const create_contact = async (req, res, next) => {
    try {
      const contacts = JSON.stringify(req.body);
      let pool = await sql.connect(configJobData);
      let postContacts = await pool
        .request()
        .input("contacts", sql.NVarChar, contacts)
        .execute("PostContacts");

      res
      .status(201)
    .json({ Contacts: postContacts.recordset });
    } catch (err) {
      console.log({ Error: err.message })
      next(ApiError.internal(err))
    }
}

//deactivate contact
const delete_contact = async (req, res, next) => {
    try {
      const contactid = req.params.contactid
      let pool = await sql.connect(configJobData);
      let delContact = await pool
        .request()
        .input("contactid", sql.Int, contactid)
        .execute("DeleteContact");

      res
        .status(200)
        .json(
            { Contacts: delContact.recordset }
        );
    } catch (err) {
      console.log({ Error: err.message })
      next(ApiError.internal(err))
    }
}

module.exports = {
    all_contacts,
    one_contact,
    update_contact,
    create_contact,
    delete_contact
}