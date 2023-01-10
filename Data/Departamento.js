
const conexion = require('../config/conexion')
const sql = require('mssql')

const getDepartamentos = async (id) => {
    try {
        let pool = await sql.connect(conexion);
        let result = await pool.request()
            .input('paisId', sql.Int, id)
            .execute('sp_departamentos_list_w');
        return result.recordsets;
    } catch (err) {
        console.log(err);
    }
}

const getDepartamento = async (id) => {
    try {
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request().input('id', sql.Int, id)
            .execute('sp_departamento_get_w');
        return salida.recordsets;
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getDepartamento,
    getDepartamentos
}