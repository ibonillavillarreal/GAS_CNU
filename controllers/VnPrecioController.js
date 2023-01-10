

const DB_VnPrecio = require('../Data/VnPrecio');
//

const getClasificaciones = async (request, response, next) => {
  try {
    // console.log(request.body)
    //const id = { ...request.body }
    DB_VnPrecio.getClasificaciones().then(data => {
      response.json(data[0]);
    })

  }
  catch (error) {
    next(error)
  }
}

const getNivelVersionActivas = async (request, response, next) => {
  try {

    // console.log(request.body)
    //const id = { ...request.body }
    DB_VnPrecio.getNivelVersionActivas().then(data => {
      response.json(data[0]);
    })


  } catch (error) {
    next(error)
  }
}
const getArticulos = async (request, response, next) => {
  try {
    // console.log(request.body)
    //const id = { ...request.body }
    DB_VnPrecio.getArticulos().then(data => {
      response.json(data[0]);
    })
  } catch (error) {
    next(error)
  }
}
const getArticuloId = async (request, response, next) => {
  try {
    // console.log(request.body)
    //const id = { ...request.body }
    DB_VnPrecio.getArticulo().then(data => {
      response.json(data[0]);
    })
  } catch (error) {
    next(error)
  }
}
const getArticulosPreciosId = async (request, response, next) => {
  try {
    // console.log(request.body)
    //const id = { ...request.body }
    DB_VnPrecio.getArticulosPreciosId().then(data => {
      response.json(data[0]);
    })
  } catch (error) {
    next(error)
  }
}

const getArticulosPrecios = async (request, response, next) => {
  try {    
    DB_VnPrecio.getArticulosPrecios().then(data => {
      response.json(data[0]);
    })
  } catch (error) {
    next(error)
  }
}

const getSp = async (request, response, next) => {
  try {    
    DB_VnPrecio.getSp().then(data => {
      response.json(data[0]);
    })
  } catch (error) {
    next(error)
  }
}

// --1 todos articulos| 2 todos clientes| 3 sin filtro y| 4 ambos filtros 
//mp_Cliente_precios_w_Get     'PRD-SRV-00000003', 23, 4
//    @Articulo varchar(20),
//    @id_cliente INT,
//    @flagOperacion INT
//   {"Articulo":"PRD-SRV-00000003","id_cliente":"23","flagOperacion":"4"}

const get_Cliente_precios = async (request, response, next) => {
  try {  
    //console.log('llega a clientes precio ')    

      const p = { ...request.body }
      DB_VnPrecio.get_Cliente_precios(p).then(data => {
      response.json(data);
    })
  } catch (error) {
    next(error)
  }
}

//{"id_cliente":"23","Articulo":"PRD-SRV-00000003","Precio":"38.00"}
const addJson_Cliente_Precio = async (request, response, next) => {
  try {  
     const p = { ...request.body }
      DB_VnPrecio.addJson_Cliente_Precio(p).then(data => {
      response.json(data);
    })
  } catch (error) {
    next(error)
  }
}

const addJsonArticuloPrecio = async (request, response, next) => {
  try {      
    let json_Articulo = request.body
    
    DB_VnPrecio.addJsonArticuloPrecio(json_Articulo).then(data => {
    response.json(data[0]); 
  })
        
  } catch (error) {
    next(error)
  }
}



const delArticulo = async (request, response, next) => {
  try {
    
    DB_VnPrecio.delArticulo().then(data => {
      response.json(data[0]);
    })
  } catch (error) {
    next(error)
  }
}


module.exports = {
  getClasificaciones,
  getNivelVersionActivas,
  getArticulos,
  getArticuloId,
  getArticulosPreciosId,
  getArticulosPrecios,
  get_Cliente_precios,
  addJsonArticuloPrecio,
  addJson_Cliente_Precio,
  delArticulo,
  getSp
};
