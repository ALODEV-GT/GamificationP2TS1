CREATE TABLE control_game_comido.game_config (
  id_gc SERIAL,
  id_instancia_juego INTEGER NOT NULL,
  palabra VARCHAR(30) NOT NULL,
  FOREIGN KEY(id_instancia_juego) REFERENCES control_general_juego.instancia_juego(id_instancia_juego),
  PRIMARY KEY(id_gc)
);

CREATE TABLE control_game_comido.pista(
  id_pista SERIAL,
  id_gc INTEGER NOT NULL,
  texto VARCHAR(250) NOT NULL,
  FOREIGN KEY (id_gc) REFERENCES control_game_comido.game_config(id_gc),
  PRIMARY KEY(id_pista)
);

CREATE TABLE control_game_comido.puntuacion(
  id_puntuacion SERIAL PRIMARY KEY,
  id_instancia_juego INTEGER NOT NULL,
  codigo_aula VARCHAR(20) NOT NULL,
  id_usuario INTEGER NOT NULL,
  puteo INTEGER NOT NULL,
  numero_errores INTEGER NOT NULL,
  puntos_perdidos INTEGER NOT NULL,
  FOREIGN KEY(id_instancia_juego) REFERENCES control_general_juego.instancia_juego(id_instancia_juego),
  FOREIGN KEY(codigo_aula) REFERENCES control_aulas.aula(codigo_aula),
  FOREIGN KEY(id_usuario) REFERENCES control_usuarios.usuario(id_usuario)
);
