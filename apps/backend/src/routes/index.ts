import { Router } from 'express';
import quizRoutes from './quiz.routes';

const router = Router();

// Definir todas las rutas aquí
router.use('/quizs', quizRoutes);

export default router;
