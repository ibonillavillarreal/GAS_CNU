
const DBDepartamento = require('../Data/Departamento'); 

const getDepartamentos = async (request, response, next) => {
  try {
        DBDepartamento.getDepartamentos(request.params.id).then((data) =>{
        response.json(data[0]);
        })
  } catch (error) {
    next(error)
  }

}

const getDepartamento = async (request, response, next) => {
  try {
    console.log('llega del servicio  '+ request.params);
    
    DBDepartamento.getDepartamento(request.params.id).then((data) =>{
    response.json(data[0]);
    })
  } catch (error) {
    next(error)
  }
}

module.exports =  {
  getDepartamento,
  getDepartamentos
};
