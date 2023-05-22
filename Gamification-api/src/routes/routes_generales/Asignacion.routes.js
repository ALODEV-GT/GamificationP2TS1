const express = require('express')
const AsignacionController = require('../../controllers/general/AsignacionController')
const router = express.Router();

router.post('/guardar', AsignacionController.guardarAsignacion)

/*
router.get('/existe', AsignacionController.existeAula)

router.get('/aula', AsignacionController.getAulaByCodigo)

router.get('/mis-aulas', AsignacionController.getMisAulas)
*/
module.exports = router;
