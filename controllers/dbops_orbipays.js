require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_orbipays = async (req,res) => {
    console.log('dbops_orbipays.all_orbipays was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const one_orbipay = async (req,res) => {
    console.log('dbops_orbipays.one_orbipay was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_orbipay = async (req, res) => {
      try {
        const orbipayid = req.params.orbipayid
        const orbipays = JSON.stringify(req.body);
        let pool = await sql.connect(configJobData);
        let postOrbi = await pool
          .request()
          .input("orbipays", sql.NVarChar, orbipays)
          .input("orbipayid", sql.VarChar, orbipayid.toLowerCase())
          .execute("PutOrbipays");

        res.status(200).json(postOrbi.recordsets);
      } catch (e) {
        res.status(500).json({ Error: e.message });
        console.log(e);
      }
};

const create_orbipay = async (req,res) => {
    try {
        const orbipays = JSON.stringify(req.body);
        let pool = await sql.connect(configJobData);
        let postOrbi = await pool
        .request()
        .input("orbipays", sql.NVarChar, orbipays)
        .execute("PostOrbipays");

        res.status(200).json(postOrbi.recordsets);
    } catch (e) {
        res.status(500).json({ Error: e.message });
        console.log(e);
    }
}

const delete_orbipay = async (req,res) => {
    console.log('dbops_orbipays.delete_orbipay was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

module.exports = {
    all_orbipays,
    one_orbipay,
    create_orbipay,
    delete_orbipay,
    update_orbipay
}