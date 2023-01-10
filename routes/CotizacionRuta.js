// getCotizacion, getCotizacions,addCotizacion,editCotizacion,anularCotizacion,getCotizacionEdit
const CotizacionController = require('../controllers/CotizacionController');

const router = require('express').Router();

router.get('/',CotizacionController.getCotizaciones);  
router.get('/edit/:id',CotizacionController.getCotizacion);  
router.get('/:id',CotizacionController.getCotizacion);  
router.post('/',CotizacionController.addCotizacion);  
router.put('/',CotizacionController.editCotizacion);
       // router.delete('/', CotizacionDelete );
       // router.patch('/', CotizacionPatch );

module.exports = router;
