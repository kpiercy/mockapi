require('dotenv').config()
const sql = require('mssql/msnodesqlv8')
const dboperations = require('../services/dbops_proofs')
const configJobData = require('../config/JobData_dbconfig')
const configEliteMaster = require('../config/EliteMaster_dbconfig')
const model = require('../models/proof')

function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page -1) * limit
        const endIndex = page * limit
    
        const results = {}
    
        if( endIndex < model.length ) {
            var nextPage = page + 1
        results.next = "http://localhost:3000/proofs?page="+nextPage+"&limit="+limit+""
            
        }
        if( startIndex > 0) {
            var prevPage = page - 1
        results.previous = "http://localhost:3000/proofs?page="+prevPage+"&limit="+limit+""
        }
        try{
            let pool = await sql.connect(configJobData)
            results.results = await pool.request()
                .input('startindex', sql.Int, startIndex)
                .input('limit', sql.Int, limit)
                .execute('GetPaginatedProofs')
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json( {message: e.message} )
        }
    }
}

module.exports = paginatedResults;