//getCliente,  getClientes,  addCliente,  editCliente,  anularCliente,  activarCliente,  getClienteEdit
const personaController = require('../controllers/PersonaController');


const router = require('express').Router();
router.get('/:id', personaController.getCliente);        // traer 1       
router.get('/Edit/:id', personaController.getClienteEdit);        // traer 1       
router.get('/', personaController.getClientes);          // traer todos    
router.post('/', personaController.addCliente);
router.put('/', personaController.editPersona);       // editar 1 Update
router.patch('/:id', personaController.getClienteEdit);  // editar 1 Update
router.post('/Eliminar/', personaController.anularCliente);   // eliminar 1 por update
//

module.exports = router;
