require("dotenv").config();

var configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const all_prices = async (req, res) => {
  try {
    const jobid = req.params.jobid;
    let pool = await sql.connect(configJobData);
    let getPrices = await pool
      .request()
      .input("jobid", sql.NVarChar, jobid.toLowerCase())
      .execute("GetPrices");

    res
      .status(200)
      .json(
        JSON.parse(
          getPrices.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const one_price = async (req, res) => {
  try {
    const priceid = req.params.priceid;
    let pool = await sql.connect(configJobData);
    let getPrice = await pool
      .request()
      .input("priceid", sql.NVarChar, priceid.toLowerCase())
      .execute("GetPrice");

    res
      .status(200)
      .json(
        JSON.parse(
          getPrice.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_price = async (req, res) => {
  try {
    const prices = JSON.stringify(req.body);
    const priceid = req.params.priceid;
    let pool = await sql.connect(configJobData);
    let putPrices = await pool
      .request()
      .input("prices", sql.NVarChar, prices)
      .input("priceid", sql.NVarChar, priceid.toLowerCase())
      .execute("PutPrices");

    res.status(200).json(putPrices.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//create price
const create_price = async (req, res) => {
  try {
    const prices = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postPrices = await pool
      .request()
      .input("prices", sql.NVarChar, prices)
      .execute("PostPrices");

    res.status(200).json(postPrices.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//deactivate price
const delete_price = async (req, res) => {
  try {
    const priceid = req.params.priceid;
    let pool = await sql.connect(configJobData);
    let delPrice = await pool
      .request()
      .input("priceid", sql.NVarChar, priceid.toLowerCase())
      .execute("DeletePrice");

    res.status(200).json(delPrice.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  all_prices,
  one_price,
  update_price,
  create_price,
  delete_price,
};
