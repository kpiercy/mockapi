require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')


const all_jobs = async (req, res, next) => {
  //console.log('dbops_jobs.all_jobs was reached')
  try {
    let pool = await sql.connect(configJobData)
    let job = await pool.request().execute('GetAllJobs')

    res.json(JSON.parse(job.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const all_client_jobs = async (req, res, next) => {
  //console.log('dbops_jobs.all_jobs was reached')
  const clientid = req.params.clientid
  try {
    let pool = await sql.connect(configJobData)
    let job = await pool.request().input('clientid', sql.Int, clientid).execute('GetJobs')

    res.json(JSON.parse(job.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const one_job = async (req, res, next) => {
  const jobid = req.params.jobid
  const clientid = req.params.clientid
  try {
    let pool = await sql.connect(configJobData)
    let job = await pool
      .request()
      .input('jobid', sql.Int, jobid)
      .input('clientid', sql.Int, clientid)
      .execute('GetJob')

    res.json(JSON.parse(job.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const jobs_create = async (req, res, next) => {
  //console.log('dbops_jobs.jobs_create was reached')

  try {
    const jobs = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let insertJob = await pool.request().input('jobs', sql.NVarChar, jobs).execute('PostJobs')

    res
      .status(201)
      .json(JSON.parse(insertJob.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log(err)
  }
}

const jobs_delete = async (req, res, next) => {
  //console.log('dbops_jobs.jobs_delete was reached')

  try {
    const jobid = req.params.jobid
    const clientid = req.params.clientid
    let pool = await sql.connect(configJobData)
    let deleteJob = await pool
      .request()
      .input('jobid', sql.Int, jobid)
      .input('clientid', sql.Int, clientid)
      .execute('DeleteJob')

    res.json({ Jobs: deleteJob.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  all_client_jobs,
  one_job,
  jobs_create,
  jobs_delete,
}
