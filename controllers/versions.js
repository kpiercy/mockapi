require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')

const all_versions = async (req, res, next) => {
  console.log('dbops_versions.all_versions was reached')
  console.log('Clientid used: ' + req.params.clientid)
  console.log('Jobid used: ' + req.params.jobid)
}

const one_version = async (req, res, next) => {
  console.log('dbops_versions.one_version was reached')
  console.log('Clientid used: ' + req.params.clientid)
  console.log('Jobid used: ' + req.params.jobid)
}

const create_version = async (req, res, next) => {
  console.log('dbops_versions.create_version was reached')
  console.log('Clientid used: ' + req.params.clientid)
  console.log('Jobid used: ' + req.params.jobid)
}

const delete_version = async (req, res, next) => {
  console.log('dbops_versions.delete_version was reached')
  console.log('Clientid used: ' + req.params.clientid)
  console.log('Jobid used: ' + req.params.jobid)
}

module.exports = {
  all_versions,
  one_version,
  create_version,
  delete_version,
}
