require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql')

const all_services = async (req, res, next) => {
  try {
    let pool = await sql.connect(configJobData)
    let getServices = await pool.request().execute('GetServices')

    res
      .status(200)
      .json(JSON.parse(getServices.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const one_service = async (req, res, next) => {
  try {
    const serviceid = req.params.serviceid
    let pool = await sql.connect(configJobData)
    let getService = await pool
      .request()
      .input('serviceid', sql.Int, serviceid)
      .execute('GetService')

    res
      .status(200)
      .json(JSON.parse(getService.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_service = async (req, res, next) => {
  try {
    const services = JSON.stringify(req.body)
    const serviceid = req.params.serviceid
    let pool = await sql.connect(configJobData)
    let putServices = await pool
      .request()
      .input('services', sql.NVarChar, services)
      .input('serviceid', sql.Int, serviceid)
      .execute('PutServices')

    res.status(200).json({ Services: putServices.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//create service
const create_service = async (req, res, next) => {
  try {
    const services = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postServices = await pool
      .request()
      .input('services', sql.NVarChar, services)
      .execute('PostServices')

    res.status(201).json({ Services: postServices.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//deactivate service
const delete_service = async (req, res, next) => {
  try {
    const serviceid = req.params.serviceid
    let pool = await sql.connect(configJobData)
    let delService = await pool
      .request()
      .input('serviceid', sql.Int, serviceid)
      .execute('DeleteService')

    res.status(200).json({ Services: delService.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  all_services,
  one_service,
  update_service,
  create_service,
  delete_service,
}
