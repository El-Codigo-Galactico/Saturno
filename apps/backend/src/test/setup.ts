import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Cargar variables de entorno para pruebas
dotenv.config();

// Configuración global para pruebas
beforeAll(async () => {
  // Usar una base de datos de prueba
  const mongoUri = process.env.MONGO_URI_TEST || process.env.MONGO_URI;
  
  if (!mongoUri) {
    throw new Error('MongoDB URI no está definida');
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Conectado a MongoDB para pruebas');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    throw error;
  }
});

// Limpiar después de cada prueba
afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

// Cerrar conexión después de todas las pruebas
afterAll(async () => {
  await mongoose.connection.close();
  console.log('✅ Conexión a MongoDB cerrada');
});
