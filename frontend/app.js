const { useState } = React;

function App() {
  const [cuenta, setCuenta] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [movimiento, setMovimiento] = useState({ tipo: 'deposito', monto: '' });
  const [msg, setMsg] = useState(null);

  const consultarCuenta = async () => {
    if (!cuenta.trim()) {
      setError("Por favor ingresa un número de cuenta.");
      setData(null);
      return;
    }
    try {
      const res = await fetch(`/api/cuenta/${cuenta}`);
      if (!res.ok) throw new Error("Cuenta no encontrada o error en el servidor");
      const result = await res.json();
      setData(result);
      setError(null);
      setMsg(null);
    } catch (err) {
      setError(err.message);
      setData(null);
      setMsg(null);
    }
  };

  const handleMovimientoChange = (e) => {
    const { name, value } = e.target;
    setMovimiento(prev => ({ ...prev, [name]: value }));
  };

  const enviarMovimiento = async () => {
    setMsg(null);
    setError(null);

    if (!cuenta.trim()) {
      setError("Primero consulta una cuenta válida.");
      return;
    }

    if (!movimiento.monto || isNaN(movimiento.monto) || Number(movimiento.monto) <= 0) {
      setError("Ingresa un monto válido mayor a 0.");
      return;
    }

    try {
      const res = await fetch(`/api/transaction/${cuenta}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: movimiento.tipo,      // ahora es 'deposito' o 'retiro'
          value: Number(movimiento.monto)
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al procesar el movimiento");
      }
      setMsg(`Movimiento realizado: ${movimiento.tipo} de $${movimiento.monto}`);
      setMovimiento({ tipo: 'deposito', monto: '' });
      consultarCuenta();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="column">
        <h1>Consulta de Cuenta</h1>
        <input
          type="text"
          placeholder="Número de cuenta"
          value={cuenta}
          onChange={e => setCuenta(e.target.value)}
        />
        <button onClick={consultarCuenta}>Consultar</button>

        {error && <div className="error">{error}</div>}

        {data && (
          <>
            <div className="balance">Saldo actual: ${data.balance[0]?.saldo ?? 'No disponible'}</div>

            <h2>Movimientos</h2>
            {data.transactions.length === 0 && <p>No hay movimientos.</p>}
            {data.transactions.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Monto</th>
                    <th>Tipo</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {data.transactions.map(tx => (
                    <tr key={tx.transaccion_id}>
                      <td>{tx.transaccion_id}</td>
                      <td>${tx.monto}</td>
                      <td>{tx.tipo}</td>
                      <td>{new Date(tx.fecha).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>

      <div className="column">
        <h1>Nuevo Movimiento</h1>

        <label>Tipo de movimiento:</label>
        <select name="tipo" value={movimiento.tipo} onChange={handleMovimientoChange}>
          <option value="deposito">Depósito</option>
          <option value="retiro">Retiro</option>
        </select>

        <label>Monto:</label>
        <input
          type="number"
          name="monto"
          min="0"
          step="0.01"
          value={movimiento.monto}
          onChange={handleMovimientoChange}
          placeholder="Cantidad"
        />

        <button onClick={enviarMovimiento}>Enviar</button>

        {msg && <div className="success">{msg}</div>}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
