require('dotenv').config()
const express = require('express')
var cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const userRoutes = require('./routes/users')


///////////////endpoint routes////////////////

app.use('/api/v1/clients/users', userRoutes)

///////////////endpoint routes////////////////


var port = process.env.PORT || 4000
app.listen(port)
console.log('authServer is running at port ' + port)