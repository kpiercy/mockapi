require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('morgan')
const fs = require('fs-extra')
const path = require('path')
const fileStreamRotator = require('file-stream-rotator')

//middleware
const apiErrorHandler = require('./utils/api-error-handler')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
//This will ensure log directory exists for acccess logs
const logsFolder = __dirname + '/authLog'
fs.existsSync(logsFolder) || fs.mkdirSync(logsFolder)
//Create a log stream here
const rotatingLogStream = fileStreamRotator.getStream({
  filename: `${logsFolder}/auth-%DATE%.log`,
  frequency: 'daily',
  verbose: false,
  date_format: 'YYYY-MM-DD',
  max_logs: 45, //Keep for 45 days
})

app.use(logger('combined', { stream: rotatingLogStream }))
app.use(logger('dev'))
app.use(apiErrorHandler)

//child routes
const userRoutes = require('./routes/users')

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

///////////////endpoint routes////////////////

app.use('/api/v1/clients/users', userRoutes)
app.use('/api/v1/clients/:clientid/users', userRoutes)

///////////////endpoint routes////////////////

var port = process.env.PORT || 4000
app.listen(port)
console.log('authServer is running at port ' + port)
