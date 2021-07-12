require('dotenv').config()

const express = require('express')
const app = express()
var cors = require('cors')

const fileRoutes = require('./public/routes/files')
const userRoutes = require('./public/routes/users')

app.use(express.json())
app.use(cors())

////////ROUTING
app.use('/files', fileRoutes)
app.use('/users', userRoutes)



module.exports = app;