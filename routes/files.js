require('dotenv').config()
const express = require('express')
const router = express.Router()

var cors = require('cors')

const sql = require('mssql/msnodesqlv8')
const publimiter = require('../functions/publimiter')
const authenticateToken = require('../functions/authToken')

//db 
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
const upload = multer({ storage: storage })


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