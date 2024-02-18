require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql')

//classes
// const model = require("../models/change");

const all_changes = async (req, res, next) => {
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
            'jobid must be changeified in either the URL as a query param or in the request body.'
          )
        )
    } else {
      const results = {}

      if (endIndex < model.length) {
        let nextPage = page + 1
        results.next =
            `${baseUrl.url}/clients/${cid}/jobs/${jid}/changes?paginate=true&page=${nextPage}&limit=${limit}`
      }
      if (startIndex > 0) {
        let prevPage = page - 1
        results.previous = 
            `${baseUrl.url}/clients/${cid}/jobs/${jid}/changes?paginate=true&page=${prevPage}&limit=${limit}`
      }
      try {
        let pool = await sql.connect(configJobData)
        results.data = await pool
          .request()
          .input('startindex', sql.Int, startIndex)
          .input('limit', sql.Int, limit)
          .input('jid', sql.Int, jid)
          .execute('GetPaginatedChanges')
        res.paginatedResults = results
        res.status(200).json({
          Next: res.paginatedResults.next,
          Previous: res.paginatedResults.previous,
          Changes: res.paginatedResults.data.recordset,
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
      let getChanges = await pool
        .request()
        .input('jobid', sql.Int, jobid)
        .execute('GetChanges')

      res
        .status(200)
        .json(JSON.parse(getChanges.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    } catch (err) {
      next(ApiError.internal(err))
      console.log({ Error: err.message })
    }
  }
}

const one_change = async (req, res, next) => {
  try {
    const changeid = req.params.changeid
    let pool = await sql.connect(configJobData)
    let getChange = await pool.request().input('changeid', sql.Int, changeid).execute('GetChange')

    res
      .status(200)
      .json(JSON.parse(getChange.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const create_change = async (req, res, next) => {
  try {
    const changes = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postChange = await pool.request().input('changes', sql.NVarChar, changes).execute('PostChanges')

    res.status(201).json({ Changes: postChange.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const update_change = async (req, res, next) => {
  try {
    const changeid = req.params.changeid
    const changes = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let putChange = await pool
      .request()
      .input('changes', sql.NVarChar, changes)
      .input('changeid', sql.Int, changeid)
      .execute('PutChanges')

    res.status(200).json({ Changes: putChange.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const delete_change = async (req, res, next) => {
  try {
    const changeid = req.params.changeid
    let pool = await sql.connect(configJobData)
    let deleted = await pool.request().input('changeid', sql.Int, changeid).execute('DeleteChange')

    res.status(200).json({ Changes: deleted.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  all_changes,
  one_change,
  create_change,
  update_change,
  delete_change,
}
