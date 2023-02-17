require('dotenv').config()

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//classes
const model = require('../models/filter')

const all_filters = async (req, res, next) => {
  req.clientid = req.params.clientid
  req.params.clientid = req.clientid
  let cid = req.params.clientid

  req.jobid = req.params.jobid
  req.params.jobid = req.jobid
  let jid = req.params.jobid

  req.facilityid = req.params.facilityid
  req.params.facilityid = req.facilityid
  let fid = req.params.facilityid

  req.specid = req.params.specid
  req.params.specid = req.specid
  let sid = req.params.specid

  let pageIt = req.query.paginate

  if (pageIt === 'true') {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    if (jid == null) {
      next(
        ApiError.badRequest(
          'specid must be specified in either the URL as a query param or in the request body.'
        )
      )
    } else {
      const results = {}

      if (endIndex < model.length) {
        let nextPage = page + 1
        results.next = `${baseUrl.url}/clients/${cid}/jobs/${jid}/facilities/${fid}/specs/${sid}/filters?paginate=true&page=${nextPage}&limit=${limit}`
      }
      if (startIndex > 0) {
        let prevPage = page - 1
        results.previous = `${baseUrl.url}/clients/${cid}/jobs/${jid}/facilities/${fid}/specs/${sid}/filters?paginate=true&page=${prevPage}&limit=${limit}`
      }
      try {
        let pool = await sql.connect(configJobData)
        results.data = await pool
          .request()
          .input('startindex', sql.Int, startIndex)
          .input('limit', sql.Int, limit)
          .input('sid', sql.Int, sid)
          .execute('GetPaginatedFilters')
        res.paginatedResults = results
        res.status(200).json({
          Next: res.paginatedResults.next,
          Previous: res.paginatedResults.previous,
          Filters: res.paginatedResults.data.recordset,
        })
        //res.paginatedResults
      } catch (err) {
        console.log({ Error: err.message })
        next(ApiError.internal(err))
      }
    }
  } else {
    try {
      const specid = req.params.specid
      let pool = await sql.connect(configJobData)
      let getFilters = await pool
        .request()
        .input('specid', sql.Int, specid)
        .execute('GetFilters')

      res
        .status(200)
        .json(JSON.parse(getFilters.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    } catch (err) {
      next(ApiError.internal(err))
      console.log({ Error: err.message })
    }
  }
}

const one_filter = async (req, res, next) => {
  try {
    const filterid = req.params.filterid
    let pool = await sql.connect(configJobData)
    let getFilter = await pool
      .request()
      .input('filterid', sql.Int, filterid)
      .execute('GetFilter')

    res
      .status(200)
      .json(JSON.parse(getFilter.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const create_filter = async (req, res, next) => {
  try {
    const filters = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postFilter = await pool
      .request()
      .input('filters', sql.NVarChar, filters)
      .execute('PostFilters')

    res.status(201).json({ Filters: postFilter.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const update_filter = async (req, res, next) => {
  try {
    const filterid = req.params.filterid
    const filters = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let putFilter = await pool
      .request()
      .input('filters', sql.NVarChar, filters)
      .input('filterid', sql.Int, filterid)
      .execute('PutFilters')

    res.status(200).json({ Filters: putFilter.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const delete_filter = async (req, res, next) => {
  try {
    const filterid = req.params.filterid
    let pool = await sql.connect(configJobData)
    let deleted = await pool
      .request()
      .input('filterid', sql.Int, filterid)
      .execute('DeleteFilter')

    res.status(200).json({ Filters: deleted.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  all_filters,
  one_filter,
  create_filter,
  update_filter,
  delete_filter,
}
