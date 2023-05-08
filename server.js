require('dotenv').config()

//PACKAGES
const express = require('express')
const { version } = require('./package.json')
var cors = require('cors')
const app = express()
const pubip = require('express-ip')
const logger = require('morgan')
const fs = require('fs-extra')
const path = require('path')
const fileStreamRotator = require('file-stream-rotator')
const sql = require('mssql/msnodesqlv8')
const configJobData = require(`./config/db-${process.env.NODE_ENV}`)
//const ejs = require('ejs')



//MIDDLEWARE
const publimiter = require('./middleware/publimiter')
const authenticateToken = require('./middleware/authToken')
const authAccess = require('./middleware/access')
const authLvl = require('./middleware/authLvl')
const authIP = require('./middleware/ipAccess')
const apiErrorHandler = require('./utils/api-error-handler')
const swagger = require('./utils/swagger')

//CHECK LOG DIRECTORY
const logsFolder = __dirname + '/accessLog'
fs.existsSync(logsFolder) || fs.mkdirSync(logsFolder)

//LOG STREAM
const rotatingLogStream = fileStreamRotator.getStream({
  filename: `${logsFolder}/access-%DATE%.log`,
  frequency: 'daily',
  verbose: false,
  date_format: 'YYYY-MM-DD',
  max_logs: 45, //Keep for 45 days
})

//APP CONFIG
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(pubip().getIpInfoMiddleware)
// app.set('views', 'views')
// app.set('view engine', 'ejs')
app.use(logger('combined', { stream: rotatingLogStream }))
app.use(logger('dev'))
app.use(apiErrorHandler)

//ROUTES
const indexRoutes = require('./routes/index')
const fileRoutes = require('./routes/files')
const clientRoutes = require('./routes/clients')
const userRoutes = require('./routes/users')
const serviceRoutes = require('./routes/services')
const invoiceRoutes = require('./routes/invoices')
const creditRoutes = require('./routes/credits')
const depositRoutes = require('./routes/deposits')
const contractRoutes = require('./routes/contracts')
const priceRoutes = require('./routes/prices')
const jobRoutes = require('./routes/jobs')
const facilityRoutes = require('./routes/facilities')
const proofRoutes = require('./routes/proofs')
const downloadRoutes = require('./routes/downloads')
const contactRoutes = require('./routes/contacts')
const orbipayRoutes = require('./routes/orbipays')
const orderRoutes = require('./routes/orders')
const versionRoutes = require('./routes/versions')
const insertRoutes = require('./routes/inserts')
const messageRoutes = require('./routes/messages')
const logoRoutes = require('./routes/logos')
const logRoutes = require('./routes/logs')

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Origin-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }

  next()
})

//DYNAMIC URL ENDPOINTS

swagger(app, process.env.PORT)
//app.use('/', indexRoutes)
app.use('/api/v1/clients', clientRoutes) //crud
app.use('/api/v1/services', serviceRoutes) //crud
app.use('/api/v1/logs', logRoutes) //crud

//STATIC URL ENDPOINTS
// app.use(
//   '/api/v1/clients/invoices',
//   publimiter,
//   authenticateToken,
//   authAccess,
//   authIP,
//   invoiceRoutes
// ) //cru
// app.use(
//   '/api/v1/clients/invoices/credits',
//   publimiter,
//   authenticateToken,
//   authAccess,
//   authIP,
//   creditRoutes
// ) //cru
// app.use(
//   '/api/v1/clients/invoices/deposits',
//   publimiter,
//   authenticateToken,
//   authAccess,
//   authIP,
//   depositRoutes
// ) //cru
// app.use(
//   '/api/v1/clients/contracts',
//   publimiter,
//   authenticateToken,
//   authAccess,
//   authIP,
//   contractRoutes
// ) //crud
// app.use(
//   '/api/v1/clients/contracts/prices',
//   publimiter,
//   authenticateToken,
//   authAccess,
//   authIP,
//   priceRoutes
// ) //cru
app.use('/api/v1/clients/jobs', publimiter, authenticateToken, authLvl, authAccess, authIP, jobRoutes)
// app.use(
//   '/api/v1/clients/jobs/proofs',
//   publimiter,
//   authenticateToken,
//   authAccess,
//   authIP,
//   proofRoutes
// )
// app.use(
//   '/api/v1/clients/jobs/downloads',
//   publimiter,
//   authenticateToken,
//   authAccess,
//   authIP,
//   downloadRoutes
// ) //crud
// app.use(
//   '/api/v1/clients/jobs/contacts',
//   publimiter,
//   authenticateToken,
//   authAccess,
//   authIP,
//   contactRoutes
// ) //crud
// app.use(
//   '/api/v1/clients/jobs/orbipays',
//   publimiter,
//   authenticateToken,
//   authAccess,
//   authIP,
//   orbipayRoutes
// ) //crud
// app.use(
//   '/api/v1/clients/jobs/orders',
//   publimiter,
//   authenticateToken,
//   authAccess,
//   authIP,
//   orderRoutes
// ) //cru
// app.use(
//   '/api/v1/clients/jobs/facilities',
//   publimiter,
//   authenticateToken,
//   authAccess,
//   authIP,
//   facilityRoutes
// )
// app.use('/api/v1/clients/jobs/orders/versions', versionRoutes)
// app.use('/api/v1/clients/jobs/orders/versions/files', fileRoutes)  //should files belong to /orders instead of /versions??
// app.use('/api/v1/clients/jobs/orders/versions/files/inserts', insertRoutes) //should inserts belong to /jobs/orders/files??

//api/v1/clients/jobs/facilities/statements/encounters/charges/payments
//api/v1/clients/jobs/facilities/statements/encounters/charges/adjustments
//api/v1/clients/jobs/facilities/statements/encounters/charges/transfers


//ERROR HANDLING
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
  next()
})

let port = process.env.PORT || 5000
app.listen(port, async () => {
  console.log('Server running')
  console.log(`PORT: ${port}`)
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
  await sql.connect(configJobData)
  console.log(`${process.env.NODE_ENV} database connected`)
})

