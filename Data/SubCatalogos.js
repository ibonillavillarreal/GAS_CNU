const conexion = require('../config/conexion')
const sql = require('mssql')
const DICTIONARY_KEYS = require('../Utils/DICTIONARY_KEYS')

const getSubTipoCatalogo = async (id)=> {
    try {
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request()
            .input('id_tipocatalogo', sql.Int, id)
            .execute('sp_SubTipoCatalogo_get_w')
        return salida.recordsets;
    } catch (e) {
       // console.log(e)
        return "1";
    }
}


const getSubtipoClientes = async (id)=> {
    try {
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request()
            .input('id', sql.Int, id)
            .execute('sp_subtipo_clientes')
        return salida.recordsets;
    } catch (e) {
      //  console.log(e)
        return "1";
    }
}


const getServicios = async ()=> {
    try {
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request()
            .input('idTipo', sql.Int, DICTIONARY_KEYS.IDSERVICIOS)
            .execute('sp_subcatalogos_get_w')
        return salida.recordsets;
    } catch (e) {
       // console.log(e)
        return "1";
    }
}

const getTratamientos =async  () => {
    try {
        let mssql = await sql.connect(conexion);
        let salida = await mssql.request()
            .input('idTipo', sql.Int, DICTIONARY_KEYS.IDTRATAMIENTO)
            .execute('sp_subcatalogos_get_w')
        return salida.recordsets;
    } catch (e) {
       // console.log(e)
        return "1";
    }
}


const get_Sub_Estados_Cotizacion =async  (p) => {
   
    try {
        let mssql = await sql.connect(conexion);
        if (p.op===1){
            let salida = await mssql.request()
            .input('id_tipocatalogo',sql.Int,43 )
            .input('op',sql.Int,p.op )
            .execute('mp_SubTipoArea_Estados_get_w')
            return salida.recordsets;
        }

        if (p.op===2){
            let salida = await mssql.request()
            .input('id_tipocatalogo',sql.Int,43 )
            .input('op',sql.Int,p.op )
            .execute('mp_SubTipoArea_Estados_get_w')
            return salida.recordsets;
        }

        if (p.op===3){
            let salida = await mssql.request()
            .input('id_tipocatalogo',sql.Int,43 )
            .input('op',sql.Int,p.op )
            .execute('mp_SubTipoArea_Estados_get_w')
            return salida.recordsets;
        }

    } catch (e) {
        console.log(e)
        return "1";
    }
}

module.exports = {
    getServicios,
    getTratamientos,
    getSubTipoCatalogo,
    get_Sub_Estados_Cotizacion,
    getSubtipoClientes
}