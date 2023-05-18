CREATE DATABASE gamication;

--eliminacion de la base de datos
--DROP DATABASE gamication;

--ingreso a la base de datos
\ c gamication

--esquemas
CREATE SCHEMA control_usuarios;

CREATE SCHEMA control_aulas;

CREATE SCHEMA control_comunicaciones;

CREATE SCHEMA control_notificaciones;

CREATE SCHEMA control_general_juego;

CREATE SCHEMA control_recursos;

CREATE SCHEMA control_game_memorama;

CREATE SCHEMA control_game_sopa;

CREATE SCHEMA control_game_preguntados;

CREATE SCHEMA control_game_comido;

CREATE TABLE control_usuarios.rol(
  id_rol SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL
);

CREATE TABLE control_usuarios.usuario(
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  usuario VARCHAR(50) NOT NULL UNIQUE,
  apellido VARCHAR(50) NOT NULL,
  contrasena VARCHAR(100) NOT NULL,
  id_rol INTEGER NOT NULL,
  FOREIGN KEY(id_rol) REFERENCES control_usuarios.rol(id_rol)
);

CREATE TABLE control_aulas.aula(
  codigo_aula VARCHAR(20) PRIMARY KEY,
  id_usuario_creador INTEGER NOT NULL,
  nombre VARCHAR(40) NOT NULL,
  archivado BOOLEAN NOT NULL,
  FOREIGN KEY(id_usuario_creador) REFERENCES control_usuarios.usuario(id_usuario)
);

CREATE TABLE control_aulas.asignacion(
  id_asignacion SERIAL PRIMARY KEY,
  id_usuario INTEGER NOT NULL,
  codigo_aula VARCHAR(20) NOT NULL,
  activo BOOLEAN NOT NULL,
  FOREIGN KEY(id_usuario) REFERENCES control_usuarios.usuario(id_usuario),
  FOREIGN KEY(codigo_aula) REFERENCES control_aulas.aula(codigo_aula)
);

CREATE TABLE control_comunicaciones.contenido_publicacion(
  id_contenido_publicacion SERIAL PRIMARY KEY,
  contenido VARCHAR(3000)
);

CREATE TABLE control_comunicaciones.publicacion(
  id_publicacion SERIAL PRIMARY KEY,
  id_usuario INTEGER NOT NULL,
  codigo_aula VARCHAR(20) NOT NULL,
  id_contenido_publicacion INTEGER NOT NULL,
  FOREIGN KEY(id_usuario) REFERENCES control_usuarios.usuario(id_usuario),
  FOREIGN KEY(codigo_aula) REFERENCES control_aulas.aula(codigo_aula),
  FOREIGN KEY(id_contenido_publicacion) REFERENCES control_comunicaciones.contenido_publicacion(id_contenido_publicacion)
);

CREATE TABLE control_comunicaciones.comentario(
  id_comentario SERIAL PRIMARY KEY,
  id_publicacion INTEGER NOT NULL,
  id_usuario INTEGER NOT NULL,
  comentario VARCHAR(3000) NOT NULL,
  FOREIGN KEY(id_publicacion) REFERENCES control_comunicaciones.publicacion(id_publicacion),
  FOREIGN KEY(id_usuario) REFERENCES control_usuarios.usuario(id_usuario)
);

CREATE TABLE control_comunicaciones.like(
  id_like SERIAL PRIMARY KEY,
  id_publicacion INTEGER NOT NULL,
  id_usuario INTEGER NOT NULL,
  FOREIGN KEY(id_publicacion) REFERENCES control_comunicaciones.publicacion(id_publicacion),
  FOREIGN KEY(id_usuario) REFERENCES control_usuarios.usuario(id_usuario)
);


--NOTIFICACIONES
CREATE TABLE control_notificaciones.noti_aceptado_aula(
  id_noti_aceptado_aula SERIAL PRIMARY KEY,
  id_usuario_noti INTEGER NOT NULL,
  id_asignacion INTEGER NOT NULL,
  visto BOOLEAN NOT NULL,
  FOREIGN KEY(id_asignacion) REFERENCES control_aulas.asignacion(id_asignacion),
  FOREIGN KEY(id_usuario_noti) REFERENCES control_usuarios.usuario(id_usuario)
);

CREATE TABLE control_notificaciones.noti_comentario(
  id_noti_comentario SERIAL PRIMARY KEY,
  id_usuario_noti INTEGER NOT NULL,
  id_comentario INTEGER NOT NULL,
  visto BOOLEAN NOT NULL,
  FOREIGN KEY(id_comentario) REFERENCES control_comunicaciones.comentario(id_comentario),
  FOREIGN KEY(id_usuario_noti) REFERENCES control_usuarios.usuario(id_usuario)
);

CREATE TABLE control_notificaciones.noti_like(
  id_noti_like SERIAL PRIMARY KEY,
  id_usuario_noti INTEGER NOT NULL,
  id_like INTEGER NOT NULL,
  visto BOOLEAN NOT NULL,
  FOREIGN KEY(id_like) REFERENCES control_comunicaciones.like(id_like),
  FOREIGN KEY(id_usuario_noti) REFERENCES control_usuarios.usuario(id_usuario)
);

CREATE TABLE control_notificaciones.noti_nueva_publicacion(
  id_noti_nueva_publicacion SERIAL PRIMARY KEY,
  id_usuario_noti INTEGER NOT NULL,
  id_publicacion INTEGER NOT NULL,
  visto BOOLEAN NOT NULL,
  FOREIGN KEY(id_publicacion) REFERENCES control_comunicaciones.publicacion(id_publicacion),
  FOREIGN KEY(id_usuario_noti) REFERENCES control_usuarios.usuario(id_usuario)
);

CREATE TABLE control_notificaciones.noti_expulsado(
  id_noti_expulsado SERIAL PRIMARY KEY,
  id_usuario_noti INTEGER NOT NULL,
  codigo_aula VARCHAR(20) NOT NULL,
  visto BOOLEAN NOT NULL,
  FOREIGN KEY(codigo_aula) REFERENCES control_aulas.aula(codigo_aula),
  FOREIGN KEY(id_usuario_noti) REFERENCES control_usuarios.usuario(id_usuario)
);

CREATE TABLE control_notificaciones.noti_nuevo_miembro(
  id_noti_nuevo_miembro SERIAL PRIMARY KEY,
  id_usuario_noti INTEGER NOT NULL,
  id_asignacion INTEGER NOT NULL,
  visto BOOLEAN NOT NULL,
  FOREIGN KEY(id_asignacion) REFERENCES control_aulas.asignacion(id_asignacion),
  FOREIGN KEY(id_usuario_noti) REFERENCES control_usuarios.usuario(id_usuario)
);

CREATE TABLE control_notificaciones.noti_solicitud_aula(
  id_noti_solicitud_aula SERIAL PRIMARY KEY,
  id_usuario_noti INTEGER NOT NULL,
  id_usuario_solicitante INTEGER NOT NULL,
  codigo_aula VARCHAR(20) NOT NULL,
  visto BOOLEAN NOT NULL,
  FOREIGN KEY(codigo_aula) REFERENCES control_aulas.aula(codigo_aula),
  FOREIGN KEY(id_usuario_noti) REFERENCES control_usuarios.usuario(id_usuario),
  FOREIGN KEY(id_usuario_solicitante) REFERENCES control_usuarios.usuario(id_usuario)
);

CREATE TABLE control_notificaciones.noti_retirado(
  id_noti_retirado SERIAL PRIMARY KEY,
  id_usuario_noti INTEGER NOT NULL,
  id_usuario_retirado INTEGER NOT NULL,
  codigo_aula VARCHAR(20) NOT NULL,
  visto BOOLEAN NOT NULL,
  FOREIGN KEY(codigo_aula) REFERENCES control_aulas.aula(codigo_aula),
  FOREIGN KEY(id_usuario_noti) REFERENCES control_usuarios.usuario(id_usuario),
  FOREIGN KEY(id_usuario_retirado) REFERENCES control_usuarios.usuario(id_usuario)
);

-- RECURSOS
CREATE TABLE control_recursos.imagen(
  id_imagen INTEGER PRIMARY KEY,
  direccion VARCHAR(350)
);

-- JUEGO GENERAL
CREATE TABLE control_general_juego.tipo_juego(
  id_tipo_juego SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(3000) NOT NULL,
  id_imagen INTEGER NOT NULL,
  FOREIGN KEY(id_imagen) REFERENCES control_recursos.imagen(id_imagen)
);

CREATE TABLE control_general_juego.instancia_juego(
  codigo_instancia_juego VARCHAR(20) PRIMARY KEY,
  nombre VARCHAR(250) NOT NULL,
  id_usuario_creador INTEGER NOT NULL,
  id_tipo_juego INTEGER NOT NULL,
  FOREIGN KEY (id_usuario_creador) REFERENCES control_usuarios.usuario(id_usuario),
  FOREIGN KEY (id_tipo_juego) REFERENCES control_general_juego.tipo_juego(id_tipo_juego)
);

CREATE TABLE control_general_juego.compartir_aula(
  id_compartir_aula SERIAL PRIMARY KEY,
  codigo_instancia_juego VARCHAR(20) NOT NULL,
  codigo_aula VARCHAR(20) NOT NULL,
  FOREIGN KEY (codigo_instancia_juego) REFERENCES control_general_juego.instancia_juego(codigo_instancia_juego),
  FOREIGN KEY (codigo_aula) REFERENCES control_aulas.aula(codigo_aula)
);
