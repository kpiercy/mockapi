require("dotenv").config();

const configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//classes
// const model = require("../classes/filter");

// const all_filters = async (req, res) => {
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
//             "jobid must be filterified in either the URL as a query param or in the request body.",
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
//           "/filters?paginate=true&page=" +
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
//           "/filters?paginate=true&page=" +
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
//           .execute("GetPaginatedFilters");
//         res.paginatedResults = results;
//         res.status(200).json({
//           Next: res.paginatedResults.next,
//           Previous: res.paginatedResults.previous,
//           Filters: res.paginatedResults.data.recordset,
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
//       let getFilters = await pool
//         .request()
//         .input("jobid", sql.NVarChar, jobid.toLowerCase())
//         .execute("GetFilters");

//       res
//         .status(200)
//         .json(
//           JSON.parse(
//             getFilters.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
//           )
//         );
//     } catch (e) {
//       res.status(500).json({ Error: e.message });
//       console.log(e);
//     }
//   }
// };

const one_filter = async (req, res) => {
  try {
    const filterid = req.params.filterid;
    let pool = await sql.connect(configJobData);
    let getFilter = await pool
      .request()
      .input("filterid", sql.NVarChar, filterid.toLowerCase())
      .execute("GetFilter");

    res
      .status(200)
      .json(
        JSON.parse(
          getFilter.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const create_filter = async (req, res) => {
  try {
    const filters = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postFilter = await pool
      .request()
      .input("filters", sql.NVarChar, filters)
      .execute("PostFilters");

    res.status(201).json({ Filters: postFilter.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const update_filter = async (req, res) => {
  try {
    const filterid = req.params.filterid;
    const filters = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let putFilter = await pool
      .request()
      .input("filters", sql.NVarChar, filters)
      .input("filterid", sql.VarChar, filterid.toLowerCase())
      .execute("PutFilters");

    res.status(200).json({ Filters: putFilter.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const delete_filter = async (req, res) => {
  try {
    const filterid = req.params.filterid;
    let pool = await sql.connect(configJobData);
    let deleted = await pool
      .request()
      .input("filterid", sql.VarChar, filterid.toLowerCase())
      .execute("DeleteFilter");

    res.status(200).json({ Filters: deleted.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  //all_filters,
  one_filter,
  create_filter,
  update_filter,
  delete_filter,
};
