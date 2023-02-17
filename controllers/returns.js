require('dotenv').config()

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//classes
const model = require('../models/return')

const all_returns = async (req, res, next) => {
  req.jobid = req.params.jobid
  req.params.jobid = req.jobid
  let jid = req.params.jobid
  req.clientid = req.params.clientid
  req.params.clientid = req.clientid
  let cid = req.params.clientid
  let pageIt = req.query.paginate

  if (pageIt === 'true') {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    if (jid == null) {
      next(
        ApiError.badRequest(
          'jobid must be specified in either the URL as a query param or in the request body.'
        )
      )
    } else {
      const results = {}

      if (endIndex < model.length) {
        let nextPage = page + 1
        results.next = `${baseUrl.url}/clients/${cid}/jobs/${jid}/returns?paginate=true&page=${nextPage}&limit=${limit}`
      }
      if (startIndex > 0) {
        let prevPage = page - 1
        results.previous = `${baseUrl.url}/clients/${cid}/jobs/${jid}/returns?paginate=true&page=${prevPage}&limit=${limit}`
      }
      try {
        let pool = await sql.connect(configJobData)
        results.data = await pool
          .request()
          .input('startindex', sql.Int, startIndex)
          .input('limit', sql.Int, limit)
          .input('jid', sql.Int, jid)
          .execute('GetPaginatedReturns')
        res.paginatedResults = results
        res.status(200).json({
          Next: res.paginatedResults.next,
          Previous: res.paginatedResults.previous,
          Returns: res.paginatedResults.data.recordset,
        })
        //res.paginatedResults
      } catch (err) {
        console.log({ Error: err.message })
        next(ApiError.internal(err))
      }
    }
  } else {
    try {
      const jobid = req.params.jobid
      let pool = await sql.connect(configJobData)
      let getReturns = await pool.request().input('jobid', sql.Int, jobid).execute('GetReturns')

      res
        .status(200)
        .json(JSON.parse(getReturns.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    } catch (err) {
      next(ApiError.internal(err))
      console.log({ Error: err.message })
    }
  }
}

const one_return = async (req, res, next) => {
  try {
    const returnid = req.params.returnid
    let pool = await sql.connect(configJobData)
    let getReturn = await pool.request().input('returnid', sql.Int, returnid).execute('GetReturn')

    res
      .status(200)
      .json(JSON.parse(getReturn.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_return = async (req, res, next) => {
  try {
    const returns = JSON.stringify(req.body)
    const returnid = req.params.returnid
    let pool = await sql.connect(configJobData)
    let getReturns = await pool
      .request()
      .input('returns', sql.NVarChar, returns)
      .input('returnid', sql.Int, returnid)
      .execute('PutReturns')

    res.status(200).json({ Returns: getReturns.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//create return
const create_return = async (req, res, next) => {
  try {
    const returns = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postReturns = await pool
      .request()
      .input('returns', sql.NVarChar, returns)
      .execute('PostReturns')

    res.status(201).json({ Returns: postReturns.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//deactivate return
const delete_return = async (req, res, next) => {
  try {
    const returnid = req.params.returnid
    let pool = await sql.connect(configJobData)
    let delReturn = await pool
      .request()
      .input('returnid', sql.Int, returnid)
      .execute('DeleteReturn')

    res.status(200).json({ Returns: delReturn.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  all_returns,
  one_return,
  update_return,
  create_return,
  delete_return,
}
