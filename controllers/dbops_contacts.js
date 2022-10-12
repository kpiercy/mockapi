require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_contacts = async (req,res) => {
    try {
      let pool = await sql.connect(configJobData);
      let getContacts = await pool
        .request()
        .input("jobid", sql.NVarChar, req.params.jobid)
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
      let pool = await sql.connect(configJobData);
      let getContact = await pool
        .request()
        .input("contactid", sql.NVarChar, req.params.contactid)
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

//update or create dependent upon whether Contact_GUID is provided in req.body with a value
const update_contact = async (req,res) => {
    try {
        const contacts = JSON.stringify(req.body);
      let pool = await sql.connect(configJobData);
      let getContacts = await pool
        .request()
        .input("contacts", sql.NVarChar, contacts)
        .input("contactid", sql.NVarChar, req.params.contactid)
        .execute("PutContacts");

      res
        .status(200)
        .json(
          getContacts.recordsets
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
      .status(200)
      .json(postContacts.recordsets);
    } catch (e) {
      res.status(500).json({ Error: e.message });
      console.log(e);
    }
}

//deactivate contact
const delete_contact = async (req,res) => {
    try {
      let pool = await sql.connect(configJobData);
      let delContact = await pool
        .request()
        .input("contactid", sql.NVarChar, req.params.contactid)
        .execute("DeleteContact");

      res
        .status(200)
        .json(
            delContact.recordsets
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