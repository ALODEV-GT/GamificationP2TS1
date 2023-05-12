CREATE DATABASE gamication;


--ingreso a la base de datos
\c gamication

CREATE SCHEMA control_usuarios;
CREATE SCHEMA control_game_memorama;
CREATE SCHEMA control_general_juego;


CREATE TABLE control_usuarios.rol(
    id SERIAL PRIMARY KEY,       
    name_rol VARCHAR(50) NOT NULL
);

CREATE TABLE control_usuarios.usuario(
    id SERIAL PRIMARY KEY,       
    nombre VARCHAR(50) NOT NULL,
    nik_name VARCHAR(50) NOT NULL UNIQUE,
    apellido VARCHAR(50) NOT NULL,
    passworde VARCHAR(100) NOT NULL,
    id_rol INTEGER NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES control_usuarios.rol(id)
);

CREATE TABLE control_general_juego.juego(
    id SERIAL PRIMARY KEY, 
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(2000) NOT NULL,
    img VARCHAR(150) NOT NULL
);

CREATE TABLE control_general_juego.instancia_juego(
    id SERIAL PRIMARY KEY, 
    id_juego INTEGER NOT NULL,
    codigo VARCHAR(100) NOT NULL,
    id_logica_juego INTEGER NOT NULL,
    creador INTEGER NOT NULL,
    FOREIGN KEY (id_juego) REFERENCES control_general_juego.juego(id),
    FOREIGN KEY (creador) REFERENCES control_usuarios.usuario(id)
);

ALTER TABLE control_general_juego.instancia_juego ADD dificultad VARCHAR(20); 


CREATE TABLE control_general_juego.partida(
    id SERIAL PRIMARY KEY,
    punteo INTEGER NOT NULL,
    jugador INTEGER NOT NULL,
    id_instancia_juego INTEGER NOT NULL,
    FOREIGN KEY (jugador) REFERENCES control_usuarios.usuario(id),
    FOREIGN KEY (id_instancia_juego) REFERENCES control_general_juego.instancia_juego(id)
);
