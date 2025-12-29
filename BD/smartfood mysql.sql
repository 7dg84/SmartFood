-- Create database
CREATE DATABASE IF NOT EXISTS smartfood;

-- Select the database
USE smartfood;


-- tabla de administradores del sistema
CREATE TABLE Administrador (
  id_admin CHAR(36) PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  contrasena VARCHAR(100),
  telefono VARCHAR(10)
);

-- reportes generados por los administradores
-- 
CREATE TABLE Reporte (
  id_reporte CHAR(36) PRIMARY KEY,
  tipo VARCHAR(50),
  contenido TEXT,
  fecha TIMESTAMP,
  id_admin CHAR(36),
  FOREIGN KEY (id_admin) REFERENCES Administrador(id_admin)
);

-- productos disponibles en la cafeteria
CREATE TABLE Producto (
  id_producto CHAR(36) PRIMARY KEY,
  codigo VARCHAR(50),
  nombre VARCHAR(100),
  categoria VARCHAR(50),
  precio FLOAT,
  descripcion TEXT,
  -- cantidad INT
);

-- Cantidad de cada producto en el inventario
CREATE TABLE Inventario (
  id_inventario CHAR(36) PRIMARY KEY,
  id_producto CHAR(36),
  cantidad_actual INT,
  stock_minimo INT,
  alerta BOOLEAN
);

-- Actualizaciones de los administradores y personal de cafeteria sobre el inventario
CREATE TABLE Movimiento (
  id_movimiento CHAR(36) PRIMARY KEY,
  id_producto CHAR(36),
  tipo VARCHAR(50),
  cantidad INT,
  fecha TIMESTAMP,
  id_admin CHAR(36),
  id_cafeteria CHAR(36),
  CONSTRAINT movimiento_actor_check CHECK (
    (CASE WHEN id_admin IS NULL THEN 0 ELSE 1 END) +
    (CASE WHEN id_cafeteria IS NULL THEN 0 ELSE 1 END) = 1
  )
);

-- personal de cafeteria
CREATE TABLE PersonalCafeteria (
  id_cafeteria CHAR(36) PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  contrasena VARCHAR(100),
  turno_inicio TIME,
  turno_fin TIME
);

-- alimentos con informacion nutricional para el catalogo
CREATE TABLE Alimento (
  id_alimento CHAR(36) PRIMARY KEY,
  nombre VARCHAR(100),
  categoria VARCHAR(50),
  descripcion TEXT,
  permitido BOOLEAN,
  informacion_nutricional TEXT,
  imagen VARCHAR(255), -- ruta de la imagen
  id_producto CHAR(36), -- relacion con el producto de cafeteria
  sellos INT
);

-- usuarios de la aplicacion
CREATE TABLE Usuario (
  id_usuario CHAR(36) PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  contrasena VARCHAR(100),
  -- preferencias TEXT
);

CREATE TABLE Consulta (
  id_consulta CHAR(36) PRIMARY KEY,
  id_usuario CHAR(36),
  id_alimento CHAR(36),
  fecha TIMESTAMP
);

CREATE TABLE Favorito (
  id_favorito CHAR(36) PRIMARY KEY,
  id_usuario CHAR(36),
  id_alimento CHAR(36),
  fecha_transaccion TIMESTAMP
);

CREATE TABLE Calificacion (
  id_calificacion CHAR(36) PRIMARY KEY,
  id_usuario CHAR(36),
  id_alimento CHAR(36),
  fecha TIMESTAMP,
  comentario TEXT,
  valor INT
);

CREATE TABLE Recomendacion (
  id_recomendacion CHAR(36) PRIMARY KEY,
  id_usuario CHAR(36),
  id_alimento CHAR(36),
  fecha TIMESTAMP,
  motivo TEXT
);

CREATE TABLE Sugerencia (
  id_sugerencia CHAR(36) PRIMARY KEY,
  id_usuario CHAR(36),
  texto TEXT,
  fecha TIMESTAMP,
  archivo VARCHAR(255)
);

CREATE TABLE RecursoEducativo (
  id_recurso CHAR(36) PRIMARY KEY,
  titulo VARCHAR(200),
  tipo VARCHAR(50),
  descripcion TEXT
);

CREATE TABLE Actividad (
  id_actividad CHAR(36) PRIMARY KEY,
  id_recurso CHAR(36),
  tipo VARCHAR(50),
  contenido TEXT,
  orden INT
);

CREATE TABLE ProgresoActividad (
  id_progreso CHAR(36) PRIMARY KEY,
  id_usuario CHAR(36),
  id_actividad CHAR(36),
  completado BOOLEAN,
  fecha TIMESTAMP
);

CREATE TABLE Encuesta (
  id_encuesta CHAR(36) PRIMARY KEY,
  preguntas TEXT
);

CREATE TABLE EncuestaActividad (
  id_encuesta_actividad CHAR(36) PRIMARY KEY,
  id_encuesta CHAR(36),
  id_usuario CHAR(36),
  fecha TIMESTAMP,
  resultados TEXT
);
