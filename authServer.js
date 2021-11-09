require('dotenv').config()
const express = require('express')
var cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

const userRoutes = require('./routes/users')

//log the following for all requests
app.all('*', function (req, res, next) {
 
    console.log('*** Auth server request ***')
    console.log('method: ' + req.method)
    console.log('url: ' + req.url)
    console.log('*****************')
 
    next()
 
})


///////////////endpoint routes////////////////

app.use('/api/v1/clients/users', userRoutes)

///////////////endpoint routes////////////////


//log this for any requests not handled above
app.all('*', function (req, res) {
 
    console.log('*** 404 ***')
    console.log('404 for url: ' + req.url)
    console.log('***********')
 
    res.status(404).send('Invalid URL')
 
})


var port = process.env.PORT || 4000
app.listen(port)
console.log('authServer is running at port ' + port)