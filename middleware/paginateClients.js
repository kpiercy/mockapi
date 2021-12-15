if ( process.env.ENVIRONMENT !== 'production' ) {
    require('dotenv').config()
}
const sql = require('mssql/msnodesqlv8')
const dboperations = require('../controllers/dbops_clients')
const configJobData = require('../config/JobData_dbconfig')
const configEliteMaster = require('../config/EliteMaster_dbconfig')
const model = require('../models/client')

function paginatedResults(model) {
    return async (req, res, next) => {

        //req.params.clientid = req.clientid
        var cid = req.params.clientid

        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page -1) * limit
        const endIndex = page * limit
    
        if( cid == null ) {
            res.status(406).json('Error: clientid must be specified in either the URL as a query param or in the request body.')
        } else {
        const results = {}
    
        if( endIndex < model.length ) {
            var nextPage = page + 1
        results.next = "http://localhost:3000/clients/"+`${cid}`+"?page="+nextPage+"&limit="+limit+""
            
        }
        if( startIndex > 0) {
            var prevPage = page - 1
        results.previous = "http://localhost:3000/clients/"+`${cid}`+"?page="+prevPage+"&limit="+limit+""
        }
        try{
            let pool = await sql.connect(configJobData)
            results.results = await pool.request()
                .input('startindex', sql.Int, startIndex)
                .input('limit', sql.Int, limit)
                .input('cid', sql.VarChar, cid)  //only retrieve proofs associated to this req users clientid
                .execute('GetPaginatedClients')
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json( {message: e.message} )
        }
    }
    }
}

module.exports = paginatedResults;