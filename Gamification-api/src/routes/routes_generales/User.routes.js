const express = require('express')
const controllerUser = require('../../controllers/general/UserController')

const router = express.Router();

router.get('/get-user-sesion',controllerUser.getSesionUser)
router.post('/save-user',controllerUser.saveUser)


module.exports = router;