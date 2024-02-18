require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql')

//classes
const model = require('../models/order')

//get all orders for client by jobid
const all_orders = async (req, res, next) => {
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
        results.next = `${baseUrl.url}/clients/${cid}/jobs/${jid}/orders?paginate=true&page=${nextPage}&limit=${limit}`
      }
      if (startIndex > 0) {
        let prevPage = page - 1
        results.previous = `${baseUrl.url}/clients/${cid}/jobs/${jid}/orders?paginate=true&page=${prevPage}&limit=${limit}`
      }
      try {
        let pool = await sql.connect(configJobData)
        results.data = await pool
          .request()
          .input('startindex', sql.Int, startIndex)
          .input('limit', sql.Int, limit)
          .input('jid', sql.Int, jid)
          .execute('GetPaginatedOrders')
        res.paginatedResults = results
        res.status(200).json({
          Next: res.paginatedResults.next,
          Previous: res.paginatedResults.previous,
          Orders: res.paginatedResults.data.recordset,
        })
        //res.paginatedResults
      } catch (err) {
        console.log({ Error: err.message })
        next(ApiError.internal(err))
      }
    }
  } else {
    try {
      const clientid = req.params.clientid
      let pool = await sql.connect(configJobData)
      let getOrders = await pool.request().input('clientid', sql.Int, clientid).execute('GetOrders')

      res
        .status(200)
        .json(JSON.parse(getOrders.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    } catch (err) {
      next(ApiError.internal(err))
      console.log({ Error: err.message })
    }
  }
}

//get one order by orderid
const one_order = async (req, res, next) => {
  try {
    const orderid = req.params.orderid
    let pool = await sql.connect(configJobData)
    let getOrder = await pool
      .request()
      .input('orderid', sql.Int, orderid)
      .execute('GetOrder')

    res
      .status(200)
      .json(JSON.parse(getOrder.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_order = async (req, res, next) => {
  try {
    const orders = JSON.stringify(req.body)
    const orderid = req.params.orderid
    let pool = await sql.connect(configJobData)
    let putOrder = await pool
      .request()
      .input('orders', sql.NVarChar, orders)
      .input('orderid', sql.Int, orderid)
      .execute('PutOrder')

    res.status(200).json({ Orders: putOrder.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//create order
const create_order = async (req, res, next) => {
  try {
    const orders = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postOrders = await pool
      .request()
      .input('orders', sql.NVarChar, orders)
      .execute('PostOrders')

    res.status(201).json({ Orders: postOrders.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

//deactivate order
const delete_order = async (req, res, next) => {
  try {
    const orderid = req.params.orderid
    let pool = await sql.connect(configJobData)
    let delOrder = await pool
      .request()
      .input('orderid', sql.Int, orderid)
      .execute('DeleteOrder')

    res.status(200).json({ Orders: delOrder.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  all_orders,
  one_order,
  update_order,
  create_order,
  delete_order,
}
