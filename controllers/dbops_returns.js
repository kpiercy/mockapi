require("dotenv").config();

const configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const all_returns = async (req, res) => {
  try {
    const jobid = req.params.jobid;
    let pool = await sql.connect(configJobData);
    let getReturns = await pool
      .request()
      .input("clientid", sql.NVarChar, jobid.toLowerCase())
      .execute("GetReturns");

    res
      .status(200)
      .json(
        JSON.parse(
          getReturns.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const one_return = async (req, res) => {
  try {
    const returnid = req.params.returnid;
    let pool = await sql.connect(configJobData);
    let getReturn = await pool
      .request()
      .input("returnid", sql.NVarChar, returnid.toLowerCase())
      .execute("GetReturn");

    res
      .status(200)
      .json(
        JSON.parse(
          getReturn.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_return = async (req, res) => {
  try {
    const returns = JSON.stringify(req.body);
    const returnid = req.params.returnid;
    let pool = await sql.connect(configJobData);
    let getReturns = await pool
      .request()
      .input("returns", sql.NVarChar, returns)
      .input("returnid", sql.NVarChar, returnid.toLowerCase())
      .execute("PutReturns");

    res.status(200).json({ Returns: getReturns.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//create return
const create_return = async (req, res) => {
  try {
    const returns = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postReturns = await pool
      .request()
      .input("returns", sql.NVarChar, returns)
      .execute("PostReturns");

    res.status(201).json({ Returns: postReturns.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//deactivate return
const delete_return = async (req, res) => {
  try {
    const returnid = req.params.returnid;
    let pool = await sql.connect(configJobData);
    let delReturn = await pool
      .request()
      .input("returnid", sql.NVarChar, returnid.toLowerCase())
      .execute("DeleteReturn");

    res.status(200).json({ Returns: delReturn.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  all_returns,
  one_return,
  update_return,
  create_return,
  delete_return,
};
