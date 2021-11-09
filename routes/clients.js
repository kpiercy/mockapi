require('dotenv').config()

const express = require('express')
const router = express.Router()
const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl')
const paginate = require('../middleware/paginateClients')
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const dboperations = require('../services/dbops_clients')
const pubip = require('express-ip')
const model = require('../models/client')

router.use(pubip().getIpInfoMiddleware)
router.all('/', publimiter, authenticateToken, authAccess, authIP, authLvl)


// //get all clients
// router.get('/', (req, res) => {
//     dboperations.getClients().then(result => {
//         res.status(200).json(JSON.parse(result));
//     })
// })

//get all clients, paginate
router.get('/', paginate(model), (req, res) => {
    res.status(200).json(res.paginatedResults)
})

//get single client by mn_id
router.get('/:id', (req,res) => {
    const id = req.params.id

})

//create new client
router.post('/', (req, res) => {

})

//delete client
router.delete('/', (req, res) => {

})


async function limitReach(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    try{
        let pool = await sql.connect(configJobData)
        let reach = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('SetUserReach')
        var reachLimit = reach.recordset[0].clientid
        next()
    } catch {
        res.status(500).json('Failed to limit reach on call.')
    }

}


module.exports = router;