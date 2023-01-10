const conexion = require('../config/conexion')
const sql = require('mssql')

const getOrdenes = async ()=> {
    try {
        let mssql = await sql.connect(conexion);
         let salida = await mssql.request()
           .execute('sp_ordenes_get')
    return salida.recordsets;
    } catch (e) {
      console.log(e)
      return "1";
    }
}

const getProyectos = async (id_cliente, num_cotizacion)=> {
    try {
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request()
            .input('id_cliente', sql.Int, id_cliente)
            .input('num_cotizacion', sql.VarChar, num_cotizacion)
            .execute('sp_proyectos_get_w')
    return salida.recordsets;
    } catch (e) {
      console.log(e)
      return "1";
    }
}

const addOrden = async(orden) => {
    try{
        let pool = await sql.connect(conexion);
        let result = await pool.request()
        .input('id_detalle_cotizacion',sql.Int, orden.id_detalle_cotizacion)
        .input('id_usuario',sql.Int, orden.id_usuario)
        .input('return_value',sql.Int, orden.return_value)
        .execute('mp_orden_add') 
     return result.recordsets;
    }catch(err){
        console.log(err);
        return 0;
    }
}

const getOrdenbyId = async (id_orden)=> {
    try {
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request()
            .input('id_orden', sql.Int, id_orden)
            .execute('mp_orden_get_byId')
    return salida.recordsets;
    } catch (e) {
      console.log(e)
      return "1";
    }
}

const anularOrden = async (id_orden)=> {
    try {
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request()
            .input('id_orden', sql.Int, id_orden)
            .input('return_value', sql.Int, 0)
            .execute('mp_orden_delete')
    return salida.recordsets;
    } catch (e) {
      console.log(e)
      return "1";
    }
}

const addOrdenConsumo = async(orden) => {
    try{
        console.log(orden);
        let pool = await sql.connect(conexion);
        let result = await pool.request()
        .input('id_orden_detalle',sql.Int, orden.id_orden_trabajo_detalle)
        .input('base',sql.Int, orden.base)
        .input('altura',sql.Int, orden.altura)
        .input('id_usuario', sql.Int, orden.id_usuario)
        .input('return_value',sql.Int, 0)
        .execute('mp_orden_dimension_consumo_add') 
     return result.recordsets;
    }catch(err){
        console.log(err);
        return 0;
    }
}

const ordenTracking = async (id_numero_orden)=> {
    try {
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request()
            .input('id_numero_orden', sql.VarChar, id_numero_orden)
            .input('id_tipo', sql.Int, 0)
            .execute('mp_orden_estacion_get_byNum')
    return salida.recordsets;
    } catch (e) {
      console.log(e)
      return "1";
    }
}

const ordenTrackingUpdate = async (orden)=> {
    try {
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request()
            .input('numero_orden', sql.Int, orden.numero_orden)
            .input('id_usuario', sql.Int, orden.id_usuario)
            .input('return_value',sql.Int, 0)
            .execute('sp_orden_proceso_update')
    return salida.recordsets;
    } catch (e) {
      console.log(e)
      return "1";
    }
}

module.exports ={
    getOrdenes,
    getProyectos,
    addOrden,
    getOrdenbyId,
    anularOrden,
    addOrdenConsumo,
    ordenTracking,
    ordenTrackingUpdate
}