const express = require('express')
const curiosoController = require('../../controllers/curioso/curiosoController')



const router = express.Router();

router.post('/save-curioso',curiosoController.saveCurioso)

router.get('/get-titulo',curiosoController.getTitulosJuegoInstancia)

router.get('/get-preguntas',curiosoController.getPreguntaJuegoInstancia)

router.get('/get-opciones',curiosoController.getOpcionesJuegoInstancia)


router.post('/save-historial',curiosoController.guardarHistorial)

router.get('/listar-historial',curiosoController.listarHistorial)

router.get('/listar-historial-aula',curiosoController.listarHistorialAula)


module.exports = router;