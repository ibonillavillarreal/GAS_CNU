const DBorden = require('../Data/Orden');


const getOrdenes = async (request, response,next) => {
    try{
        DBorden.getOrdenes().then((data) => {
        response.json(data[0]);
        
      })
    }catch(ex){
      next(ex)
    } 
}

const getProyectos = async (request,response,next) => {
    try{
        DBorden.getProyectos(request.params.id_cliente, request.params.num_cotizacion).then((data) => {
        response.json(data[0]);
        
      })
    }catch(ex){
      next(ex)
    } 
}

const addOrden = async (request, response, next) => {
    try{
        const orden = { ...request.body }
        DBorden.addOrden(orden).then((data)=>{
            response.json(data[0]);
        })
    }catch(ex){
      next(ex);
    }   
}

const getOrdenbyId = async (request,response,next) => {
    try{
        DBorden.getOrdenbyId(request.params.id_orden).then((data) => {
            response.json(data[0]);
        
      })
    }catch(ex){
      next(ex)
    } 
}

const anularOrden = async (request,response,next) => {
    try{
        DBorden.anularOrden(request.params.id_orden).then((data) => {
            response.json(data[0]);
        
      })
    }catch(ex){
      next(ex)
    } 
}

const addOrdenConsumo = async (request, response, next) => {
    try{
        const orden = { ...request.body }
        DBorden.addOrdenConsumo(orden).then((data)=>{
            response.json(data[0]);
        })
    }catch(ex){
      next(ex);
    }   
}

const ordenTracking = async (request,response,next) => {
    try{
        DBorden.ordenTracking(request.params.id_numero_orden).then((data) => {
            response.json(data[0]);
        
      })
    }catch(ex){
      next(ex)
    } 
}

const ordenTrackingUpdate = async (request, response, next) => {
    try{
        const orden = { ...request.body }
        DBorden.ordenTrackingUpdate(orden).then((data)=>{
            response.json(data[0]);
        })
    }catch(ex){
      next(ex);
    }   
}

module.exports = {
    getOrdenes,
    getProyectos,
    addOrden,
    getOrdenbyId,
    anularOrden,
    addOrdenConsumo,
    ordenTracking,
    ordenTrackingUpdate
}