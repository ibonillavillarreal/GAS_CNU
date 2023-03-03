
const AgendaController= require('../controllers/AgendaController');

const router = require('express').Router();

router.get('/',AgendaController.getAgenda);  
router.get('/:id',AgendaController.getAgendaId); 
router.get('/get/nro/',AgendaController.getNroAgenda); 
router.post('/',AgendaController.add_Agenda);  
router.put('/',AgendaController.EditAgenda);
router.delete('/:id',AgendaController.DelEditMiembroAgenda);  

module.exports = router;
