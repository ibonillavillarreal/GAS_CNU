"use strict"
const sql = require('mssql')
const DICTIONARY_KEYS = require('../Utils/DICTIONARY_KEYS')
require('dotenv').config()
const conexion = require('../config/conexion')
const { json } = require('express')
const { stringify } = require('nodemon/lib/utils')



const getFacturaListado = async () => {
  try {


    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()      
      .execute('mp_cc_factura_get')
    return salida.recordset;

  } catch (error) {
    console.log(error)
    return 0;
  }

}

//para guardar la factura y las formas de pago -- insert JSON
const Add_Json_Factura = async (factura) => {
  try {

    console.log('llega la peticion al API .... ');
    let json  = JSON.stringify(factura);

    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('JSON', sql.NVarChar, json)
      .output('return_value',sql.Int,0)
      .execute('mp_cc_factura_Pagos_Add')
    return salida.recordsets;

  } catch (error) {
    console.log(error)
    return 0;
  }

}


// para get 
// Oper => 1: leer cliente, 2:leer Terminados Cotizacion, 3:leer Proyectos Cotizacion 
// 4:leer ambos tipos Cotizacion  5: Leer item detalle Terminados, 6: Leer item detalle Proyectos 
// -- parametros del sp:  mp_cc_factura_item_get
//@cli INT ,
//@idCOT INT,
//@Oper INT,
//@return_value INT OUTPUT 
//-- json={Cliente:'39',idCOT:'2285',Oper:'6'}
const add_Json_FacturaItems = async (json_f) => {
  try {

    const xjson = json_f;
    //console.log('cadena Json ------> '+xjson);    
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('Cliente',sql.Int,xjson.Cliente)
      .input('idCOT',sql.Int,xjson.idCOT)
      .input('Oper',sql.Int,xjson.Oper)
      .output('return_value',sql.Int,0)
      .execute('mp_cc_factura_item_get')       
    return salida.recordset;
  } catch (error) {
    console.log(error)
    return 0;
  }

}


const getTipoFacturacion = async () => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()      
      .execute('mp_cc_tipo_Factura_get')
    return salida.recordsets;

  } catch (error) {
    console.log(error)
    return 0;
  }

}

const gettasaKambio = async(json_Fecha) =>{
  try {
    const jsonf = json_Fecha;
    console.log('jsonStringyf json_Fecha : '+JSON.stringify(jsonf));
    console.log('solo la Fecha : '+JSON.stringify(jsonf.fecha));

    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()    
      .input('pfecha',sql.DateTime,jsonf.fecha)  
      .execute('mp_tasaKambio_porFecha')
    
     console.log('valor tasa retorno '+JSON.stringify(salida));
     return salida.recordset;

  } catch (error) {
    console.log(error)
    return 0;
  }
}

//get para los combos : para seleccionar los parametros de pagos 
//{"p":33}
const get_parametros_pagos = async (p) => {
  try {    
    
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('idTipoCatalogo',sql.Int,p.p)      
      .execute('mp_cc_param_get_byId')       
    return salida.recordset;
  } catch (error) {
    console.log(error)
    return 0;
  }

}



const getfacturaEstacion = async (num) => {
  try {    
    //console.log('parciando num_factura : '+JSON.stringify(num))
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
    .input('id_numero_factura', sql.VarChar, num)
    .input('id_tipo', sql.Int,1)
    .execute('mp_factura_estacion_get_byNum');
     
    return salida.recordsets[0];
  } catch (e) {
    console.log(e)
    return 0;
  }
}


const ordenTracking = async (id_factua)=> {
  try {
      let mssql = await sql.connect(conexion);
      let salida = await mssql.request()
          .input('id_factura', sql.Int, id_factua)          
          .execute('mp_factura_rastreo_get_byId')
  
          return salida.recordsets;

  } catch (e) {
    console.log(e)
    return "1";
  }
}

const ordenTrackingUpdate = async (obj_facturaUsuario)=> {
  try {

      let mssql = await sql.connect(conexion);
      let salida = await mssql.request()
          .input('numero_factura', sql.Int, obj_facturaUsuario.id_factura)
          .input('id_usuario', sql.Int,obj_facturaUsuario.id_usuario)
          .output('return_value',sql.Int, 0)
          .execute('mp_factura_estaciones_update')
  return salida.recordsets;
  } catch (e) {
    console.log(e)
    return "1";
  }
}




module.exports = {
  getFacturaListado,  Add_Json_Factura, add_Json_FacturaItems, getTipoFacturacion, gettasaKambio, get_parametros_pagos,
  ordenTracking, ordenTrackingUpdate, getfacturaEstacion
};