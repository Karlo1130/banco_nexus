DROP DATABASE IF EXISTS banco_nexus;
CREATE DATABASE banco_nexus;
USE banco_nexus;

-- Eliminar tablas si ya existen (opcional para pruebas limpias)
DROP TABLE IF EXISTS transacciones;
DROP TABLE IF EXISTS cuentas;
DROP TABLE IF EXISTS clientes;

-- Crear tabla de clientes
CREATE TABLE clientes (
  curp VARCHAR(18) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

-- Crear tabla de cuentas
CREATE TABLE cuentas (
  cuenta_id VARCHAR(10) PRIMARY KEY,
  curp_cliente VARCHAR(18),
  saldo DECIMAL(10, 2) NOT NULL DEFAULT 0,
  FOREIGN KEY (curp_cliente) REFERENCES clientes(curp)
);

-- Crear tabla de transacciones
CREATE TABLE transacciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cuenta_id VARCHAR(10) NOT NULL,
  tipo ENUM('Deposito', 'Retiro') NOT NULL,
  monto DECIMAL(10, 2) NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  sucursal VARCHAR(50),
  FOREIGN KEY (cuenta_id) REFERENCES cuentas(cuenta_id)
);

-- Insertar datos de clientes
INSERT INTO clientes (curp, nombre) VALUES
('RUAA900101MDFRZN01', 'Ana Ruiz'),
('PELU850203HDFNRL02', 'Luis Pérez'),
('GAMM920514MDFRRN03', 'María García'),
('HEGC930812HDFVLS04', 'Carlos Hernández'),
('MASO870731MDFRNL05', 'Sofía Martínez'),
('TOHJ950215HDFMRZ06', 'Javier Torres'),
('CAFR960611MDFTRT07', 'Fernanda Castillo'),
('LODD990403HDFPRC08', 'Diego López'),
('MELR940927MDFPLN09', 'Laura Mendoza'),
('RAHU880619HDFSTS10', 'Hugo Ramírez');

-- Insertar datos de cuentas
INSERT INTO cuentas (cuenta_id, curp_cliente, saldo) VALUES
('001', 'RUAA900101MDFRZN01', 5000.00),
('002', 'PELU850203HDFNRL02', 8000.00),
('003', 'GAMM920514MDFRRN03', 6200.00),
('004', 'HEGC930812HDFVLS04', 7100.00),
('005', 'MASO870731MDFRNL05', 9300.00),
('006', 'TOHJ950215HDFMRZ06', 4800.00),
('007', 'CAFR960611MDFTRT07', 5700.00),
('008', 'LODD990403HDFPRC08', 8200.00),
('009', 'MELR940927MDFPLN09', 6650.00),
('010', 'RAHU880619HDFSTS10', 5100.00);

-- Insertar transacciones
INSERT INTO transacciones (cuenta_id, tipo, monto, sucursal) VALUES
('001', 'Deposito', 1000.00, 'CDMX'),
('001', 'Retiro',    200.00, 'CDMX'),
('002', 'Deposito', 3000.00, 'GDL');
