import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Swagger Definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Fan Zone Web API',
    version: '1.0.0',
    description: 'API documentation for authentication endpoints',
  },
  servers: [{ url: 'http://localhost:5000' }],
};

const options = {
  swaggerDefinition,
  apis: ['./src/swagger/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
