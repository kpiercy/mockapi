require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_jobs = async (req,res) => {
    console.log('dbops_jobs.all_jobs was reached')
}

const one_job = async (req,res) => {
    console.log('dbops_jobs.one_job was reached')
    console.log('Job id used:'+req.params.jobid)
}

module.exports = {
    all_jobs,
    one_job
}