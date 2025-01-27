import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getQuestionsWithAnswers = async (req: Request, res: Response) => {
    try {
        const questions = await prisma.quiz.findMany({
            include: {
                answers: true
            }
        });
        console.log(questions);
        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
