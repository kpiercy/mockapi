const rateLimit = require('express-rate-limit')
const publimiter = rateLimit({
    windowMs: 30 * 60 * 1000, //30 min
    max: 300, //limit each IP to 100 requests per 30min
    message: "429 : Too many requests from this IP in the last 30 min, please try again later."
})

module.exports = publimiter;