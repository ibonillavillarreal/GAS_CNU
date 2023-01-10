const conexion = require('../config/conexion')
const sql = require('mssql')

const getMonedas = async () => {
  try {    
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()  
    .input('id', sql.Int, 0)
    .execute('sp_cmpMONEDA_Get');
    return salida.recordsets;
  } catch (e) {
    console.log(e)
    return 0;
  }
}
const getMoneda = async () => {
  try {
    let pool = await sql.connect(conexion);
    let result = await pool.request().query("select * from Moneda");
    console.log(result)
    return result.recordsets;
  } catch (e) {
    console.log(e);
    return 0;
  }
}
module.exports = {
  getMoneda: getMoneda,
  getMonedas: getMonedas
}
