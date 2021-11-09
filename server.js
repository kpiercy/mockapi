"use strict";
require('dotenv').config()
const express = require('express')
var cors = require('cors')
const router = express.Router()
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const authAccess = require('./middleware/access')
const fileRoutes = require('./routes/files')
const proofRoutes = require('./routes/proofs')
const clientRoutes = require('./routes/clients')
const jobRoutes = require('./routes/jobs')
const downloadRoutes = require('./routes/downloads')
const contactRoutes = require('./routes/contacts')
const paymentRoutes = require('./routes/payments')
const orderRoutes = require('./routes/orders')
const versionRoutes = require('./routes/versions')
const serviceRoutes = require('./routes/services')
const insertRoutes = require('./routes/inserts')
const patientRoutes = require('./routes/patients')
const encounterRoutes = require('./routes/encounters')
const detailRoutes = require('./routes/details')
const reachlimiter = require('./middleware/reachlimiter')

//log the following for all requests
app.all('*', function (req, res, next) {
 
    console.log('*** Server request ***')
    console.log('method: ' + req.method)
    console.log('url: ' + req.url)
    console.log('*****************')
 
    next()
 
})

// req.cid = req.params.cid //clientid
// req.jid = req.params.jid //jobid
// req.fid = req.params.fid //fileid
// req.pid = req.params.pid //proofid
// req.did = req.params.did //downloadid
// req.csid = req.params.csid //contactid
// req.pyid = req.params.pyid //paymentid
// req.oid = req.params.oid //orderid
// req.vid = req.params.vid //versionid
// req.vfid = req.params.vfid //versionfileid
// req.vsid = req.params.vsid //versionserviceid
// req.vfiid = req.params.vfiid //versionfileinsertid
// req.vfpid = req.params.vfpid //versionfilepatientid
// req.vfpeid = req.params.vfpeid //versionfilepatientencounterid
// req.vfpedid = req.params.vfpedid //versionfilepatientencounterdetailid

///////////////endpoint routes////////////////

app.use('/api/v1/clients', clientRoutes)
app.use('/api/v1/clients/:cid/jobs', function(req,res,next){
    req.cid = req.params.cid
    next()}, jobRoutes)
app.use('/api/v1/clients/:cid/jobs/:jid/files', function(req,res,next){
    req.cid = req.params.cid
    req.jid = req.params.jid
    next()}, fileRoutes)
app.use('/api/v1/clients/:cid/jobs/:jid/files/:fid/proofs', function(req,res,next){
    req.cid = req.params.cid
    req.jid = req.params.jid
    req.fid = req.params.fid
    next()}, proofRoutes)
app.use('/api/v1/clients/jobs/downloads', downloadRoutes)
app.use('/api/v1/clients/jobs/contacts', contactRoutes)
app.use('/api/v1/clients/jobs/payments', paymentRoutes)
app.use('/api/v1/clients/jobs/orders', orderRoutes)
app.use('/api/v1/clients/jobs/orders/versions', versionRoutes)
app.use('/api/v1/clients/jobs/orders/versions/files', fileRoutes) // uses files.js like /api/v1/clients/jobs/files does
app.use('/api/v1/clients/jobs/orders/versions/services', serviceRoutes)
app.use('/api/v1/clients/jobs/orders/versions/files/inserts', insertRoutes)
app.use('/api/v1/clients/jobs/orders/versions/files/patients', patientRoutes)
app.use('/api/v1/clients/jobs/orders/versions/files/patients/encounters', encounterRoutes)
app.use('/api/v1/clients/jobs/orders/versions/files/patients/encounters/details', detailRoutes)

///////////////endpoint routes////////////////


//log this for any request not handled above
app.all('*', function (req, res) {
 
    console.log('*** 404 ***')
    console.log('404 for url: ' + req.url)
    console.log('***********')
 
    res.status(404).send('Invalid URL')
 
})


var port = process.env.PORT || 3000
app.listen(port)
console.log('server is running at port ' + port)