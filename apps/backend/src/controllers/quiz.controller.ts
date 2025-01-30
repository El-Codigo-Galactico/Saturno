import { Request, Response } from 'express';
import { QuizService } from '@/services/quiz.service';
import { IQuiz } from '@/models/quiz.model';

// Tipos personalizados para el request
interface CreateQuizRequest extends Request {
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

interface UpdateQuizRequest extends Request {
  body: Partial<IQuiz>;
  params: {
    id: string;
  };
}

/**
 * Controlador para manejar las operaciones CRUD de Quizzes
 */

/**
 * Obtiene todos los quizzes ordenados por fecha de creación
 * @param req Request de Express
 * @param res Response de Express
 */
export const getQuizzes = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const quizzes = await QuizService.getAllQuizzes();

    // Ordenar quizzes por fecha de creación (más reciente primero)
    const sortedQuizzes = quizzes.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    res.status(200).json(sortedQuizzes);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({
      success: false,
      message: 'Error al obtener los quizzes',
      error: errorMessage,
    });
  }
};

/**
 * Obtiene un quiz específico por su ID
 * @param req Request de Express con el ID del quiz
 * @param res Response de Express
 */
export const getQuizById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id?.trim()) {
      res.status(400).json({
        success: false,
        message: 'El ID del quiz es requerido',
      });
      return;
    }

    const quiz = await QuizService.getQuizById(id);

    if (!quiz) {
      res.status(404).json({
        success: false,
        message: `No se encontró el quiz con ID: ${id}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({
      success: false,
      message: 'Error al obtener el quiz',
      error: errorMessage,
    });
  }
};

/**
 * Crea un nuevo quiz
 * @param req Request de Express con los datos del quiz
 * @param res Response de Express
 */
export const createQuiz = async (
  req: CreateQuizRequest,
  res: Response
): Promise<void> => {
  try {
    const { answers, category, gameName, lore, question, saga, source } =
      req.body;

    // Validación de campos requeridos
    const requiredFields = {
      answers,
      category,
      gameName,
      lore,
      question,
      saga,
      source,
    };
    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      res.status(400).json({
        success: false,
        message: 'Campos requeridos faltantes',
        missingFields,
      });
      return;
    }

    const newQuiz = await QuizService.createQuiz(req.body);

    res.status(201).json({
      success: true,
      message: 'Quiz creado exitosamente',
      data: newQuiz,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({
      success: false,
      message: 'Error al crear el quiz',
      error: errorMessage,
    });
  }
};

/**
 * Actualiza un quiz existente
 * @param req Request de Express con el ID y datos del quiz
 * @param res Response de Express
 */
export const updateQuiz = async (
  req: UpdateQuizRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id?.trim()) {
      res.status(400).json({
        success: false,
        message: 'El ID del quiz es requerido',
      });
      return;
    }

    if (Object.keys(req.body).length === 0) {
      res.status(400).json({
        success: false,
        message: 'No se proporcionaron datos para actualizar',
      });
      return;
    }

    const updatedQuiz = await QuizService.updateQuiz(id, req.body);

    if (!updatedQuiz) {
      res.status(404).json({
        success: false,
        message: `No se encontró el quiz con ID: ${id}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Quiz actualizado exitosamente',
      data: updatedQuiz,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el quiz',
      error: errorMessage,
    });
  }
};

/**
 * Elimina un quiz existente
 * @param req Request de Express con el ID del quiz
 * @param res Response de Express
 */
export const deleteQuiz = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id?.trim()) {
      res.status(400).json({
        success: false,
        message: 'El ID del quiz es requerido',
      });
      return;
    }

    const deletedQuiz = await QuizService.deleteQuiz(id);

    if (!deletedQuiz) {
      res.status(404).json({
        success: false,
        message: `No se encontró el quiz con ID: ${id}`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Quiz eliminado exitosamente',
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error desconocido';
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el quiz',
      error: errorMessage,
    });
  }
};
