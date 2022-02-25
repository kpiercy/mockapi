require('dotenv').config()

var configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')

const all_jobs = async (req,res) => {
    console.log('dbops_jobs.all_jobs was reached')
}

const one_job = async (req,res) => {
    const jobid = req.params.jobid
    const clientid = req.params.clientid
    if (Object.keys(req.query).length !== 0) {
        const queries = JSON.stringify(req.query)
        try{
            let pool = await sql.connect(configJobData);
            let job = await pool.request()
                .input ('jobid', sql.VarChar, jobid)
                .input ('clientid', sql.VarChar, clientid)
                .input('queries', sql.NVarChar, queries)
                .execute('GetJob');

            res.json(JSON.parse(job.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']));
            } catch (error) {
                console.log(error);
        } 
    } else {
        //logic for no parameters given, return only Jobs table related info
        const queries = {"planetpress":"false","workorders":"false","automation":"false","alacriti":"false"}
        try{
            let pool = await sql.connect(configJobData);
            let job = await pool.request()
                .input ('jobid', sql.VarChar, jobid)
                .input ('clientid', sql.VarChar, clientid)
                .input('queries', sql.NVarChar, JSON.stringify(queries))
                .execute('GetJob');

            res.json(JSON.parse(job.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']));
            } catch (error) {
                console.log(error);
        }
    }
}

const jobs_create = async (req,res) => {
    console.log('dbops_jobs.jobs_create was reached') 
}

const jobs_delete = async (req,res) => {
    console.log('dbops_jobs.jobs_delete was reached')
    console.log('Job id used:'+req.params.jobid)
}

module.exports = {
    all_jobs,
    one_job,
    jobs_create,
    jobs_delete
}