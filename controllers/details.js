require('dotenv').config()

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_details = async (req,res) => {
    console.log('dbops_details.all_details was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const one_detail = async (req,res) => {
    console.log('dbops_details.one_detail was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const create_detail = async (req,res) => {
    console.log('dbops_details.create_detail was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const delete_detail = async (req,res) => {
    console.log('dbops_details.delete_detail was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

module.exports = {
    all_details,
    one_detail,
    create_detail,
    delete_detail
}