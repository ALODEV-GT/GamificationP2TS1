const express = require('express')
const controllerMemorama= require('../../controllers/memorama/memoramaController')

const router = express.Router();
router.post('/save-game',controllerMemorama.saveaMemorama)

module.exports = router;