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

/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     tags:
 *       - Quiz
 *     summary: Create a new quiz
 *     description: Create a new quiz with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuizInput'
 *     responses:
 *       201:
 *         description: Quiz created successfully
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
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/', quizController.createQuiz.bind(quizController));

/**
 * @swagger
 * /api/quizzes/{id}:
 *   put:
 *     tags:
 *       - Quiz
 *     summary: Update a quiz
 *     description: Update an existing quiz by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Quiz ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateQuizInput'
 *     responses:
 *       200:
 *         description: Quiz updated successfully
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
router.put('/:id', quizController.updateQuiz.bind(quizController));

/**
 * @swagger
 * /api/quizzes/{id}:
 *   delete:
 *     tags:
 *       - Quiz
 *     summary: Delete a quiz
 *     description: Delete a quiz by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Quiz ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
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
router.delete('/:id', quizController.deleteQuiz.bind(quizController));

export default router;
