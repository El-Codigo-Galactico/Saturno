import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

export function setupSwagger(app: Express) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Saturno API',
        version: '1.0.0',
        description: 'API Documentation for Saturno Backend',
      },
      servers: [
        {
          url: '/api',
          description: 'API Base URL',
        },
      ],
      components: {
        schemas: {
          QuizAnswer: {
            type: 'object',
            required: ['isCorrect', 'text'],
            properties: {
              isCorrect: {
                type: 'boolean',
                description: 'Indicates if this is the correct answer',
              },
              text: {
                type: 'string',
                description: 'The answer text',
              },
            },
          },
          Quiz: {
            type: 'object',
            required: [
              'answers',
              'category',
              'gameName',
              'lore',
              'question',
              'saga',
              'source',
            ],
            properties: {
              _id: {
                type: 'string',
                description: 'Quiz unique identifier',
              },
              answers: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/QuizAnswer',
                },
                description: 'List of possible answers',
              },
              category: {
                type: 'string',
                description: 'Quiz category',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Creation timestamp',
              },
              gameName: {
                type: 'string',
                description: 'Name of the game',
              },
              lore: {
                type: 'string',
                description: 'Quiz lore or background information',
              },
              question: {
                type: 'string',
                description: 'The quiz question',
              },
              saga: {
                type: 'string',
                description: 'Game saga or series',
              },
              source: {
                type: 'string',
                description: 'Source of the quiz content',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Last update timestamp',
              },
            },
          },
          CreateQuizInput: {
            type: 'object',
            required: [
              'answers',
              'category',
              'gameName',
              'lore',
              'question',
              'saga',
              'source',
            ],
            properties: {
              answers: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/QuizAnswer',
                },
              },
              category: {
                type: 'string',
              },
              gameName: {
                type: 'string',
              },
              lore: {
                type: 'string',
              },
              question: {
                type: 'string',
              },
              saga: {
                type: 'string',
              },
              source: {
                type: 'string',
              },
            },
          },
          UpdateQuizInput: {
            type: 'object',
            properties: {
              answers: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/QuizAnswer',
                },
              },
              category: {
                type: 'string',
              },
              gameName: {
                type: 'string',
              },
              lore: {
                type: 'string',
              },
              question: {
                type: 'string',
              },
              saga: {
                type: 'string',
              },
              source: {
                type: 'string',
              },
            },
          },
        },
        responses: {
          BadRequest: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false,
                    },
                    error: {
                      type: 'string',
                      example: 'Invalid request parameters',
                    },
                  },
                },
              },
            },
          },
          NotFound: {
            description: 'Resource not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false,
                    },
                    error: {
                      type: 'string',
                      example: 'Quiz not found',
                    },
                  },
                },
              },
            },
          },
          InternalServerError: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false,
                    },
                    error: {
                      type: 'string',
                      example: 'Internal server error',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    apis: ['./apps/backend/src/routes/*.ts'], // Rutas donde buscar comentarios JSDoc
  };

  const specs = swaggerJsdoc(options);

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Saturno API Documentation',
  }));
}
