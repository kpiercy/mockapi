require('dotenv').config()
const express = require('express')
const router = express.Router()

var cors = require('cors')

const sql = require('mssql/msnodesqlv8')
const publimiter = require('../middleware/publimiter')
const authenticateToken = require('../middleware/authToken')
const dboperations = require('../middleware/dbops_files')


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
const upload = multer({ 
    storage: storage,
    limits:  { fileSize: 5 * 1024 * 1024 }, //5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/vnd.ms-excel" || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype == "application/zip" || file.mimetype == "text/plain" || file.mimetype == "application/pdf" || file.mimetype == "application/json" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/msword" || file.mimetype == "text/csv") {
          cb(null, true);
        } else {
          cb('Only .txt, .csv, .pdf, .xls, .xlsx, .zip, .json, .doc & .docx formats are allowed!', false);
        }
      }
}).array('files')


router.use(express.json())
router.use(cors())
router.use(express.static('public'))


router.post('/:type', publimiter, authenticateToken, (req, res) => {
    upload(req, res, function(err){
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(202).json(res.req.files)
    })
    })

    // router.get('/status', publimiter, authenticateToken, (req,res) => {
    //     let statusReq = JSON.stringify(req.body)
    //     dboperations.getStatus(statusReq).then(result => {
    //     //console.log(result);
    //     res.status(201).json(result);
    // })
    // })


module.exports = router;