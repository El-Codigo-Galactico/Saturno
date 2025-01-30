import { Quiz, IQuiz } from '@/models/quiz.model';

export class QuizService {
  // Obtener todos los quizzes
  static async getAllQuizzes(): Promise<IQuiz[]> {
    return await Quiz.find();
  }

  // Obtener un quiz por ID
  static async getQuizById(id: string): Promise<IQuiz | null> {
    return await Quiz.findById(id);
  }

  // Crear un nuevo quiz
  static async createQuiz(data: Partial<IQuiz>): Promise<IQuiz> {
    const newQuiz = new Quiz(data);
    return await newQuiz.save();
  }

  // Actualizar un quiz
  static async updateQuiz(
    id: string,
    data: Partial<IQuiz>
  ): Promise<IQuiz | null> {
    return await Quiz.findByIdAndUpdate(id, data, { new: true });
  }

  // Eliminar un quiz
  static async deleteQuiz(id: string): Promise<IQuiz | null> {
    return await Quiz.findByIdAndDelete(id);
  }
}
