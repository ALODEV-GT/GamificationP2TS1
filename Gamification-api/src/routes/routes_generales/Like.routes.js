const express = require('express')
const LikeController = require('../../controllers/general/LikeController')
const router = express.Router();

router.post('/guardar', LikeController.guardarLike)

router.get('/cantidad', LikeController.getCantidadLikes)

router.delete('/dislike', LikeController.dislike)

module.exports = router;
