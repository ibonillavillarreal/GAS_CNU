

const { VarChar, columns } = require('mssql');
const DBAgendas = require('../Data/Cotizacion');


const getAgenda = async (request, response, next) => {
  try {
    DBAgendas.getAgenda().then((data) => {
      response.json(data[0]);
    })
  } catch (ex) {
    next(ex)
  }
}

const getAgendaId = async (request, response, next) => {
  try {
    DBAgendas.getAgendaId(request.params.id).then((data) => {
      response.json(data);
    })
  } catch (ex) {
    next(ex)
  }

}

//getNroAgenda
const getNroAgenda = async (request, response, next) => {
  try {
    DBAgendas.getNroAgenda().then((data) => {
      response.json(data);
    })
  } catch (ex) {
    next(ex)
  }

}


//getCotizacionTipo = async (idCot, tipo)
const getCotizacionTipo = async (request, response, next) => {
  try {

    let idCot = request.params.idCot;

    DBAgendas.getCotizacionTipo(idCot).then((data) => {
      response.json(data);
    })
  } catch (ex) {
    next(ex)
  }

}

const getCotizacionEdit = async (request, response, next) => {
  try {
    const id = request.params.id
    DBAgendas.getCotizacionEdit(id).then((data) => {
      response.json(data[0]);
    })
  } catch (error) {
    next(error)
  }

}

const add_Agenda = async (request, response, next) => {
  try {
    let Agenda = { ...request.body };
    let data = await DBAgendas.add_Agenda(Agenda)
    return response.json(data);
  } catch (error) {
    next(error)
  }
}

const EditAgenda = async (request, response, next) => {
  try {
    let Agenda = { ...request.body }    
    let data = await DBAgendas.editAgenda(Agenda)
    return response.json(data);
  } catch (error) {
    next(error)
  }
}

const anularCotizacion = async (request, response, next) => {
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
  getNroAgenda: getNroAgenda,
  add_Agenda: add_Agenda,
  EditAgenda: EditAgenda,
  anularCotizacion,
  getCotizacionEdit,
  getCotizacionTipo
};

