require('dotenv').config()

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//classes
const model = require('../models/orbipay')

const all_orbipays = async (req, res, next) => {
  req.jobid = req.params.jobid
  req.params.jobid = req.jobid
  let jid = req.params.jobid

  req.clientid = req.params.clientid
  req.params.clientid = req.clientid
  let cid = req.params.clientid

  let pageIt = req.query.paginate

  if ( pageIt === 'true' ) {
      const page = parseInt(req.query.page)
      const limit = parseInt(req.query.limit)
      const startIndex = (page - 1) * limit
      const endIndex = page * limit

      if (jid == null) {
        next(
          ApiError.badRequest(
            'jobid must be specified in either the URL as a query param or in the request body.'
          )
        )
      } else {
        const results = {};

        if (endIndex < model.length) {
          let nextPage = page + 1;
          results.next =
            `${baseUrl.url}/clients/${cid}/jobs/${jid}/orbipays?paginate=true&page=${nextPage}&limit=${limit}`
        }
        if (startIndex > 0) {
          let prevPage = page - 1;
          results.previous = 
            `${baseUrl.url}/clients/${cid}/jobs/${jid}/orbipays?paginate=true&page=${nextPage}&limit=${limit}`
        }
        try {
          let pool = await sql.connect(configJobData);
          results.data = await pool
            .request()
            .input("startindex", sql.Int, startIndex)
            .input("limit", sql.Int, limit)
            .input("jid", sql.Int, jid)
            .execute("GetPaginatedOrbipays");
          res.paginatedResults = results;
          res
            .status(200)
            .json(
              {
                Next: res.paginatedResults.next,
                Previous: res.paginatedResults.previous,
                Orbipays: res.paginatedResults.data.recordset
              }
            );
          //res.paginatedResults
        } catch (err) {
          console.log({ Error: err.message })
          next(ApiError.internal(err))
        }
      }
  } else {
      try {
        const jobid = req.params.jobid;
       let pool = await sql.connect(configJobData);
       let getOrbipays = await pool
         .request()
         .input("jobid", sql.Int, jobid)
         .execute("GetOrbipays");

       res
         .status(200)
         .json(
           JSON.parse(
             getOrbipays.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
           )
         );
     } catch (err) {
       next(ApiError.internal(err))
       console.log({ Error: err.message })
     }
    }
}

const one_orbipay = async (req, res, next) => {
        try {
          const orbipayid = req.params.orbipayid;
          let pool = await sql.connect(configJobData);
          let getOrbipay= await pool
            .request()
            .input("orbipayid", sql.Int, orbipayid)
            .execute("GetOrbipay");

          res
            .status(200)
            .json(
              JSON.parse(
                getOrbipay.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
              )
            );
        } catch (err) {
          next(ApiError.internal(err))
          console.log({ Error: err.message })
        }
}

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_orbipay = async (req, res, next) => {
      try {
        const orbipayid = req.params.orbipayid
        const orbipays = JSON.stringify(req.body);
        let pool = await sql.connect(configJobData);
        let putOrbi = await pool
          .request()
          .input("orbipays", sql.NVarChar, orbipays)
          .input("orbipayid", sql.Int, orbipayid)
          .execute("PutOrbipays");

        res.status(200).json({ Orbipays: putOrbi.recordset });
      } catch (err) {
        next(ApiError.internal(err))
        console.log({ Error: err.message })
      }
};

const create_orbipay = async (req, res, next) => {
    try {
        const orbipays = JSON.stringify(req.body);
        let pool = await sql.connect(configJobData);
        let postOrbi = await pool
        .request()
        .input("orbipays", sql.NVarChar, orbipays)
        .execute("PostOrbipays");

        res.status(201).json({ Orbipays: postOrbi.recordset });
    } catch (err) {
        next(ApiError.internal(err))
        console.log({ Error: err.message })
    }
}

const delete_orbipay = async (req, res, next) => {
    try {
      const orbipayid = req.params.orbipayid;
      let pool = await sql.connect(configJobData);
      let deleted = await pool
        .request()
        .input("orbipayid", sql.Int, orbipayid)
        .execute("DeleteOrbipay");

      res.status(200).json({ Orbipays: deleted.recordset });
    } catch (err) {
      next(ApiError.internal(err))
      console.log({ Error: err.message })
    }
}

module.exports = {
    all_orbipays,
    one_orbipay,
    create_orbipay,
    delete_orbipay,
    update_orbipay
}