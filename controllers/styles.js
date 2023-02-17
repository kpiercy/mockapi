require('dotenv').config()

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')

//classes
// const model = require("../models/style");

// const all_styles = async (req, res, next) => {
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
//             "jobid must be styleified in either the URL as a query param or in the request body.",
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
//           "/styles?paginate=true&page=" +
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
//           "/styles?paginate=true&page=" +
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
//           .execute("GetPaginatedStyles");
//         res.paginatedResults = results;
//         res.status(200).json({
//           Next: res.paginatedResults.next,
//           Previous: res.paginatedResults.previous,
//           Styles: res.paginatedResults.data.recordset,
//         });
//         //res.paginatedResults
//       } catch (err) {
//         console.log({ Error: err.message });
//         next(ApiError.internal(err))
//       }
//     }
//   } else {
//     try {
//       const jobid = req.params.jobid;
//       let pool = await sql.connect(configJobData);
//       let getStyles = await pool
//         .request()
//         .input("jobid", sql.NVarChar, jobid.toLowerCase())
//         .execute("GetStyles");

//       res
//         .status(200)
//         .json(
//           JSON.parse(
//             getStyles.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
//           )
//         );
//     } catch (err) {
//       next(ApiError.internal(err))
//       console.log({ Error: err.message });
//     }
//   }
// };

const one_style = async (req, res, next) => {
  try {
    const styleid = req.params.styleid
    let pool = await sql.connect(configJobData)
    let getStyle = await pool.request().input('styleid', sql.Int, styleid).execute('GetStyle')

    res
      .status(200)
      .json(JSON.parse(getStyle.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const create_style = async (req, res, next) => {
  try {
    const styles = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let postStyle = await pool.request().input('styles', sql.NVarChar, styles).execute('PostStyles')

    res.status(201).json({ Styles: postStyle.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const update_style = async (req, res, next) => {
  try {
    const styleid = req.params.styleid
    const styles = JSON.stringify(req.body)
    let pool = await sql.connect(configJobData)
    let putStyle = await pool
      .request()
      .input('styles', sql.NVarChar, styles)
      .input('styleid', sql.Int, styleid)
      .execute('PutStyles')

    res.status(200).json({ Styles: putStyle.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

const delete_style = async (req, res, next) => {
  try {
    const styleid = req.params.styleid
    let pool = await sql.connect(configJobData)
    let deleted = await pool.request().input('styleid', sql.Int, styleid).execute('DeleteStyle')

    res.status(200).json({ Styles: deleted.recordset })
  } catch (err) {
    next(ApiError.internal(err))
    console.log({ Error: err.message })
  }
}

module.exports = {
  //all_styles,
  one_style,
  create_style,
  update_style,
  delete_style,
}
