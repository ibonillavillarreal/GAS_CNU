const VnPrecioController = require('../controllers/VnPrecioController');
const router = require('express').Router();

router.post('/addPrecio', VnPrecioController.addJsonArticuloPrecio);
router.get('/Clasificaciones', VnPrecioController.getClasificaciones);        // traer 1       
router.get('/NivelVersionActivas', VnPrecioController.getNivelVersionActivas);        // traer 1       
router.get('/Articulos', VnPrecioController.getArticulos);          // traer todos    
router.get('/Articulo/:id', VnPrecioController.getArticuloId);          // traer todos    
router.get('/ArticulosPrecios', VnPrecioController.getArticulosPrecios);          // traer todos    
router.get('/ArticulosPrecios/:id', VnPrecioController.getArticulosPreciosId);          // traer todos    
router.post('/ClientesPrecios', VnPrecioController.get_Cliente_precios);          // traer todos    
router.post('/ServicioCliente', VnPrecioController.addJson_Cliente_Precio);          // traer todos    

router.get('/spGet', VnPrecioController.getSp);
router.delete('Articulo/:id', VnPrecioController.delArticulo);   // eliminar 1 por update

module.exports = router;

