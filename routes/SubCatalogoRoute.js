const subCatalogosController = require('../controllers/SubCatalogoController');


const router = require('express').Router();
router.get('/TipoCliente', subCatalogosController.getListTipoCliente);         
router.get('/Contribuyentes', subCatalogosController.getListContribuyente);          
router.post('/idSubEstEncuesta', subCatalogosController.get_Sub_Estados_Cotizacion);          

//
module.exports = router;


