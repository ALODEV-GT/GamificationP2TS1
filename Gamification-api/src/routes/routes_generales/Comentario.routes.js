const express = require('express')
const ComentarioController = require('../../controllers/general/ComentarioController')
const router = express.Router();

router.post('/guardar', ComentarioController.guardarComentario)

router.get('/comentarios', ComentarioController.getComentarios)

router.get('/cantidad', ComentarioController.getCantidadComentarios)

module.exports = router;
