const router = require("express").Router();
const CcController = require('../controllers/CcController');

router.get('/Plazos', CcController.getPlazos);

module.exports = router;