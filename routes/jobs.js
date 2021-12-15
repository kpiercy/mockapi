if ( process.env.ENVIRONMENT !== 'production' ) {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router({mergeParams: true})

const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authLvl = require('../middleware/authLvl')
const paginate = require('../middleware/paginateProofs')
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const checkReach = require('../middleware/reachlimiter')

const dboperations = require('../controllers/dbops_proofs')
const model = require('../models/proof')
const pubip = require('express-ip')

// //**********************
// const fileRoutes = require('./files')
// const downloadRoutes = require('./downloads')
// const uploadRoutes = require('./uploads')
// const contactRoutes = require('./contacts')
// const paymentRoutes = require('./payments')
// const orderRoutes = require('./orders')
// router.use('/files', fileRoutes)
// router.use('/downloads', downloadRoutes)
// router.use('/uploads', uploadRoutes)
// router.use('/contacts', contactRoutes)
// router.use('/payments', paymentRoutes)
// router.use('/orders', orderRoutes)
// //**********************

router.use(pubip().getIpInfoMiddleware)
router.all('*', publimiter, authenticateToken, authAccess, authIP)

//get all jobs
router.route('/')
    .get(checkReach, (req, res) => {
        res.send('router get')
})

//get single job by id
router.route('/:jobid')
    .get((req,res) => {
        const id = req.params.jobid

})

//create new job
router.route('/')
    .post((req, res) => {

})

//delete job
router.route('/')
    .delete((req, res) => {

})

module.exports = router;

