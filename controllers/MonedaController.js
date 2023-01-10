const DBMoneda = require('../Data/Moneda')

const getMonedas = async (request, response, next) => {
  try {
    DBMoneda.getMonedas().then((data) => {
      response.json(data[0]);
    })
  } catch (ex) {
    next(ex);
  }
}

const getMoneda = async (request, response, next) => {
  try {
    DBMoneda.getMoneda(request.params.id).then((data) => {
      response.json(data[0]);
    })
  } catch (ex) {
    next(ex);
  }
}

module.exports = {
  getMonedas,
  getMoneda
}
