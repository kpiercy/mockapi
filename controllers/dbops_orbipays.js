require('dotenv').config()

const configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_orbipays = async (req,res) => {
     try {
        const jobid = req.params.jobid;
       let pool = await sql.connect(configJobData);
       let getOrbipays = await pool
         .request()
         .input("jobid", sql.NVarChar, jobid.toLowerCase())
         .execute("GetOrbipays");

       res
         .status(200)
         .json(
           JSON.parse(
             getOrbipays.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
           )
         );
     } catch (e) {
       res.status(500).json({ Error: e.message });
       console.log(e);
     }
}

const one_orbipay = async (req,res) => {
        try {
          const orbipayid = req.params.orbipayid;
          let pool = await sql.connect(configJobData);
          let getOrbipay= await pool
            .request()
            .input("orbipayid", sql.NVarChar, orbipayid.toLowerCase())
            .execute("GetOrbipay");

          res
            .status(200)
            .json(
              JSON.parse(
                getOrbipay.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
              )
            );
        } catch (e) {
          res.status(500).json({ Error: e.message });
          console.log(e);
        }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_orbipay = async (req, res) => {
      try {
        const orbipayid = req.params.orbipayid
        const orbipays = JSON.stringify(req.body);
        let pool = await sql.connect(configJobData);
        let putOrbi = await pool
          .request()
          .input("orbipays", sql.NVarChar, orbipays)
          .input("orbipayid", sql.VarChar, orbipayid.toLowerCase())
          .execute("PutOrbipays");

        res.status(200).json({ Orbipays: putOrbi.recordset });
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

        res.status(201).json({ Orbipays: postOrbi.recordset });
    } catch (e) {
        res.status(500).json({ Error: e.message });
        console.log(e);
    }
}

const delete_orbipay = async (req,res) => {
    try {
      const orbipayid = req.params.orbipayid;
      let pool = await sql.connect(configJobData);
      let deleted = await pool
        .request()
        .input("orbipayid", sql.VarChar, orbipayid.toLowerCase())
        .execute("DeleteOrbipay");

      res.status(200).json({ Orbipays: deleted.recordset });
    } catch (e) {
      res.status(500).json({ Error: e.message });
      console.log(e);
    }
}

module.exports = {
    all_orbipays,
    one_orbipay,
    create_orbipay,
    delete_orbipay,
    update_orbipay
}