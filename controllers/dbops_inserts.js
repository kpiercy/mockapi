 require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_inserts = async (req,res) => {
    console.log('dbops_inserts.all_inserts was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const one_insert = async (req,res) => {
    console.log('dbops_inserts.one_insert was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const create_insert = async (req,res) => {
    console.log('dbops_inserts.create_insert was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const delete_insert = async (req,res) => {
    console.log('dbops_inserts.delete_insert was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

module.exports = {
    all_inserts,
    one_insert,
    create_insert,
    delete_insert
}