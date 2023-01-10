const router = require('express').Router();
const OrdenController = require('../controllers/OrdenController');

router.post('/addOrden/', OrdenController.addOrden)
router.post('/addOrdenConsumo/', OrdenController.addOrdenConsumo);
router.post('/ordenTrackingUpdate/', OrdenController.ordenTrackingUpdate);
router.get('/',OrdenController.getOrdenes);
router.get('/proyectos/:id_cliente/:num_cotizacion', OrdenController.getProyectos);
router.get('/getOrdenbyId/:id_orden', OrdenController.getOrdenbyId);
router.get('/anularOrden/:id_orden', OrdenController.anularOrden);
router.get('/ordenTracking/:id_numero_orden', OrdenController.ordenTracking);
module.exports = router;