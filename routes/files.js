require('dotenv').config()
const express = require('express')
const router = express.Router()

const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const authAccess = require('../middleware/access')
const authIP = require('../middleware/ipAccess')
const sql = require('mssql/msnodesqlv8')
const dboperations = require('../controllers/dbops_files')
const pubip = require('express-ip')

const uuid = require('uuid').v4
const multer = require('multer')
const path = require('path')
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

router.use(express.json())
router.use(express.static('public'))
router.use(pubip().getIpInfoMiddleware)


router.all('*', publimiter, authenticateToken, authAccess, authIP)


router.route('/:type')
    .post((req, res) => {
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