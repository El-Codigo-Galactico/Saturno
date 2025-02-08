import { Router } from 'express';
import { QuizController } from '@/controllers/quiz.controller';

const router = Router();
const quizController = new QuizController();

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     tags:
 *       - Quiz
 *     summary: Get all quizzes
 *     description: Retrieve a list of all quizzes sorted by creation date
 *     responses:
 *       200:
 *         description: List of quizzes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Quiz'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', quizController.getAllQuizzes.bind(quizController));

/**
 * @swagger
 * /api/quizzes/categories:
 *   get:
 *     tags:
 *       - Quiz
 *     summary: Get all categories
 *     description: Retrieve a list of all categories available
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/categories', quizController.getAllCategories.bind(quizController));

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     tags:
 *       - Quiz
 *     summary: Get a quiz by ID
 *     description: Retrieve a specific quiz by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Quiz ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Quiz'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', quizController.getQuizById.bind(quizController));
export default router;
