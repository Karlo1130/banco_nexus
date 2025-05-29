import fetch from 'node-fetch';

export const operacionMTY = async () => {
  const res = await fetch('http://localhost:5000/api/transaction/001', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'retiro',
      value: 500,
      branch: 'MTY'
    })
  });
  const text = await res.text();
  console.log('MTY:', text);
  return text;
};