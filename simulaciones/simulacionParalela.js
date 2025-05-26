////////////////ESTE ES EL QUE SE CORRE PARA QUE JALEN TODOS A LA VEZ ///////////////////////

import { exec } from 'child_process';

const scripts = [
  'operacionSucursalCDMX.js',
  'operacionSucursalGDL.js',
  'operacionSucursalMTY.js',
  'operacionSucursalQRO.js',
  'operacionSucursalTIJ.js',

];

scripts.forEach(script => {
  exec(`node ${script}`, (error, stdout, stderr) => {
    if (error) return console.error(`Error ejecutando ${script}:`, error.message);
    if (stderr) return console.error(`STDERR (${script}):`, stderr);
    console.log(`STDOUT (${script}):`, stdout);
  });
});
