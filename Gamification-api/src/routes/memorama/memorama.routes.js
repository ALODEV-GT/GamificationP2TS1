const express = require('express')
const controllerMemorama= require('../../controllers/memorama/memoramaController')

const router = express.Router();
router.post('/save-game',controllerMemorama.saveaMemorama)
router.get('/get-tema-juegos-creados', controllerMemorama.getTemasJuego)
router.get('/get-preguntas', controllerMemorama.getQuestions)
router.get('/get-respuestas',controllerMemorama.getRespuestas)
router.put('/set-dificultad',controllerMemorama.setDificultad)
router.get('/get-tema-memorama',controllerMemorama.getTemaMemorama)
router.get('/get-tema-memorama-intancia-Juego',controllerMemorama.getTemaJuegoIdInstancia)
router.post('/save-punteo-memorama',controllerMemorama.guardarPuntaje)
router.get('/get-codigo-aula',controllerMemorama.getCodigoAulaPuntacionesDePartida)
router.get('/get-puntajes-jugadores',controllerMemorama.getListPuntajesAulaInstaicaJuego)







module.exports = router;