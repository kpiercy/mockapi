require('dotenv').config()

const configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const all_downloads = async (req,res) => {
     try {
      const jobid = req.params.jobid;
       let pool = await sql.connect(configJobData);
       let getDLs = await pool
         .request()
         .input("jobid", sql.NVarChar, jobid.toLowerCase())
         .execute("GetDownloads");

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
      const downloadid = req.params.downloadid;
      let pool = await sql.connect(configJobData);
      let getDL = await pool
        .request()
        .input("downloadid", sql.NVarChar, downloadid.toLowerCase())
        .execute("GetDownload");

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
           .input("downloads", sql.NVarChar, downloads)
           .execute("PostDownloads");

         res
           .status(201)
           .json(
               { Downloads: postDL.recordset }
           );
       } catch (e) {
         res.status(500).json({ Error: e.message });
         console.log(e);
       }
}

const update_download = async (req, res) => {
  try {
    const downloadid = req.params.downloadid;
    const downloads = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let putDL = await pool
      .request()
      .input("downloads", sql.NVarChar, downloads)
      .input("downloadid", sql.VarChar, downloadid.toLowerCase())
      .execute("PutDownloads");

    res.status(200).json({ Downloads: putDL.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const delete_download = async (req,res) => {

    try{
      const downloadid = req.params.downloadid
        let pool = await sql.connect(configJobData);
        let deleted = await pool.request()
            .input('downloadid', sql.VarChar, downloadid.toLowerCase())
            .execute('DeleteDownload')
    
        res.status(200).json({ Downloads: deleted.recordset })
    } catch (e){
        res.status(500).json({ Error: e.message })
        console.log(e);
    }
}

module.exports = {
    all_downloads,
    one_download,
    create_download,
    update_download,
    delete_download
}