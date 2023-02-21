const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { version } = require('../package.json')
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)

const swaggerOptions = {
  failOnErrors: true,
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ElitePS_API',
      version,
      description: 'REST API for Elite Services Inc',
      contact: {
        name: 'Kraig Piercy',
        email: 'kpiercy@eliteps.com',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      servers: [
        {
          url: 'http://localhost:5000/',
          description: 'DEV',
        },
        {
          url: 'https://eliteps-rest.azurewebsites.net/',
          description: 'PROD',
        },
      ],
    },
  },
  apis: ['./routes/*.js', './schemas/*.js'],
}

const swaggerSpec = swaggerJsDoc(swaggerOptions)

function swaggerDocs(app, port) {
  //swagger page
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  //Docs in json format
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  console.log(`Docs available at ${baseUrl.url}/docs`)
}

module.exports = swaggerDocs;