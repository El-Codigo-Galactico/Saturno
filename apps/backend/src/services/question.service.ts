import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const questionService = {
  async getAllQuestions() {
    return await prisma.quiz.findMany({
      include: {
        answers: true,
      },
    });
  },
};
