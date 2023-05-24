
CREATE TABLE control_game_memorama.respuesta(
    id SERIAL PRIMARY KEY,
    respuesta VARCHAR(70) NOT NULL
);

CREATE TABLE control_game_memorama.pregunta(
    id SERIAL PRIMARY KEY,
    cantidad_respuestas INTEGER NOT NULL,
    pregunta VARCHAR(70) NOT NULL
);

CREATE TABLE control_game_memorama.pregunta_respuesta(
    id SERIAL PRIMARY KEY,
    id_pregunta INTEGER NOT NULL,
    id_respuesta INTEGER NOT NULL,
    FOREIGN KEY (id_pregunta) REFERENCES control_game_memorama.pregunta(id),
    FOREIGN KEY (id_respuesta) REFERENCES control_game_memorama.respuesta(id)
);

CREATE TABLE control_game_memorama.Tema(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    cantidad_preguntas INTEGER NOT NULL,
    dificultad VARCHAR(15) NOT NULL,
    id_instancia_juego INTEGER NOT NULL,
    FOREIGN KEY (id_instancia_juego) REFERENCES control_general_juego.instancia_juego(id_instancia_juego)
);

CREATE TABLE control_game_memorama.Tema_pregunta(
    id SERIAL PRIMARY KEY,
    id_pregunta INTEGER NOT NULL,
    id_tema INTEGER NOT NULL,
    FOREIGN KEY (id_tema) REFERENCES control_game_memorama.Tema(id),
    FOREIGN KEY (id_pregunta) REFERENCES control_game_memorama.pregunta(id)
);

CREATE TABLE control_game_memorama.punteo_partida_memorama(
    id SERIAL PRIMARY KEY,
    id_instancia_juego INTEGER NOT NULL,
    codigo_aula VARCHAR(20) NOT NULL,
    id_usuario_juegador INTEGER NOT NULL,
    punteo INTEGER NOT NULL,
    dificultad VARCHAR(15) NOT NULL,
    FOREIGN KEY (id_usuario_juegador) REFERENCES control_usuarios.usuario(id_usuario),
    FOREIGN KEY(codigo_aula) REFERENCES control_aulas.aula(codigo_aula),
    FOREIGN KEY (id_instancia_juego) REFERENCES control_general_juego.instancia_juego(id_instancia_juego)
);
