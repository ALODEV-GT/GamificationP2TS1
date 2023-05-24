
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

--algunas consultas
SELECT pregunta.* FROM control_game_memorama.pregunta AS pregunta
INNER JOIN control_game_memorama.Tema_pregunta AS asoci
ON pregunta.id = asoci.id_pregunta WHERE asoci.id_tema = 4;

SELECT respuesta.* FROM control_game_memorama.respuesta AS respuesta
INNER JOIN control_game_memorama.pregunta_respuesta AS asoci
ON respuesta.id = asoci.id_respuesta WHERE asoci.id_pregunta = 3;


SELECT tema.* FROM control_game_memorama.Tema AS tema
INNER JOIN control_general_juego.instancia_juego AS instancia
ON tema.codigo_instancia_juego = instancia.codigo_instancia_juego
WHERE instancia.id_usuario_creador=1;


SELECT user.nombre, user.apellido, user.usuario, partida.punteo, partida.dificultad FROM control_usuarios.usuario AS user
INNER JOIN control_game_memorama.punteo_partida_memorama AS partida
ON user.id_usuario = partida.id_usuario_juegador WHERE partida.codigo_aula = '123AA' AND partida.id_instancia_juego = 1;