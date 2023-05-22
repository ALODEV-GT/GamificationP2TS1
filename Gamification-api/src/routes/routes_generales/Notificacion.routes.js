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


module.exports = router;
