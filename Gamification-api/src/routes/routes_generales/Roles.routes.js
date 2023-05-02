const express = require('express')
const controllerRol = require('../../controllers/general/RolController')

const router = express.Router();

router.get('/get-roles',controllerRol.getRoles)

module.exports = router;