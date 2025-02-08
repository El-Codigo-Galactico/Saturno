import { Quiz, IQuiz } from '@/models/quiz.model';

/**
 * Clase que maneja todas las operaciones relacionadas con los quizzes
 */
export class QuizService {
  /**
   * Obtiene todos los quizzes disponibles
   * @returns Promise<IQuiz[]> Lista de quizzes
   * @throws {Error} Si hay un error al recuperar los quizzes
   */
  async getAllQuizzes(): Promise<IQuiz[]> {
    try {
      const quizzes = await Quiz.find().exec();
      return quizzes;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error al recuperar los quizzes: ${errorMessage}`);
    }
  }

    /**
     * Obtiene todas las categorías disponibles
     * @returns Promise<string[]> Lista de categorías
     * @throws {Error} Si hay un error al recuperar las categorías
     */
    async getAllCategories(): Promise<string[]> {
      try {
        const categories = await Quiz.distinct('category').exec();
        return categories;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Error desconocido';
        throw new Error(`Error al recuperar las categorías: ${errorMessage}`);
      }
    }

  /**
   * Obtiene un quiz específico por su ID
   * @param id ID del quiz a buscar
   * @returns Promise<IQuiz | null> Quiz encontrado o null si no existe
   * @throws {Error} Si hay un error al recuperar el quiz o el ID es inválido
   */
  async getQuizById(id: string): Promise<IQuiz | null> {
    if (!id?.trim()) {
      throw new Error('El ID del quiz es requerido');
    }

    try {
      const quiz = await Quiz.findById(id).exec();
      return quiz;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(
        `Error al recuperar el quiz con ID ${id}: ${errorMessage}`
      );
    }
  }

  /**
   * Crea un nuevo quiz
   * @param quizData Datos del quiz a crear
   * @returns Promise<IQuiz> Quiz creado
   * @throws {Error} Si hay un error al crear el quiz
   */
  async createQuiz(quizData: Partial<IQuiz>): Promise<IQuiz> {
    if (!quizData || Object.keys(quizData).length === 0) {
      throw new Error('Se requieren datos para crear el quiz');
    }

    try {
      const newQuiz = new Quiz(quizData);
      const validationError = newQuiz.validateSync();
      if (validationError) {
        throw new Error(`Error de validación: ${validationError.message}`);
      }

      const savedQuiz = await newQuiz.save();
      return savedQuiz;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error al crear el quiz: ${errorMessage}`);
    }
  }

  /**
   * Actualiza un quiz existente
   * @param id ID del quiz a actualizar
   * @param updateData Datos a actualizar del quiz
   * @returns Promise<IQuiz | null> Quiz actualizado o null si no existe
   * @throws {Error} Si hay un error al actualizar el quiz
   */
  async updateQuiz(id: string, updateData: Partial<IQuiz>): Promise<IQuiz | null> {
    if (!id?.trim()) {
      throw new Error('El ID del quiz es requerido');
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error('Se requieren datos para actualizar el quiz');
    }

    try {
      const updatedQuiz = await Quiz.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      ).exec();

      if (!updatedQuiz) {
        throw new Error(`No se encontró el quiz con ID ${id}`);
      }

      return updatedQuiz;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(
        `Error al actualizar el quiz con ID ${id}: ${errorMessage}`
      );
    }
  }

  /**
   * Elimina un quiz existente
   * @param id ID del quiz a eliminar
   * @returns Promise<IQuiz | null> Quiz eliminado o null si no existe
   * @throws {Error} Si hay un error al eliminar el quiz
   */
  /*
  TODO: Implementar el metodo para baja logica
  */
  async deleteQuiz(id: string): Promise<IQuiz | null> {
    if (!id?.trim()) {
      throw new Error('El ID del quiz es requerido');
    }

    try {
      const deletedQuiz = await Quiz.findByIdAndRemove(id).exec();

      if (!deletedQuiz) {
        throw new Error(`No se encontró el quiz con ID ${id}`);
      }

      return deletedQuiz;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(
        `Error al eliminar el quiz con ID ${id}: ${errorMessage}`
      );
    }
  }
}
