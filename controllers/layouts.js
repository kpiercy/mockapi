require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//classes
// const model = require('../models/layout')

// const all_layouts = async (req, res, next) => {
//   req.clientid = req.params.clientid
//   req.params.clientid = req.clientid
//   let cid = req.params.clientid

//   req.jobid = req.params.jobid
//   req.params.jobid = req.jobid
//   let jid = req.params.jobid

//   req.facilityid = req.params.facilityid
//   req.params.facilityid = req.facilityid
//   let fid = req.params.facilityid

//   req.specid = req.params.specid
//   req.params.specid = req.specid
//   let sid = req.params.specid

//   let pageIt = req.query.paginate

//   if (pageIt === 'true') {
//     const page = parseInt(req.query.page)
//     const limit = parseInt(req.query.limit)
//     const startIndex = (page - 1) * limit
//     const endIndex = page * limit

//     if (jid == null) {
//       next(
//         ApiError.badRequest(
//           'jobid must be layoutified in either the URL as a query param or in the request body.'
//         )
//       )
//     } else {
//       const results = {}

//       if (endIndex < model.length) {
//         let nextPage = page + 1
//         results.next = 
//           `${baseUrl.url}/clients/${cid}/jobs/${jid}/facilities/${fid}/specs/${sid}/layouts?paginate=true&page=${nextPage}&limit=${limit}`
//       }
//       if (startIndex > 0) {
//         let prevPage = page - 1
//         results.previous = 
//           `${baseUrl.url}/clients/${cid}/jobs/${jid}/facilities/${fid}/specs/${sid}/layouts?paginate=true&page=${prevPage}&limit=${limit}`
//       }
//       try {
//         let pool = await sql.connect(configJobData)
//         results.data = await pool
//           .request()
//           .input('startindex', sql.Int, startIndex)
//           .input('limit', sql.Int, limit)
//           .input('jid', sql.Int, jid)
//           .execute('GetPaginatedLayouts')
//         res.paginatedResults = results
//         res.status(200).json({
//           Next: res.paginatedResults.next,
//           Previous: res.paginatedResults.previous,
//           Layouts: res.paginatedResults.data.recordset,
//         })
//         //res.paginatedResults
//       } catch (err) {
//         console.log({ Error: err.message })
//         next(ApiError.internal(err))
//       }
//     }
//   } else {
//     try {
//       const jobid = req.params.jobid
//       let pool = await sql.connect(configJobData)
//       let getLayouts = await pool
//         .request()
//         .input('jobid', sql.Int, jobid)
//         .execute('GetLayouts')

//       res
//         .status(200)
//         .json(JSON.parse(getLayouts.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
//     } catch (err) {
//       next(ApiError.internal(err))
//       console.log({ Error: err.message })
//     }
//   }
// }

const one_layout = async (req, res, next) => {
  try {
    const layoutid = req.params.layoutid
    let pool = await sql.connect(configJobData)
    let getLayout = await pool
      .request()
      .input('layoutid', sql.Int, layoutid)
      .execute('GetLayout')

    res
      .status(200)
      .json(JSON.parse(getLayout.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const create_layout = async (req, res, next) => {
  try {
    const layouts = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postLayout = await pool
      .request()
      .input('layouts', sql.NVarChar, layouts)
      .execute('PostLayouts')

    res.status(201).json({ Layouts: postLayout.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const update_layout = async (req, res, next) => {
  try {
    const layoutid = req.params.layoutid
    const layouts = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let putLayout = await pool
      .request()
      .input('layouts', sql.NVarChar, layouts)
      .input('layoutid', sql.Int, layoutid)
      .execute('PutLayouts')

    res.status(200).json({ Layouts: putLayout.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const delete_layout = async (req, res, next) => {
  try {
    const layoutid = req.params.layoutid
    let pool = await sql.connect(configJobData)
    let deleted = await pool
      .request()
      .input('layoutid', sql.Int, layoutid)
      .execute('DeleteLayout')

    res.status(200).json({ Layouts: deleted.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  //all_layouts,
  one_layout,
  create_layout,
  update_layout,
  delete_layout,
}
