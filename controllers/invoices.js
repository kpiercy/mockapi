require("dotenv").config();

const configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const all_invoices = async (req, res) => {
  try {
    const clientid = req.params.clientid;
    let pool = await sql.connect(configJobData);
    let getInvoices = await pool
      .request()
      .input("clientid", sql.NVarChar, clientid.toLowerCase())
      .execute("GetInvoices");

    res
      .status(200)
      .json(
        JSON.parse(
          getInvoices.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const one_invoice = async (req, res) => {
  try {
    const invoiceid = req.params.invoiceid;
    let pool = await sql.connect(configJobData);
    let getInvoice = await pool
      .request()
      .input("invoiceid", sql.NVarChar, invoiceid.toLowerCase())
      .execute("GetInvoice");

    res
      .status(200)
      .json(
        JSON.parse(
          getInvoice.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_invoice = async (req, res) => {
  try {
    const invoices = JSON.stringify(req.body);
    const invoiceid = req.params.invoiceid;
    let pool = await sql.connect(configJobData);
    let getInvoices = await pool
      .request()
      .input("invoices", sql.NVarChar, invoices)
      .input("invoiceid", sql.NVarChar, invoiceid.toLowerCase())
      .execute("PutInvoices");

    res.status(200).json({ Invoices: getInvoices.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//create invoice
const create_invoice = async (req, res) => {
  try {
    const invoices = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postInvoices = await pool
      .request()
      .input("invoices", sql.NVarChar, invoices)
      .execute("PostInvoices");

    res.status(201).json({ Invoices: postInvoices.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//deactivate invoice
const delete_invoice = async (req, res) => {
  try {
    const invoiceid = req.params.invoiceid;
    let pool = await sql.connect(configJobData);
    let delInvoice = await pool
      .request()
      .input("invoiceid", sql.NVarChar, invoiceid.toLowerCase())
      .execute("DeleteInvoice");

    res.status(200).json({ Invoices: delInvoice.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  all_invoices,
  one_invoice,
  update_invoice,
  create_invoice,
  delete_invoice,
};