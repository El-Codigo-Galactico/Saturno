import routes from '@/routes';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Configuraciones
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const mongoUri = process.env.MONGO_URI ?? '';

// Validación de configuraciones
if (!mongoUri) {
  console.error('❌ MongoDB URI is not defined in the environment variables.');
  process.exit(1); // Terminar el proceso si no está configurado
}

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(helmet());
app.use(morgan('dev'));

// Conectar a MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1); // Terminar el proceso si la conexión falla
  });

// Rutas
app.use('/api', routes);

// Manejo centralizado de errores
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Ejemplo de ruta
app.get("/", async (req, res) => {
  res.send("Backend is working with MongoDB");
});

// Iniciar el servidor
app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
