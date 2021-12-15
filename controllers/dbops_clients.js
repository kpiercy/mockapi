if ( process.env.ENVIRONMENT !== 'production' ) {
    require('dotenv').config()
}

var configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
const model = require('../models/client')

const clients_all = async (req, res) => {
    try{
        let pool = await sql.connect(configJobData);
        let clients = await pool.request()
            .execute('GetAllClients')
    res.json(JSON.parse(clients.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    }

    catch (error){
        console.log(error);
    }
}

const clients_client_all = async (req, res) => {
    //add query param for paginate=Y/N do additional logic off that for situations where a single client is being queried
    req.clientid = req.params.clientid
    req.params.clientid = req.clientid
    var cid = req.params.clientid

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    if (cid == null) {
        res.status(406).json('Error: clientid must be specified in either the URL as a query param or in the request body.')
    } else {
        const results = {}

        if (endIndex < model.length) {
            var nextPage = page + 1
            results.next = "http://localhost:3000/clients?page=" + nextPage + "&limit=" + limit + ""

        }
        if (startIndex > 0) {
            var prevPage = page - 1
            results.previous = "http://localhost:3000/clients?page=" + prevPage + "&limit=" + limit + ""
        }
        try {
            let pool = await sql.connect(configJobData)
            results.data = await pool.request()
                .input('startindex', sql.Int, startIndex)
                .input('limit', sql.Int, limit)
                .input('cid', sql.VarChar, cid)
                //.input('job', sql.UniqueIdentifier, jid)  //CHANGE GetPaginatedProofs to only retrieve proofs associated to this jobid
                //.input('file', sql.UniqueIdentifier, fid)  //CHANGE GetPaginatedProofs to only retrieve proofs associated to this fileid
                .execute('GetPaginatedClients')
            res.paginatedResults = results
            res.status(200).json(res.paginatedResults)
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}

const clients_create = async (req,res) => {
    const clients = JSON.stringify(req.body)
    try {
        let pool = await sql.connect(configJobData)
        let insertClient = await pool.request()
            .input('clients', sql.NVarChar, clients)
            .execute('CreateClients')

        res.status(200).json(insertClient.recordsets)
    }
    catch (error) {
        console.log(error);
    }
}

const clients_delete = async (req,res) => {
    try {
        const clients = req.body
        if ( clients == null ) res.status(400).json('Please provide at least one client or parent client id')
        const results = {}
            for( let i = 0; i < clients.length; i++ ){
                try {
                    let pool = await sql.connect(configJobData)
                    let revokeClient = await pool.request()
                        .input('client', sql.VarChar, clients[i].clientid)
                        .execute('RevokeClientAccess')
                    console.log(revokeClient.recordsets)
                    Object.assign(results, revokeClient.recordsets)
                }
                catch (error) {
                    console.log(error);
                }
                res.status(200).json(results)
             }
    } catch (error){
        res.status(500).send(error)
    } 
}

const clients_client_mn = async (req,res) => {
    const clients = JSON.stringify(req.body)
    try {
        let pool = await sql.connect(configJobData)
        let insertClient = await pool.request()
            .input('clients', sql.NVarChar, clients)
            .execute('CreateClients')

        res.status(200).json(insertClient.recordsets)
    }
    catch (error) {
        console.log(error);
    }
}



module.exports = {
    clients_client_mn,
    clients_all,
    clients_client_all,
    clients_create,
    clients_delete
}