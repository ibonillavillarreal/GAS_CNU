
const MonedaController = require('../controllers/MonedaController');


const router = require('express').Router();
router.get('/', MonedaController.getMonedas);        // traer 1       

module.exports = router;
