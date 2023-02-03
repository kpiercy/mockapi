require("dotenv").config();

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//classes
// const model = require("../models/group");

// const all_groups = async (req, res) => {
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
//             "jobid must be groupified in either the URL as a query param or in the request body.",
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
//           "/groups?paginate=true&page=" +
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
//           "/groups?paginate=true&page=" +
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
//           .execute("GetPaginatedGroups");
//         res.paginatedResults = results;
//         res.status(200).json({
//           Next: res.paginatedResults.next,
//           Previous: res.paginatedResults.previous,
//           Groups: res.paginatedResults.data.recordset,
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
//       let getGroups = await pool
//         .request()
//         .input("jobid", sql.NVarChar, jobid.toLowerCase())
//         .execute("GetGroups");

//       res
//         .status(200)
//         .json(
//           JSON.parse(
//             getGroups.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
//           )
//         );
//     } catch (e) {
//       res.status(500).json({ Error: e.message });
//       console.log(e);
//     }
//   }
// };

const one_group = async (req, res) => {
  try {
    const groupid = req.params.groupid;
    let pool = await sql.connect(configJobData);
    let getGroup = await pool
      .request()
      .input("groupid", sql.NVarChar, groupid.toLowerCase())
      .execute("GetGroup");

    res
      .status(200)
      .json(
        JSON.parse(
          getGroup.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const create_group = async (req, res) => {
  try {
    const groups = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postGroup = await pool
      .request()
      .input("groups", sql.NVarChar, groups)
      .execute("PostGroups");

    res.status(201).json({ Groups: postGroup.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const update_group = async (req, res) => {
  try {
    const groupid = req.params.groupid;
    const groups = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let putGroup = await pool
      .request()
      .input("groups", sql.NVarChar, groups)
      .input("groupid", sql.VarChar, groupid.toLowerCase())
      .execute("PutGroups");

    res.status(200).json({ Groups: putGroup.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const delete_group = async (req, res) => {
  try {
    const groupid = req.params.groupid;
    let pool = await sql.connect(configJobData);
    let deleted = await pool
      .request()
      .input("groupid", sql.VarChar, groupid.toLowerCase())
      .execute("DeleteGroup");

    res.status(200).json({ Groups: deleted.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  //all_groups,
  one_group,
  create_group,
  update_group,
  delete_group,
};
