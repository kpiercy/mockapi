require("dotenv").config();

const configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//classes
// const model = require("../classes/layout");

// const all_layouts = async (req, res) => {
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
//             "jobid must be layoutified in either the URL as a query param or in the request body.",
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
//           "/layouts?paginate=true&page=" +
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
//           "/layouts?paginate=true&page=" +
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
//           .execute("GetPaginatedLayouts");
//         res.paginatedResults = results;
//         res.status(200).json({
//           Next: res.paginatedResults.next,
//           Previous: res.paginatedResults.previous,
//           Layouts: res.paginatedResults.data.recordset,
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
//       let getLayouts = await pool
//         .request()
//         .input("jobid", sql.NVarChar, jobid.toLowerCase())
//         .execute("GetLayouts");

//       res
//         .status(200)
//         .json(
//           JSON.parse(
//             getLayouts.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
//           )
//         );
//     } catch (e) {
//       res.status(500).json({ Error: e.message });
//       console.log(e);
//     }
//   }
// };

const one_layout = async (req, res) => {
  try {
    const layoutid = req.params.layoutid;
    let pool = await sql.connect(configJobData);
    let getLayout = await pool
      .request()
      .input("layoutid", sql.NVarChar, layoutid.toLowerCase())
      .execute("GetLayout");

    res
      .status(200)
      .json(
        JSON.parse(
          getLayout.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const create_layout = async (req, res) => {
  try {
    const layouts = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postLayout = await pool
      .request()
      .input("layouts", sql.NVarChar, layouts)
      .execute("PostLayouts");

    res.status(201).json({ Layouts: postLayout.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const update_layout = async (req, res) => {
  try {
    const layoutid = req.params.layoutid;
    const layouts = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let putLayout = await pool
      .request()
      .input("layouts", sql.NVarChar, layouts)
      .input("layoutid", sql.VarChar, layoutid.toLowerCase())
      .execute("PutLayouts");

    res.status(200).json({ Layouts: putLayout.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const delete_layout = async (req, res) => {
  try {
    const layoutid = req.params.layoutid;
    let pool = await sql.connect(configJobData);
    let deleted = await pool
      .request()
      .input("layoutid", sql.VarChar, layoutid.toLowerCase())
      .execute("DeleteLayout");

    res.status(200).json({ Layouts: deleted.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  //all_layouts,
  one_layout,
  create_layout,
  update_layout,
  delete_layout,
};
