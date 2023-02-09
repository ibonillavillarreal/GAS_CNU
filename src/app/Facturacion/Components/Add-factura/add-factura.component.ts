import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Factura } from 'src/app/services/Factura.service';
import { MonedaService } from 'src/app/services/Moneda.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { Toast } from 'src/app/utils/Toast';
import { CarItemAddComponent } from '../Car-add-Items/car-item-add.component';
import { CarPagosAddComponent } from '../Car-add-Pagos/car-pagos-add.component';
import { __values } from 'tslib';
import { Router } from '@angular/router';
import { CcService } from 'src/app/services/Cc.service';
import { DICTIONARYKEYS } from 'src/app/utils/DICTIONARYKEYS';


@Component({
  selector: 'app-add-factura',
  templateUrl: './add-factura.component.html',
  styleUrls: ['./add-factura.component.css']
})
export class AddFacturaComponent implements OnInit {

  public tools: GlobalUtilities
  public permission: boolean = true;
  public firstLoad: boolean = true;
  displayedColumns: string[] = ['NumeroCotizacion', 'ARTICULO', 'Descripcion', 'Cantidad', 'Precio', 'iva', 'subTotal', 'acciones'];

  list_Items_Tmp: any[] = [];
  list_factura_Item_DB_Grid: any[] = [];
  dataSourceFacturaItems = new MatTableDataSource(this.list_factura_Item_DB_Grid);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public toast: Toast;
  public idcliente: any;
  public razonSocial: any;
  public list_plazos: any = [];  
  public id_plazos: any;  
  public tipoFactura: any;
  public tipo_factura_Desc: any;
  public itsCredit!: boolean;
  public idMoneda: any;  
  public list_ClienteCotizaciones: any;
  public list_ArticulosTerminados: any;
  public list_cliente: any;
  public list_tipoFactura: any;
  public Lista_Monedas: any;    
  public frmClienteCotizacion!: FormGroup;  
  public Sub_Total_USD: any = 0;
  public IVA_USD: any = 0;
  public TOTAL_USD: any = 0;
  public Sub_Total_NIO: any = 0;
  public IVA_NIO: any = 0;
  public TOTAL_NIO: any = 0;
  public tsCambio: number = 0.00;
  public fechaDia: Date = new Date(Date.now());  
  public fecha_factura = new Date(Date.now()).toISOString().substring(0,10);
  public json_factura_detalle: any;
    
  constructor(
    private _builder: FormBuilder, public dialog: MatDialog, private srvMonedas: MonedaService, private srcFactura: Factura, 
    private srcCc: CcService, private _snackbar: MatSnackBar,private router: Router) {
    this.toast = new Toast(this._snackbar);
    this.tools = GlobalUtilities.getInstance();
    this.iniciarForm();
    this.setListadosClienteTipoFactura();
    this.loadModules();    
  }
  ngOnInit(): void {
    this.eventAdd();
  }
  iniciarForm() {
    this.frmClienteCotizacion = this._builder.group({
      id_cliente: [], razon_social: [], Cotizacion: [], TipoFactura: [], FechaFactura: [this.fecha_factura] , id_moneda: ['USD'] ,
      id_plazo_interes: [1]     
    });
    this.idMoneda = 'USD'; // valor inicial por default 
    
  }

  async eventAdd() {
    this.srcFactura.addFacturaTerminada.subscribe(res => {
      this.list_factura_Item_DB_Grid.push(res.list_factura_Item_DB_Grid);
      this.dataSourceFacturaItems.data = this.list_factura_Item_DB_Grid;      
    });
  }
  //Load Cliente , tipo, y moneda
  async setListadosClienteTipoFactura() {
    const pjson = '{"Cliente":"0","idCOT":"0","Oper":"1"}';
    this.list_cliente = await this.srcFactura.add_Json_FacturaItems(pjson).toPromise();        
    let data = await this.srcFactura.getTipoFacturacion().toPromise();
    this.list_tipoFactura = data;
    let Json_Fecha = '{"fecha":"'+this.fecha_factura+'"}';
    this.tsCambio = parseFloat((await this.srcFactura.gettasaKambio(Json_Fecha).toPromise())[0].Tasa);    
    
    let moneda = await this.srvMonedas.getMonedas().toPromise();
    this.Lista_Monedas = moneda;
  } 
  //Load list
  //-- json={Cliente:'39',idCOT:'2285',Oper:'6'}
  async loadModules() {
    this.tools.setisLoadingDetails(true)
    this.dataSourceFacturaItems.data = this.list_factura_Item_DB_Grid;
    this.list_plazos = await this.srcCc.getPlazos().toPromise();
    const jsonarticulos = '{"Cliente":"0","idCOT":"0","Oper":"9"}';
    this.list_ArticulosTerminados = await this.srcFactura.add_Json_FacturaItems(jsonarticulos).toPromise();
    
    if (this.firstLoad) {
      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
      }, 450);
      this.firstLoad = false;
    }
  }

  openForm(type: number, id: number) {
    let dialogRef;
    switch (type) {
      case 1: {
        if ((this.idcliente !== undefined)&&(this.tipoFactura !== undefined)&&(this.idMoneda !== undefined)) {
          
          dialogRef = this.dialog.open(CarItemAddComponent,
            {
              height: '700px', width: '1200px',
              data: { id_cliente: this.idcliente, razonSocial: this.razonSocial, fecha_factura:this.fecha_factura, idMoneda:this.idMoneda, tsCambio:this.tsCambio, clienteCotizaciones: this.list_ClienteCotizaciones, list_ArticulosTerminados:this.list_ArticulosTerminados }
            });
          dialogRef.afterClosed().subscribe((result: any) => {
            if (result !== undefined) {
              result.map((t: any[]) => { this.list_factura_Item_DB_Grid.push(t) });
              this.dataSourceFacturaItems.data = this.list_factura_Item_DB_Grid;
            }
            this.calculos_totales();
          });
        } else {
          this.toast.showToast("SELECCIONE: CLIENTE,TIPO FACTURA Y MONEDA ❗ ❗ ❗ ", "Aceptar");
        }
      } break;
      case 2: {
        if (this.tipoFactura !== undefined) {
              if(this.TOTAL_NIO ===0 || this.TOTAL_USD ===0){
                this.toast.showToast("MONTO DE FACTURA EN CERO ❗ ❗ ❗ ", "Aceptar");      
              }else{
                this.json_cargar();
                dialogRef = this.dialog.open(CarPagosAddComponent,
                  {
                    height: '700px', width: '1100px',
                    data: {fecha_factura: this.fecha_factura, idMoneda: this.idMoneda, id_plazos: this.id_plazos, TOTAL_NIO:this.TOTAL_NIO,TOTAL_USD:this.TOTAL_USD,tsCambio:this.tsCambio, fechaDia:this.fechaDia, json:this.json_factura_detalle},
                    disableClose: true, autoFocus:true       
                  });
                dialogRef.afterClosed().subscribe((result: any) => {
                  if (result !== undefined) {      
                    this.router.navigate(['/Factura']);
                  }      
                });
              }
          
        } else {
          this.toast.showToast("SELECCIONE TIPO DE FACTURACIÓN  ❗ ❗ ❗ ", "Aceptar");
        }

      } break;
      default: { dialogRef = this.dialog.open(CarItemAddComponent, {}) } break;
    }

  }
  async Cliente_change(id_cliente: any, nombre: any) {
    this.idcliente = id_cliente;
    this.razonSocial = this.list_cliente.find((x: any) => x.id_cliente === this.idcliente).razon_social;
    const pjson = '{"Cliente":"' + id_cliente + '","idCOT":"0000","Oper":"2"}';
    this.list_ClienteCotizaciones = await this.srcFactura.add_Json_FacturaItems(pjson).toPromise();
  }

  async tipoFactura_change(id_tipo_Factura: any, tipo_factura_Desc: any) {    
    this.tipoFactura = id_tipo_Factura
    this.tipo_factura_Desc = tipo_factura_Desc
    if (id_tipo_Factura === DICTIONARYKEYS.IDTIPO) 
    { this.itsCredit = true; 

    } else { this.itsCredit = false; }

  }
  async plazoFactura_change(plazo_id:any){
    this.id_plazos = plazo_id;
  }

  async FechaFactura_change($event:any){
    let  dateStr = $event.target.value;     
      this.fecha_factura = dateStr;      
      let Json_Fecha = '{"fecha":"'+this.fecha_factura+'"}';
      this.tsCambio = parseFloat((await this.srcFactura.gettasaKambio(Json_Fecha).toPromise())[0].Tasa);    
    ///
      this.fechaDia = dateStr;
  }

  async moneda_change(id_moneda:any,desc_moneda:any){
      this.idMoneda = id_moneda;
      console.log('Moneda desde Factura :  '+this.idMoneda);
  }
  calculos_totales() {
    if(this.idMoneda === 'USD'){
      const factura = this.list_factura_Item_DB_Grid;
      this.Sub_Total_USD = parseFloat(factura.map((t: any) => t.subTotal).reduce((acc, value) => acc + value, 0));
      this.IVA_USD = parseFloat(factura.map((t: any) => t.iva).reduce((acc, value) => acc + value, 0));
      this.TOTAL_USD = parseFloat(this.Sub_Total_USD) + parseFloat(this.IVA_USD);
      /// Cordobisar 
      this.Sub_Total_NIO = parseFloat(this.Sub_Total_USD) * this.tsCambio;
      this.IVA_NIO = parseFloat(this.IVA_USD) * this.tsCambio;
      this.TOTAL_NIO = parseFloat(this.Sub_Total_NIO) + parseFloat(this.IVA_NIO);

    }else // si la moneda es Cortdobas
    {
      const factura = this.list_factura_Item_DB_Grid;
      this.Sub_Total_NIO  = parseFloat(factura.map((t: any) => t.subTotal).reduce((acc, value) => acc + value, 0));
      this.IVA_NIO = parseFloat(factura.map((t: any) => t.iva).reduce((acc, value) => acc + value, 0));
      this.TOTAL_NIO = parseFloat(this.Sub_Total_NIO) + parseFloat(this.IVA_NIO);
      /// ...DOLARIZAR 
      this.Sub_Total_USD = parseFloat(this.Sub_Total_NIO) / this.tsCambio;
      this.IVA_USD = parseFloat(this.IVA_NIO) / this.tsCambio;
      this.TOTAL_USD = parseFloat(this.Sub_Total_USD) + parseFloat(this.IVA_USD);

    }
    
  }


json_cargar(){

  const MaestroFaacturaDetalle = 
  {
    idcliente:this.idcliente, 
    tipoFactura:this.tipoFactura, 
    id_plazos:this.id_plazos,
    fecha_factura:this.fecha_factura,
    idMoneda:this.idMoneda,
    Sub_Total_USD:this.Sub_Total_USD, 
    IVA_USD:this.IVA_USD, 
    TOTAL_USD:this.TOTAL_USD, 
    Sub_Total_NIO:this.Sub_Total_NIO,
    IVA_NIO:this.IVA_NIO,
    TOTAL_NIO:this.TOTAL_NIO, 
    tsCambio:this.tsCambio,
    fechaDia:this.fechaDia,
    DetFactura:this.list_factura_Item_DB_Grid
  }

  this.json_factura_detalle =  MaestroFaacturaDetalle;
}



  isAllowed() { return this.permission; }
  getPaginatorData(event: any) { }

}
