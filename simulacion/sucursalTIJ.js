import fetch from 'node-fetch';

export const operacionTIJ = async () => {
  const res = await fetch('http://localhost:5000/api/transaction/001', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'deposito',
      value: 700,
      branch: 'TIJ'
    })
  });
  const text = await res.text();
  console.log('TIJ:', text);
  return text;
};