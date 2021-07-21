require('dotenv').config()
const express = require('express')
var cors = require('cors')
const app = express()



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