import fetch from 'node-fetch';

export const operacionGDL = async () => {
  const res = await fetch('http://localhost:5000/api/transaction/001', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'retiro',
      value: 250,
      branch: 'GDL'
    })
  });
  const text = await res.text();
  console.log('GDL:', text);
  return text;
};