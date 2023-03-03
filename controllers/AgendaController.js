

const { VarChar, columns } = require('mssql');
const DBAgendas = require('../Data/Agendas');


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

const DelEditMiembroAgenda = async (request, response, next) => {
  try {        
    console.log('Controlador Couronm por idDelBody : '+JSON.stringify(request))
    const idDelBody = { ...request.body}
    let data = DBAgendas.DelEditMiembroAgenda(idDelBody)
    return response.json(data);

  } catch (error) {
    next(error)
  }
}



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


module.exports = {
  getAgendaId: getAgendaId,
  getAgenda: getAgenda,
  getNroAgenda: getNroAgenda,
  add_Agenda: add_Agenda,
  EditAgenda: EditAgenda,
  DelEditMiembroAgenda
 
};

