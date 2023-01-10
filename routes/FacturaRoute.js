const VnFacturasController = require('../controllers/FacturaController');
const router = require('express').Router();


router.post('/addJsonFactura', VnFacturasController.addJsonFactura);          // traer todos    
router.post('/add_Json_FacturaItems', VnFacturasController.add_Json_FacturaItems);          // traer todos   
router.post('/get_parametros', VnFacturasController.get_parametros_pagos );          // traer todos   

router.get('/getFacturaListado', VnFacturasController.getFacturaListado);
router.get('/getTipoFacturacion', VnFacturasController.getTipoFacturacion);
router.get('/ordenTracking/:id_factura', VnFacturasController.ordenTracking);
router.get('/estacionrastreo/:num',VnFacturasController.getfacturaEstacion);  

router.post('/tasaKambio', VnFacturasController.gettasaKambio);          // traer todos    
router.post('/ordenTrackingUpdate/', VnFacturasController.ordenTrackingUpdate);

module.exports = router;


