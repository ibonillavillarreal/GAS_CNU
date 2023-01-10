
const DBMunicipio = require('../Data/Municipio')

const getMunicipios = async (request, response, next) => {
    try {
        DBMunicipio.getMunicipios(request.params.id).then((data) =>{
        response.json(data[0]);
        })
    } catch (error) {
      next(error)
    }
}

const getMunicipio = async (request, response, next) => {    
    try {
        DBMunicipio.getMunicipio(request.params.id).then((data) =>{
        response.json(data[0]);})
    } catch (error) {
        next(error)
    }
}


module.exports ={
    getMunicipio,
    getMunicipios
}
