import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { OpenAPIV3 } from 'openapi-types';

export function setupSwagger(app: Express) {
  const swaggerDocument: OpenAPIV3.Document = {
    openapi: '3.0.0',
    info: {
      title: 'Saturno API',
      description: 'API Documentation for Saturno Backend',
      version: '1.0.0',
    },
    servers: [
      {
        url: '/api',
        description: 'API Base URL',
      },
    ],
    tags: [
      {
        name: 'Quiz',
        description: 'Quiz management endpoints',
      },
    ],
    paths: {
      '/quizzes': {
        get: {
          tags: ['Quiz'],
          summary: 'Get all quizzes',
          description: 'Retrieve a list of all quizzes sorted by creation date',
          responses: {
            '200': {
              description: 'List of quizzes retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true,
                      },
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Quiz',
                        },
                      },
                    },
                  },
                },
              },
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
        post: {
          tags: ['Quiz'],
          summary: 'Create a new quiz',
          description: 'Create a new quiz with the provided data',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateQuizInput',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Quiz created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true,
                      },
                      data: {
                        $ref: '#/components/schemas/Quiz',
                      },
                    },
                  },
                },
              },
            },
            '400': {
              $ref: '#/components/responses/BadRequest',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
      },
      '/quizzes/{id}': {
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Quiz ID',
            schema: {
              type: 'string',
            },
          },
        ],
        get: {
          tags: ['Quiz'],
          summary: 'Get a quiz by ID',
          description: 'Retrieve a specific quiz by its ID',
          responses: {
            '200': {
              description: 'Quiz retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true,
                      },
                      data: {
                        $ref: '#/components/schemas/Quiz',
                      },
                    },
                  },
                },
              },
            },
            '404': {
              $ref: '#/components/responses/NotFound',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
        put: {
          tags: ['Quiz'],
          summary: 'Update a quiz',
          description: 'Update an existing quiz by its ID',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UpdateQuizInput',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Quiz updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true,
                      },
                      data: {
                        $ref: '#/components/schemas/Quiz',
                      },
                    },
                  },
                },
              },
            },
            '404': {
              $ref: '#/components/responses/NotFound',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
        delete: {
          tags: ['Quiz'],
          summary: 'Delete a quiz',
          description: 'Delete a quiz by its ID',
          responses: {
            '200': {
              description: 'Quiz deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true,
                      },
                      data: {
                        $ref: '#/components/schemas/Quiz',
                      },
                    },
                  },
                },
              },
            },
            '404': {
              $ref: '#/components/responses/NotFound',
            },
            '500': {
              $ref: '#/components/responses/InternalServerError',
            },
          },
        },
      },
    },
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
  };

  // Configurar Swagger UI
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Saturno API Documentation',
  }));
}
