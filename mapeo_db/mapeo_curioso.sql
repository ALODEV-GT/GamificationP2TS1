CREATE SCHEMA control_game_preguntados;

CREATE TABLE control_game_preguntados.Titulo(
    id SERIAL PRIMARY KEY, 
    id_instancia_juego INTEGER NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    id_user_creador INTEGER NOT NULL,
    FOREIGN KEY (id_user_creador) REFERENCES control_usuarios.usuario(id_usuario),
    FOREIGN KEY (id_instancia_juego) REFERENCES control_general_juego.instancia_juego(id_instancia_juego)
);

 CREATE TABLE control_game_preguntados.Pregunta(
    id SERIAL PRIMARY KEY, 
    id_titulo INTEGER NOT NULL,
    pregunta VARCHAR(400) NOT NULL,
    respuesta VARCHAR(400) NOT NULL,
    FOREIGN KEY (id_titulo) REFERENCES control_game_preguntados.Titulo(id)
 );


 CREATE TABLE control_game_preguntados.Opciones(
    id SERIAL PRIMARY KEY, 
    id_pregunta INTEGER NOT NULL,
    opcion VARCHAR(400) NOT NULL,
FOREIGN KEY (id_pregunta) REFERENCES control_game_preguntados.Pregunta(id)
 );


CREATE TABLE control_game_preguntados.historial_partida_curioso(
    id SERIAL PRIMARY KEY, 
    id_instancia_juego INTEGER NOT NULL,
    codigo_aula VARCHAR(20) NOT NULL,
    id_jugador INTEGER NOT NULL,
    puntuacion INTEGER NOT NULL,
    total_aciertos INTEGER NOT NULL,
    FOREIGN KEY (id_jugador) REFERENCES control_usuarios.usuario(id_usuario),
    FOREIGN KEY(codigo_aula) REFERENCES control_aulas.aula(codigo_aula),
    FOREIGN KEY (id_instancia_juego) REFERENCES control_general_juego.instancia_juego(id_instancia_juego)


);



