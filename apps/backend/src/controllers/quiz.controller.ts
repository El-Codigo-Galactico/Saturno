import { QuizService } from '@/services/quiz.service';
import { Request, Response } from 'express';

// Obtener todos los quizzes
export const getQuizzes = async (req: Request, res: Response) => {
    try {
        const quizzes = await QuizService.getAllQuizzes();
        res.json(
            //compare created at
          quizzes.sort((a, b) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() })
        );
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving quizzes' });
    }
};

// Obtener un quiz por ID
export const getQuizById = async (req: Request, res: Response) => {
    try {
        const quiz = await QuizService.getQuizById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving quiz' });
    }
};
// Crear un nuevo quiz
export const createQuiz = async (req: Request, res: Response) => {
    try {
        const { answers, category, gameName, lore, question, saga, source } = req.body;

        // Validación de los campos
        if (!answers || !category || !gameName || !lore || !question || !saga || !source) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Crear el nuevo quiz
        const newQuiz = await QuizService.createQuiz({
            answers,
            category,
            gameName,
            lore,
            question,
            saga,
            source,
        });

        res.status(201).json(newQuiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el quiz' });
    }
};

// Actualizar un quiz
export const updateQuiz = async (req: Request, res: Response) => {
    try {
        const updatedQuiz = await QuizService.updateQuiz(req.params.id, req.body);
        if (!updatedQuiz) return res.status(404).json({ message: 'Quiz not found' });

        res.json(updatedQuiz);
    } catch (error) {
        res.status(500).json({ message: 'Error updating quiz' });
    }
};

// Eliminar un quiz
export const deleteQuiz = async (req: Request, res: Response) => {
    try {
        const deletedQuiz = await QuizService.deleteQuiz(req.params.id);
        if (!deletedQuiz) return res.status(404).json({ message: 'Quiz not found' });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting quiz' });
    }
};
