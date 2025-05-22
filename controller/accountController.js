import { pool } from "../db.js"

export const getAccount = async (req, res) => {
    try {

        const {cuenta} = req.params
        
        const [transactions] = await pool.query(
            `SELECT * FROM transacciones
            WHERE cuenta_id = ?`,
            [cuenta]
        )

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

export const postTransaction = async (req, res) => {

    try {
        const {
            type,
            value
        } = req.body

        const {cuenta} = req.params

        await pool.query(
            `INSERT INTO transacciones 
            (cuenta_id, tipo, monto) VALUES (?, ?, ?)`,
            [cuenta, type, value]
        )

        const updateQuery = type === 'Deposito' 
            ? `UPDATE cuentas SET saldo = saldo + ? WHERE cuenta_id = ?`
            : `UPDATE cuentas SET saldo = saldo - ? WHERE cuenta_id = ?`;

        await pool.query(updateQuery, [value, cuenta]);

        res.status(201).send('Transaccion validada')

    } catch (error) {
        console.error('Error al registrar la transaccion: ', error)
        res.status(500).send('Ha ocurrido un error interno')
        
    }
}