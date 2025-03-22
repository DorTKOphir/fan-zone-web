import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

  // Swagger Definition
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Fan Zone Web API',
      version: '1.0.0',
      description: 'API documentation for Fan Zone Web endpoints',
    },
    tags: [
      { name: "Auth", description: "Authentication Endpoints" },
      { name: "Posts", description: "Post Management" },
      { name: "Comments", description: "Comment Management" },
      { name: "Chat", description: "Chat Management Endpoints" },
      { name: "Users", description: "Users Managment Endpoints" },
    ],
    servers: [{ url: process.env.BASE_URL }],
  };

const options = {
  swaggerDefinition,
  apis: ['./src/swagger/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/swagger.json', (req, res) => {
    res.json(swaggerSpec);
  });
};

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - BearerAuth: []
 */

export { };
