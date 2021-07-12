require('dotenv').config()

const express = require('express')
var cors = require('cors')
const app = express()
const router = express.Router()
const sql = require('mssql/msnodesqlv8')


//rate limiter
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: process.env.svrLimit, //30 min
    max: process.env.svrMax, //limit each IP to 100 requests per 30min
    message: "429 : Too many requests from this IP in the last 30 min, please try again later."
})

//auth
const jwt = require('jsonwebtoken')

//db 
const dboperations = require('./dboperations')
var configJobData = require('./configs/JobData_dbconfig')
var configEliteMaster = require('./configs/EliteMaster_dbconfig')
const dbclasses = require('./models/db/classes')

//file uploads
const uuid = require('uuid').v4
const multer = require('multer')
const path = require('path')
const models = require('./models/db/classes')
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

//app
app.use(express.json())
app.use(cors())
app.use(express.static('public'))



router.post('/api/files', limiter, authenticateToken, upload.array('file'), (req,res) => {
    return res.status(202).json({ status: 'File upload successful', uploaded: req.files.length })
})

//router.get




function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


module.exports = router;