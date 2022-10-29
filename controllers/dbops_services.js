require("dotenv").config();

const configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const all_services = async (req, res) => {
  try {
    let pool = await sql.connect(configJobData);
    let getServices = await pool
      .request()
      .execute("GetServices");

    res
      .status(200)
      .json(
        JSON.parse(
          getServices.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const one_service = async (req, res) => {
  try {
    const serviceid = req.params.serviceid;
    let pool = await sql.connect(configJobData);
    let getService = await pool
      .request()
      .input("serviceid", sql.NVarChar, serviceid.toLowerCase())
      .execute("GetService");

    res
      .status(200)
      .json(
        JSON.parse(
          getService.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_service = async (req, res) => {
  try {
    const services = JSON.stringify(req.body);
    const serviceid = req.params.serviceid;
    let pool = await sql.connect(configJobData);
    let putServices = await pool
      .request()
      .input("services", sql.NVarChar, services)
      .input("serviceid", sql.NVarChar, serviceid.toLowerCase())
      .execute("PutServices");

    res.status(200).json(putServices.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//create service
const create_service = async (req, res) => {
  try {
    const services = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postServices = await pool
      .request()
      .input("services", sql.NVarChar, services)
      .execute("PostServices");

    res.status(201).json(postServices.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//deactivate service
const delete_service = async (req, res) => {
  try {
    const serviceid = req.params.serviceid;
    let pool = await sql.connect(configJobData);
    let delService = await pool
      .request()
      .input("serviceid", sql.NVarChar, serviceid.toLowerCase())
      .execute("DeleteService");

    res.status(200).json(delService.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  all_services,
  one_service,
  update_service,
  create_service,
  delete_service,
};
