interface QuizAnswerDto {
  isCorrect: boolean;
  text: string;
}

export interface QuizDto {
  _id: string;
  answers: QuizAnswerDto[];
  category: string;
  gameName: string;
  lore: string;
  question: string;
  saga: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}
