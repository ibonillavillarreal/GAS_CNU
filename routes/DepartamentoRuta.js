
const departamentoController = require('../controllers/DepartamentoController');

const router = require('express').Router();
router.get('/:id', departamentoController.getDepartamento);
router.get('/Pais/:id', departamentoController.getDepartamentos);

module.exports = router;



