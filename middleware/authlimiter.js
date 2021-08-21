const rateLimit = require('express-rate-limit')
const authlimiter = rateLimit({
    windowMs: 60 * 60 * 1000, //60 min
    max: 5, //limit each IP to 5 requests per 60min
    message: "429 : Too many requests from this IP in the last 60 min, please try again later."
})

module.exports = authlimiter;