import { Request, Response } from 'express';
import { QuizService } from '@/services/quiz.service';
import { CreateQuizDto, UpdateQuizDto, QuizDto } from '@/dtos/quiz.dto';

// Tipos personalizados para el request
export interface CreateQuizRequest extends Request {
  body: CreateQuizDto;
}

export interface UpdateQuizRequest extends Request {
  body: UpdateQuizDto;
  params: {
    id: string;
  };
}

export class QuizController {
  private quizService: QuizService;

  constructor() {
    this.quizService = new QuizService();
  }

  async getAllQuizzes(
    _req: Request,
    res: Response<{ success: boolean; data?: QuizDto[]; error?: string }>
  ) {
    try {
      const quizzes = await this.quizService.getAllQuizzes();
      res.status(200).json({
        success: true,
        data: quizzes,
      });
    } catch (error) {
      console.error('Error al obtener los quizzes:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener los quizzes',
      });
    }
  }

  async getQuizById(
    req: Request,
    res: Response<{ success: boolean; data?: QuizDto; error?: string }>
  ) {
    const { id } = req.params;
    try {
      const quiz = await this.quizService.getQuizById(id);

      if (!quiz) {
        return res.status(404).json({
          success: false,
          error: 'Quiz no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        data: quiz,
      });
    } catch (error) {
      console.error('Error al obtener el quiz:', error);
      if (
        error instanceof Error &&
        error.message.includes('Cast to ObjectId failed')
      ) {
        return res.status(400).json({
          success: false,
          error: 'ID de quiz inválido',
        });
      }
      res.status(500).json({
        success: false,
        error: 'Error al obtener el quiz',
      });
    }
  }

  async createQuiz(
    req: CreateQuizRequest,
    res: Response<{ success: boolean; data?: QuizDto; error?: string }>
  ) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No se proporcionaron datos para crear el quiz',
        });
      }

      const quiz = await this.quizService.createQuiz(req.body);
      res.status(201).json({
        success: true,
        data: quiz,
      });
    } catch (error) {
      console.error('Error al crear el quiz:', error);
      res.status(500).json({
        success: false,
        error: 'Error al crear el quiz',
      });
    }
  }

  async updateQuiz(
    req: UpdateQuizRequest,
    res: Response<{ success: boolean; data?: QuizDto; error?: string }>
  ) {
    const { id } = req.params;
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No se proporcionaron datos para actualizar',
        });
      }

      const updatedQuiz = await this.quizService.updateQuiz(id, req.body);

      if (!updatedQuiz) {
        return res.status(404).json({
          success: false,
          error: 'Quiz no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        data: updatedQuiz,
      });
    } catch (error) {
      console.error('Error al actualizar el quiz:', error);
      if (
        error instanceof Error &&
        error.message.includes('Cast to ObjectId failed')
      ) {
        return res.status(400).json({
          success: false,
          error: 'ID de quiz inválido',
        });
      }
      res.status(500).json({
        success: false,
        error: 'Error al actualizar el quiz',
      });
    }
  }

  async deleteQuiz(
    req: Request,
    res: Response<{ success: boolean; data?: QuizDto; error?: string }>
  ) {
    const { id } = req.params;
    try {
      const deletedQuiz = await this.quizService.deleteQuiz(id);

      if (!deletedQuiz) {
        return res.status(404).json({
          success: false,
          error: 'Quiz no encontrado',
        });
      }

      res.status(200).json({
        success: true,
        data: deletedQuiz,
      });
    } catch (error) {
      console.error('Error al eliminar el quiz:', error);
      if (
        error instanceof Error &&
        error.message.includes('Cast to ObjectId failed')
      ) {
        return res.status(400).json({
          success: false,
          error: 'ID de quiz inválido',
        });
      }
      res.status(500).json({
        success: false,
        error: 'Error al eliminar el quiz',
      });
    }
  }
}
