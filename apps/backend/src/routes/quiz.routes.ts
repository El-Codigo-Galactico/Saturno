import { Router } from 'express';
import { QuizController } from '@/controllers/quiz.controller';

const router = Router();
const quizController = new QuizController();

// GET /api/quizzes
router.get('/', quizController.getAllQuizzes.bind(quizController));

// GET /api/quizzes/:id
router.get('/:id', quizController.getQuizById.bind(quizController));

// POST /api/quizzes
router.post('/', quizController.createQuiz.bind(quizController));

// PUT /api/quizzes/:id
router.put('/:id', quizController.updateQuiz.bind(quizController));

// DELETE /api/quizzes/:id
router.delete('/:id', quizController.deleteQuiz.bind(quizController));

export default router;
