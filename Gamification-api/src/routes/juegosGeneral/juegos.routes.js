const express = require('express')
const JuegosController = require('../../controllers/juegos/JuegosController')
const router = express.Router();

router.post('/guardar-instancia-juego', JuegosController.guardarInstanciaJuego)

router.get('/instancias-juego', JuegosController.getInstanciasJuego)
/*

router.get('/aula', JuegosController.getAulaByCodigo)

router.get('/mis-aulas-profesor', JuegosController.getMisAulasProfesor)

router.get('/mis-aulas-estudiante', JuegosController.getMisAulasEstudiante)

router.get('/miembros', JuegosController.getMiembros)
*/

module.exports = router;
