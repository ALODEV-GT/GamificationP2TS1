const express = require('express')

//Configuracion cors
const cors = require('cors');

//Rutas
const rolRoutes = require('./routes/routes_generales/Roles.routes')
const userRoutes = require('./routes/routes_generales/User.routes')
const aulaRoutes = require('./routes/routes_generales/Aula.routes')
const publicacionRoutes = require('./routes/routes_generales/Publicacion.routes')
const notificacionRoutes = require('./routes/routes_generales/Notificacion.routes')
const asignacionRoutes = require('./routes/routes_generales/Asignacion.routes')
const comentarioRoutes = require('./routes/routes_generales/Comentario.routes')
const likeRoutes = require('./routes/routes_generales/Like.routes')


//juegos
const juegosRoutes = require('./routes/juegosGeneral/juegos.routes')
const memoramaRoutes = require('./routes/memorama/memorama.routes')
const comidoRoutes = require('./routes/comido/comido.routes')
const sopaRoutes = require('./routes/sopa/sopa.routes')


const app = express()

app.use(express.json())

// Configuración del CORS
app.use(cors());


app.use('/api/rol', rolRoutes)
app.use('/api/users', userRoutes)
app.use('/api/aulas', aulaRoutes)
app.use('/api/publicaciones', publicacionRoutes)
app.use('/api/notificaciones', notificacionRoutes)
app.use('/api/asignaciones', asignacionRoutes)
app.use('/api/comentarios', comentarioRoutes)
app.use('/api/likes', likeRoutes)

app.use('/api/juegos', juegosRoutes)
app.use('/api/memorama', memoramaRoutes)
app.use('/api/comido', comidoRoutes)
app.use('/api/sopa',sopaRoutes)

app.listen(3000)

console.log('servidor htpp en el puerto 3000')
