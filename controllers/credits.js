require("dotenv").config();

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const all_credits = async (req, res) => {
  try {
    const invoiceid = req.params.invoiceid;
    let pool = await sql.connect(configJobData);
    let getCredits = await pool
      .request()
      .input("invoiceid", sql.NVarChar, invoiceid.toLowerCase())
      .execute("GetCredits");

    res
      .status(200)
      .json(
        JSON.parse(
          getCredits.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const one_credit = async (req, res) => {
  try {
    const creditid = req.params.creditid;
    let pool = await sql.connect(configJobData);
    let getCredit = await pool
      .request()
      .input("creditid", sql.NVarChar, creditid.toLowerCase())
      .execute("GetCredit");

    res
      .status(200)
      .json(
        JSON.parse(
          getCredit.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_credit = async (req, res) => {
  try {
    const credits = JSON.stringify(req.body);
    const creditid = req.params.creditid;
    let pool = await sql.connect(configJobData);
    let getCredits = await pool
      .request()
      .input("credits", sql.NVarChar, credits)
      .input("creditid", sql.NVarChar, creditid.toLowerCase())
      .execute("PutCredits");

    res.status(200).json({ Credits: getCredits.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//create credit
const create_credit = async (req, res) => {
  try {
    const credits = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postCredits = await pool
      .request()
      .input("credits", sql.NVarChar, credits)
      .execute("PostCredits");

    res.status(201).json({ Credits: postCredits.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//deactivate credit
const delete_credit = async (req, res) => {
  try {
    const creditid = req.params.creditid;
    let pool = await sql.connect(configJobData);
    let delCredit = await pool
      .request()
      .input("creditid", sql.NVarChar, creditid.toLowerCase())
      .execute("DeleteCredit");

    res.status(200).json({ Credits: delCredit.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  all_credits,
  one_credit,
  update_credit,
  create_credit,
  delete_credit,
};
