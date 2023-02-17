require('dotenv').config()

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_credits = async (req, res, next) => {
  try {
    const invoiceid = req.params.invoiceid
    let pool = await sql.connect(configJobData)
    let getCredits = await pool
      .request()
      .input('invoiceid', sql.Int, invoiceid)
      .execute('GetCredits')

    res
      .status(200)
      .json(JSON.parse(getCredits.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

const one_credit = async (req, res, next) => {
  try {
    const creditid = req.params.creditid
    let pool = await sql.connect(configJobData)
    let getCredit = await pool
      .request()
      .input('creditid', sql.Int, creditid)
      .execute('GetCredit')

    res
      .status(200)
      .json(JSON.parse(getCredit.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_credit = async (req, res, next) => {
  try {
    const credits = JSON.stringify(req.body)
    const creditid = req.params.creditid
    let pool = await sql.connect(configJobData)
    let getCredits = await pool
      .request()
      .input('credits', sql.NVarChar, credits)
      .input('creditid', sql.Int, creditid)
      .execute('PutCredits')

    res.status(200).json({ Credits: getCredits.recordset })
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

//create credit
const create_credit = async (req, res, next) => {
  try {
    const credits = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postCredits = await pool
      .request()
      .input('credits', sql.NVarChar, credits)
      .execute('PostCredits')

    res.status(201).json({ Credits: postCredits.recordset })
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

//deactivate credit
const delete_credit = async (req, res, next) => {
  try {
    const creditid = req.params.creditid
    let pool = await sql.connect(configJobData)
    let delCredit = await pool
      .request()
      .input('creditid', sql.Int, creditid)
      .execute('DeleteCredit')

    res.status(200).json({ Credits: delCredit.recordset })
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

module.exports = {
  all_credits,
  one_credit,
  update_credit,
  create_credit,
  delete_credit,
}
