require('dotenv').config()

const configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')

const all_jobs = async (req,res) => {
    //console.log('dbops_jobs.all_jobs was reached')
    const clientid = req.params.clientid
    try{
        let pool = await sql.connect(configJobData);
        let job = await pool.request()
            .input ('clientid', sql.VarChar, clientid)
            .execute('GetJobs');

        res.json(JSON.parse(job.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']));
        } catch (e) {
            res.status(500).json({ Error: +e.message })
            console.log(e);
    }
}

const one_job = async (req,res) => {
    const jobid = req.params.jobid
    const clientid = req.params.clientid
        try{
            let pool = await sql.connect(configJobData);
            let job = await pool.request()
                .input ('jobid', sql.VarChar, jobid)
                .input ('clientid', sql.VarChar, clientid)
                .execute('GetJob');

            res.json(JSON.parse(job.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']));
            } catch (e) {
                res.status(500).json({ Error: +e.message })
                console.log(e);
        }
}

const jobs_create = async (req,res) => {
    //console.log('dbops_jobs.jobs_create was reached')

      try {
        const jobs = JSON.stringify(req.body);
        let pool = await sql.connect(configJobData);
        let insertJob = await pool
          .request()
          .input("jobs", sql.NVarChar, jobs)
          .execute("PostJobs");

        res.status(201).json(JSON.parse(
            insertJob.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
          )
        );
      } catch (e) {
        res.status(500).json({ Error: e.message });
        console.log(e);
      }
}

const jobs_delete = async (req,res) => {
    //console.log('dbops_jobs.jobs_delete was reached')

    try {
      const jobid = req.params.jobid;
      const clientid = req.params.clientid;
      let pool = await sql.connect(configJobData);
      let deleteJob = await pool
        .request()
        .input("jobid", sql.VarChar, jobid)
        .input("clientid", sql.VarChar, clientid)
        .execute("DeleteJob");

      res.json(
          deleteJob.recordset
      );
    } catch (e) {
      res.status(500).json({ Error: e.message });
      console.log(e);
    }
}

module.exports = {
    all_jobs,
    one_job,
    jobs_create,
    jobs_delete
}