"use strict"
const sql = require('mssql')
const DICTIONARY_KEYS = require('../Utils/DICTIONARY_KEYS')
require('dotenv').config()
const conexion = require('../config/conexion')
const { database } = require('../config/conexion')



const addCotizacion = async (cotizacion) => {
  try {
    console.log(cotizacion);
     let json  = JSON.stringify(cotizacion)
     let mssql = await sql.connect(conexion);
     let salida = await mssql.request()
       .input('json', sql.NVarChar, json)
       .output('return_value',sql.Int,0)
       .execute('mp_cotizacion_add')
     return salida.recordsets;
  } catch (err) {
    console.log(err);
  }
}


const getAgenda = async () => {
  try {
    let mssql = await sql.connect(conexion);
    let salida = await mssql.request()    
    .input('CodAgenda',sql.Int,0)
    .input('EstadoRegsistro',sql.Int,1)
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
      .input('EstadoRegistro',sql.Int,1)
      .execute('Legales.p_GettbAgendaDetalles');      
      puntos = salida_puntos.recordsets[0];

      json_Agenda = {Maestro:maestro,Asistencia:asistencia,PuntosDeAgenda:puntos}
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

// const addCotizacion = async (ObjCotizacion) => {
//   let moneda; 
//   if(ObjCotizacion.Maestro.simbolo=='C$'){
//                                 moneda=1}
//                            else{moneda=0}
//   try {
//     let pool = await sql.connect(conexion);
//     let insertCotizacion = await pool.request()
//       .input('idCotizacion', sql.Int, ObjCotizacion.Maestro.id_cotizacion)
//       .input('id_cliente', sql.Int, ObjCotizacion.Maestro.id_cliente)
//       .input('FechaRige', sql.Date, ObjCotizacion.Maestro.fecha_rige)
//       .input('DiasDPlazo', sql.Int, ObjCotizacion.Maestro.dias_plazo)
//       .input('FechaCotizacion', sql.Date, ObjCotizacion.Maestro.fecha_cotizacion)
//       .input('FechaEntrega', sql.Date, ObjCotizacion.Maestro.fecha_entrega)
//       .input('DescripcionCotizacion', sql.NVarChar, ObjCotizacion.Maestro.descripcion_cotizacion)
//       .input('Observaciones', sql.NVarChar, ObjCotizacion.Maestro.observaciones)
//       .input('idMoneda', sql.Int, moneda)
//       .input('TipoDCambio', sql.Decimal, ObjCotizacion.Maestro.tipo_cambio)
//       .input('SubTotal', sql.Decimal, ObjCotizacion.Maestro.sub_total)
//       .input('Descuento', sql.Decimal, ObjCotizacion.Maestro.descuento)
//       .input('IVA', sql.Decimal, ObjCotizacion.Maestro.iva)
//       .input('GranTotal', sql.Decimal, ObjCotizacion.Maestro.gran_total)
//       .output('idCotizacionOut', sql.Int, 0)
//       .execute('sp_cpmCotizacion_Add');

//       let IDDCotizacion = insertCotizacion.returnValue;

//       //console.log('id Maestro : '+IDDCotizacion)
//      await  addCotizacionDetalleTerminados(IDDCotizacion, ObjCotizacion);
//      await  addCotizacionDetalleProyectos(IDDCotizacion, ObjCotizacion);     
//      return insertCotizacion.returnValue;
//   }
//   catch (err) {
//     console.log(err);
//     return 0;
//   }
// }

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




const editCotizacion = async (Cotizacion) => {

  try {
    let pool = await sql.connect(conexion);
    let edtCotizacion = await pool.request()
      /***CLIENTE***/
      .input('id_cliente', sql.Int, Cotizacion.id_cliente)
      .input('cliente', sql.NVarChar, Cotizacion.cliente)
      .input('razon_social', sql.NVarChar, Cotizacion.razon_social)
      .input('ruc', sql.NVarChar, Cotizacion.ruc)
      .input('odc', sql.Int, Cotizacion.odc)
      .input('email', sql.NVarChar, Cotizacion.email)
      .input('telefono1', sql.NVarChar, Cotizacion.telefono1)
      .input('fecha_cotizacion', sql.Date, Cotizacion.fecha_cotizacion)
      .input('fecha_rige', sql.Date, Cotizacion.fecha_rige)
      .input('fecha_orden', sql.Date, Cotizacion.fecha_orden)
      .input('fecha_entrega', sql.Date, Cotizacion.fecha_entrega)
      .input('dias_plazo', sql.Int, Cotizacion.dias_plazo)
      .input('codigo_cotizacion', sql.Int, Cotizacion.codigo_cotizacion)
      .input('descripcion_cotizacion', sql.NVarChar, Cotizacion.descripcion_cotizacion)
      .input('observaciones', sql.NVarChar, Cotizacion.observaciones)
      .input('moneda', sql.NVarChar, Cotizacion.moneda)
      .input('tipo_cambio', sql.Decimal, Cotizacion.tipo_cambio)
      .input('sub_total', sql.Decimal, Cotizacion.sub_total)
      .input('descuento', sql.Decimal, Cotizacion.descuento)
      .input('iva', sql.Decimal, Cotizacion.iva)
      .input('gran_total', sql.Decimal, Cotizacion.gran_total)
      .input('esta_facturada', sql.NVarChar, Cotizacion.esta_facturada)
      .execute('sp_Cotizacion_Update_Edt');
    return edtCotizacion.rowsAffected;
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
  getNroAgenda:getNroAgenda,
  addCotizacion,
  editCotizacion,
  anularCotizacion,
  getCotizacionEdit,
  getCotizacionTipo
};

