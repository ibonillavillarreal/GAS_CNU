"use strict"
const sql = require('mssql')
const DICTIONARY_KEYS = require('../Utils/DICTIONARY_KEYS')
require('dotenv').config()
const conexion = require('../config/conexion')
const { database } = require('../config/conexion')



const add_Agenda = async (json_Agenda) => {
  try {    

    let MasterAgenda = json_Agenda.Master_Agenda;

    let mssql = await sql.connect(conexion);
    let retorno_CodAgenda = await mssql.request()
      .input('CodAgenda', sql.Int, 0)
      .input('IdAgenda', sql.NVarChar, MasterAgenda.IdAgenda)
      .input('DescripcionAgenda', sql.NVarChar, MasterAgenda.DescripcionAgenda)
      .input('EstadoAgenda', sql.Int, 1)
      .input('FechaRegristro', sql.Date, MasterAgenda.FechaRegristro)
      .input('FechaRegSistema', sql.Date, Date(new Date()))
      .input('EstadoRegsistro', sql.Int, 1)
      .input('IdUsuario', sql.Int, MasterAgenda.IdUsuario)
      .input('Operacion', sql.Int, 2)
    //output('return_value',sql.Int,0)
      .execute('Legales.p_SavetbAgendas')         
    let CodAgenda = retorno_CodAgenda.returnValue;

    //- - -
    let DetalleAsistencia = json_Agenda.Detalle_Asistencia;
    let ultimoRetorno;

    DetalleAsistencia.forEach(registro => {
      let retorno_DetalleAsistencia = mssql.request()
        .input('CodCuorum', sql.Int, 0)
        .input('CodAgenda', sql.Int, CodAgenda)
        .input('CodTipo', sql.Int, registro.CodClaustro)
        .input('CodMiembro', sql.Int, registro.CodMiembro)
        .input('NotaObservacion', sql.NVarChar, registro.NotaObservacion)
        .input('FechaRegistro', sql.Date, Date(new Date()))
        .input('EstadoRegistro', sql.Int, 1)
        .input('IdUsuario', sql.Int, MasterAgenda.IdUsuario)
        .input('Operacion', sql.Int, 2)
        .execute('Legales.p_SavetbRepresentantes')
      ultimoRetorno = retorno_DetalleAsistencia.returnValue
    });

    // - - - 
    let DetallePuntosAgenda = json_Agenda.Detalle_PuntosAgenda;
    let ultimoRetornoPuntos;

    DetallePuntosAgenda.forEach(reg_DetPuntos => {
      
      let retorno_DetalleAsistencia = mssql.request()
        .input('CodAgendaDetalles', sql.Int, 0)
        .input('CodAgenda', sql.Int, CodAgenda)
        .input('PuntosAgenda', sql.NVarChar, reg_DetPuntos.PuntosAgenda)
        .input('NotaObservacion', sql.NVarChar, reg_DetPuntos.NotaObservacion)
        .input('EstadoPunto', sql.Int, 1)
        .input('FechaRegistro', sql.Date, Date(new Date()))
        .input('EstadoRegistro', sql.Int, 1)
        .input('IdUsuario', sql.Int, MasterAgenda.IdUsuario)
        .input('Operacion', sql.Int, 2)
        .execute('Legales.p_SavetbAgendaDetalles')
      ultimoRetornoPuntos = retorno_DetalleAsistencia.returnValue
    });

    // - - - 
      return 1;

  } catch (err) {
    console.log(err);
  }
}

const editAgenda = async (json_Agenda) => {

  try {
    
    console.log(' EDITAR Agenda : '+ JSON.stringify(json_Agenda));

    let MasterAgenda = json_Agenda.Master_Agenda;

    let mssql = await sql.connect(conexion);
    let retorno_CodAgenda = await mssql.request()
      .input('CodAgenda', sql.Int, MasterAgenda.CodAgenda)
      .input('IdAgenda', sql.NVarChar, MasterAgenda.IdAgenda)
      .input('DescripcionAgenda', sql.NVarChar, MasterAgenda.DescripcionAgenda)
      .input('EstadoAgenda', sql.Int, 1)
      .input('FechaRegristro', sql.Date, MasterAgenda.FechaRegristro)
      .input('FechaRegSistema', sql.Date, Date(new Date()))
      .input('EstadoRegsistro', sql.Int, 1)
      .input('IdUsuario', sql.Int, MasterAgenda.IdUsuario)
      .input('Operacion', sql.Int, 4)    
      .execute('Legales.p_SavetbAgendas')         
    let CodAgenda = retorno_CodAgenda.returnValue;

    //- - -
    let DetalleAsistencia = json_Agenda.Detalle_Asistencia;
    let ultimoRetorno;

    DetalleAsistencia.forEach(registro => {
      let retorno_DetalleAsistencia = mssql.request()
        .input('CodCuorum', sql.Int, registro.CodCuorum)
        .input('CodAgenda', sql.Int, MasterAgenda.CodAgenda)
        .input('CodTipo', sql.Int, registro.CodClaustro)
        .input('CodMiembro', sql.Int, registro.CodMiembro)
        .input('NotaObservacion', sql.NVarChar, registro.NotaObservacion)
        .input('FechaRegistro', sql.Date, Date(new Date()))
        .input('EstadoRegistro', sql.Int, 1)
        .input('IdUsuario', sql.Int, MasterAgenda.IdUsuario)
        .input('Operacion', sql.Int, 2)
        .execute('Legales.p_SavetbRepresentantes')
      ultimoRetorno = retorno_DetalleAsistencia.returnValue
    });

    // - - - 
    let DetallePuntosAgenda = json_Agenda.Detalle_PuntosAgenda;
    let ultimoRetornoPuntos;

    DetallePuntosAgenda.forEach(reg_DetPuntos => {
      
      let retorno_DetalleAsistencia = mssql.request()
        .input('CodAgendaDetalles', sql.Int, reg_DetPuntos.CodAgendaDetalles)
        .input('CodAgenda', sql.Int, MasterAgenda.CodAgenda)
        .input('PuntosAgenda', sql.NVarChar, reg_DetPuntos.PuntosAgenda)
        .input('NotaObservacion', sql.NVarChar, reg_DetPuntos.NotaObservacion)
        .input('EstadoPunto', sql.Int, 1)
        .input('FechaRegistro', sql.Date, Date(new Date()))
        .input('EstadoRegistro', sql.Int, 1)
        .input('IdUsuario', sql.Int, MasterAgenda.IdUsuario)
        .input('Operacion', sql.Int, 4)
        .execute('Legales.p_SavetbAgendaDetalles')
      ultimoRetornoPuntos = retorno_DetalleAsistencia.returnValue
    });

    // - - - 
      return 1;

  } catch (edit_err) {
    console.log(edit_err);
  }
}





const getAgenda = async () => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .input('CodAgenda', sql.Int, 0)
      .input('EstadoRegsistro', sql.Int, 1)
      .execute('Legales.p_GettbAgendas')
    return salida.recordsets;

  } catch (e) {
    console.log(e)
    return "0";
  }
}

//getNroAgenda
const getNroAgenda = async () => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()
      .execute('Legales.p_GetNroDeAgendas')
    return salida.recordsets;

  } catch (e) {
    console.log(e)
    return "0";
  }
}




const getAgendaId = async (id) => {
  try {
    let json_Agenda;
    let maestro;
    let asistencia;
    let puntos;

    let mssql = await sql.connect(conexion);
    let salida_maestro = await mssql.request()
      .input('CodAgenda', sql.Int, id)
      .input('EstadoRegsistro', sql.Int, 1)
      .execute('Legales.p_GettbAgendas');
    maestro = salida_maestro.recordsets[0];

    let salida_asistencia = await mssql.request()
      .input('CodAgenda', sql.Int, id)
      .input('EstadoRegistro', sql.Int, 1)
      .execute('Legales.p_GettbRepresentantes');
    asistencia = salida_asistencia.recordsets[0];

    let salida_puntos = await mssql.request()
      .input('CodAgenda', sql.Int, id)
      .input('EstadoRegistro', sql.Int, 1)
      .execute('Legales.p_GettbAgendaDetalles');
    puntos = salida_puntos.recordsets[0];

    json_Agenda = { Maestro: maestro, Asistencia: asistencia, PuntosDeAgenda: puntos }
    //console.log('full agenda '+ JSON.stringify(json_Agenda))

    return json_Agenda
  } catch (e) {
    console.log(e)
  }
}

const getCotizacionTipo = async (idCot) => {
  try {

    let mssql;

    mssql = await sql.connect(conexion);
    let salidaMaestro = await mssql.request()
      .input('idCotizacion', sql.Int, idCot)
      .execute('sp_CotizacionGet_id');
    let dataMaestra = salidaMaestro.recordsets;

    mssql = await sql.connect(conexion);
    let salidaDetalle = await mssql.request()
      .input('idCotizacion', sql.Int, idCot)
      .execute('sp_cpmCotizacionDetalle_Get');
    let dataDetalle = salidaDetalle.recordsets;
    mssql = await sql.connect(conexion);
    let salidaItems = await mssql.request()
      .input('idCotizacion', sql.Int, idCot)
      .execute('sp_cpmCotizacionDetalleComponenteITEM_Get');
    let dataItems = salidaItems.recordsets;

    mssql = await sql.connect(conexion);
    let salidaArticulo = await mssql.request()
      .input('idCotizacion', sql.Int, idCot)
      .execute('sp_ARTICULO_Get_id');
    let DataArticulo = salidaArticulo.recordsets;

    let DataCompleta = { Maestro: dataMaestra, Detalle: dataDetalle, DetalleItems: dataItems, DetalleArticulo: DataArticulo }
    //console.log(DataCompleta.Maestro);
    //

    return DataCompleta;

  } catch (e) {
    console.log(e);
  }

}

const getCotizacionEdit = async (id) => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request().input('idCliente', sql.Int, id)
      .execute('sp_cliente_get_w_edit');
    return salida.recordsets;
  } catch (e) {
    console.log(e)
  }
}


const addCotizacionDetalleTerminados = async (idCotMaestra, ObjCotizacion) => {
  try {

    // console.log('-------------GUARDAMOS EL DETALLE DE TERMINADOS -----------------------------')

    let Detalle = ObjCotizacion.Detalle;
    let poolDetalle = await sql.connect(conexion)
    let insert_Detalle_Cotizacion;

    Detalle.forEach(elementDetalle => {
      insert_Detalle_Cotizacion = poolDetalle.request()
        .input('idDetCotizacion', sql.Int, 0)
        .input('idCotizacion', sql.Int, idCotMaestra)
        .input('Tipo', sql.VarChar, 'T')
        .input('Descripcion', sql.NVarChar, elementDetalle.DESCRIPCION)
        .input('Cantidad', sql.Int, elementDetalle.Cantidad)
        .input('Precio', sql.Decimal(18, 4), elementDetalle.Precio)
        .input('IVA', sql.Decimal(18, 4), elementDetalle.Iva)
        .input('SubTotal', sql.Decimal(18, 4), elementDetalle.subTotal)
        .output('idDetCotizacionOut', sql.Int, 0)
        .execute('sp_cpmCotizacionDetalle_Add', (err, DataT) => {
          let idScopeDetalleTerminado = DataT.output['idDetCotizacionOut']
          addItemsTerminados(idScopeDetalleTerminado, elementDetalle);
        });

    })
    return insert_Detalle_Cotizacion.returnValue;
  }
  catch (err) {
    console.log(err);
    return 0;
  }
}


const addCotizacionDetalleProyectos = async (idCotMaestra, ObjCotizacion) => {
  try {

    //console.log('---------------GUARDAMOS EL DETALLE DE TERMINADOS -----------------------') 

    let insert_Item_frm_modeloItem;
    let pool_frm_modeloItem = await sql.connect(conexion);

    ObjCotizacion.Proyectos.forEach((itemProyecto) => {
      insert_Item_frm_modeloItem = pool_frm_modeloItem.request()
        .input('idDetCotizacion', sql.Int, 0)
        .input('idCotizacion', sql.Int, idCotMaestra)
        .input('Tipo', sql.VarChar, 'P')
        .input('Descripcion', sql.NVarChar, itemProyecto.frm_modeloItem.DESCRIPCION)
        .input('Cantidad', sql.Int, itemProyecto.frm_modeloItem.Cantidad)
        .input('Precio', sql.Decimal(18, 4), itemProyecto.frm_modeloItem.Precio)
        .input('IVA', sql.Decimal(18, 4), itemProyecto.frm_modeloItem.Iva)
        .input('SubTotal', sql.Decimal(18, 4), itemProyecto.frm_modeloItem.subTotal)
        .output('idDetCotizacionOut', sql.Int, 0)
        .execute('sp_cpmCotizacionDetalle_Add', (err, Data) => {
          let idScotIDDParaItems = Data.output['idDetCotizacionOut']
          addItemsProyectos(idScotIDDParaItems, itemProyecto.lista_Item_Desc);
        });
    })
    return insert_Item_frm_modeloItem.returnValue;
  }
  catch (err) {
    console.log(err);
    return 0;
  }
}

const addItemsProyectos = async (idScotIDDParaItems, ItemsArticulos) => {
  try {

    let insert_Items_uso;
    let pool_Items = await sql.connect(conexion);

    ItemsArticulos.forEach(itemDetalles => {
      insert_Items_uso = pool_Items.request()
        .input('IdDetalleITEM', sql.Int, 0)
        .input('idDetCotizacion', sql.Int, idScotIDDParaItems)
        .input('ARTICULO', sql.NVarChar, itemDetalles.itemProyecto.ARTICULO)
        .input('Largo', sql.Int, itemDetalles.itemProyecto.Largo)
        .input('Ancho', sql.Int, itemDetalles.itemProyecto.Ancho)
        .input('Descripcion', sql.NVarChar, itemDetalles.DescripcionDeUso)
        .input('Cantidad', sql.Decimal(18, 4), itemDetalles.itemProyecto.Cantidad)
        .input('MONEDA', sql.NVarChar, itemDetalles.itemProyecto.MONEDA)
        .input('CostoBase', sql.Decimal(18, 4), itemDetalles.itemProyecto.CostoBase)
        .input('Precio', sql.Decimal(18, 4), itemDetalles.itemProyecto.Precio)
        .input('IVA', sql.Decimal(18, 4), itemDetalles.itemProyecto.Iva)
        .input('subTotal', sql.Decimal(18, 4), itemDetalles.itemProyecto.subTotal)
        .execute('sp_cpmCotizacionDetalleComponenteITEM_Add');
    })

    return insert_Items_uso.returnValue;
  }
  catch (err) {
    console.log(err);
    return 0;
  }

}


const addItemsTerminados = async (idDetalleCotizacion, ItemsArticulos) => {
  try {
    let elementDetalle = ItemsArticulos;
    console.log(JSON.stringify(elementDetalle));

    let pool_Items = await sql.connect(conexion);
    let insert_Items_uso = await pool_Items.request()
      .input('IdDetalleITEM', sql.Int, 0)
      .input('idDetCotizacion', sql.Int, idDetalleCotizacion)
      .input('ARTICULO', sql.NVarChar, elementDetalle.ARTICULO)
      .input('Largo', sql.Int, elementDetalle.Largo)
      .input('Ancho', sql.Int, elementDetalle.Ancho)
      .input('Descripcion', sql.NVarChar, elementDetalle.DESCRIPCION)
      .input('Cantidad', sql.Decimal(18, 4), elementDetalle.Cantidad)
      .input('MONEDA', sql.NVarChar, elementDetalle.MONEDA)
      .input('CostoBase', sql.Decimal(18, 4), elementDetalle.CostoBase)
      .input('Precio', sql.Decimal(18, 4), elementDetalle.Precio)
      .input('IVA', sql.Decimal(18, 4), elementDetalle.Iva)
      .input('subTotal', sql.Decimal(18, 4), elementDetalle.subTotal)
      .execute('sp_cpmCotizacionDetalleComponenteITEM_Add');
    return insert_Items_uso.returnValue;
  }
  catch (err) {
    console.log(err);
    return 0;
  }

}



const anularCotizacion = async (id) => {
  try {
    let pool = await sql.connect(conexion);
    let salida = await pool.request()
      .input('id', sql.Int, id)
      .input('estado', sql.Int, 8)
      .execute('sp_clientes_estado_update')
    return salida.rowsAffected;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

module.exports = {
  getAgendaId: getAgendaId,
  getAgenda: getAgenda,
  getNroAgenda: getNroAgenda,
  add_Agenda: add_Agenda,
  editAgenda: editAgenda,
  anularCotizacion,
  getCotizacionEdit,
  getCotizacionTipo
};

