require("dotenv").config();

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//classes
// const model = require("../models/chart");

// const all_charts = async (req, res) => {
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
//             "jobid must be chartified in either the URL as a query param or in the request body.",
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
//           "/charts?paginate=true&page=" +
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
//           "/charts?paginate=true&page=" +
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
//           .execute("GetPaginatedCharts");
//         res.paginatedResults = results;
//         res.status(200).json({
//           Next: res.paginatedResults.next,
//           Previous: res.paginatedResults.previous,
//           Charts: res.paginatedResults.data.recordset,
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
//       let getCharts = await pool
//         .request()
//         .input("jobid", sql.NVarChar, jobid.toLowerCase())
//         .execute("GetCharts");

//       res
//         .status(200)
//         .json(
//           JSON.parse(
//             getCharts.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
//           )
//         );
//     } catch (e) {
//       res.status(500).json({ Error: e.message });
//       console.log(e);
//     }
//   }
// };

const one_chart = async (req, res) => {
  try {
    const chartid = req.params.chartid;
    let pool = await sql.connect(configJobData);
    let getChart = await pool
      .request()
      .input("chartid", sql.NVarChar, chartid.toLowerCase())
      .execute("GetChart");

    res
      .status(200)
      .json(
        JSON.parse(
          getChart.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const create_chart = async (req, res) => {
  try {
    const charts = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postChart = await pool
      .request()
      .input("charts", sql.NVarChar, charts)
      .execute("PostCharts");

    res.status(201).json({ Charts: postChart.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const update_chart = async (req, res) => {
  try {
    const chartid = req.params.chartid;
    const charts = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let putChart = await pool
      .request()
      .input("charts", sql.NVarChar, charts)
      .input("chartid", sql.VarChar, chartid.toLowerCase())
      .execute("PutCharts");

    res.status(200).json({ Charts: putChart.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const delete_chart = async (req, res) => {
  try {
    const chartid = req.params.chartid;
    let pool = await sql.connect(configJobData);
    let deleted = await pool
      .request()
      .input("chartid", sql.VarChar, chartid.toLowerCase())
      .execute("DeleteChart");

    res.status(200).json({ Charts: deleted.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  //all_charts,
  one_chart,
  create_chart,
  update_chart,
  delete_chart,
};
