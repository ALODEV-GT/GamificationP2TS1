const express = require('express')
const controllerRol = require('../controllers/RolController')

const router = express.Router();

router.get('/get-roles',controllerRol.getRoles)

module.exports = router;