require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_deposits = async (req, res, next) => {
  try {
    const invoiceid = req.params.invoiceid
    let pool = await sql.connect(configJobData)
    let getDeposits = await pool
      .request()
      .input('invoiceid', sql.Int, invoiceid)
      .execute('GetDeposits')

    res
      .status(200)
      .json(JSON.parse(getDeposits.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

const one_deposit = async (req, res, next) => {
  try {
    const depositid = req.params.depositid
    let pool = await sql.connect(configJobData)
    let getDeposit = await pool
      .request()
      .input('depositid', sql.Int, depositid)
      .execute('GetDeposit')

    res
      .status(200)
      .json(JSON.parse(getDeposit.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_deposit = async (req, res, next) => {
  try {
    const deposits = JSON.stringify(req.body)
    const depositid = req.params.depositid
    let pool = await sql.connect(configJobData)
    let getDeposits = await pool
      .request()
      .input('deposits', sql.NVarChar, deposits)
      .input('depositid', sql.Int, depositid)
      .execute('PutDeposits')

    res.status(200).json({ Deposits: getDeposits.recordset })
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

//create deposit
const create_deposit = async (req, res, next) => {
  try {
    const deposits = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postDeposits = await pool
      .request()
      .input('deposits', sql.NVarChar, deposits)
      .execute('PostDeposits')

    res.status(201).json({ Deposits: postDeposits.recordset })
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

//deactivate deposit
const delete_deposit = async (req, res, next) => {
  try {
    const depositid = req.params.depositid
    let pool = await sql.connect(configJobData)
    let delDeposit = await pool
      .request()
      .input('depositid', sql.Int, depositid)
      .execute('DeleteDeposit')

    res.status(200).json({ Deposits: delDeposit.recordset })
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

module.exports = {
  all_deposits,
  one_deposit,
  update_deposit,
  create_deposit,
  delete_deposit,
}
