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

const getPais = async (request, response, next) => {
  try {
    DBCargo.getPais(request.params.id).then((data) => {
      response.json(data[0]);
    })
  } catch (ex) {
    next(ex);
  }
}

module.exports = {
  getCargo: getCargo,
  getPais
}
