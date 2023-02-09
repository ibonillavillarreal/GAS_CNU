
const Cargo = require('../controllers/CargoController');

const router = require('express').Router();
router.get('/Claustro/Grado',Cargo.getGrado);        
router.get('/Claustro',Cargo.getClaustro);        
router.get('/', Cargo.getCargo);          

module.exports = router;
