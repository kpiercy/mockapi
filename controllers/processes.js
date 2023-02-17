require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//classes
const model = require('../models/process')

const all_processes = async (req, res, next) => {
  req.clientid = req.params.clientid
  req.params.clientid = req.clientid
  let cid = req.params.clientid

  req.jobid = req.params.jobid
  req.params.jobid = req.jobid
  let jid = req.params.jobid

  let pageIt = req.query.paginate

  if (pageIt === 'true') {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    if (cid == null) {
      next(
        ApiError.badRequest(
          'jobid must be specified in either the URL as a query param or in the request body.'
        )
      )
    } else {
      const results = {}

      if (endIndex < model.length) {
        let nextPage = page + 1
        results.next =
          `${baseUrl.url}/clients/${cid}/jobs/${jid}/processes?paginate=true&page=${nextPage}&limit=${limit}`
      }
      if (startIndex > 0) {
        let prevPage = page - 1
        results.previous = 
          `${baseUrl.url}/clients/${cid}/jobs/${jid}/processes?paginate=true&page=${prevPage}&limit=${limit}`
      }
      try {
        let pool = await sql.connect(configJobData)
        results.data = await pool
          .request()
          .input('startindex', sql.Int, startIndex)
          .input('limit', sql.Int, limit)
          .input('jid', sql.Int, jid)
          .execute('GetPaginatedProcesses')
        res.paginatedResults = results
        //let pricesArray = res.paginatedResults.data.recordset[0]['Prices']

        res.status(200).json({
          Next: res.paginatedResults.next,
          Previous: res.paginatedResults.previous,
          Processes: res.paginatedResults.data.recordset,
          //Prices: JSON.parse(pricesArray)
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
      let getProcesses = await pool
        .request()
        .input('jobid', sql.Int, jobid)
        .execute('GetProcesses')

      res
        .status(200)
        .json(JSON.parse(getProcesses.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    } catch (err) {
      next(ApiError.internal(err))
      console.log({ Error: err.message })
    }
  }
}

const one_process = async (req, res, next) => {
  try {
    const processid = req.params.processid
    let pool = await sql.connect(configJobData)
    let getProcess = await pool
      .request()
      .input('processid', sql.Int, processid)
      .execute('GetProcess')

    res
      .status(200)
      .json(JSON.parse(getProcess.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_process = async (req, res, next) => {
  try {
    const processes = JSON.stringify(req.body)
    const processid = req.params.processid
    let pool = await sql.connect(configJobData)
    let putProcesses = await pool
      .request()
      .input('processes', sql.NVarChar, processes)
      .input('processid', sql.Int, processid)
      .execute('PutProcesses')

    res.status(200).json({ Processes: putProcesses.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//create processe
const create_processes = async (req, res, next) => {
  try {
    const processes = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postProcesses = await pool
      .request()
      .input('processes', sql.NVarChar, processes)
      .execute('PostProcesses')

    res.status(201).json({ Processes: postProcesses.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//deactivate process
const delete_process = async (req, res, next) => {
  try {
    const processid = req.params.processid
    let pool = await sql.connect(configJobData)
    let delProcess = await pool
      .request()
      .input('processid', sql.Int, processid)
      .execute('DeleteProcess')

    res.status(200).json({ Processes: delProcess.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  all_processes,
  one_process,
  update_process,
  create_processes,
  delete_process,
}
