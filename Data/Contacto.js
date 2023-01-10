const conexion = require('../config/conexion')
const sql = require('mssql')

const addContacto = async (contacto) => {
    try {
        let pool = await sql.connect(conexion);
        let insertCliente = await pool.request()
            .input('nombres', sql.VarChar, contacto.nombres).input('apellidos', sql.VarChar, contacto.apellidos)
            .input('cedula', sql.VarChar, contacto.cedula).input('correo', sql.VarChar, contacto.correo)
            .input('telefono1', sql.VarChar, contacto.telefono1).input('telefono2', sql.VarChar, contacto.telefono2)
            .input('idCliente', sql.Int, contacto.clienteId).input('tipo', sql.Int, contacto.config_catalogoId)
            .execute('sp_cliente_add_contacto');
        return insertCliente.rowsAffected;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}
const getContactos = async (tipo, clienteId) => {
    try {
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request()
            .input('tipo', sql.Int, tipo)
            .input('idCliente', sql.Int, clienteId)
            .execute('sp_cliente_contacto_get_w');
        return salida.recordsets;
    } catch (e) {
        console.log(e)
    }
}

const getContacto = async (id) => {
    try {
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request()
            .input('id', sql.Int, id)
            .execute('sp_cliente_contacto_get');
        return salida.recordsets;
    } catch (e) {
        console.log(e)
    }
}

const anularContacto = async (id) => {
    try {
        let pool = await sql.connect(conexion);
        let salida = await pool.request()
            .input('id', sql.Int, id)
            .input('estado', sql.Int, 8)
            .execute('sp_clientes_contacto_estado_update')
        return salida.rowsAffected;
    } catch (err) {
        console.log(err);
        return 0;
    }
}

const updateContacto = async (contacto) => {
    try {
        let pool = await sql.connect(conexion);
        let insertCliente = await pool.request()
            .input('id', sql.Int, contacto.id)
            .input('nombres', sql.VarChar, contacto.nombres).input('apellidos', sql.VarChar, contacto.apellidos)
            .input('cedula', sql.VarChar, contacto.cedula).input('correo', sql.VarChar, contacto.correo)
            .input('telefono1', sql.VarChar, contacto.telefono1).input('telefono2', sql.VarChar, contacto.telefono2)
            .execute('sp_cliente_contacto_update');
        return insertCliente.rowsAffected;
    }
    catch (err) {
        console.log(err);
        return 0;
    }
}

module.exports = {
    getContacto,
    getContactos,
    addContacto,
    updateContacto,
    anularContacto
}