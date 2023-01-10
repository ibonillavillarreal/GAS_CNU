//getCliente,  getClientes,  addCliente,  editCliente,  anularCliente,  activarCliente,  getClienteEdit
const clienteController = require('../controllers/ClienteController');


const router = require('express').Router();
router.get('/:id', clienteController.getCliente);        // traer 1       
router.get('/Edit/:id', clienteController.getClienteEdit);        // traer 1       
router.get('/', clienteController.getClientes);          // traer todos    
router.post('/', clienteController.addCliente);
router.put('/', clienteController.editCliente);       // editar 1 Update
router.patch('/:id', clienteController.getClienteEdit);  // editar 1 Update
router.delete('/:id', clienteController.anularCliente);   // eliminar 1 por update
//

module.exports = router;
