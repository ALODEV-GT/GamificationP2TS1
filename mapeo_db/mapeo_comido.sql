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
