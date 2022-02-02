require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_patients = async (req,res) => {
    console.log('dbops_patients.all_patients was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const one_patient = async (req,res) => {
    console.log('dbops_patients.one_patient was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const create_patient = async (req,res) => {
    console.log('dbops_patients.create_patient was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const delete_patient = async (req,res) => {
    console.log('dbops_patients.delete_patient was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

module.exports = {
    all_patients,
    one_patient,
    create_patient,
    delete_patient
}