import { pool } from "../db.js"

export const getTransactions = async (req, res) => {
    try {
        const [transactions] = await pool.query('SELECT * FROM transacciones')
        
        res.json(transactions)
        
    } catch (error) {
        console.error('Error al obtener las transacciones: ', error)
        res.status(500).send('Ha ocurrido un error interno')
    }
}