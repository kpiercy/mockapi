require('dotenv').config()
const sql = require('mssql')
const dboperations = require('../controllers/clients.js')
const ApiError = require("../utils/api-error")
const configJobData = require(`../config/${process.env.NODE_ENV}`)

function paginatedResults( model, cid, tablen ) {
    return async (req, res, next) => {

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page -1) * limit
        const endIndex = page * limit
    
        if( cid == null ) {
            res.status(406).json({ Error: 'clientid must be specified in either the URL as a query param or in the request body.' })
        } else {
        const results = {}
    
        if( endIndex < model.length ) {
            var nextPage = page + 1
        results.next = "http://localhost:5000/clients/"+`${cid}`+"?page="+nextPage+"&limit="+limit+""
            
        }
        if( startIndex > 0) {
            var prevPage = page - 1
        results.previous = "http://localhost:5000/clients/"+`${cid}`+"?page="+prevPage+"&limit="+limit+""
        }
        try{
            let pool = await sql.connect(configJobData)
            results.results = await pool.request()
                .input('startindex', sql.Int, startIndex)
                .input('limit', sql.Int, limit)
                .input('cid', sql.VarChar, cid)
                .input('tablen', sql.VarChar, tablen)
                .execute('GetPaginated')
            res.locals.paginatedResults = results
            console.log(res.locals.paginatedResults)
            
            next()
        } catch (err) {
            next(ApiError.internal(err));
        }
    }
    }
}

module.exports = paginatedResults;