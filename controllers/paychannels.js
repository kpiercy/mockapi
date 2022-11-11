require("dotenv").config();

const configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//classes
// const model = require("../classes/paychannel");

// const all_paychannels = async (req, res) => {
//   req.jobid = req.params.jobid;
//   req.params.jobid = req.jobid;
//   let jid = req.params.jobid;
//   req.clientid = req.params.clientid;
//   req.params.clientid = req.clientid;
//   let cid = req.params.clientid;
//   let pageIt = req.query.paginate;

//   if (pageIt === "true") {
//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;

//     if (jid.toLowerCase() == null) {
//       res
//         .status(406)
//         .json({
//           Error:
//             "jobid must be paychannelified in either the URL as a query param or in the request body.",
//         });
//     } else {
//       const results = {};

//       if (endIndex < model.length) {
//         let nextPage = page + 1;
//         results.next =
//           "http://localhost:5000/clients/" +
//           cid.toLowerCase() +
//           "/jobs/" +
//           jid.toLowerCase() +
//           "/facilities/" +
//           fid.toLowerCase() +
//           "/paychannels?paginate=true&page=" +
//           nextPage +
//           "&limit=" +
//           limit +
//           "";
//       }
//       if (startIndex > 0) {
//         let prevPage = page - 1;
//         results.previous =
//           "http://localhost:5000/clients/" +
//           cid.toLowerCase() +
//           "/jobs/" +
//           jid.toLowerCase() +
//           "/facilities/" +
//           fid.toLowerCase() +
//           "/paychannels?paginate=true&page=" +
//           prevPage +
//           "&limit=" +
//           limit +
//           "";
//       }
//       try {
//         let pool = await sql.connect(configJobData);
//         results.data = await pool
//           .request()
//           .input("startindex", sql.Int, startIndex)
//           .input("limit", sql.Int, limit)
//           .input("jid", sql.VarChar, jid.toLowerCase())
//           .execute("GetPaginatedPaychannels");
//         res.paginatedResults = results;
//         res.status(200).json({
//           Next: res.paginatedResults.next,
//           Previous: res.paginatedResults.previous,
//           Paychannels: res.paginatedResults.data.recordset,
//         });
//         //res.paginatedResults
//       } catch (e) {
//         console.log(e);
//         res.status(500).json({ Error: e.message });
//       }
//     }
//   } else {
//     try {
//       const jobid = req.params.jobid;
//       let pool = await sql.connect(configJobData);
//       let getPaychannels = await pool
//         .request()
//         .input("jobid", sql.NVarChar, jobid.toLowerCase())
//         .execute("GetPaychannels");

//       res
//         .status(200)
//         .json(
//           JSON.parse(
//             getPaychannels.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
//           )
//         );
//     } catch (e) {
//       res.status(500).json({ Error: e.message });
//       console.log(e);
//     }
//   }
// };

const one_paychannel = async (req, res) => {
  try {
    const paychannelid = req.params.paychannelid;
    let pool = await sql.connect(configJobData);
    let getPaychannel = await pool
      .request()
      .input("paychannelid", sql.NVarChar, paychannelid.toLowerCase())
      .execute("GetPaychannel");

    res
      .status(200)
      .json(
        JSON.parse(
          getPaychannel.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const create_paychannel = async (req, res) => {
  try {
    const paychannels = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postPaychannel = await pool
      .request()
      .input("paychannels", sql.NVarChar, paychannels)
      .execute("PostPaychannels");

    res.status(201).json({ Paychannels: postPaychannel.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const update_paychannel = async (req, res) => {
  try {
    const paychannelid = req.params.paychannelid;
    const paychannels = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let putPaychannel = await pool
      .request()
      .input("paychannels", sql.NVarChar, paychannels)
      .input("paychannelid", sql.VarChar, paychannelid.toLowerCase())
      .execute("PutPaychannels");

    res.status(200).json({ Paychannels: putPaychannel.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const delete_paychannel = async (req, res) => {
  try {
    const paychannelid = req.params.paychannelid;
    let pool = await sql.connect(configJobData);
    let deleted = await pool
      .request()
      .input("paychannelid", sql.VarChar, paychannelid.toLowerCase())
      .execute("DeletePaychannel");

    res.status(200).json({ Paychannels: deleted.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  //all_paychannels,
  one_paychannel,
  create_paychannel,
  update_paychannel,
  delete_paychannel,
};
