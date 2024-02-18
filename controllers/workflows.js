require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql')

//classes
const model = require('../models/workflow')

const all_workflows = async (req, res, next) => {
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
        results.next = `${baseUrl.url}/clients/${cid}/jobs/${jid}/workflows?paginate=true&page=${nextPage}&limit=${limit}`
      }
      if (startIndex > 0) {
        let prevPage = page - 1
        results.previous = `${baseUrl.url}/clients/${cid}/jobs/${jid}/workflows?paginate=true&page=${prevPage}&limit=${limit}`
      }
      try {
        let pool = await sql.connect(configJobData)
        results.data = await pool
          .request()
          .input('startindex', sql.Int, startIndex)
          .input('limit', sql.Int, limit)
          .input('jid', sql.Int, jid)
          .execute('GetPaginatedWorkflows')
        res.paginatedResults = results
        res.status(200).json({
          Next: res.paginatedResults.next,
          Previous: res.paginatedResults.previous,
          Workflows: res.paginatedResults.data.recordset,
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
      let getDLs = await pool
        .request()
        .input('jobid', sql.NVarChar, jobid.toLowerCase())
        .execute('GetWorkflows')

      res
        .status(200)
        .json(JSON.parse(getDLs.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    } catch (err) {
      next(ApiError.internal(err))
      console.log({ Error: err.message })
    }
  }
}

const one_workflow = async (req, res, next) => {
  try {
    const workflowid = req.params.workflowid
    let pool = await sql.connect(configJobData)
    let getWF = await pool.request().input('workflowid', sql.Int, workflowid).execute('GetWorkflow')

    res
      .status(200)
      .json(JSON.parse(getWF.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const create_workflow = async (req, res, next) => {
  try {
    const workflows = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postDL = await pool
      .request()
      .input('workflows', sql.NVarChar, workflows)
      .execute('PostWorkflows')

    res.status(201).json({ Workflows: postDL.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const update_workflow = async (req, res, next) => {
  try {
    const workflowid = req.params.workflowid
    const workflows = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let putDL = await pool
      .request()
      .input('workflows', sql.NVarChar, workflows)
      .input('workflowid', sql.Int, workflowid)
      .execute('PutWorkflows')

    res.status(200).json({ Workflows: putDL.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const delete_workflow = async (req, res, next) => {
  try {
    const workflowid = req.params.workflowid
    let pool = await sql.connect(configJobData)
    let deleted = await pool
      .request()
      .input('workflowid', sql.Int, workflowid)
      .execute('DeleteWorkflow')

    res.status(200).json({ Workflows: deleted.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  all_workflows,
  one_workflow,
  create_workflow,
  update_workflow,
  delete_workflow,
}
