const express = require('express')
const controllerMemorama= require('../../controllers/memorama/memoramaController')

const router = express.Router();
router.post('/save-game',controllerMemorama.saveaMemorama)
router.get('/get-tema-juegos-creados', controllerMemorama.getTemasJuego)
router.get('/get-preguntas', controllerMemorama.getQuestions)
router.get('/get-respuestas',controllerMemorama.getRespuestas)
router.put('/set-dificultad',controllerMemorama.setDificultad)
router.get('/get-tema-memorama',controllerMemorama.getTemaMemorama)




module.exports = router;