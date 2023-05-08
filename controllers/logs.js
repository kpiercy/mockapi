require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const sql = require('mssql/msnodesqlv8')
const ApiError = require('../utils/api-error')
//const paginatedResults = require('../middleware/paginate')

//classes

//controllers


module.exports = {
  find_logs
}
