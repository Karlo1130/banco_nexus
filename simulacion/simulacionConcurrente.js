import fetch from 'node-fetch';
import { operacionCDMX } from './sucursalCDMX.js';
import { operacionGDL } from './sucursalGDL.js';
import { operacionMTY } from './sucursalMTY.js';
import { operacionTIJ } from './sucursalTIJ.js';
import { operacionQRO } from './sucursalQRO.js';

const runSimultaneo = async () => {
  console.log('Iniciando operaciones simultáneas...\n');

  const resultados = await Promise.allSettled([
    operacionCDMX(),
    operacionGDL(),
    operacionMTY(),
    operacionTIJ(),
    operacionQRO(),
  ]);

  const nombres = ['CDMX', 'GDL', 'MTY', 'TIJ', 'QRO'];
  console.log('\nResultados de operaciones:');
  resultados.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      console.log(`Sucursal ${nombres[i]}: ÉXITO -> ${r.value}`);
    } else {
      console.log(`Sucursal ${nombres[i]}: ERROR -> ${r.reason}`);
    }
  });

  await mostrarSaldoFinal();
};

const mostrarSaldoFinal = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/cuenta/001');
    if (!res.ok) {
      console.log('No se pudo obtener el estado final de la cuenta.');
      return;
    }

    const data = await res.json();
    console.log('\n💰 Saldo final en cuenta 001:', data.balance[0]?.saldo);

    console.log('\n📜 Historial de transacciones:');
    data.transactions.forEach(tx => {
      console.log(`${tx.fecha} | ${tx.tipo} $${tx.monto} | ${tx.sucursal}`);
    });
  } catch (err) {
    console.log('Error al consultar el saldo final:', err.message);
  }
};

runSimultaneo();