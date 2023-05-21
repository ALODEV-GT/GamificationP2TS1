const express = require('express')
const AulaController = require('../../controllers/general/AulaController')
const router = express.Router();

router.post('/crear-nuevo', AulaController.guardarAula)

router.get('/validar', AulaController.validarCodigo)

router.get('/mis-aulas', AulaController.getMisAulas)

module.exports = router;
