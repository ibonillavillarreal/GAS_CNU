

const AgendaController = require('../controllers/CotizacionController');

const router = require('express').Router();

router.get('/',AgendaController.getAgenda);  
router.get('/edit/:id',AgendaController.getCotizacionEdit);  
router.get('/:id',AgendaController.getAgendaId); 
router.get('/get/nro/',AgendaController.getNroAgenda); 
router.post('/',AgendaController.add_Agenda);  
router.put('/',AgendaController.editCotizacion);

module.exports = router;
