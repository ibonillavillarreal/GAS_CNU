
// getClientes, getCliente, addCliente, editCliente, anularCliente, getClienteEdit
const DBCliente = require('../Data/Cliente'); 

const getCliente = async (request, response,next) => {
  try {
      DBCliente.getCliente(request.params.id).then((data) => {
      response.json(data[0]);
     })
  } catch (error) {
    next(error)
  }  
}

const getClientes = async (request, response,next) => {
    try{     

      DBCliente.getClientes().then((data) => {
        response.json(data[0]);
      })
    }catch(ex){
      next(ex)
    } 
}

const addCliente = async (request, response,next) => {
  try {
    const cliente = { ...request.body }
    DBCliente.addCliente(cliente).then(data  => {
    response.json(data[0]);
  })
  } catch (error) {
    next(error)      
  }
}

const editCliente = async (request, response,next) => {
  try {
    const cliente = { ...request.body }
    console.log(cliente)
    DBCliente.editCliente(cliente).then(data  => {
    response.json(data[0]);
  })
  } catch (error) {
    next(error)
  }
}

const anularCliente = async (request, response,next) => {
  try {
    DBCliente.anularCliente(request.params.id).then(data  => {
    console.log(data[0])
      response.json(data[0]);
  })
  } catch (error) {
    next(error)
  }
}

const activarCliente = async (request, response,next) => {
  try {
    DBCliente.activarCliente(request.params.id).then(data  => {
    response.json(data[0]);
  })
  } catch (error) {
    next(error)  
  }   
}

const getClienteEdit = async (request, response,next) => {
  try {
      const id =  request.params.id
      DBCliente.getClienteEdit(id).then((data) => {
      response.json(data[0]);
    })
  } catch (error) {
    next(error)
  }
}

const addClienteAgente = async (request, response,next) => {
  try {
    console.log(request.body)
    const cliente = { ...request.body }
    DBCliente.addClienteAgente(cliente).then(data  => {
    response.json(data[0]);
  })
  } catch (error) {
    next(error)      
  }
}

module.exports =  {
  getCliente, 
  getClientes,  
  addCliente,  
  editCliente, 
  anularCliente,  
  activarCliente, 
  getClienteEdit,
  addClienteAgente
};
