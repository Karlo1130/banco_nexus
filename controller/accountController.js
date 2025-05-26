import { pool } from "../db.js";

export const getAccount = async (req, res) => {
  try {
    const { cuenta } = req.params;

    const [transactions] = await pool.query(
      `SELECT * FROM transacciones WHERE cuenta_id = ?`,
      [cuenta]
    );

    const [balance] = await pool.query(
      `SELECT * FROM cuentas WHERE cuenta_id = ?`,
      [cuenta]
    );

    res.json({
      transactions: transactions,
      balance: balance
    });
  } catch (error) {
    console.error('Error al obtener las transacciones: ', error);
    res.status(500).send('Ha ocurrido un error interno');
  }
};

export const postTransaction = async (req, res) => {
  try {
    const { type, value, branch } = req.body;
    const { cuenta } = req.params;

    if (!['deposito', 'retiro'].includes(type)) {
      return res.status(400).send('Tipo de transacción inválido');
    }

    // Verificar saldo si es retiro
    const [[cuentaInfo]] = await pool.query(
      `SELECT saldo FROM cuentas WHERE cuenta_id = ?`,
      [cuenta]
    );

    if (!cuentaInfo) {
      return res.status(404).send('Cuenta no encontrada');
    }

    if (type === 'retiro' && cuentaInfo.saldo < value) {
      return res.status(400).send('Saldo insuficiente');
    }

    await pool.query(
      `INSERT INTO transacciones (cuenta_id, tipo, monto, sucursal) VALUES (?, ?, ?, ?)`,
      [cuenta, type, value, branch]
    );

    const updateQuery = type === 'deposito'
      ? `UPDATE cuentas SET saldo = saldo + ? WHERE cuenta_id = ?`
      : `UPDATE cuentas SET saldo = saldo - ? WHERE cuenta_id = ?`;

    await pool.query(updateQuery, [value, cuenta]);

    res.status(201).send('Transacción validada');
  } catch (error) {
    console.error('Error al registrar la transacción: ', error);
    res.status(500).send('Ha ocurrido un error interno');
  }
};
