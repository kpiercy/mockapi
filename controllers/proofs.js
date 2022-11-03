require('dotenv').config()

const configJobData = require('../config/JobData_dbconfig');
const configEliteMaster = require('../config/EliteMaster_dbconfig')
const sql = require('mssql/msnodesqlv8');
const model = require('../classes/proof')


//get single proof by proofid and clientid
const proof_client_getOne = async (req, res) => {
    req.params.clientid = req.clientid
    var cid = req.clientid
    const pid = req.params.proofid
    try {
        let pool = await sql.connect(configJobData);
        let proof = await pool.request()
            .input('pid', sql.VarChar, pid)
            .input('cid', sql.VarChar, cid)
            .execute('GetProof')
        res.json(JSON.parse(proof.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    }
    catch (e) {
        res.status(500).json({ Error: e.message })
        console.log(e);
    }
}

//create one or multiple proofs for given clientid, jobid, fileid
const proof_create = async (req, res) => {
    let proof = req.body
    req.params.clientid = req.clientid
    req.params.jobid = req.jobid
    req.params.fileid = req.fileid
    //req.params.fid = req.fid
    for (let i = 0; i < proof.length; i++) {
        Object.assign(proof[i], { clientid: req.params.clientid, jobid: req.params.jobid, fileid: req.params.fileid })
    }
    const proofs = JSON.stringify(proof)
    try {
        let pool = await sql.connect(configJobData)
        let insertProof = await pool.request()
            .input('proofs', sql.NVarChar, proofs)
            .execute('PostProofs')

        res.status(200).json(insertProof.recordsets)
    }
    catch (e) {
        res.status(500).json({ Error: e.message })
        console.log(e);
    }
}

//update single proof by proofid
const proof_update = async (req, res) => {
    let proofresult = JSON.stringify(req.body)
    try {
        let pool = await sql.connect(configJobData);
        let updateProof = await pool.request()
            .input('proofs', sql.NVarChar, proofresult)
            .execute('PutProof');

        return updateProof.recordsets;
    }
    catch (e) {
        res.status(500).json({ Error: e.message })
        console.log(e);
    }
}

//retrieve all proofs for provided clientid and paginate
const proofs_client_all = async (req, res) => {
    req.params.clientid = req.clientid
    var cid = req.params.clientid

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    if (cid == null) {
        res.status(406).json({ Error: 'clientid must be specified in either the URL as a query param or in the request body.' })
    } else {
        const results = {}

        if (endIndex < model.length) {
            var nextPage = page + 1
            results.next = "http://localhost:3000/clients/jobs/files/proofs?page=" + nextPage + "&limit=" + limit + ""

        }
        if (startIndex > 0) {
            var prevPage = page - 1
            results.previous = "http://localhost:3000/clients/jobs/files/proofs?page=" + prevPage + "&limit=" + limit + ""
        }
        try {
            let pool = await sql.connect(configJobData)
            results.data = await pool.request()
                .input('startindex', sql.Int, startIndex)
                .input('limit', sql.Int, limit)
                .input('cid', sql.VarChar, cid)  //CHANGE GetPaginatedProofs to only retrieve proofs associated to this req users clientid
                //.input('job', sql.UniqueIdentifier, jid)  //CHANGE GetPaginatedProofs to only retrieve proofs associated to this jobid
                //.input('file', sql.UniqueIdentifier, fid)  //CHANGE GetPaginatedProofs to only retrieve proofs associated to this fileid
                .execute('GetPaginatedProofs')
            res.paginatedResults = results
            res
              .status(200)
              .json(
                {
                  Next: res.paginatedResults.next,
                  Previous: res.paginatedResults.previous,
                  Proofs: res.paginatedResults.data.recordset
                }
              )
        } catch (e) {
            console.log(e)
            res.status(500).json({ Error: e.message })
        }
    }
}



module.exports = {
    proof_client_getOne,
    proofs_client_all,
    proof_create,
    proof_update
}