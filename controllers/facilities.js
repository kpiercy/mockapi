require("dotenv").config();

const configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const all_facilities = async (req, res) => {
  try {
    const jobid = req.params.jobid;
    let pool = await sql.connect(configJobData);
    let getFacilities = await pool
      .request()
      .input("jobid", sql.NVarChar, jobid.toLowerCase())
      .execute("GetFacilities");

    res
      .status(200)
      .json(
        JSON.parse(
          getFacilities.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const one_facility = async (req, res) => {
  try {
    const facilityid = req.params.facilityid;
    let pool = await sql.connect(configJobData);
    let getFacility = await pool
      .request()
      .input("facilityid", sql.NVarChar, facilityid.toLowerCase())
      .execute("GetFacility");

    res
      .status(200)
      .json(
        JSON.parse(
          getFacility.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_facility = async (req, res) => {
  try {
    const facilities = JSON.stringify(req.body);
    const facilityid = req.params.facilityid;
    let pool = await sql.connect(configJobData);
    let putFacilities = await pool
      .request()
      .input("facilities", sql.NVarChar, facilities)
      .input("facilityid", sql.NVarChar, facilityid.toLowerCase())
      .execute("PutFacilities");

    res.status(200).json({ Facilities: putFacilities.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//create facility
const create_facility = async (req, res) => {
  try {
    const facilities = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postFacilities = await pool
      .request()
      .input("facilities", sql.NVarChar, facilities)
      .execute("PostFacilities");

    res
      .status(200)
      .json(
        JSON.parse(
          postFacilities.recordset[0][
            "JSON_F52E2B61-18A1-11d1-B105-00805F49916B"
          ]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//deactivate facility
const delete_facility = async (req, res) => {
  try {
    const facilityid = req.params.facilityid;
    let pool = await sql.connect(configJobData);
    let delFacility = await pool
      .request()
      .input("facilityid", sql.NVarChar, facilityid.toLowerCase())
      .execute("DeleteFacility");

    res.status(200).json({ Facilities: delFacility.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  all_facilities,
  one_facility,
  update_facility,
  create_facility,
  delete_facility,
};
