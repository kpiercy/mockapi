require('dotenv').config()

let configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//classes
const model = require('../classes/contact')

const all_contacts = async (req,res) => {
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

      if (cid.toLowerCase() == null) {
        res
          .status(406)
          .json(
            "Error: clientid must be specified in either the URL as a query param or in the request body."
          );
      } else {
        const results = {};

        if (endIndex < model.length) {
          let nextPage = page + 1;
          results.next =
            "http://localhost:3000/clients/" + cid.toLowerCase() + "/jobs/" + jid.toLowerCase() + "/contacts?paginate=true&page=" +
            nextPage +
            "&limit=" +
            limit +
            "";
        }
        if (startIndex > 0) {
          let prevPage = page - 1;
          results.previous =
            "http://localhost:3000/clients/" + cid.toLowerCase() + "/jobs/" + jid.toLowerCase() + "/contacts?paginate=true&page=" +
            prevPage +
            "&limit=" +
            limit +
            "";
        }
        try {
          let pool = await sql.connect(configJobData);
          results.data = await pool
            .request()
            .input("startindex", sql.Int, startIndex)
            .input("limit", sql.Int, limit)
            .input("jid", sql.VarChar, jid.toLowerCase())
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
        } catch (e) {
          console.log(e);
          res.status(500).json({ Error: e.message });
        }
      }
  } else {
      try {
        const jobid = req.params.jobid
        let pool = await sql.connect(configJobData);
        let getContacts = await pool
          .request()
          .input("jobid", sql.NVarChar, jobid.toLowerCase())
          .execute("GetContacts");

        res
          .status(200)
          .json(
            JSON.parse(
              getContacts.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
            )
          );
      } catch (e) {
        res.status(500).json({ Error: e.message });
        console.log(e);
      }
    }
}

const one_contact = async (req,res) => {
    try {
      const contactid = req.params.contactid
      let pool = await sql.connect(configJobData);
      let getContact = await pool
        .request()
        .input("contactid", sql.NVarChar, contactid.toLowerCase())
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
    } catch (e) {
      res.status(500).json({ Error: e.message });
      console.log(e);
    }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_contact = async (req,res) => {
    try {
      const contacts = JSON.stringify(req.body);
      const contactid = req.params.contactid
      let pool = await sql.connect(configJobData);
      let getContacts = await pool
        .request()
        .input("contacts", sql.NVarChar, contacts)
        .input("contactid", sql.NVarChar, contactid.toLowerCase())
        .execute("PutContacts");

      res
        .status(200)
        .json(
          { Contacts: getContacts.recordset }
        );
    } catch (e) {
      res.status(500).json({ Error: e.message });
      console.log(e);
    }
}

//create contact
const create_contact = async (req,res) => {
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
    } catch (e) {
      res.status(500).json({ Error: e.message });
      console.log(e);
    }
}

//deactivate contact
const delete_contact = async (req,res) => {
    try {
      const contactid = req.params.contactid
      let pool = await sql.connect(configJobData);
      let delContact = await pool
        .request()
        .input("contactid", sql.NVarChar, contactid.toLowerCase())
        .execute("DeleteContact");

      res
        .status(200)
        .json(
            { Contacts: delContact.recordset }
        );
    } catch (e) {
      res.status(500).json({ Error: e.message });
      console.log(e);
    }
}

module.exports = {
    all_contacts,
    one_contact,
    update_contact,
    create_contact,
    delete_contact
}