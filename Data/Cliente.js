"use strict"
const sql = require('mssql')
const DICTIONARY_KEYS = require('../Utils/DICTIONARY_KEYS')
require('dotenv').config()
const conexion = require('../config/conexion')
const { json } = require('express')


const getClientes = async () => {
  try {

    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
    .input('EstadoRegistro',sql.Int,1)
      .execute('RRHH.p_GettbMiembros')      
      console.log('Registro :  '+JSON.stringify(salida.recordsets))
    return salida.recordsets;
  } catch (e) {
    console.log(e)
    
    return "0";
  }
}

const getCliente = async (id) => {    
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('id_cliente', sql.Int, id)
      .execute('sp_cliente_get_w');
    return salida.recordsets;
  } catch (e) {
    
    console.log("id cliente no corresponde en la tupla")
    console.log(e)
    return "0";
  }
}

const addCliente = async (cliente) => {
    //console.log('parametro cliente :  ',JSON.stringify(cliente));
  try {
    let pool = await sql.connect(conexion);
    let insertCliente = await pool.request()
      .input('id_cliente', sql.Int, cliente.id_cliente)
      .input('codigo', sql.VarChar, cliente.codigo)
      .input('nombre', sql.VarChar, cliente.nombre)
      .input('razon_social', sql.VarChar, cliente.razon_social)
      .input('ruc', sql.VarChar, cliente.ruc)
      .input('direccion', sql.VarChar, cliente.direccion)
      .input('cedula', sql.VarChar, cliente.cedula)
      .input('CondicionPagoPlazo', sql.Int,cliente.CondicionPagoPlazo)      
      .input('correo', sql.VarChar, cliente.correo)
      .input('telefono1', sql.VarChar, cliente.telefono1)
      .input('telefono2', sql.VarChar, cliente.telefono2)
      .input('telefono3', sql.VarChar, cliente.telefono3)
      .input('id_tipo_cliente', sql.Int, cliente.id_tipo_cliente)
      .input('id_tipo_contribuyente', sql.Int, cliente.id_tipo_contribuyente)
      .input('municipioId', sql.Int, cliente.municipioId)
      .input('departamentoId',sql.Int,cliente.departamentoId)
      .input('paisId', sql.Int, cliente.paisId)      
      .input('nombre_rep_legal', sql.VarChar, cliente.nombre_rep_legal)
      .input('apellido_rep_legal', sql.VarChar, cliente.apellido_rep_legal)
      .input('cedula_rep_legal', sql.VarChar, cliente.cedula_rep_legal)
      .input('correo_rep_legal', sql.VarChar, cliente.correo_rep_legal)
      .input('municipioId_rep_legal', sql.Int, cliente.municipioId_rep_legal)
      .input('departamentoId_rep_legal', sql.Int, cliente.departamentoId_rep_legal)
      .input('paisId_rep_legal', sql.Int, cliente.paisId_rep_legal)
      .input('direccion_rep_legal', sql.VarChar, cliente.direccion_rep_legal)
      .input('telefono1_rep_legal', sql.VarChar, cliente.telefono1_rep_legal)
      .input('telefono2_rep_legal', sql.VarChar, cliente.telefono2_rep_legal)
      .input('nombre_rep_pago', sql.VarChar, cliente.nombre_rep_pago)
      .input('apellido_rep_pago', sql.VarChar, cliente.apellido_rep_pago)
      .input('cedula_rep_pago', sql.VarChar, cliente.cedula_rep_pago)
      .input('correo_rep_pago', sql.VarChar, cliente.correo_rep_pago)
      .input('municipioId_rep_pago', sql.Int, cliente.municipioId_rep_pago)
      .input('departamentoId_rep_pago', sql.Int, cliente.departamentoId_rep_pago)
      .input('paisId_rep_pago', sql.Int, cliente.paisId_rep_pago)
      .input('direccion_rep_pago', sql.VarChar, cliente.direccion_rep_pago)
      .input('telefono1_rep_pago', sql.VarChar, cliente.telefono1_rep_pago)
      .input('telefono2_rep_pago', sql.VarChar, cliente.telefono2_rep_pago)
      .output('return_value', sql.VarChar, 0)
      .execute('sp_cliente_add'); 
    
      return insertCliente.rowsAffected; 
  }
  catch (err) {
    console.log(err);
    return 0;

  }
}

const editCliente = async (cliente) => {
  try {
    let pool = await sql.connect(conexion);
    let edtCliente = await pool.request()
    .input('id_cliente', sql.Int, cliente.id_cliente)
    .input('nombre', sql.VarChar, cliente.nombre)
    .input('razon_social', sql.VarChar, cliente.razon_social)
    .input('ruc', sql.VarChar, cliente.ruc)
    .input('direccion', sql.VarChar, cliente.direccion)
    .input('cedula', sql.VarChar, cliente.cedula)
    .input('correo', sql.VarChar, cliente.correo)
    .input('telefono1', sql.VarChar, cliente.telefono1)
    .input('telefono2', sql.VarChar, cliente.telefono2)
    .input('telefono3', sql.VarChar, cliente.telefono3)
    .input('id_tipo_cliente', sql.Int, cliente.id_tipo_cliente)
    .input('id_tipo_contribuyente', sql.Int, cliente.id_tipo_contribuyente)
    .input('municipioId', sql.Int, cliente.municipioId)
    .input('departamentoId', sql.Int, cliente.departamentoId)
    .input('CondicionPagoPlazo', sql.Int, cliente.CondicionPagoPlazo)
    .input('paisId', sql.Int, cliente.paisId)
    .input('id_rep_legal', sql.Int, cliente.id_rep_legal)
    .input('nombre_rep_legal', sql.VarChar, cliente.nombre_rep_legal)
    .input('apellido_rep_legal', sql.VarChar, cliente.apellido_rep_legal)
    .input('cedula_rep_legal', sql.VarChar, cliente.cedula_rep_legal)
    .input('correo_rep_legal', sql.VarChar, cliente.correo_rep_legal)
    .input('municipioId_rep_legal', sql.Int, cliente.municipioId_rep_legal)
    .input('departamentoId_rep_legal', sql.Int, cliente.departamentoId_rep_legal)
    .input('paisId_rep_legal', sql.Int, cliente.paisId_rep_legal)
    .input('direccion_rep_legal', sql.VarChar, cliente.direccion_rep_legal)
    .input('telefono1_rep_legal', sql.VarChar, cliente.telefono1_rep_legal)
    .input('telefono2_rep_legal', sql.VarChar, cliente.telefono2_rep_legal)
    .input('id_rep_pago', sql.Int, cliente.id_rep_pago)
    .input('nombre_rep_pago', sql.VarChar, cliente.nombre_rep_pago)
    .input('apellido_rep_pago', sql.VarChar, cliente.apellido_rep_pago)
    .input('cedula_rep_pago', sql.VarChar, cliente.cedula_rep_pago)
    .input('correo_rep_pago', sql.VarChar, cliente.correo_rep_pago)
    .input('municipioId_rep_pago', sql.Int, cliente.municipioId_rep_pago)
    .input('departamentoId_rep_pago', sql.Int, cliente.departamentoId_rep_pago)
    .input('paisId_rep_pago', sql.Int, cliente.paisId_rep_pago)
    .input('direccion_rep_pago', sql.VarChar, cliente.direccion_rep_pago)
    .input('telefono1_rep_pago', sql.VarChar, cliente.telefono1_rep_pago)
    .input('telefono2_rep_pago', sql.VarChar, cliente.telefono2_rep_pago)
    .output('return_value', sql.VarChar, 0)

      .execute('sp_cliente_update');
    return edtCliente.rowsAffected;
  }
  catch (err) {
    console.log(err);
    return 0;

  }
}

const anularCliente = async (id) => {
  
  try {
    let pool = await sql.connect(conexion);
    let salida = await pool.request()
      .input('id_cliente', sql.Int, id)
      .output('return_value', sql.Int, 0)
      .execute('sp_cliente_update_estado')
      return salida.rowsAffected;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

const activarCliente = async (id) => {
  
  try {
    let pool = await sql.connect(conexion);
    let salida = await pool.request()
      .input('CLIENTE', sql.NVarChar, id)
      .input('ACTIVO', sql.VarChar, DICTIONARY_KEYS.ACTIVO_1)
      .execute('sp_SaveCLIENTE_ESTADO')

    return salida.rowsAffected;
  } catch (err) {
    console.log('id activando: ');
    console.log(err);
    return 0;
  }
}


const getClienteEdit = async (id) => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
    .input('id_cliente', sql.Int, id)
      .execute('sp_cliente_get_w_edit');
      console.log(salida.recordset)
    return salida.recordsets;

  } catch (e) {
    console.log(e)
    cosole.log("id cliente no corresponde en la tupla")
  }
}

const addClienteAgente = async (cliente) => {
  //console.log('Post data cldiente:  '+new(require("json-api-serializer"))({cliente}));
try {

  let pool = await sql.connect(conexion);
  let insertCliente = await pool.request()
    /***CLIENTE***/     
    .input('CLIENTE', sql.NVarChar, cliente.CLIENTE)
    .input('RUC', sql.NVarChar, cliente.ruc)
    .input('CONTRIBUYENTE', sql.NVarChar, cliente.CONTRIBUYENTE)
    .input('NOMBRE', sql.NVarChar, cliente.NOMBRE)
    .input('DIRECCION', sql.NVarChar, cliente.DIRECCION)
    .input('EMAIL', sql.NVarChar, cliente.EMAIL)
    .input('TELEFONO1', sql.NVarChar, cliente.TELEFONO1)
    .input('TELEFONO2',sql.NVarChar,cliente.TELEFONO2)
    .input('paisId',sql.Int,cliente.paisId) 
    .input('departamentoId',sql.Int,cliente.departamentoId) 
    .input('municipioId',sql.Int,cliente.municipioId)  
    .input('nombres_repL',sql.NVarChar,cliente.nombres_repL) 
    .input('apellidos_repL',sql.NVarChar,cliente.apellidos_repL)
    .input('cedula_repL',sql.NVarChar,cliente.cedula_repL)
    .input('direccion_repL',sql.NVarChar,cliente.direccion_repL)
    .input('correo_repL',sql.NVarChar,cliente.correo_repL)
    .input('telefono1_repL',sql.NVarChar,cliente.telefono1_repL)
    .input('telefono2_repL',sql.NVarChar,cliente.telefono2_repL)
    .input('pais_repL',sql.Int,cliente.pais_repL)
    .input('departamento_repL',sql.Int,cliente.departamento_repL)
    .input('municipio_repL',sql.Int,cliente.municipio_repL)
    .input('nombres_repP',sql.NVarChar,cliente.nombres_repP)
    .input('apellidos_repP',sql.NVarChar,cliente.apellidos_repP)
    .input('cedula_repP',sql.NVarChar,cliente.cedula_repP)
    .input('direccion_repP',sql.NVarChar,cliente.direccion_repP)
    .input('correo_repP',sql.NVarChar,cliente.correo_repP)
    .input('telefono1_repP',sql.NVarChar,cliente.telefono1_repP)
    .input('telefono2_repP',sql.NVarChar,cliente.telefono2_repP)
    .input('pais_repP',sql.Int,cliente.pais_repP)
    .input('departamento_repP',sql.Int,cliente.departamento_repP)
    .input('municipio_repP',sql.Int,cliente.municipio_repP)
    .execute('sp_SaveCLIENTE_AGENTE'); 
  return insertCliente.rowsAffected;
  
}
catch (err) {
  console.log(err);
  return 0;

}
}


module.exports = {
  getClientes,
  getCliente,
  addCliente,
  editCliente,
  anularCliente,
  activarCliente,
  getClienteEdit,
  addClienteAgente
  
};