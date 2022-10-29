require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('morgan')

app.use(express.json())
app.use(cors())
app.use(express.static('public'))
app.use(logger('dev'))

const stamp  = require('./middleware/timestamp').getStamp()
const userRoutes = require('./routes/users')

///////////////endpoint routes////////////////

app.use('/api/v1/clients/users', userRoutes)

///////////////endpoint routes////////////////

app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

var port = process.env.PORT || 4000
app.listen(port)
console.log('authServer is running at port ' + port)