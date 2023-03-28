require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const https = require('https')

//create invoice
const create_invoice = async (req, res, next) => {
  try {
    const invoices = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postInvoices = await pool
      .request()
      .input('invoices', sql.NVarChar, invoices)
      .execute('PostInvoices')

    res.status(201).json({ Invoices: postInvoices.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const all_invoices = async (req, res, next) => {
  try {
    const clientid = req.params.clientid
    let pool = await sql.connect(configJobData)
    let getInvoices = await pool
      .request()
      .input('clientid', sql.Int, clientid)
      .execute('GetInvoices')

    res
      .status(200)
      .json(JSON.parse(getInvoices.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const one_invoice = async (req, res, next) => {
  try {
    const invoiceid = req.params.invoiceid
    let pool = await sql.connect(configJobData)
    let getInvoice = await pool
      .request()
      .input('invoiceid', sql.Int, invoiceid)
      .execute('GetInvoice')

    res
      .status(200)
      .json(JSON.parse(getInvoice.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_invoice = async (req, res, next) => {
  try {
    const invoices = JSON.stringify(req.body)
    const invoiceid = req.params.invoiceid
    let pool = await sql.connect(configJobData)
    let getInvoices = await pool
      .request()
      .input('invoices', sql.NVarChar, invoices)
      .input('invoiceid', sql.Int, invoiceid)
      .execute('PutInvoices')

    res.status(200).json({ Invoices: getInvoices.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//deactivate invoice
const delete_invoice = async (req, res, next) => {
  try {
    const invoiceid = req.params.invoiceid
    let pool = await sql.connect(configJobData)
    let delInvoice = await pool
      .request()
      .input('invoiceid', sql.Int, invoiceid)
      .execute('DeleteInvoice')

    res.status(200).json({ Invoices: delInvoice.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const getSageInv = async(req, res, next) => {
  //build URL from internally stored vars
  const url = 'builtURL'
  https.get(url, (response, next) => {
    console.log(response)
  })
}

module.exports = {
  all_invoices,
  one_invoice,
  update_invoice,
  create_invoice,
  delete_invoice,
}
