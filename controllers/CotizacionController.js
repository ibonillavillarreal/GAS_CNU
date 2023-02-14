

const { VarChar, columns } = require('mssql');
const DBCotizacion = require('../Data/Cotizacion');


const getAgenda = async (request, response,next) => {
  try{
      DBCotizacion.getAgenda().then((data) => {
      response.json(data[0]);
    })
  }catch(ex){
    next(ex)
  } 
}

const getAgendaId = async (request, response,next) => {
  try {
      DBCotizacion.getAgendaId(request.params.id).then((data) => {
      response.json(data);
   }) 
  } catch (ex) {
    next(ex)
  }

}

//getCotizacionTipo = async (idCot, tipo)
const getCotizacionTipo = async (request, response,next) => {
  try {
    
    let idCot = request.params.idCot; 
    
      DBCotizacion.getCotizacionTipo(idCot).then((data) => {
      response.json(data);
   }) 
  } catch (ex) {
    next(ex)
  }
  
}

const getCotizacionEdit = async (request, response,next) => {
  try {
      const id =  request.params.id
         DBCotizacion.getCotizacionEdit(id).then((data) => {
         response.json(data[0]);
    })
  } catch (error) {
    next(error)
  }
  
}

const addCotizacion = async (request, response,next) => {
  try {
    //console.log("LLEGA A ADD COTIZACION ")
    let cotizacion = {...request.body} ;
   // console.log(ObjCotizacion.Maestro.id_cotizacion);
    let data = await DBCotizacion.addCotizacion(cotizacion)
    return response.json(1);
  } catch (error) {
    next(error)
  }
}

const editCotizacion = async (request, response,next) => {
  try {
    const Cotizacion = { ...request.body }
      //console.log(Cotizacion)
        DBCotizacion.editCotizacion (Cotizacion).then(data  => {
        response.json(data[0]);
       })
  } catch (error) {
    next(error)
  }
}

const anularCotizacion = async (request, response,next) => {
  try {
    //  DBCotizacion.anularCotizacion (request.params.id).then(data  => {
  //    response.json(data[0]);
  //  })
  } catch (error) {
    next(error)
  }
}



module.exports = {
  getAgendaId: getAgendaId,  
  getAgenda: getAgenda,  
  addCotizacion, 
  editCotizacion,  
  anularCotizacion, 
  getCotizacionEdit,
  getCotizacionTipo  
};

