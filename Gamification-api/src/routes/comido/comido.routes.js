const express = require('express')
const router = express.Router();
const controllerComido = require('../../controllers/comido/comidoController')

router.post('/save-game', controllerComido.saveComido)

router.get('/cofings-game', controllerComido.getCofigsGame)

router.get('/puntuaciones', controllerComido.getPuntuaciones)

router.post('/guardar-punteo', controllerComido.guardarPunteo)

module.exports = router;
