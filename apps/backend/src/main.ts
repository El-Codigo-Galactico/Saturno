import express from 'express';
import dotenv from 'dotenv';
import questionRoutes from './routes/question.routes';

dotenv.config();

const app = express();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/questions', questionRoutes);

// Start server
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
