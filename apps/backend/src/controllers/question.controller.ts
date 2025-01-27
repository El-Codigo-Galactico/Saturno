import { Request, Response } from 'express';
import { questionService } from '../services/question.service';

export const questionController = {
  async getQuestions(req: Request, res: Response) {
    try {
      const questions = await questionService.getAllQuestions();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching questions', error });
    }
  },
};
