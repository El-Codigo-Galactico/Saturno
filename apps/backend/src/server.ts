import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import routes from '@/routes';

// Cargar variables de entorno al inicio
dotenv.config();

/**
 * Tipos para la configuración del servidor
 */
interface ServerConfig {
  host: string;
  port: number;
  mongoUri: string;
  corsOrigins: string[];
  environment: string;
}

/**
 * Tipo personalizado para errores de la aplicación
 */
class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public status: string = 'error'
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Obtiene y valida la configuración del servidor desde las variables de entorno
 */
function getServerConfig(): ServerConfig {
  const config: ServerConfig = {
    host: process.env.HOST ?? 'localhost',
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    mongoUri: process.env.MONGO_URI ?? '',
    corsOrigins: process.env.CORS_ORIGINS ? 
      process.env.CORS_ORIGINS.split(',') : 
      ['http://localhost:3000'],
    environment: process.env.NODE_ENV ?? 'development'
  };

  // Validación de configuraciones críticas
  if (!config.mongoUri) {
    throw new AppError(500, '❌ MongoDB URI is not defined in the environment variables');
  }

  if (isNaN(config.port) || config.port <= 0) {
    throw new AppError(500, '❌ Invalid PORT configuration');
  }

  return config;
}

/**
 * Configura los middlewares de la aplicación
 */
function setupMiddlewares(app: express.Application, config: ServerConfig): void {
  // Seguridad
  app.use(helmet({
    contentSecurityPolicy: config.environment === 'production',
    crossOriginEmbedderPolicy: config.environment === 'production',
  }));
  
  // CORS
  app.use(cors({
    origin: config.corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 horas
  }));

  // Parseo de body y logging
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(morgan(config.environment === 'production' ? 'combined' : 'dev'));

  // Headers de seguridad adicionales
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });
}

/**
 * Configura la conexión a MongoDB
 */
async function connectToMongoDB(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos
      socketTimeoutMS: 45000, // Timeout de socket de 45 segundos
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new AppError(500, `❌ Error connecting to MongoDB: ${errorMessage}`);
  }
}

/**
 * Manejador global de errores
 */
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error('🔥 Error:', {
    name: err.name,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
    return;
  }

  // Error por defecto
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

async function startServer(): Promise<void> {
  try {
    // Obtener configuración
    const config = getServerConfig();
    
    // Crear aplicación Express
    const app = express();

    // Configurar middlewares
    setupMiddlewares(app, config);

    // Conectar a MongoDB
    await connectToMongoDB(config.mongoUri);

    // Rutas de la API
    app.use('/api', routes);

    // Ruta de estado
    app.get('/health', (req: Request, res: Response) => {
      res.status(200).json({
        status: 'success',
        message: 'Server is healthy',
        timestamp: new Date().toISOString()
      });
    });

    // Manejo de rutas no encontradas
    app.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`
      });
    });

    // Manejador global de errores
    app.use(errorHandler);

    // Iniciar servidor
    app.listen(config.port, config.host, () => {
      console.log(`
🚀 Server is running!
📝 Mode: ${config.environment}
🌐 Address: http://${config.host}:${config.port}
🔑 API: http://${config.host}:${config.port}/api
❤️  Health: http://${config.host}:${config.port}/health
      `);
    });

    // Manejo de señales de terminación
    process.on('SIGTERM', () => {
      console.log('👋 SIGTERM received. Graceful shutdown started');
      process.exit(0);
    });

  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

// Iniciar el servidor
startServer().catch((error) => {
  console.error('💥 Failed to start server:', error);
  process.exit(1);
});
