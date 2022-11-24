require('dotenv').config()

const configJobData = require('../config/JobData_dbconfig')
const sql = require('mssql/msnodesqlv8')
//const paginatedResults = require('../middleware/paginate')

//classes
const model = require('../models/client')

const clients_all = async (req, res) => {
    try{
        let pool = await sql.connect(configJobData);
        let clients = await pool.request()
            .execute('GetAllClients')
    res.json(JSON.parse(clients.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    }

    catch (e){
        res.status(500).json({ Error: e.message })
        console.log(e);
    }
}

const clients_client_all = async (req, res) => {
    req.clientid = req.params.clientid
    req.params.clientid = req.clientid
    let cid = req.params.clientid
    let pageIt = req.query.paginate
    
    if ( pageIt === 'true' ) {

      //paginatedResults(model, client, 'Clients2')
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        if (cid.toLowerCase() == null) {
          res
            .status(406)
            .json(
              "Error: clientid must be specified in either the URL as a query param or in the request body."
            );
        } else {
          const results = {};

          if (endIndex < model.length) {
            let nextPage = page + 1;
            results.next =
              "http://localhost:3000/clients/" + cid.toLowerCase() + "?paginate=true&page=" +
              nextPage +
              "&limit=" +
              limit +
              "";
          }
          if (startIndex > 0) {
            let prevPage = page - 1;
            results.previous =
              "http://localhost:3000/clients/" + cid.toLowerCase() + "?paginate=true&page=" +
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
              .input("cid", sql.VarChar, cid.toLowerCase())
              .execute("GetPaginatedClients");
             res.paginatedResults = results;
            res
              .status(200)
              .json(
                {
                  Next: res.paginatedResults.next,
                  Previous: res.paginatedResults.previous,
                  Clients: res.paginatedResults.data.recordset
                }
              );
            res.paginatedResults
          } catch (e) {
            console.log(e);
            res.status(500).json({ Error: e.message });
          }
        }
    }
         else {
        try {
          let pool = await sql.connect(configJobData);
          let client = await pool
            .request()
            .input("cid", sql.VarChar, cid.toLowerCase())
            .execute("GetClient");

          res.json(
            JSON.parse(
              client.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
            )
          ); 
        } catch (e) {
                console.log(e)
                res.status(500).json({ Error: e.message })
        }
    }
}

const clients_create = async (req,res) => {
    const clients = JSON.stringify(req.body)
    try {
        let pool = await sql.connect(configJobData)
        let insertClient = await pool.request()
            .input('clients', sql.NVarChar, clients)
            .execute('PostClients')

        res.status(201).json({Clients: insertClient.recordset})
    }
    catch (e) {
        res.status(500).json({ Error: e.message })
        console.log(e);
    }
}

const clients_delete = async (req,res) => {
    try {
        const clients = req.body.Clients
        if ( clients == null ) res.status(400).json('Please provide at least one client or parent client id')
        const results = {}
            for( let i = 0; i < clients.length; i++ ){
                try {
                    let pool = await sql.connect(configJobData)
                    let revokeClient = await pool.request()
                        .input('client', sql.VarChar, clients[i].clientid)
                        .execute('DeleteClient')
                    Object.assign(results, revokeClient.recordsets)
                }
                catch (e) {
                    res.status(500).json({ Error: e.message })
                    console.log(e);
                }
                res.status(200).json({Clients: results})
             }
    } catch (e) {
        console.log(e)
        res.status(500).json({ Error: e.message })
    } 
}

// const clients_client_mn = async (req,res) => {
//     const clients = JSON.stringify(req.body)
//     try {
//         let pool = await sql.connect(configJobData)
//         let insertClient = await pool.request()
//             .input('clients', sql.NVarChar, clients)
//             .execute('CreateClients')

//         res.status(200).json(insertClient.recordsets)
//     }
//     catch (e) {
//         res.status(500).json({ Error: e.message })
//         console.log(e);
//     }
// }

const update_client = async (req, res) => {
  const clients = JSON.stringify(req.body);
  const clientid = req.params.clientid
  try {
    let pool = await sql.connect(configJobData);
    let updateClient = await pool
      .request()
      .input("clients", sql.NVarChar, clients)
      .input("clientid", sql.NVarChar, clientid.toLowerCase())
      .execute("PutClients");

    res.status(200).json({ Clients: updateClient.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
    clients_all,
    clients_client_all,
    clients_create,
    clients_delete,
    update_client
}

// class ClientController {
//   createClient(req, res) {

//   }
// }

// module.exports = new ClientController();