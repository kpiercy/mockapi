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


///////////////endpoint routes////////////////

//app.use('/api/v1/clients', clientRoutes)
//app.use('/api/v1/clients/jobs', jobRoutes)
app.use('/api/v1/clients/jobs/files', fileRoutes)
app.use('/api/v1/clients/jobs/files/proofs', proofRoutes)
//app.use('/api/v1/clients/jobs/downloads', downloadRoutes)
//app.use('/api/v1/clients/jobs/contacts', contactRoutes)
//app.use('/api/v1/clients/jobs/payments', paymentRoutes)
//app.use('/api/v1/clients/jobs/orders', orderRoutes)
//app.use('/api/v1/clients/jobs/orders/versions', versionRoutes)
app.use('/api/v1/clients/jobs/orders/versions/files', fileRoutes) // uses files.js like jobs/files does
//app.use('/api/v1/clients/jobs/orders/versions/services', serviceRoutes)
//app.use('/api/v1/clients/jobs/orders/versions/files/inserts', insertRoutes)
//app.use('/api/v1/clients/jobs/orders/versions/files/patients', patientRoutes)
//app.use('/api/v1/clients/jobs/orders/versions/files/patients/encounters', encounterRoutes)
//app.use('/api/v1/clients/jobs/orders/versions/files/patients/encounters/details', detailRoutes)

///////////////endpoint routes////////////////

var port = process.env.PORT || 3000
app.listen(port)
console.log('server is running at port ' + port)