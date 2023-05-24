const express = require('express')
const JuegosController = require('../../controllers/juegos/JuegosController')
const router = express.Router();

router.post('/guardar-instancia-juego', JuegosController.guardarInstanciaJuego)

router.get('/instancias-juego', JuegosController.getInstanciasJuego)

router.post('/guardar-compartir-aula', JuegosController.guardarCompartirAula)

router.get('/existe-compartir-aula', JuegosController.existeCompartirAula)

router.get('/all-compartir-aula', JuegosController.getAllCompartirAula)

module.exports = router;
