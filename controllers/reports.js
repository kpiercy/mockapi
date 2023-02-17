require('dotenv').config()

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//classes
// const model = require("../models/report");

const one_report = async (req, res, next) => {
  try {
    const reportid = req.params.reportid
    let pool = await sql.connect(configJobData)
    let getReport = await pool.request().input('reportid', sql.Int, reportid).execute('GetReport')

    res
      .status(200)
      .json(JSON.parse(getReport.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const delete_report = async (req, res, next) => {
  try {
    const reportid = req.params.reportid
    let pool = await sql.connect(configJobData)
    let deleted = await pool.request().input('reportid', sql.Int, reportid).execute('DeleteReport')

    res.status(200).json({ Reports: deleted.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  one_report,
  delete_report,
}
