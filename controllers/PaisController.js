const DBPais = require('../Data/Pais')

const getPaises = async (request, response, next) => {
  try {
    DBPais.getPaises().then((data) => {
      response.json(data[0]);
    })
  } catch (ex) {
    next(ex);
  }
}

const getPais = async (request, response, next) => {
  try {
    DBPais.getPais(request.params.id).then((data) => {
      response.json(data[0]);
    })
  } catch (ex) {
    next(ex);
  }
}

module.exports = {
  getPaises,
  getPais
}
