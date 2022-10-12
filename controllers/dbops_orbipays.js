require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_payments = async (req,res) => {
    console.log('dbops_payments.all_payments was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const one_payment = async (req,res) => {
    console.log('dbops_payments.one_payment was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const create_payment = async (req,res) => {
    console.log('dbops_payments.create_payment was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const delete_payment = async (req,res) => {
    console.log('dbops_payments.delete_payment was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

module.exports = {
    all_payments,
    one_payment,
    create_payment,
    delete_payment
}