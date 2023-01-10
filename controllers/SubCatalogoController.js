const DBSubCatalogo = require('../Data/SubCatalogos')
const DICTIONARY_KEYS = require('../Utils/DICTIONARY_KEYS')


const getListTipoCliente = async (request, response, next) => {
    DBSubCatalogo.getSubtipoClientes(2).then((data) =>{
        response.json(data[0]);
    })
}

const getListContribuyente = async (request, response, next) => {

    DBSubCatalogo.getSubTipoCatalogo(3).then((data) =>{
        response.json(data[0]);
    })
}

const get_Sub_Estados_Cotizacion = async (request, response, next) => {

    const p = { ...request.body }    
    DBSubCatalogo.get_Sub_Estados_Cotizacion(p).then((data) =>{
        response.json(data[0]);
    })
}


module.exports ={
    getListTipoCliente,
    getListContribuyente,
    get_Sub_Estados_Cotizacion
}