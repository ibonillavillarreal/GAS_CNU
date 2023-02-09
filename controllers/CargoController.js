const DBCargo = require('../Data/Cargo')

const getCargo = async (request, response, next) => {
  try {
    DBCargo.getCargo().then((data) => {
      response.json(data[0]);
    })
  } catch (ex) {
    next(ex);
  }
}

const getClaustro = async (request, response, next) => {
  try {
    DBCargo.getClaustro(request.params.id).then((data) => {
      response.json(data[0]);
    })
  } catch (ex) {
    next(ex);
  }
}

const getGrado = async (request, response, next) => {
  try {
    DBCargo.getGrado(request.params.id).then((data) => {
      response.json(data[0]);
    })
  } catch (ex) {
    next(ex);
  }
}

module.exports = {
  getCargo: getCargo,
  getClaustro: getClaustro,
  getGrado: getGrado
}
