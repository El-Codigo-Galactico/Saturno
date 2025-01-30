import { Request, Response } from 'express';
import { QuizService } from '@/services/quiz.service';
import { IQuiz } from '@/models/quiz.model';

// Tipos personalizados para el request
export interface CreateQuizRequest extends Request {
  body: Pick<
    IQuiz,
    | 'answers'
    | 'category'
    | 'gameName'
    | 'lore'
    | 'question'
    | 'saga'
    | 'source'
  >;
}

export interface UpdateQuizRequest extends Request {
  body: Partial<IQuiz>;
  params: {
    id: string;
  };
}

export class QuizController {
  private quizService: QuizService;

  constructor() {
    this.quizService = new QuizService();
  }

  async getAllQuizzes(_req: Request, res: Response) {
    try {
      const quizzes = await this.quizService.getAllQuizzes();

      const sortedQuizzes = quizzes.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return res.status(200).json({
        success: true,
        data: sortedQuizzes,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(500).json({
        success: false,
        error: `Error al obtener los quizzes: ${errorMessage}`,
      });
    }
  }

  async getQuizById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id?.trim()) {
        return res.status(400).json({
          success: false,
          error: 'El ID del quiz es requerido',
        });
      }

      const quiz = await this.quizService.getQuizById(id);

      if (!quiz) {
        return res.status(404).json({
          success: false,
          error: 'Quiz no encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        data: quiz,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(500).json({
        success: false,
        error: `Error al obtener el quiz: ${errorMessage}`,
      });
    }
  }

  async createQuiz(req: CreateQuizRequest, res: Response) {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Se requieren datos para crear el quiz',
        });
      }

      const newQuiz = await this.quizService.createQuiz(req.body);

      return res.status(201).json({
        success: true,
        data: newQuiz,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(500).json({
        success: false,
        error: `Error al crear el quiz: ${errorMessage}`,
      });
    }
  }

  async updateQuiz(req: UpdateQuizRequest, res: Response) {
    const { id } = req.params;
    try {
      if (!id?.trim()) {
        return res.status(400).json({
          success: false,
          error: 'El ID del quiz es requerido',
        });
      }

      const updatedQuiz = await this.quizService.updateQuiz(id, req.body);

      if (!updatedQuiz) {
        return res.status(404).json({
          success: false,
          error: 'Quiz no encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedQuiz,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(500).json({
        success: false,
        error: `Error al actualizar el quiz: ${errorMessage}`,
      });
    }
  }

  async deleteQuiz(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (!id?.trim()) {
        return res.status(400).json({
          success: false,
          error: 'El ID del quiz es requerido',
        });
      }

      const deletedQuiz = await this.quizService.deleteQuiz(id);

      if (!deletedQuiz) {
        return res.status(404).json({
          success: false,
          error: 'Quiz no encontrado',
        });
      }

      return res.status(200).json({
        success: true,
        data: deletedQuiz,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return res.status(500).json({
        success: false,
        error: `Error al eliminar el quiz: ${errorMessage}`,
      });
    }
  }
}
