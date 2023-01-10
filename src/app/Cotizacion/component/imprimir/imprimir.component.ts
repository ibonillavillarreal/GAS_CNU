import { Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Items } from '../../../models/Items';
import { filter, find, first } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import {NgxPrintModule} from "ngx-print";  
import { Cotizacion } from '../../../models/adddCotizacion';




@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.component.html',
  styleUrls: ['./imprimir.component.css']
})

export class ImprimirComponent implements OnInit {

  @ViewChild("seleccion") seleccion!: ElementRef;
  public render: boolean = false;
  public list_detalle:any[] =[];
  public Proyectos: any[] = [];
  public Terminado: any[] = [];
  dataSource = new MatTableDataSource(this.list_detalle); 
  displayedColumns: string[] = [
    'Cantidad',
    'Descripcion',
    'Precio',
    'PrecioDollar',
   // 'Iva',
    'subTotal',
    'subTotalDollar'
  ];  
 
  public id_Cotizacion: any;
  public Documento: any;
  public contacto_pago: any;
  public nombre_cliente: any;
  public nombre_completo_pago: any;
  public ruc_cliente: any;
  public correo_cliente: any;
  public telefono1_cliente: any;
  public observaciones: any;
  public fecha_cotizacion: any;
  public descripcion_cotizacion: any;
  public fecha_entrega: any;
  public NumDocumento: any;
  public moneda: any;
  public sub_total: any;
  public iva: any;
  public gran_total: any;
  public id_cliente: any;
  public data_cliente!:any;
  public Cotizacion_Completa: any;
  public Maestro_Cotizacion: any;

  
  constructor(    
    private Aroute: ActivatedRoute,
    //public dialogRef_Imprimir: MatDialogRef<ImprimirComponent>,
    //@Inject(MAT_DIALOG_DATA) public Obj_Print: any,
    private srvCliente: ClienteService,
    private srvCotizacion: CotizacionService
  ) {     
    this.Aroute.params.subscribe((params: Params) => {
      console.log('params.id : '+params.id);
      this.id_Cotizacion = params.id;
      this.detalle_cotizacion();
      
    });
  }
  ngOnInit(): void {
    
    
  }
  async detalle_cotizacion(){
    this.Cotizacion_Completa = (await this.srvCotizacion.getCotizacion(this.id_Cotizacion).toPromise());
    
    let MAESTRO = JSON.parse(this.Cotizacion_Completa.cotizacion);
    this.list_detalle = JSON.parse(this.Cotizacion_Completa.cotizacion_detalle); 
    this.Proyectos = JSON.parse(this.Cotizacion_Completa.cotizacion_detalle)
    this.Terminado = JSON.parse(this.Cotizacion_Completa.elemento_detalle)
   
    if(this.Proyectos){
      this.joinProyectDetails();
      this.removeTermProyect();
    }
   
    this.id_cliente = MAESTRO.id_cliente;
    this.dataSource.data = this.list_detalle; 
    this.Maestro_Cotizacion = MAESTRO;
   /* ------------------------------------------------------------------------- */   
   this.data_cliente         =(await this.srvCliente.getClientes().toPromise()).filter((f:any)=> f.id_cliente ===Number(this.id_cliente))[0];
   /* ------------------------------------------------------------------------- */
   this.nombre_completo_pago =(await this.srvCliente
                              .getCliente(Number(this.id_cliente)).toPromise()).filter((f:any)=> f.id_cliente ===Number(this.id_cliente))[0];  
  /* ------------------------------------------------------------------------- */
  this.Documento = MAESTRO.NumeroCotizacion;
                          
  console.log('lista detalle : '+this.list_detalle)
  console.log(' MAESTRO : ' + JSON.stringify(MAESTRO));
  console.log(' Documento MAESTRO : '+JSON.stringify(MAESTRO.NumeroCotizacion));
  console.log(' id cliente  :  '+ this.id_cliente +'  -***** data_cliente - :  ' +JSON.stringify(this.nombre_completo_pago));                                
  console.log(' datasouce : '+ JSON.stringify(this.dataSource.data));
  console.log('list_detalle - dataSource :  '+JSON.stringify(this.list_detalle));
  
    this.datos_maestros();
  }

  datos_maestros(){  

   this.nombre_cliente = this.data_cliente.razon_social;
   this.ruc_cliente = this.data_cliente.ruc;
   this.correo_cliente = this.data_cliente.correo;
   this.telefono1_cliente = this.data_cliente.telefono1;
   this.contacto_pago  =  this.nombre_completo_pago.nombres + ' ' + this.nombre_completo_pago.apellidos;
   this.observaciones = this.Maestro_Cotizacion.Observaciones;
   this.fecha_cotizacion = this.Maestro_Cotizacion.fecha_registro;
   this.NumDocumento = this.Documento;
   this.descripcion_cotizacion = this.Maestro_Cotizacion.DescripcionCotizacion;
   this.fecha_entrega = this.Maestro_Cotizacion.FechaEntrega;
   this.moneda = this.Maestro_Cotizacion.moneda;

   
   console.log('Proyectos '+JSON.stringify(this.Proyectos));
   console.log('Terminado '+JSON.stringify(this.Terminado));
   
   //return this.dataSource.data.map((t: any) => t.SubTotal).reduce((acc, value) => acc + value, 0);

   let fp = this.Proyectos.map((t:any)=> Number(t.GranTotal)).reduce((acc, value)=> acc + value,0);   
   console.log('*****sacando las filas Proyectos  : '+JSON.stringify(fp));
   let ft = this.Terminado.map((c:any ,t:any)=> (Number(t.Cantidad) * Number(t.GranTotal))).reduce((acc, value)=> acc + value,0);   
   console.log('*****sacando las filas Terminadas : '+JSON.stringify(ft));    
   //this.Maestro_Cotizacion.GranTotal = (Number(fp) + Number(ft));

   this.sub_total = this.Maestro_Cotizacion.SubTotal;
   this.iva = this.Maestro_Cotizacion.IVA;

   if(ft != NaN){
      this.gran_total = fp 
   }else if(fp != NaN){
      this.gran_total = ft;
   }else{
      this.gran_total = (Number(fp) + Number(ft));
   }
   
      

    //console.log('id_cliente : '+JSON.stringify((this.Cotizacion_Completa.Maestro[0])[0].id_cliente));   
    //console.log('this.data_cliente : '+ JSON.stringify( this.data_cliente));
  //  console.log('nombre_completo_pago : '+ JSON.stringify( this.nombre_completo_pago));
  //  console.log('this.contacto_pago: '+ JSON.stringify( this.contacto_pago));
  //  console.log('cotizacion_en_cordoba(): '+ this.cotizacion_en_cordoba());
  }

  joinProyectDetails() {
    for (let i = 0; i < this.Proyectos.length; i++) {
      let Terminado = this.Terminado.filter(x => x.idDetCotizacion === this.Proyectos[i].idDetCotizacion)
      this.Proyectos[i].detalles_proyecto = Terminado
    }
  }
  removeTermProyect() {
    for (let i = 0; i < this.Proyectos.length; i++) {
      for (let j = 0; j < this.Proyectos[i].detalles_proyecto.length; j++) {
        let index = this.Terminado.findIndex(x => x.idDetCotizacion === this.Proyectos[i].detalles_proyecto[j].idDetCotizacion);
        if (index > -1) {
          this.Terminado.splice(index, 1);
        }
      }
    }
  }

  cotizacion_en_cordoba():boolean{
    if(this.moneda =="C$"){
      return true;
    }
    else{
      return false;
    }
  }
  
//vista preliminar 
imprime(){
  // window.print();
}
  
//cierre final  
  closed(){
    this.closed();
  }
}
