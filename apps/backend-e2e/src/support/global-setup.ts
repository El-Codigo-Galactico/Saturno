import { ChildProcess, spawn } from 'child_process';

let server: ChildProcess;

module.exports = async function () {
  console.log('\nSetting up...\n');

  // Iniciar el servidor backend
  server = spawn('npx', ['nx', 'serve', 'backend'], {
    stdio: 'inherit',
    shell: true,
  });

  // Esperar a que el servidor esté listo
  await waitForServer('http://localhost:3000', 15000);

  // Compartir el proceso en globalThis para detenerlo después
  globalThis.__SERVER__ = server;
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};

// Función para verificar si el servidor está listo
async function waitForServer(url: string, timeout = 15000) {
  const axios = require('axios');
  const start = Date.now();

  while (Date.now() - start < timeout) {
    try {
      await axios.get(url);
      console.log(`Server ready at ${url}`);
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Esperar antes de reintentar
    }
  }
  throw new Error(`Server not ready at ${url} after ${timeout}ms`);
}
