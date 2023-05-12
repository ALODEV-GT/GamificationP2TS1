const express = require('express')
const router = express.Router();
const controllerComido = require('../../controllers/comido/comidoController')

router.post('/save-game', controllerComido.saveComido)

module.exports = router;
