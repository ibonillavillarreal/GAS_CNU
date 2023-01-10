

const DB_VnPrecio = require('../Data/Facturas');
//

const getFacturaListado = async (request, response, next) => {
  try {

    DB_VnPrecio.getFacturaListado().then(data => {
      response.json(data);
    })

  }
  catch (error) {
    next(error)
  }
}


const addJsonFactura = async (request, response, next) => {
  try {
    
    let factura = request.body;
     DB_VnPrecio.Add_Json_Factura(factura).then(data => {
       response.json(data);
     })

  } catch (error) {
    next(error)
  }
}

const add_Json_FacturaItems = async (request, response, next) => {
  try {
    const p = { ...request.body }    
    DB_VnPrecio.add_Json_FacturaItems(p).then(data => {
      response.json(data);
    })
  } catch (error) {
    next(error)
  }
}



const getTipoFacturacion = async (request, response, next) => {
  try {

    DB_VnPrecio.getTipoFacturacion().then(data => {
      response.json(data[0]);
    })

  }
  catch (error) {
    next(error)
  }
}


const gettasaKambio = async (request, response, next) => {
  try {
    let json_fecha = request.body;
    DB_VnPrecio.gettasaKambio(json_fecha).then(data => {
      response.json(data);
    })

  }
  catch (error) {
    next(error)
  }
}



const get_parametros_pagos = async (request, response, next) => {
  try {
    const p = { ...request.body }    
    DB_VnPrecio.get_parametros_pagos(p).then(data => {
      response.json(data);
    })
  } catch (error) {
    next(error)
  }
}



const ordenTracking = async (request,response,next) => {
  try{

    console.log('request.params.id_factura : '+ request.params.id_factura);

    DB_VnPrecio.ordenTracking(request.params.id_factura).then((data) => {
          response.json(data[0]);
      
    })
  }catch(ex){
    next(ex)
  } 
}

const ordenTrackingUpdate = async (request, response, next) => {
  try{
      const obj_facturaUsuario = { ...request.body }
      DB_VnPrecio.ordenTrackingUpdate(obj_facturaUsuario).then((data)=>{
          response.json(data[0]);
      })
  }catch(ex){
    next(ex);
  }   
}

const getfacturaEstacion = async (request, response,next) => {
  try{
    DB_VnPrecio.getfacturaEstacion(request.params.num).then((data) => {
      response.json(data);
    })
  }catch(ex){
    next(ex)
  } 
}

module.exports = {
  getFacturaListado, addJsonFactura, add_Json_FacturaItems,getTipoFacturacion, gettasaKambio, get_parametros_pagos,
  ordenTracking,  ordenTrackingUpdate, getfacturaEstacion
};
