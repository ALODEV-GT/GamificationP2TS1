const express = require('express')
const sopaLetraController = require('../../controllers/sopa/sopaLetrasController')



const router = express.Router();
router.post('/save-sopa',sopaLetraController.saveaSopa)
router.get('/get-palabras',sopaLetraController.getPalabras)
router.get('/get-titulos',sopaLetraController.getTemasJuego)
router.get('/titulo-instancia',sopaLetraController.getTemasJuegoInstancia)
router.post('/save-historial',sopaLetraController.guardarHisotiral)
router.get('/listar-historial',sopaLetraController.listarHistorial)




module.exports = router;