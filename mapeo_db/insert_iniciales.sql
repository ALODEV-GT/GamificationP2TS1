--ROLES
INSERT INTO control_usuarios.rol(nombre) VALUES('Profesor');
INSERT INTO control_usuarios.rol(nombre) VALUES('Estudiante');

--USUARIOS
INSERT INTO control_usuarios.usuario(nombre, usuario, apellido, contrasena, id_rol) VALUES(
    'Jose', 'profesor1', 'Rodriguez', 'contra123',1
);

INSERT INTO control_usuarios.usuario(nombre, usuario,apellido,contrasena, id_rol) VALUES(
    'Melissa', 'estudiante1', 'Garcia', 'contra123',2
);

INSERT INTO control_general_juego.tipo_juego(id_tipo_juego,nombre,descripcion) VALUES(1,'Comido', 'Descripcion juego');

INSERT INTO control_general_juego.tipo_juego(id_tipo_juego,nombre,descripcion) VALUES(2,'Sopa de letras', 'Descripcion juego');

INSERT INTO control_general_juego.tipo_juego(id_tipo_juego,nombre,descripcion) VALUES(3,'Memorama', 'Los jugadores se enfrentan a un desafío de memoria y categorías al mismo tiempo. El objetivo es encontrar las coincidencias entre las categorías y las cartas de memoria relacionadas. El juego se juega con una baraja de cartas que representan diferentes categorías, Cada carta tiene una palabra esa categoría');

INSERT INTO control_general_juego.tipo_juego(id_tipo_juego,nombre,descripcion) VALUES(4,'Curioso', 'Descripcion juego');

