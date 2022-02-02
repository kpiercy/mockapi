require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_downloads = async (req,res) => {
    console.log('dbops_downloads.all_downloads was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const one_download = async (req,res) => {
    console.log('dbops_downloads.one_download was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const create_download = async (req,res) => {
    console.log('dbops_downloads.create_download was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const delete_download = async (req,res) => {
    console.log('dbops_downloads.delete_download was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

module.exports = {
    all_downloads,
    one_download,
    create_download,
    delete_download
}