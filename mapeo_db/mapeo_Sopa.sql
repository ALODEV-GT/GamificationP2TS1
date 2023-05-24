CREATE TABLE control_game_sopa.Titulo(
    id SERIAL PRIMARY KEY,
    id_instancia_juego INTEGER NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    id_user_creador INTEGER NOT NULL,
    nivel VARCHAR(30) NOT NULL,
    FOREIGN KEY (id_user_creador) REFERENCES control_usuarios.usuario(id_usuario),
    FOREIGN KEY (id_instancia_juego) REFERENCES control_general_juego.instancia_juego(id_instancia_juego)
);


CREATE TABLE control_game_sopa.Titulo_palabra(
    id SERIAL PRIMARY KEY,
    palabra VARCHAR(20) NOT NULL,
    id_titulo INTEGER NOT NULL,
    FOREIGN KEY (id_titulo) REFERENCES control_game_sopa.Titulo(id)
);


--puntuacion sopa

CREATE TABLE control_game_sopa.historial_partida_sopa(
    id SERIAL PRIMARY KEY,
    id_instancia_juego INTEGER NOT NULL,
    codigo_aula VARCHAR(20) NOT NULL,
    id_jugador INTEGER NOT NULL,
    puntuacion INTEGER NOT NULL,
    nivel VARCHAR(30) NOT NULL,
    FOREIGN KEY (id_jugador) REFERENCES control_usuarios.usuario(id_usuario),
    FOREIGN KEY(codigo_aula) REFERENCES control_aulas.aula(codigo_aula),
    FOREIGN KEY (id_instancia_juego) REFERENCES control_general_juego.instancia_juego(id_instancia_juego)
);

