require("dotenv").config();

var configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const all_contracts = async (req, res) => {
  try {
    const clientid = req.params.clientid;
    let pool = await sql.connect(configJobData);
    let getContracts = await pool
      .request()
      .input("clientid", sql.NVarChar, clientid.toLowerCase())
      .execute("GetContracts");

    res
      .status(200)
      .json(
        JSON.parse(
          getContracts.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const one_contract = async (req, res) => {
  try {
    const contractid = req.params.contractid;
    let pool = await sql.connect(configJobData);
    let getContract = await pool
      .request()
      .input("contractid", sql.NVarChar, contractid.toLowerCase())
      .execute("GetContract");

    res
      .status(200)
      .json(
        JSON.parse(
          getContract.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_contract = async (req, res) => {
  try {
    const contracts = JSON.stringify(req.body);
    const contractid = req.params.contractid;
    let pool = await sql.connect(configJobData);
    let getContracts = await pool
      .request()
      .input("contracts", sql.NVarChar, contracts)
      .input("contractid", sql.NVarChar, contractid.toLowerCase())
      .execute("PutContracts");

    res.status(200).json(getContracts.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//create contract
const create_contract = async (req, res) => {
  try {
    const contracts = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postContracts = await pool
      .request()
      .input("contracts", sql.NVarChar, contracts)
      .execute("PostContracts");

    res.status(201).json(postContracts.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//deactivate contract
const delete_contract = async (req, res) => {
  try {
    const contractid = req.params.contractid;
    let pool = await sql.connect(configJobData);
    let delContract = await pool
      .request()
      .input("contractid", sql.NVarChar, contractid.toLowerCase())
      .execute("DeleteContract");

    res.status(200).json(delContract.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  all_contracts,
  one_contract,
  update_contract,
  create_contract,
  delete_contract,
};
