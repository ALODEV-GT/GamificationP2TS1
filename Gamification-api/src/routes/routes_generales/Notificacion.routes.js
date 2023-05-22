const express = require('express')
const NotificacionController = require('../../controllers/general/NotificacionController')
const router = express.Router();

router.post('/guardar-noti-solicitu-aula', NotificacionController.guardarNotiSolicitudAula)
router.get('/get-noti-solicitudes-aula', NotificacionController.getNotiSolicitudesAula)
router.get('/existe-noti-solicitud-aula', NotificacionController.existeNotiSolicitudAula)
router.put('/set-visto-noti-solicitud-aula', NotificacionController.setVistoNotiSolicitudAula)

router.post('/guardar-noti-aceptado-aula', NotificacionController.guardarNotiAceptadoAula)
router.get('/get-notis-aceptado-aula', NotificacionController.getNotisAceptadoAula)

router.post('/guardar-noti-rechazado-aula', NotificacionController.guardarNotiRechazadoAula)
router.get('/get-notis-rechazado-aula', NotificacionController.getNotisRechazadoAula)

router.post('/guardar-noti-comentario', NotificacionController.guardarNotiComentario)
router.get('/get-notis-comentarios', NotificacionController.getNotisComentarios)

router.post('/guardar-noti-like', NotificacionController.guardarNotiLike)
router.get('/get-notis-likes', NotificacionController.getNotisLikes)
router.delete('/quitar-noti-like', NotificacionController.quitarNotiLike)

module.exports = router;
