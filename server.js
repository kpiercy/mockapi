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


///////////////endpoint routes////////////////

app.use('/api/v1/files', fileRoutes)
app.use('/api/v1/proofs', proofRoutes)

///////////////endpoint routes////////////////

var port = process.env.PORT || 3000
app.listen(port)
console.log('server is running at port ' + port)