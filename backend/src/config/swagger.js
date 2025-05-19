const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BerbagiDec API Docs',
      version: '1.0.0',
      description: 'Dokumentasi API untuk backend BerbagiDec',
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Development server' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/features/**/*.js'], // sesuaikan dengan lokasi file routes/controller kamu
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
