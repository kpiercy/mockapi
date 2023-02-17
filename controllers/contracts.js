require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//classes
const model = require('../models/contract')

const all_contracts = async (req, res, next) => {
  req.clientid = req.params.clientid
  req.params.clientid = req.clientid
  let cid = req.params.clientid
  let pageIt = req.query.paginate

  if (pageIt === 'true') {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    if (cid == null) {
      next(
        ApiError.badRequest(
          'clientid must be specified in either the URL as a query param or in the request body.'
        )
      )
    } else {
      const results = {}

      if (endIndex < model.length) {
        let nextPage = page + 1
        results.next = 
          `${baseUrl.url}/clients/${cid}/contracts?paginate=true&page=${nextPage}&limit=${limit}`
      }
      if (startIndex > 0) {
        let prevPage = page - 1
        results.previous = 
          `${baseUrl.url}/clients/${cid}/contracts?paginate=true&page=${prevPage}&limit=${limit}`
      }
      try {
        let pool = await sql.connect(configJobData)
        results.data = await pool
          .request()
          .input('startindex', sql.Int, startIndex)
          .input('limit', sql.Int, limit)
          .input('cid', sql.Int, cid)
          .execute('GetPaginatedContracts')
        res.paginatedResults = results
        //let pricesArray = res.paginatedResults.data.recordset[0]['Prices']

        res.status(200).json({
          Next: res.paginatedResults.next,
          Previous: res.paginatedResults.previous,
          Contracts: res.paginatedResults.data.recordset,
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
      const clientid = req.params.clientid
      let pool = await sql.connect(configJobData)
      let getContracts = await pool
        .request()
        .input('clientid', sql.Int, clientid)
        .execute('GetContracts')

      res
        .status(200)
        .json(JSON.parse(getContracts.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    } catch (err) {
      console.log({ Error: err.message })
      next(ApiError.internal(err))
    }
  }
}

const one_contract = async (req, res, next) => {
  try {
    const contractid = req.params.contractid
    let pool = await sql.connect(configJobData)
    let getContract = await pool
      .request()
      .input('contractid', sql.Int, contractid)
      .execute('GetContract')

    res
      .status(200)
      .json(JSON.parse(getContract.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_contract = async (req, res, next) => {
  try {
    const contracts = JSON.stringify(req.body)
    const contractid = req.params.contractid
    let pool = await sql.connect(configJobData)
    let getContracts = await pool
      .request()
      .input('contracts', sql.NVarChar, contracts)
      .input('contractid', sql.Int, contractid)
      .execute('PutContracts')

    res.status(200).json({ Contracts: getContracts.recordset })
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

//create contract
const create_contract = async (req, res, next) => {
  try {
    const contracts = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postContracts = await pool
      .request()
      .input('contracts', sql.NVarChar, contracts)
      .execute('PostContracts')

    res
      .status(201)
      .json({
        Contracts: JSON.parse(
          postContracts.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']
        ),
      })
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

//deactivate contract
const delete_contract = async (req, res, next) => {
  try {
    const contractid = req.params.contractid
    let pool = await sql.connect(configJobData)
    let delContract = await pool
      .request()
      .input('contractid', sql.Int, contractid)
      .execute('DeleteContract')

    res.status(200).json({ Contracts: delContract.recordset })
  } catch (err) {
    console.log({ Error: err.message })
    next(ApiError.internal(err))
  }
}

module.exports = {
  all_contracts,
  one_contract,
  update_contract,
  create_contract,
  delete_contract,
}
