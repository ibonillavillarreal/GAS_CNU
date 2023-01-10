
const MunicipioController = require('../controllers/MunicipioController');

const router = require('express').Router();

router.get('/:id', MunicipioController.getMunicipio);
router.get('/Departamento/:id', MunicipioController.getMunicipios);

module.exports = router;



