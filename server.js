require('dotenv').config()

const express = require('express')
var cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const fileRoutes = require('./routes/files')
const versfileRoutes = require('./routes/versfiles')
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

//log the following for all requests
app.all('*', function (req, res, next) {
 
    console.log('*** Server request ***')
    console.log('method: ' + req.method)
    console.log('url: ' + req.url)
    console.log('*****************')
 
    next()
 
})

///////////////endpoint routes ////////////////

/*
Dynamic routes are handled via split routing starting inside ./routes/clients, using router.use for any appended sub-path. For example, if you call the /clients/:clientid/jobs/:jobid/orders/ endpoint, the program hits the clientRoutes, then using the router, identifies the req.url has /jobs/:jobid and then goes into the jobRoutes, inside jobs.js it then identifies that the req.url has /orders in the path and then uses the orders module to fulfill the request.

Static routes are handled via the list of app.use below, whereby it calls the given module directly. Routes are wrapped in an if statement that determine if the req.url is static or dynamic based on the path, thus allowing interaction via either method.

All of the same capabilities are open to Static and Dynamic requests. The difference being that when using the static routes, you will need to provide details like the clientid, orderid, ... params via JSON body in most cases. 
*/
 
app.use('/api/v1/clients', clientRoutes)
app.use('/api/v1/clients/jobs', jobRoutes)
app.use('/api/v1/clients/jobs/files', fileRoutes)
app.use('/api/v1/clients/jobs/files/proofs', proofRoutes)
app.use('/api/v1/clients/jobs/downloads', downloadRoutes)
app.use('/api/v1/clients/jobs/contacts', contactRoutes)
app.use('/api/v1/clients/jobs/payments', paymentRoutes)
app.use('/api/v1/clients/jobs/orders', orderRoutes)
app.use('/api/v1/clients/jobs/orders/versions', versionRoutes)
app.use('/api/v1/clients/jobs/orders/versions/vfiles', versfileRoutes)
app.use('/api/v1/clients/jobs/orders/versions/services', serviceRoutes)
app.use('/api/v1/clients/jobs/orders/versions/vfiles/inserts', insertRoutes)
app.use('/api/v1/clients/jobs/orders/versions/vfiles/patients', patientRoutes)
app.use('/api/v1/clients/jobs/orders/versions/vfiles/patients/encounters', encounterRoutes)
app.use('/api/v1/clients/jobs/orders/versions/vfiles/patients/encounters/details', detailRoutes)

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