require("dotenv").config();

const configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//classes
// const model = require("../models/spec");

const all_specs = async (req, res) => {
  req.jobid = req.params.jobid;
  req.params.jobid = req.jobid;
  req.clientid = req.params.clientid;
  req.params.clientid = req.clientid;
  req.facilityid = req.params.facilityid
  req.params.facilityid = req.facilityid
  try {
      const facilityid = req.params.facilityid;
      let pool = await sql.connect(configJobData);
      let getSpecs = await pool
        .request()
        .input("facilityid", sql.NVarChar, facilityid.toLowerCase())
        .execute("GetSpecs");

      res
        .status(200)
        .json(
          JSON.parse(
            getSpecs.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
          )
        );
    } catch (e) {
      res.status(500).json({ Error: e.message });
      console.log(e);
    }
  };

const one_spec = async (req, res) => {
  try {
    const specid = req.params.specid;
    let pool = await sql.connect(configJobData);
    let getSpec = await pool
      .request()
      .input("specid", sql.NVarChar, specid.toLowerCase())
      .execute("GetSpec");

    res
      .status(200)
      .json(
        JSON.parse(
          getSpec.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const create_spec = async (req, res) => {
  try {
    const specs = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postSpec = await pool
      .request()
      .input("specs", sql.NVarChar, specs)
      .execute("PostSpecs");

    res
      .status(201)
      .json(
        JSON.parse(
          postSpec.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const update_spec = async (req, res) => {
  try {
    const specid = req.params.specid;
    const specs = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let putSpec = await pool
      .request()
      .input("specs", sql.NVarChar, specs)
      .input("specid", sql.VarChar, specid.toLowerCase())
      .execute("PutSpecs");

    res.status(200).json({ Specs: putSpec.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const delete_spec = async (req, res) => {
  try {
    const specid = req.params.specid;
    let pool = await sql.connect(configJobData);
    let deleted = await pool
      .request()
      .input("specid", sql.VarChar, specid.toLowerCase())
      .execute("DeleteSpec");

    res.status(200).json({ Specs: deleted.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  all_specs,
  one_spec,
  create_spec,
  update_spec,
  delete_spec,
};
