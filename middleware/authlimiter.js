const rateLimit = require('express-rate-limit')
const authlimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 30 minutes
  max: 25, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (_request, res, _next) =>
    res.status(429).json({
      status: false,
      message: 'Too many requests, please try again later.',
    }),
})

module.exports = authlimiter;