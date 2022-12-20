require("dotenv").config();

const configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//classes
// const model = require("../models/report");

const one_report = async (req, res) => {
  try {
    const reportid = req.params.reportid;
    let pool = await sql.connect(configJobData);
    let getReport = await pool
      .request()
      .input("reportid", sql.NVarChar, reportid.toLowerCase())
      .execute("GetReport");

    res
      .status(200)
      .json(
        JSON.parse(
          getReport.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const delete_report = async (req, res) => {
  try {
    const reportid = req.params.reportid;
    let pool = await sql.connect(configJobData);
    let deleted = await pool
      .request()
      .input("reportid", sql.VarChar, reportid.toLowerCase())
      .execute("DeleteReport");

    res.status(200).json({ Reports: deleted.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  one_report,
  delete_report,
};
