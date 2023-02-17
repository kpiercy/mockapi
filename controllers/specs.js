require('dotenv').config()

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')

//classes
// const model = require("../models/spec");

const all_specs = async (req, res, next) => {
  req.jobid = req.params.jobid
  req.params.jobid = req.jobid
  req.clientid = req.params.clientid
  req.params.clientid = req.clientid
  req.facilityid = req.params.facilityid
  req.params.facilityid = req.facilityid
  try {
    const facilityid = req.params.facilityid
    let pool = await sql.connect(configJobData)
    let getSpecs = await pool.request().input('facilityid', sql.Int, facilityid).execute('GetSpecs')

    res
      .status(200)
      .json(JSON.parse(getSpecs.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const one_spec = async (req, res, next) => {
  try {
    const specid = req.params.specid
    let pool = await sql.connect(configJobData)
    let getSpec = await pool.request().input('specid', sql.Int, specid).execute('GetSpec')

    res
      .status(200)
      .json(JSON.parse(getSpec.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const create_spec = async (req, res, next) => {
  try {
    const specs = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postSpec = await pool.request().input('specs', sql.NVarChar, specs).execute('PostSpecs')

    res
      .status(201)
      .json(JSON.parse(postSpec.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const update_spec = async (req, res, next) => {
  try {
    const specid = req.params.specid
    const specs = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let putSpec = await pool
      .request()
      .input('specs', sql.NVarChar, specs)
      .input('specid', sql.Int, specid)
      .execute('PutSpecs')

    res.status(200).json({ Specs: putSpec.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const delete_spec = async (req, res, next) => {
  try {
    const specid = req.params.specid
    let pool = await sql.connect(configJobData)
    let deleted = await pool.request().input('specid', sql.Int, specid).execute('DeleteSpec')

    res.status(200).json({ Specs: deleted.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  all_specs,
  one_spec,
  create_spec,
  update_spec,
  delete_spec,
}
