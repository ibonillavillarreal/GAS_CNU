const conexion = require('../config/conexion')
const sql = require('mssql')

const getMunicipios = async (id) => {
    try {
      let pool = await sql.connect(conexion);
      let result = await pool.request()
        .input('departamentoId', sql.Int, id)
        .execute('sp_municipios_list_w')
      return result.recordsets;
    } catch (err) {
      console.log(err);
    }
  }

const getMunicipio = async (id) =>{
    try{
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request().input('id', sql.Int, id)
        .execute('sp_municipio_get_w');
        return salida.recordsets;
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    getMunicipio,
    getMunicipios
}