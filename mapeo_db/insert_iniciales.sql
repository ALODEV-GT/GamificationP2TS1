INSERT INTO control_usuarios.rol(name_rol)  VALUES ('Profesor'),
('Estudiante');

INSERT INTO control_usuarios.usuario(nombre, nik_name,apellido,passworde, id_rol) VALUES(
    '----', 'Boot', '----', 'boot1234',1
);



--insercion juego memorama

INSERT INTO control_general_juego.juego(nombre, descripcion, img) VALUES (
    'Categorama','En Categorama, los jugadores se enfrentan a un desafío de memoria y categorías al mismo tiempo. El objetivo es encontrar las coincidencias entre las categorías y las cartas de memoria relacionadas. \n El juego se juega con una baraja de cartas que representan diferentes categorías, como animales mamíferos, ciudades famosas, objetos de cocina, etc. Cada carta tiene una palabra o elemento de esa categoría
    \n  las cartas de memoria se colocan boca abajo y se mezclan. Estas cartas tienen nombres de diferentes elementos dentro de la categoría elegida. Por ejemplo, si la categoría es >animales mamíferos<, las cartas de memoria podrían tener nombres de perros, gatos, elefantes, leones, etc.
    \n Los jugadores deben dar la vuelta a las cartas de memoria de una en una, tratando de encontrar las cartas que coinciden con la categoría mostrada
    Por ejemplo, si se muestra la categoría >animales mamíferos<, el jugador deberá buscar y emparejar las cartas de memoria que representen a los animales mamíferos.
    \n Cada vez que se encuentra un emparejamiento correcto, el jugador obtiene puntos. cada carta vale 10 puntos y cada vez que sea la equivocada esta carta se le restara un punto','/img/img_productos/32179.jpg' 
)