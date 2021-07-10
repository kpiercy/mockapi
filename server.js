require('dotenv').config()

const express = require('express')
var cors = require('cors')
const app = express()


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


////////////endpoints//////////////////////

//upload single or multiple files
app.post('/api/files/upload', limiter, authenticateToken, upload.array('file'), (req,res) => {
    return res.status(202).json({ status: 'File upload successful', uploaded: req.files.length })
})


//get all users
app.get('/api/users', limiter, authenticateToken, (req, res) => {
    dboperations.getUsers().then(result => {
        //console.log(result);
        res.status(200).json(result);
    })
})

//get all proofs
app.get('/api/proofs', limiter, authenticateToken, (req, res) => {

    dboperations.getProofs().then(result => {
        //console.log(result);
        res.status(200).json(result[0]);
    })
})

//get single proof by id
app.get('/api/proofs/:id', limiter, authenticateToken, (req,res) => {
    dboperations.getProof(req.params.id).then(result => {
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

var port = process.env.PORT || 8090
app.listen(port)
console.log('server is running at port ' + port)