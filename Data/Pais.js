const conexion = require('../config/conexion')
const sql = require('mssql')

const getPais = async (id) => {
  try {    
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request().input('id', sql.Int, id)
      .execute('sp_pais_get_w');
    return salida.recordsets;
  } catch (e) {
    console.log(e)
    return 0;
  }
}
const getPaises = async () => {
  try {
    let pool = await sql.connect(conexion);
    let result = await pool.request().query("select * from Pais where id != 3");
    return result.recordsets;
  } catch (e) {
    console.log(err);
    return 0;
  }
}
module.exports = {
  getPais: getPais,
  getPaises: getPaises
}
