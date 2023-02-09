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
      .input('CdoMiembro', sql.Int, id)
      .input('EstadoRegistro',sql.Int,1)
      .execute('RRHH.p_GettbMiembros');
      
    return salida.recordsets;

  } catch (e) {   
    console.log(e)
    return "0";
  }
}

const addCliente = async (persona) => {
    
  try {
    let pool = await sql.connect(conexion);
    let insertCliente = await pool.request()
    .input('CodMiembro',sql.Int,persona.CodMiembro)
    .input('CodCargo',sql.Int,persona.CodCargo)
    .input('CodClaustro',sql.Int,persona.CodClaustro)
    .input('CodGradoAcademico',sql.Int,persona.CodGradoAcademico)
    .input('Nombres',sql.VarChar,persona.Nombres)
    .input('Apellidos',sql.VarChar,persona.Apellidos)
    .input('Telefono',sql.VarChar,persona.Telefono)
    .input('Email',sql.VarChar,persona.Email)
    .input('FechaRegistro',sql.Date,new Date())
    .input('EstadoRegistro',sql.Int,1)
    .input('IdUsuario',sql.Int,persona.IdUsuario)
    .input('Operacion',sql.Int,2)    
    .output('return_value', sql.Int, 0)
      .execute('RRHH.p_SavetbMiembros'); 
    
      return insertCliente.output; 
  }
  catch (err) {
    console.log(err);
    return 0;

  }
}






const editPersona = async (persona) => {
  try {
    console.log(' LLegando al Edit  '+persona.CodMiembro)

    let pool = await sql.connect(conexion);
    let edtPersona = await pool.request()
    .input('CodMiembro',sql.Int,persona.CodMiembro)
    .input('CodCargo',sql.Int,persona.CodCargo)
    .input('CodClaustro',sql.Int,persona.CodClaustro)
    .input('CodGradoAcademico',sql.Int,persona.CodGradoAcademico)
    .input('Nombres',sql.VarChar,persona.Nombres)
    .input('Apellidos',sql.VarChar,persona.Apellidos)
    .input('Telefono',sql.VarChar,persona.Telefono)
    .input('Email',sql.VarChar,persona.Email)
    .input('FechaRegistro',sql.Date,new Date())
    .input('EstadoRegistro',sql.Int,1)
    .input('IdUsuario',sql.Int,persona.IdUsuario)
    .input('Operacion',sql.Int,2)    
    .output('return_value', sql.Int, 0)
      .execute('RRHH.p_SavetbMiembros');
      
      //return edtPersona.rowsAffected;
      return edtPersona.output;
  }
  catch (err) {
    console.log(err);
    return 0;

  }
}

const anularCliente = async (id_User) => {
  
  try {
    let pool = await sql.connect(conexion);
    let salida = await pool.request()
      .input('CodMiembro', sql.Int, id_User.id)
      .input('IdUsuario', sql.Int, id_User.idUser)
      .input('FisicoDell', sql.Int, id_User.operacion)
      .output('return_value', sql.Int, 0)
      .execute('RRHH.p_DeletetbMiembros')
      return salida.output;
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
    console.log(' LLegando getClienteEdit ')

    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
    .input('CdoMiembro', sql.Int, id)
    .input('EstadoRegistro', sql.Int,1)
    .execute('RRHH.p_GettbMiembros');
      //console.log(salida.recordset)
    return salida.recordsets;

  } catch (e) {
    console.log(e)
    cosole.log("id cliente no corresponde en la tupla")
  }
}

const addClienteAgente = async (cliente) => {  
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
  editPersona: editPersona,
  anularCliente,
  activarCliente,
  getClienteEdit,
  addClienteAgente
  
};