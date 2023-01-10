const DBCc = require('../Data/Cc')

const getPlazos = async(request, response, next) => {
    DBCc.getPlazos().then((data) => {
        response.json(data[0]);
    })
}


module.exports = {
    getPlazos
}
