require('dotenv').config()

const configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_encounters = async (req,res) => {
    console.log('dbops_encounters.all_encounters was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const one_encounter = async (req,res) => {
    console.log('dbops_encounters.one_encounter was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const create_encounter = async (req,res) => {
    console.log('dbops_encounters.create_encounter was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const delete_encounter = async (req,res) => {
    console.log('dbops_encounters.delete_encounter was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

module.exports = {
    all_encounters,
    one_encounter,
    create_encounter,
    delete_encounter
}