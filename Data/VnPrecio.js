"use strict"
const sql = require('mssql')
const DICTIONARY_KEYS = require('../Utils/DICTIONARY_KEYS')
require('dotenv').config()
const conexion = require('../config/conexion')
const { json } = require('express')
const { stringify } = require('nodemon/lib/utils')


const getClasificaciones = async () => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('id_estado', sql.Int, 5)
      .execute('')
    return salida.recordsets;

  } catch (error) {
    console.log(error)
    return 0;
  }

}
const getNivelVersionActivas = async () => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('id_estado', sql.Int, 5)
      .execute('')
    return salida.recordsets;

  } catch (error) {
    console.log(error)
    return 0;
  }

}
const getArticulos = async () => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('ACTIVO', sql.Char, 1)
      .execute('mp_articulo_precio_w_get')
                
    return salida.recordsets;
  } catch (error) {
    console.log(error)
    return 0;
  }

}
const getArticuloId = async (id_Articulo) => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('id_Articulo', sql.Int, id_Articulo)
      .input('id_estado', sql.Int, 5)
      .execute('')
    return salida.recordsets;
  } catch (error) {
    console.log(error)
    return 0;
  }

}
const getArticulosPreciosId = async (id_ArticuloPrecio) => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('id_ArticuloPrecio', sql.Int, id_ArticuloPrecio)
      .input('id_estado', sql.Int, 5)
      .execute('')
    return salida.recordsets;
  } catch (error) {
    console.log(error)
    return 0;
  }

}

const getArticulosPrecios = async () => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()            
      .execute('mp_articulo_precio_get')
    return salida.recordsets;
  } catch (error) {
    console.log(error)
    return 0;
  }

}

const getSp = async () => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()            
      .execute('sp_get')
    return salida.recordsets;
  } catch (error) {
    console.log(error)
    return 0;
  }

}

// --1 todos articulos| 2 todos clientes| 3 sin filtro y| 4 ambos filtros 
const get_Cliente_precios = async (p) => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()     
      .input('Articulo',sql.VarChar(20),p.Articulo)       
      .input('id_cliente', sql.Int,p.id_cliente)       
      .input('flagOperacion', sql.Int,p.flagOperacion)       
      .execute('mp_Cliente_precios_w_Get')
    return salida.recordsets;
  } catch (error) {
    console.log(error)
    return 0;
  }
}


const addJsonArticuloPrecio = async (json_Articulo) => {
  try {

    const xjson = JSON.stringify(json_Articulo);
    console.log(xjson);
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('JSON', sql.NVarChar, xjson)
      .output('return_value',sql.Int,1)
      .execute('dbo.mp_articulo_precio_add') 
      
    return salida.recordsets;
  } catch (error) {
    console.log(error)
    return 0;
  }

}

//{"id_cliente":"23","Articulo":"PRD-SRV-00000003","Precio":"38.00"}
const addJson_Cliente_Precio = async (json_cli_Pre) => {
  try {
    
    //const xjson = JSON.stringify(json_cli_Pre);    
    const xjson = json_cli_Pre;    
    console.log(xjson);
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('id_cliente',sql.Int,xjson.id_cliente)
      .input('Articulo',sql.NVarChar, xjson.Articulo)
      .input('Precio',sql.NVarChar, xjson.Precio)
      .execute('dbo.mp_Cliente_precios_Add')     

    return salida.recordsets;
  } catch (error) {
    console.log(error)
    return 0;
  }

}



const delArticulo = async (Id_del) => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('json', sql.NVarChar, json_Articulo)
      .input('id_estado', sql.Int, 5)
      .execute('')
    return salida.recordsets;
  } catch (error) {
    console.log(error)
    return 0;
  }
}

module.exports = {
  getClasificaciones,
  getNivelVersionActivas,
  getArticulos,
  getArticuloId,
  getArticulosPreciosId,
  getArticulosPrecios,
  get_Cliente_precios,
  addJsonArticuloPrecio,
  addJson_Cliente_Precio,
  delArticulo,
  getSp
};