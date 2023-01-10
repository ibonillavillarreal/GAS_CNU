const DBItem = require('../Data/Item')

const getItem = async (request, response, next) => {
  try {
    DBItem.getItem().then((data) => {
      response.json(data);
    })
  } catch (ex) {
    next(ex);
  }
}

const getItemId = async (request, response, next) => {
  try {
    DBItem.getItemId(request.params.id).then((data) => {
      response.json(data);
    })
  } catch (ex) {
    next(ex);
  }
}

module.exports = {
  getItem,
  getItemId
}
