const express = require('express')
const AulaController = require('../../controllers/general/AulaController')
const router = express.Router();

router.post('/crear-nuevo', AulaController.guardarAula)

router.get('/existe', AulaController.existeAula)

router.get('/aula', AulaController.getAulaByCodigo)

router.get('/mis-aulas-profesor', AulaController.getMisAulasProfesor)

router.get('/mis-aulas-estudiante', AulaController.getMisAulasEstudiante)

router.get('/miembros', AulaController.getMiembros)

module.exports = router;
