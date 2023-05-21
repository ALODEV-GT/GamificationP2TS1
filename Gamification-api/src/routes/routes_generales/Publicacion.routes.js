const express = require('express')
const PublicacionController = require('../../controllers/general/PublicacionController')
const router = express.Router();

router.post('/guardar', PublicacionController.guardarPublicacion)
router.get('/publicaciones', PublicacionController.getPublicaciones)

module.exports = router;


