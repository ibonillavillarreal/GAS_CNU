//getCliente,  getClientes,  addCliente,  editCliente,  anularCliente,  activarCliente,  getClienteEdit
const Cargo = require('../controllers/CargoController');


const router = require('express').Router();
//router.get('/:id',Pais.getCliente);        // traer 1       
router.get('/', Cargo.getCargo);          // traer todos    
//        router.post('/',Pais.addCliente);          // crear Insertar  1
//        router.put('/:id',Pais.editCliente);       // editar 1 Update
//        router.patch('/:id',Pais.getClienteEdit);  // editar 1 Update
//        router.delete('/estado1/:id',Pais.anularCliente);   // eliminar 1 por update
//        router.delete('/estado0/:id',Pais.activarCliente);   // eliminar 0 por update
//
module.exports = router;
