require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('morgan')

//middleware
const apiErrorHandler = require("./errors/api-error-handler");

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(logger('dev'))
app.use(apiErrorHandler)

//child routes
const userRoutes = require('./routes/users')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Origin-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }

    next()
})

///////////////endpoint routes////////////////

app.use('/api/v1/clients/users', userRoutes)
app.use("/api/v1/clients/:clientid/users", userRoutes);

///////////////endpoint routes////////////////


var port = process.env.PORT || 4000
app.listen(port)
console.log('authServer is running at port ' + port)