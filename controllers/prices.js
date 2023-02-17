require('dotenv').config()

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_prices = async (req, res, next) => {
  try {
    const contractid = req.params.contractid
    let pool = await sql.connect(configJobData)
    let getPrices = await pool
      .request()
      .input('contractid', sql.Int, contractid)
      .execute('GetPrices')

    res
      .status(200)
      .json(JSON.parse(getPrices.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const one_price = async (req, res, next) => {
  try {
    const priceid = req.params.priceid
    let pool = await sql.connect(configJobData)
    let getPrice = await pool
      .request()
      .input('priceid', sql.Int, priceid)
      .execute('GetPrice')

    res
      .status(200)
      .json(JSON.parse(getPrice.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_price = async (req, res, next) => {
  try {
    const prices = JSON.stringify(req.body)
    const priceid = req.params.priceid
    let pool = await sql.connect(configJobData)
    let putPrices = await pool
      .request()
      .input('prices', sql.NVarChar, prices)
      .input('priceid', sql.Int, priceid)
      .execute('PutPrices')

    res.status(200).json({ Prices: putPrices.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//create price
const create_price = async (req, res, next) => {
  try {
    const prices = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postPrices = await pool
      .request()
      .input('prices', sql.NVarChar, prices)
      .execute('PostPrices')

    res.status(201).json({ Prices: postPrices.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//deactivate price
const delete_price = async (req, res, next) => {
  try {
    const priceid = req.params.priceid
    let pool = await sql.connect(configJobData)
    let delPrice = await pool
      .request()
      .input('priceid', sql.Int, priceid)
      .execute('DeletePrice')

    res.status(200).json({ Prices: delPrice.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  all_prices,
  one_price,
  update_price,
  create_price,
  delete_price,
}
