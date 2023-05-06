const express = require('express')
const controllerMemorama= require('../../controllers/memorama/memoramaController')

const router = express.Router();
router.post('/save-game',controllerMemorama.saveaMemorama)
router.get('/get-tema-juegos-creados', controllerMemorama.getTemasJuego)
router.get('/get-preguntas', controllerMemorama.getQuestions)
router.get('/get-respuestas',controllerMemorama.getRespuestas)


module.exports = router;