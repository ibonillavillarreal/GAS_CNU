const conexion = require('../config/conexion')
const sql = require('mssql')


const getCargo = async () => {
  try {
    let pool = await sql.connect(conexion);
    let result = await pool.request()
    .input('CodTipo', sql.Int, 0)
    .input('CodCatalogoTipo', sql.Int, 9)
    .execute("Catalogos.p_GettbCodigoTipo"); 
    return result.recordsets;
  } catch (e) {
    console.log(err);
    return 0;
  }
}

const getClaustro = async (id) => {
  try {    
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
    .input('CodTipo', sql.Int, 0)
    .input('CodCatalogoTipo', sql.Int, 8)
    .execute("Catalogos.p_GettbCodigoTipo"); 
    return salida.recordsets;
  } catch (e) {
    console.log(e)
    return 0;
  }
}

const getGrado = async (id) => {
  try {    
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
    .input('CodTipo', sql.Int, 0)
    .input('CodCatalogoTipo', sql.Int, 6)
    .execute("Catalogos.p_GettbCodigoTipo"); 
    return salida.recordsets;
  } catch (e) {
    console.log(e)
    return 0;
  }
}

module.exports = {
  getCargo: getCargo,
  getClaustro: getClaustro,
  getGrado: getGrado
}
