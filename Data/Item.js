const conexion = require('../config/conexion')
const sql = require('mssql')

const getItem = async () => {
  try {    
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()  
    .execute('sp_ARTICULO_Get');   
    console.log(salida.recordset) 
    return salida.recordset;
  } catch (e) {
    console.log(e)
    return 0;
  }
}
const getItemId = async (id) => {
  try {
    let pool = await sql.connect(conexion);
    let result = await pool.request()
    .input('id', sql.Int,id)
    .execute('sp_ARTICULO_Get_Tipo');
    return result.recordsets;
  } catch (e) {
    console.log(e);
    return 0;
  }
}
module.exports = {
  getItem: getItem,
  getItemId:getItemId
}
