
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
    id_user_creador INTEGER NOT NULL,
    cantidad_preguntas INTEGER NOT NULL,
    FOREIGN KEY (id_user_creador) REFERENCES control_usuarios.usuario(id)
);

CREATE TABLE control_game_memorama.Tema_pregunta(
    id SERIAL PRIMARY KEY, 
    id_pregunta INTEGER NOT NULL,
    id_tema INTEGER NOT NULL,
    FOREIGN KEY (id_tema) REFERENCES control_game_memorama.Tema(id),
    FOREIGN KEY (id_pregunta) REFERENCES control_game_memorama.pregunta(id)
); 
