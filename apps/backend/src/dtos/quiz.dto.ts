import { Document } from 'mongoose';

interface QuizAnswerDto {
  isCorrect: boolean;
  text: string;
}

export interface QuizDto extends Document {
  answers: QuizAnswerDto[];
  category: string;
  createdAt: Date;
  gameName: string;
  lore: string;
  question: string;
  saga: string;
  source: string;
  updatedAt: Date;
}

// DTO para crear un nuevo quiz (sin campos automáticos)
export interface CreateQuizDto {
  answers: QuizAnswerDto[];
  category: string;
  gameName: string;
  lore: string;
  question: string;
  saga: string;
  source: string;
}

// DTO para actualizar un quiz (todos los campos son opcionales)
export type UpdateQuizDto = Partial<CreateQuizDto>
