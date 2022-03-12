require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_contacts = async (req,res) => {
    console.log('dbops_contacts.all_contacts was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const one_contact = async (req,res) => {
    console.log('dbops_contacts.one_contact was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const update_contact = async (req,res) => {
    console.log('dbops_contacts.update_contact was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const create_contact = async (req,res) => {
    console.log('dbops_contacts.create_contact was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const delete_contact = async (req,res) => {
    console.log('dbops_contacts.delete_contact was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

module.exports = {
    all_contacts,
    one_contact,
    update_contact,
    create_contact,
    delete_contact
}