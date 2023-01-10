//usuariosGet,usuariosPost,usuariosPut,usuariosPatch,usuariosDelete,
const UsuarioController = require('../controllers/UsuarioController');

const  router  = require('express').Router();
       router.get('/',UsuarioController.usuariosGet);
       router.put('/:id',UsuarioController.usuariosPut);
       router.post('/',UsuarioController.usuariosPost);
       router.delete('/',UsuarioController.usuariosDelete);
       router.patch('/',UsuarioController.usuariosPatch); 
module.exports = router;


