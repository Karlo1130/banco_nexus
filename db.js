import { createPool } from "mysql2/promise";
import { config } from "dotenv";
import { setTimeout } from "timers/promises"

config();

const ports = process.env.DB_PORTS.split(',').map(port => parseInt(port.trim()))

if (ports.some(isNaN)) {
  throw new Error("DB_PORTS contiene valores no numéricos");
}

const baseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 2000
}

const nodePools = ports.map(port => {
  return createPool({
    ...baseConfig,
    host: process.env.DB_HOST,
    port: port
  });
});

async function executeWithRetry(query, values, retries = ports.length - 1) {
  let lastError = null;

  for (let i = 0; i < nodePools.length; i++) {
    try {
      const [result] = await nodePools[i].query(query, values);
      return result;
    } catch (error) {
      lastError = error;
      console.warn(`Falló nodo en puerto ${ports[i]}, intentando siguiente nodo...`);
      
      // Esperar un breve momento antes de reintentar (opcional)
      if (i < nodePools.length - 1) {
        await setTimeout(500); // 500ms de espera
      }
    }
  }

  throw lastError || new Error("Todos los nodos MySQL fallaron");
}

export const pool = {
  query: async (query, values) => {
    return executeWithRetry(query, values);
  },

  getConnection: async () => {
    for (let i = 0; i < nodePools.length; i++) {
      try {
        return await nodePools[i].getConnection();
      } catch (error) {
        console.warn(`No se pudo obtener conexión del nodo ${ports[i]}`);
        if (i === nodePools.length - 1) throw error;
      }
    }
    throw new Error("No se pudo obtener conexión de ningún nodo");
  },

  end: async () => {
    await Promise.all(nodePools.map(p => p.end()));
  },

  checkStatus: async () => {
    const statuses = await Promise.all(
      nodePools.map(async (pool, index) => {
        try {
          await pool.query('SELECT 1');
          return { port: ports[index], status: 'healthy' };
        } catch (error) {
          return { port: ports[index], status: 'unhealthy', error: error.message };
        }
      })
    );
    return statuses;
  }
};