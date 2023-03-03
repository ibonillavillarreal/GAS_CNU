const routerPersona = require('./PersonaRuta');
const routerAgenda = require('./AgendaRuta');
const routerUsuarioRuta = require('./UsuarioRuta');
const routerCargo = require('./CargoRuta');
const routerDepartamento = require('./DepartamentoRuta');
const routerMunicipio = require('./MunicipioRuta');
const routerSubCatalogos = require('./SubCatalogoRoute');
const routerMoneda = require('./MonedaRoute');
const routerItem = require('./ItemRoute');
const routerOrden = require('./OrdenRoute');
const routerTracking = require('./TrackingRoute')
const routerVnPrecio = require('./VnPrecioRoute')
const routerFactura = require('./FacturaRoute')
const routerCc = require('./CcRoute')

const router = require("express").Router();
      router.use('/Persona', routerPersona); 
      router.use('/Agenda', routerAgenda);
      router.use('/Cotizacion/ProyectoTipo/',routerAgenda);
      router.use('/Usuario', routerUsuarioRuta);
      router.use('/Cargo', routerCargo);
      router.use('/Departamento', routerDepartamento);
      router.use('/Municipio', routerMunicipio);
      router.use('/SubCatalogos', routerSubCatalogos);
      router.use('/Moneda', routerMoneda);
      router.use('/Item', routerItem);
      router.use('/Item/tipo/', routerItem);
      router.use('/Orden', routerOrden);
      router.use('/Tracking', routerTracking);
      router.use('/VnPrecio', routerVnPrecio);
      router.use('/Factura', routerFactura);
      router.use('/Cc', routerCc);
      
module.exports = router;

