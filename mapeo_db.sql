CREATE DATABASE gamication;


--ingreso a la base de datos
\c gamication

CREATE SCHEMA control_usuarios;

CREATE TABLE control_usuarios.rol(
    id SERIAL PRIMARY KEY,       
    tipo_rol SMALLINT NOT NULL,
    name_rol VARCHAR(50) NOT NULL
);

CREATE TABLE control_usuarios.usuario(
    id SERIAL PRIMARY KEY,       
    nombre VARCHAR(50) NOT NULL,
    nik_name VARCHAR(50) NOT NULL UNIQUE,
    apellido VARCHAR(50) NOT NULL,
    passworde VARCHAR(100) NOT NULL,
    rol INTEGER NOT NULL,
    FOREIGN KEY (rol) REFERENCES control_usuarios.rol(id)
);