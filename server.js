require('dotenv').config()
const express = require('express')
var cors = require('cors')
const app = express()
const sql = require('mssql/msnodesqlv8')

//rate limiter
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, //30 min
    max: process.env.svrMax, //limit each IP to 100 requests per 30min
    message: "429 : Too many requests from this IP in the last 30 min, please try again later."
})
//auth
const jwt = require('jsonwebtoken')
//db 
const dboperations = require('./dboperations')
const configJobData = require('./public/models/db/JobData_dbconfig')
const configEliteMaster = require('./public/models/db/EliteMaster_dbconfig')
const models = require('./public/models/db/classes')
//file uploads
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
        const filePath = `/uploads/${id}${ext}`
        //setup file storage to DB
        cb(null, `${id}${ext}`)

    }
})

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/vnd.ms-excel" || file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype == "application/zip" || file.mimetype == "text/plain" || file.mimetype == "application/pdf" || file.mimetype == "application/json" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/msword" || file.mimetype == "text/csv") {
          cb(null, true)
        } else {
          cb(null, false)
          return cb(new Error('Only .txt, .csv, .pdf, .xls, .xlsx, .zip, .json, .doc & .docx formats are allowed!'))
        }
      }
})




//app
app.use(express.json())
app.use(cors())
app.use(express.static('public'))


////////////endpoints//////////////////////


//upload single or multiple files
app.post('/api/files', limiter, authenticateToken, upload.array('file'), (req,res) => {
    return res.status(202).json({ fileID: 'null', status: 'File upload successful', uploaded: req.files.length })
})

// /paginatedResults(dbclasses.proofs)


//get all users >>>>>>>> REQUIRE ADMIN
app.get('/api/users', limiter, authenticateToken, (req, res) => {
    dboperations.getUsers().then(result => {
        //console.log(result);
        res.status(200).json(result);
    })
})



//get all proofs >>>>>>>>> REQUIRE ADMIN
app.get('/api/proofs', limiter, authenticateToken, (req, res) => {

    dboperations.getProofs().then(result => {
        //console.log(result);
        res.status(200).json(result);
    })
})

//get single proof by id
app.get('/api/proofs', limiter, authenticateToken, (req,res) => {
    const id = req.query.id
    dboperations.getProof(id).then(result => {
        //console.log(result);
        res.status(200).json(result[0]);
    })
})

//insert new proof
app.post('/api/proofs', limiter, authenticateToken, (req,res) => {
    let proof = { ...req.body }
    dboperations.addProof(proof).then(result => {
        //console.log(result);
        res.status(201).json(result);
    })
})

//update proof
app.patch('/api/proofs', limiter, authenticateToken, (req,res) => {

    let proofresult = { ...req.body }
    dboperations.updateProof(proofresult).then(result => {
        //console.log(result);
        res.status(201).json(result);
    })
})



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

// function paginatedResults(model) {
//     return (req, res, next) => {
//         const page = parseInt(req.query.page)
//         const limit = parseInt(req.query.limit)
//         const startIndex = (page -1) * limit
//         const endIndex = page * limit
    
//         const results = {}
    
//         if( endIndex < model.length ) {
//         results.next = {
//             page: page + 1,
//             limit: limit
//             }
//         }
//         if( startIndex > 0) {
//         results.previous = {
//             page: page -1,
//             limit: limit
//             }
//         }

//         results.results = sql.query("SELECT TOP " +limit+ " from Proofs ORDER BY ID")
//         res.paginatedResults = results
//         next()

//     }
// }

var port = process.env.PORT || 3000
app.listen(port)
console.log('server is running at port ' + port)