require('dotenv').config()

const express = require('express')
const router = express.Router({mergeParams: true})
const pubip = require('express-ip')
const sql = require('mssql/msnodesqlv8')
const uuid = require('uuid').v4
const multer = require('multer')
const path = require('path')

//additional middleware
const authLvl = require('../middleware/authLvl')
const checkReach = require('../middleware/reachlimiter')

//child routes
const proofRoutes = require('./proofs')

//controller
const dboperations = require('../controllers/dbops_files')

//model

//file specific
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let type = req.params.type
        let path = './public/uploads/'+`${type}`
        cb(null, `${path}`)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const id = uuid()
        cb(null, `${id}${ext}`)
    }
})
const files = multer({ 
    storage: storage,
    limits:  { fileSize: 5 * 1024 * 1024 }, //5MB
    fileFilter: (req, file, cb) => {
        let type = req.params.type
        if(type === "filestoprocess") {
            if (file.mimetype == "application/vnd.ms-excel" || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype == "application/zip" || file.mimetype == "text/plain" || file.mimetype == "application/pdf" || file.mimetype == "application/json" || file.mimetype == "text/csv") {
                cb(null, true);
              } else {
                cb('Only .txt, .csv, .pdf, .xls, .xlsx, .zip, & .json formats are allowed!', false);
              }
        }

        if(type === "messages") {
            if (file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/msword" || file.mimetype == "application/pdf") {
                cb(null, true);
              } else {
                cb('Only .pdf, .doc & .docx formats are allowed!', false);
              }
        }

        if(type === "inserts") {
            if (file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/msword" || file.mimetype == "application/pdf") {
                cb(null, true);
              } else {
                cb('Only .pdf, .doc & .docx formats are allowed!', false);
              }
        }

        if(type !== "filestoprocess" || type !== "messages" || type !== "inserts") {
            cb('Unrecognized file type in uri, allowed values are filestoprocess, messages, or inserts.', false)
        } 
        
      }
}).array('files')

//router options and children
router.use(express.json())
router.use(pubip().getIpInfoMiddleware)
//router.use(express.static('public')) //breaks nested routing
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use('/:fileid/proofs', proofRoutes)


router.get('/', dboperations.all_files)

router.get('/', dboperations.one_file)

router.post('/:type', (req, res) => {
    files(req, res, function(err){
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        
        res.status(202).json(res.req.files)

    })
    })

    // router.get('/status', (req,res) => {
    //      const id = req.body.fileid
    //     let statusReq = JSON.stringify(req.body)
    //     dboperations.getStatus(statusReq).then(result => {
    //     //console.log(result);
    //     res.status(201).json(result);
    // })
    // })


module.exports = router;