const conexion = require('../config/conexion')
const sql = require('mssql')
const DICTIONARY_KEY = require('../Utils/DICTIONARY_KEYS')

const getPlazos = async() => {
    try {
        let pool = await sql.connect(conexion);
        let result = await pool.request()            
            .execute('sp_cc_plazo_interes_get') 
            
                //console.log(result.recordsets)
                //.execute(`${DICTIONARY_KEY.schema}.sl_cc_plazo_interes_get´) 
        return result.recordsets;
    } catch (err) {
        console.log(err);
        return 0;
    }
}

module.exports = {
    getPlazos
}