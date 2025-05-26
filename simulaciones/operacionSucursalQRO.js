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
        value: 150,
        branch: 'QRO'
      })
    });

    const text = await res.text();
    console.log('QRO ->', text);
  } catch (err) {
    console.error('Error en QRO:', err.message);
  }
};

operacion();
