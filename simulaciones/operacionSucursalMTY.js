import fetch from 'node-fetch';

const cuenta = '1001'; // Cambiar por una cuenta válida
const url = `http://localhost:5000/api/transaction/${cuenta}`;

const operacion = async () => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'retiro',
        value: 50,
        branch: 'MTY'
      })
    });

    const text = await res.text();
    console.log('MTY ->', text);
  } catch (err) {
    console.error('Error en MTY:', err.message);
  }
};

operacion();
