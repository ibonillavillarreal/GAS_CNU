const conexion = require('../config/conexion')
const sql = require('mssql')

const getOrdenEstacion = async (num) => {
  try {    
    console.log(num)
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
    .input('id_numero_orden', sql.VarChar, num)
    .input('id_tipo', sql.Int,1)
      .execute('mp_orden_estacion_get_byNum');
      console.log(salida.recordsets[0][0]);
    return salida.recordsets[0];
  } catch (e) {
    console.log(e)
    return 0;
  }
}

const aplicarSiguienteEstacion = async (id) => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('numero_orden', sql.Int, id)
      .input('id_usuario', sql.Int, 5)
      .output('return_value',sql.Int,0)
      .execute('sp_orden_proceso_update');
      console.log(salida.recordsets[0][0])
    return salida.recordsets[0];
  } catch (e) {
    console.log(e)
    return 0;
  }
}
const getRastreo = async (id) => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('id_orden', sql.Int, id)
      .execute('mp_orden_rastreo_get_byId');
    return salida.recordsets[0];
  } catch (e) {
    console.log(e)
    return 0;
  }
}
module.exports ={
    getOrdenEstacion,
    aplicarSiguienteEstacion,
    getRastreo
}