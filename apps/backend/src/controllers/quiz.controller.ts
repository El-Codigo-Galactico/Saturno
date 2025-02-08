import { Request, Response } from 'express';
import { QuizService } from '@/services/quiz.service';
import { IQuiz } from '@/models/quiz.model';

export class QuizController {
  private quizService: QuizService;

  constructor() {
    this.quizService = new QuizService();
  }

  async getAllQuizzes(
    _req: Request,
    res: Response<{ success: boolean; data?: IQuiz[]; error?: string }>
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

  async getAllCategories(
    _req: Request,
    res: Response<{ success: boolean; data?: string[]; error?: string }>
  ) {
    try {
      const categories = await this.quizService.getAllCategories();
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
      res.status(500).json({
        success: false,
        error: 'Error al obtener las categorías',
      });
    }
  }
  

  async getQuizById(
    req: Request,
    res: Response<{ success: boolean; data?: IQuiz; error?: string }>
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
}
