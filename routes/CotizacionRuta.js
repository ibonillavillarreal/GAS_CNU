

const AgendaController = require('../controllers/CotizacionController');

const router = require('express').Router();

router.get('/',AgendaController.getAgenda);  
router.get('/edit/:id',AgendaController.getCotizacion);  
router.get('/:id',AgendaController.getCotizacion);  
router.post('/',AgendaController.addCotizacion);  
router.put('/',AgendaController.editCotizacion);
       // router.delete('/', CotizacionDelete );
       // router.patch('/', CotizacionPatch );

module.exports = router;
