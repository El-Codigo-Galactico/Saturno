import mongoose, { Schema, Document } from 'mongoose';

type QuizAnswers = {
  isCorrect: boolean;
  text: string;
};

export interface IQuiz extends Document {
  answers: QuizAnswers[];
  category: string;
  createdAt: Date;
  gameName: string;
  lore: string;
  question: string;
  saga: string;
  source: string;
  updatedAt: Date;
}

const QuizAnswerSchema = new Schema<QuizAnswers>({
  isCorrect: { type: Boolean, required: true },
  text: { type: String, required: true },
});

const QuizSchema = new Schema<IQuiz>(
  {
    answers: { type: [QuizAnswerSchema], required: true },
    category: { type: String, required: true },
    gameName: { type: String, required: true },
    lore: { type: String, required: true },
    question: { type: String, required: true },
    saga: { type: String, required: true },
    source: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Maneja automáticamente createdAt y updatedAt
    collection: 'game1', // Especifica la colección que se utilizará
  }
);

export const Quiz = mongoose.model<IQuiz>('Quiz', QuizSchema);
