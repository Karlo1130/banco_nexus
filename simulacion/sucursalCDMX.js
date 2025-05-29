import fetch from 'node-fetch';

export const operacionCDMX = async () => {
  const res = await fetch('http://localhost:5000/api/transaction/001', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'retiro',
      value: 300,
      branch: 'CDMX'
    })
  });
  const text = await res.text();
  console.log('CDMX:', text);
  return text;
};