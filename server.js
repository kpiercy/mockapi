require('dotenv').config()
const express = require('express')
var cors = require('cors')
const app = express()
const sql = require('mssql/msnodesqlv8')
const publimiter = require('./functions/publimiter')
const authenticateToken = require('./functions/authToken')
const jwt = require('jsonwebtoken')
const dboperations = require('./functions/dboperations')
const configJobData = require('./public/models/db/JobData_dbconfig')
const configEliteMaster = require('./public/models/db/EliteMaster_dbconfig')
const models = require('./public/models/db/classes')
const uuid = require('uuid').v4


app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const fileRoutes = require('./routes/files')
const proofRoutes = require('./routes/proofs')


///////////////endpoint routes////////////////

app.use('/api/files', fileRoutes)
app.use('/api/proofs', proofRoutes)

///////////////endpoint routes////////////////


var port = process.env.PORT || 3000
app.listen(port)
console.log('server is running at port ' + port)