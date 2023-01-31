const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { version } = require('../package.json')

const swaggerOptions = {
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
        securitySchemas: {
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
          url: 'http://localhost:5000/api/v1',
          description: 'Clients',
        },
        {
          url: 'http://localhost:4000/api/v1',
          description: 'Users',
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

  console.log(`Docs available at http://localhost:${port}/api/v1/docs`)
}

module.exports = swaggerDocs;