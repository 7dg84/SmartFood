-- Create database
CREATE DATABASE IF NOT EXISTS smartfood;

-- Select the database
USE smartfood;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- tabla de administradores del sistema
CREATE TABLE Administrador (
  id_admin UUID PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  contrasena VARCHAR(100),
  telefono VARCHAR(10)
);

-- reportes generados por los administradores
-- 
CREATE TABLE Reporte (
  id_reporte UUID PRIMARY KEY,
  tipo VARCHAR(50),
  contenido TEXT,
  fecha TIMESTAMP,
  id_admin UUID REFERENCES Administrador(id_admin)
);

-- productos disponibles en la cafeteria
CREATE TABLE Producto (
  id_producto UUID PRIMARY KEY,
  codigo VARCHAR(50),
  nombre VARCHAR(100),
  categoria enum('', '', '', '', ''),
  precio FLOAT,
  descripcion TEXT,
  -- cantidad INT
);

-- Cantidad de cada producto en el inventario
CREATE TABLE Inventario (
  id_inventario UUID PRIMARY KEY,
  id_producto UUID REFERENCES Producto(id_producto),
  cantidad_actual INT,
  stock_minimo INT,
  alerta BOOLEAN
);

-- Actualizaciones de los administradores y personal de cafeteria sobre el inventario
CREATE TABLE Movimiento (
  id_movimiento UUID PRIMARY KEY,
  id_producto UUID REFERENCES Producto(id_producto),
  tipo VARCHAR(50),
  cantidad INT,
  fecha TIMESTAMP, 
  id_admin UUID REFERENCES Administrador(id_admin),
    id_cafeteria UUID REFERENCES PersonalCafeteria(id_cafeteria),
    CONSTRAINT movimiento_actor_check CHECK (
      (CASE WHEN id_admin IS NULL THEN 0 ELSE 1 END) +
      (CASE WHEN id_cafeteria IS NULL THEN 0 ELSE 1 END) = 1
    )
);

-- personal de cafeteria
CREATE TABLE PersonalCafeteria (
  id_cafeteria UUID PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  contrasena VARCHAR(100),
  turno_inicio TIME,
  turno_fin TIME
);

-- ventas
CREATE TABLE Venta (
  id_venta UUID PRIMARY KEY,
  id_cafeteria UUID REFERENCES PersonalCafeteria(id_cafeteria),
  id_producto UUID REFERENCES Producto(id_producto),
  cantidad INT,
  total FLOAT,
  fecha TIMESTAMP,
  nombre_cliente VARCHAR(100)
);

-- alimentos con informacion nutricional para el catalogo
CREATE TABLE Alimento (
  id_alimento UUID PRIMARY KEY,
  nombre VARCHAR(100),
  categoria VARCHAR(50),
  descripcion TEXT,
  permitido BOOLEAN,
  informacion_nutricional TEXT,
  imagen VARCHAR(255), -- ruta de la imagen
  id_producto UUID REFERENCES Producto(id_producto), -- relacion con el producto de cafeteria
  sellos INT
);

-- usuarios de la aplicacion
CREATE TABLE Usuario (
  id_usuario UUID PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  contrasena VARCHAR(100),
  -- preferencias TEXT
);

CREATE TABLE Consulta (
  id_consulta UUID PRIMARY KEY,
  id_usuario UUID REFERENCES Usuario(id_usuario),
  id_alimento UUID REFERENCES Alimento(id_alimento),
  fecha TIMESTAMP
);

CREATE TABLE Favorito (
  id_favorito UUID PRIMARY KEY,
  id_usuario UUID REFERENCES Usuario(id_usuario),
  id_alimento UUID REFERENCES Alimento(id_alimento),
  fecha_transaccion TIMESTAMP
);

CREATE TABLE Calificacion (
  id_calificacion UUID PRIMARY KEY,
  id_usuario UUID REFERENCES Usuario(id_usuario),
  id_alimento UUID REFERENCES Alimento(id_alimento),
  fecha TIMESTAMP,
  comentario TEXT,
  valor INT
);

CREATE TABLE Recomendacion (
  id_recomendacion UUID PRIMARY KEY,
  id_usuario UUID REFERENCES Usuario(id_usuario),
  id_alimento UUID REFERENCES Alimento(id_alimento),
  fecha TIMESTAMP,
  motivo TEXT
);

CREATE TABLE Sugerencia (
  id_sugerencia UUID PRIMARY KEY,
  id_usuario UUID REFERENCES Usuario(id_usuario),
  texto TEXT,
  fecha TIMESTAMP,
  archivo VARCHAR(255)
);

CREATE TABLE Recursos (
  id_recurso UUID PRIMARY KEY,
  titulo VARCHAR(100),
  tipo enum('infografia', 'video', 'consejo'),
  descripcion TEXT,
)

CREATE TABLE Infografia (
  id_recurso UUID PRIMARY KEY REFERENCES Recursos(id_recurso),
  imagen VARCHAR(255), -- ruta de la imagen
)

CREATE TABLE Video (
  id_recurso UUID PRIMARY KEY REFERENCES Recursos(id_recurso),
  url VARCHAR(255),
)

CREATE TABLE Consejo (
  id_recurso UUID PRIMARY KEY REFERENCES Recursos(id_recurso),
  categoria VARCHAR(50), -- cabiar a enum
  texto TEXT,
)

CREATE TABLE ProgresoActividad (
  id_progreso UUID PRIMARY KEY,
  id_usuario UUID REFERENCES Usuario(id_usuario),
  id_recurso UUID REFERENCES Recursos(id_recurso),
  completado BOOLEAN,
  fecha TIMESTAMP
);

CREATE TABLE Trivia (
  id_trivia UUID PRIMARY KEY,
  titulo VARCHAR(100),
  descripcion TEXT,
)

CREATE TABLE Pregunta (
  id_pregunta UUID PRIMARY KEY,
  id_trivia UUID REFERENCES Trivia(id_trivia),
  texto TEXT,
  opcion_a VARCHAR(255),
  opcion_b VARCHAR(255),
  opcion_c VARCHAR(255),
  opcion_d VARCHAR(255),
  respuesta_correcta CHAR(1)
)

CREATE TABLE IntentoEncuesta (
  id_intento UUID PRIMARY KEY,
  id_usuario UUID REFERENCES Usuario(id_usuario),
  id_trivia UUID REFERENCES Trivia(id_trivia),
  fecha TIMESTAMP,
  puntaje INT
)