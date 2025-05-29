import fetch from 'node-fetch';

export const operacionQRO = async () => {
  const res = await fetch('http://localhost:5000/api/transaction/001', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'retiro',
      value: 450,
      branch: 'QRO'
    })
  });
  const text = await res.text();
  console.log('QRO:', text);
  return text;
};