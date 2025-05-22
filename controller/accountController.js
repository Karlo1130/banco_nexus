import { pool } from "../db.js"

export const getAccount = async (req, res) => {
    try {

        const {cuenta} = req.params
        

        const [transactions] = await pool.query(`SELECT * FROM transacciones WHERE cuenta_origen = ?`, [cuenta])
        const [balance] = await pool.query(`SELECT * FROM cuentas WHERE cuenta_id = ?`, [cuenta])

        console.log(transactions);
        console.log(balance);
        
        res.json({
            transactions: transactions,
            balance: balance
        })
        
    } catch (error) {
        console.error('Error al obtener las transacciones: ', error)
        res.status(500).send('Ha ocurrido un error interno')
    }
}