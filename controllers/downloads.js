require('dotenv').config()

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//classes
const model = require('../models/download')

const all_downloads = async (req,res) => {
  req.jobid = req.params.jobid
  req.params.jobid = req.jobid
  let jid = req.params.jobid
  req.clientid = req.params.clientid
  req.params.clientid = req.clientid
  let cid = req.params.clientid
  let pageIt = req.query.paginate

  if ( pageIt === 'true' ) {
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit)
      const startIndex = (page - 1) * limit
      const endIndex = page * limit

      if (jid.toLowerCase() == null) {
        res
          .status(406)
          .json(
            {Error: "jobid must be specified in either the URL as a query param or in the request body."}
          );
      } else {
        const results = {};

        if (endIndex < model.length) {
          let nextPage = page + 1;
          results.next =
            "http://localhost:5000/clients/" + cid.toLowerCase() + "/jobs/" + jid.toLowerCase() + "/downloads?paginate=true&page=" +
            nextPage +
            "&limit=" +
            limit +
            "";
        }
        if (startIndex > 0) {
          let prevPage = page - 1;
          results.previous =
            "http://localhost:5000/clients/" + cid.toLowerCase() + "/jobs/" + jid.toLowerCase() + "/downloads?paginate=true&page=" +
            prevPage +
            "&limit=" +
            limit +
            "";
        }
        try {
          let pool = await sql.connect(configJobData);
          results.data = await pool
            .request()
            .input("startindex", sql.Int, startIndex)
            .input("limit", sql.Int, limit)
            .input("jid", sql.VarChar, jid.toLowerCase())
            .execute("GetPaginatedDownloads");
          res.paginatedResults = results;
          res
            .status(200)
            .json(
              {
                Next: res.paginatedResults.next,
                Previous: res.paginatedResults.previous,
                Downloads: res.paginatedResults.data.recordset
              }
            );
          //res.paginatedResults
        } catch (e) {
          console.log(e);
          res.status(500).json({ Error: e.message });
        }
      }
  } else {
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