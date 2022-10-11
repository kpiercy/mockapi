require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_downloads = async (req,res) => {

     try {
       let pool = await sql.connect(configJobData);
       let getDLs = await pool
         .request()
         .input("jobid", sql.NVarChar, req.params.jobid)
         .execute("PostDownloads");

       res
         .status(200)
         .json(
           JSON.parse(
             getDLs.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
           )
         );
     } catch (e) {
       res.status(500).json({ Error: e.message });
       console.log(e);
     }
}

const one_download = async (req,res) => {
    
    try {
      let pool = await sql.connect(configJobData);
      let getDL = await pool
        .request()
        .input("downloadid", sql.NVarChar, req.params.downloadid)
        .execute("PostDownloads");

      res
        .status(200)
        .json(
          JSON.parse(
            getDL.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
          )
        );
    } catch (e) {
      res.status(500).json({ Error: e.message });
      console.log(e);
    }
}

const create_download = async (req,res) => {
    
       try {
        const downloads = JSON.stringify(req.body);
         let pool = await sql.connect(configJobData);
         let postDL = await pool
           .request()
           .input("postDL", sql.NVarChar, downloads)
           .execute("PostDownloads");

         res
           .status(200)
           .json(
             JSON.parse(
               postDL.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
             )
           );
       } catch (e) {
         res.status(500).json({ Error: e.message });
         console.log(e);
       }
}

const delete_download = async (req,res) => {

    try{
        let pool = await sql.connect(configJobData);
        let deleted = await pool.request()
            .input('downloadid', sql.VarChar, req.params.downloadid)
            .execute('DeleteDownload')
    
        res.status(200).json(JSON.parse(deleted.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    } catch (e){
        res.status(500).json({ Error: e.message })
        console.log(e);
    }
}

module.exports = {
    all_downloads,
    one_download,
    create_download,
    delete_download
}