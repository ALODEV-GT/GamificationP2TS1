CREATE TABLE control_game_comido.game_config (
  id_gc SERIAL,
  palabra VARCHAR(30) NOT NULL,
  PRIMARY KEY(id_gc)
);

CREATE TABLE control_game_comido.pista(
  id_pista SERIAL,
  id_gc INTEGER NOT NULL,
  texto VARCHAR(250) NOT NULL,
  FOREIGN KEY (id_gc) REFERENCES control_game_comido.game_config(id_gc),
  PRIMARY KEY(id_pista)
);
