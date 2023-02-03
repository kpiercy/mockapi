require('dotenv').config()

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_summaries = async (req,res) => {
    console.log('dbops_summaries.all_summaries was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const one_summary = async (req,res) => {
    console.log('dbops_summaries.one_summary was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const create_summary = async (req,res) => {
    console.log('dbops_summaries.create_summary was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const delete_summary = async (req,res) => {
    console.log('dbops_summaries.delete_summary was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

module.exports = {
    all_summaries,
    one_summary,
    create_summary,
    delete_summary
}