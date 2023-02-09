
// getClientes, getCliente, addCliente, editCliente, anularCliente, getClienteEdit
const DBPersona = require('../Data/Persona'); 

const getCliente = async (request, response,next) => {
  try {
      DBPersona.getCliente(request.params.id).then((data) => {
      response.json(data[0]);
     })
  } catch (error) {
    next(error)
  }  
}

const getClientes = async (request, response,next) => {
    try{     

      DBPersona.getClientes().then((data) => {
        response.json(data[0]);
      })
    }catch(ex){
      next(ex)
    } 
}

const addCliente = async (request, response,next) => {
  try {
    const cliente = { ...request.body }
    DBPersona.addCliente(cliente).then(data  => {
    response.json(data);
  })
  } catch (error) {
    next(error)      
  }
}

const editPersona = async (request, response,next) => {
  try {
    const persona = { ...request.body }
    console.log('Registro Persona : '+persona)
    DBPersona.editPersona(persona).then(data  => {
    
      console.log('Controlador-Retorno')

      response.json(data);
  })
  } catch (error) {
    next(error)
  }
}



const activarCliente = async (request, response,next) => {
  try {
    DBPersona.activarCliente(request.params.id).then(data  => {
    response.json(data[0]);
  })
  } catch (error) {
    next(error)  
  }   
}

const getClienteEdit = async (request, response,next) => {
  try {
      const id =  request.params.id
      DBPersona.getClienteEdit(id).then((data) => {
      response.json(data[0]);
    })
  } catch (error) {
    next(error)
  }
}


const anularCliente = async (request, response,next) => {
  try {
    const id = request.params.id
    const id_User = {...request.body}

    DBPersona.anularCliente(id_User).then(data  => {    
      response.json(data);
  })
  } catch (error) {
    next(error)
  }
}


const addClienteAgente = async (request, response,next) => {
  try {
    console.log(request.body)
    const cliente = { ...request.body }
    DBPersona.addClienteAgente(cliente).then(data  => {
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
  editPersona: editPersona, 
  anularCliente,  
  activarCliente, 
  getClienteEdit,
  addClienteAgente
};
