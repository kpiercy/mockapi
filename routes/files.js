require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')
const sql = require('mssql/msnodesqlv8')


//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes
const insertRoutes = require('./inserts')
const logoRoutes = require('./logos')
const messageRoutes = require('./messages')
const patientRoutes = require('./patients')

//controller
const dboperations = require('../controllers/dbops_files')

//model



//router options and children
router.use(express.json())
router.use(pubip().getIpInfoMiddleware)
//router.use(express.static('public')) //breaks nested routing
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use('/inserts', insertRoutes)
router.use('/logos', logoRoutes)
router.use('/messages', messageRoutes)
router.use('/:vfileid/patients', patientRoutes)


router.get('/', checkReach, authLvl, dboperations.get_files)

router.get('/:fileid', checkReach, authLvl, dboperations.get_file)

router.post('/', checkReach, authLvl, dboperations.post_file) //add :type to route for original setup

    // router.get('/status', (req,res) => {
    //      const id = req.body.fileid
    //     let statusReq = JSON.stringify(req.body)
    //     dboperations.getStatus(statusReq).then(result => {
    //     //console.log(result);
    //     res.status(201).json(result);
    // })
    // })

router.delete("/:fileid", checkReach, authLvl, dboperations.delete_file);


module.exports = router;