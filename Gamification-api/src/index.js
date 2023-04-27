const express = require ('express')
const cors = require('cors');
const rolRoutes = require('./routes/Roles.routes')
const userRoutes = require('./routes/User.routes')



const app = express()

app.use(express.json())

// Configuración del CORS
app.use(cors());


app.use('/api/rol', rolRoutes)
app.use('/api/users', userRoutes)

app.listen(3000)

console.log('servidor htpp en el puerto 3000')