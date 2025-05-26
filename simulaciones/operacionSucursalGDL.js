import fetch from 'node-fetch';

const cuenta = '1001'; // Cambiar por una cuenta válida
const url = `http://localhost:5000/api/transaction/${cuenta}`;

const operacion = async () => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'deposito',
        value: 200,
        branch: 'GDL'
      })
    });

    const text = await res.text();
    console.log('GDL ->', text);
  } catch (err) {
    console.error('Error en GDL:', err.message);
  }
};

operacion();
