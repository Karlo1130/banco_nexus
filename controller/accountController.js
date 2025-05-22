import { pool } from "../db.js"

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión exitosa a MySQL!');
        connection.release();
        
        // Prueba adicional: consulta simple
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('Resultado de prueba:', rows[0].result);
    } catch (error) {
        console.error('Error de conexión:', error);
    } finally {
        await pool.end();
    }
}

testConnection();

export const getTransactions = async (req, res) => {
    try {
        const [transactions] = await pool.query('SELECT * FROM transacciones')
        
        res.json(transactions)
        
    } catch (error) {
        console.error('Error al obtener las transacciones: ', error)
        res.status(500).send('Ha ocurrido un error interno')
    }
}