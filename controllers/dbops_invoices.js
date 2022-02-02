require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_invoices = async (req,res) => {
    console.log('dbops_invoices.all_invoices was reached')
}

const one_invoice = async (req,res) => {
    console.log('dbops_invoices.one_invoice was reached')
    console.log('Invoice id used:'+req.params.jobid)
}

const create_invoice = async (req,res) => {
    console.log('dbops_invoices.create_invoice was reached')
    console.log('Invoice id used:'+req.params.jobid)
}

const delete_invoice = async (req,res) => {
    console.log('dbops_invoices.delete_invoice was reached')
    console.log('Invoice id used:'+req.params.jobid)
}

module.exports = {
    all_invoices,
    one_invoice,
    create_invoice,
    delete_invoice
}