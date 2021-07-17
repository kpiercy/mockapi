require('dotenv').config()
const express = require('express')
const router = express.Router()

var cors = require('cors')

const sql = require('mssql/msnodesqlv8')
const publimiter = require('../functions/publimiter')
const authenticateToken = require('../functions/authToken')


//const dboperations = require('./dboperations')
//var configJobData = require('./configs/JobData_dbconfig')
//var configEliteMaster = require('./configs/EliteMaster_dbconfig')
//const dbclasses = require('./models/db/classes')


const uuid = require('uuid').v4
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const id = uuid()
        //const filePath = `/uploads/${id}${ext}`
        //setup file storage to DB
        cb(null, `${id}${ext}`)
    }
})
const upload = multer({ 
    storage: storage,
    limits:  { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/vnd.ms-excel" || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype == "application/zip" || file.mimetype == "text/plain" || file.mimetype == "application/pdf" || file.mimetype == "application/json" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/msword" || file.mimetype == "text/csv") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .txt, .csv, .pdf, .xls, .xlsx, .zip, .json, .doc & .docx formats are allowed!'));
        }
      }
})


router.use(express.json())
router.use(cors())
router.use(express.static('public'))



router.post('/', publimiter, authenticateToken, upload.array ('file'), (req, res) => {
        return res.status(202).json(
            { status: 'File upload successful', uploaded: req.files.length }
            )
    })

router.get('/', publimiter, authenticateToken, (req, res) => {
        res.send('GET /files/fileid retrieved')
    })


module.exports = router;