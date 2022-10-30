require('dotenv').config()

let configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_contacts = async (req,res) => {
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