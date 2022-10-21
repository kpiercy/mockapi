require("dotenv").config();

var configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const all_deposits = async (req, res) => {
  try {
    const jobid = req.params.jobid;
    let pool = await sql.connect(configJobData);
    let getDeposits = await pool
      .request()
      .input("jobid", sql.NVarChar, jobid.toLowerCase())
      .execute("GetDeposits");

    res
      .status(200)
      .json(
        JSON.parse(
          getDeposits.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const one_deposit = async (req, res) => {
  try {
    const depositid = req.params.depositid;
    let pool = await sql.connect(configJobData);
    let getDeposit = await pool
      .request()
      .input("depositid", sql.NVarChar, depositid.toLowerCase())
      .execute("GetDeposit");

    res
      .status(200)
      .json(
        JSON.parse(
          getDeposit.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_deposit = async (req, res) => {
  try {
    const deposits = JSON.stringify(req.body);
    const depositid = req.params.depositid;
    let pool = await sql.connect(configJobData);
    let getDeposits = await pool
      .request()
      .input("deposits", sql.NVarChar, deposits)
      .input("depositid", sql.NVarChar, depositid.toLowerCase())
      .execute("PutDeposits");

    res.status(200).json(getDeposits.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//create deposit
const create_deposit = async (req, res) => {
  try {
    const deposits = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postDeposits = await pool
      .request()
      .input("deposits", sql.NVarChar, deposits)
      .execute("PostDeposits");

    res.status(200).json(postDeposits.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//deactivate deposit
const delete_deposit = async (req, res) => {
  try {
    const depositid = req.params.depositid;
    let pool = await sql.connect(configJobData);
    let delDeposit = await pool
      .request()
      .input("depositid", sql.NVarChar, depositid.toLowerCase())
      .execute("DeleteDeposit");

    res.status(200).json(delDeposit.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  all_deposits,
  one_deposit,
  update_deposit,
  create_deposit,
  delete_deposit,
};