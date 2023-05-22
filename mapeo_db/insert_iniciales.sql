--ROLES
INSERT INTO control_usuarios.rol(nombre)  VALUES('Profesor');
INSERT INTO control_usuarios.rol(nombre)  VALUES('Estudiante');

--USUARIOS
INSERT INTO control_usuarios.usuario(nombre, usuario, apellido, contrasena, id_rol) VALUES(
    '----', 'profesor1', '----', 'contra123',1
);

INSERT INTO control_usuarios.usuario(nombre, usuario,apellido,contrasena, id_rol) VALUES(
    '----', 'estudiante', '----', 'contra123',2
);


--insercion juego memorama
INSERT INTO control_general_juego.juego(nombre, descripcion, img) VALUES (
    'Categorama','En Categorama, los jugadores se enfrentan a un desafío de memoria y categorías al mismo tiempo. El objetivo es encontrar las coincidencias entre las categorías y las cartas de memoria relacionadas. \n El juego se juega con una baraja de cartas que representan diferentes categorías, como animales mamíferos, ciudades famosas, objetos de cocina, etc. Cada carta tiene una palabra o elemento de esa categoría
    \n  las cartas de memoria se colocan boca abajo y se mezclan. Estas cartas tienen nombres de diferentes elementos dentro de la categoría elegida. Por ejemplo, si la categoría es >animales mamíferos<, las cartas de memoria podrían tener nombres de perros, gatos, elefantes, leones, etc.
    \n Los jugadores deben dar la vuelta a las cartas de memoria de una en una, tratando de encontrar las cartas que coinciden con la categoría mostrada
    Por ejemplo, si se muestra la categoría >animales mamíferos<, el jugador deberá buscar y emparejar las cartas de memoria que representen a los animales mamíferos.
    \n Cada vez que se encuentra un emparejamiento correcto, el jugador obtiene puntos. cada carta vale 10 puntos y cada vez que sea la equivocada esta carta se le restara un punto','/img/img_productos/32179.jpg'
)

INSERT INTO control_general_juego.tipo_juego(id_tipo_juego,nombre,descripcion) VALUES (1, 'Comido', 'Descripcion juego');
INSERT INTO control_general_juego.tipo_juego(id_tipo_juego,nombre,descripcion) VALUES(2,'Sopa de letras', 'Descripcion juego');
INSERT INTO control_general_juego.tipo_juego(id_tipo_juego,nombre,descripcion) VALUES(3,'Memorama', 'los jugadores se enfrentan a un desafío de memoria y categorías al mismo tiempo. El objetivo es encontrar las coincidencias entre las categorías y las cartas de memoria relacionadas. El juego se juega con una baraja de cartas que representan diferentes categorías, Cada carta tiene una palabra esa categoría');
INSERT INTO control_general_juego.tipo_juego(id_tipo_juego,nombre,descripcion) VALUES(4,'Curioso', 'Descripcion juego');

