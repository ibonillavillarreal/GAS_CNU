
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, NgZone, Inject } from '@angular/core';

import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast } from 'src/app/utils/Toast';
import { Cliente } from 'src/app/models/Cliente';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { Factura } from 'src/app/services/Factura.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/services/cliente.service';
import { Monedas } from '../../../models/Moneda';
import { MonedaService } from '../../../services/Moneda.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { ItemService } from '../../../services/Item.service';
import { AddItemSComponent } from '../add-item-s/add-item-s.component';
import { Items } from '../../../models/Items';
import { EditProyectoComponent } from '../edit-proyecto/edit-proyecto.component';
import { MatSort } from '@angular/material/sort';
import { AgendaService } from 'src/app/services/cotizacion.service';
import { Router, Data } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-add-cotizacion',
  templateUrl: './add-cotizacion.component.html',
  styleUrls: ['./add-cotizacion.component.css']
})
export class AddCotizacionComponent implements OnInit {
  
  public flag_Moneda_Cordoba: boolean = false;
  
  public flag_ts_Cambio:any;
  public fecha_ts = new Date(Date.now()).toISOString().substring(0,10);
  public id_cliente:any =0;
  public index: number = 0;
  public tsIVA: number = 0.15;  /// IMPUESTO AL VALOR AGREGADO 
  public usaArea: boolean = false;


  public datos: any;
  public tools: GlobalUtilities;
  public toast: Toast;

  public AddformCotizacion!: FormGroup;
  public dialogRef!: MatDialogRef<AddItemComponent>;

  public lista_Producto: Items[] = [];   //LA CONSULTA A LA BASES DE DATOS PARA EL CARRITO POPUP.
  public list_producto_term_bd: Items[] = [];   //LA CONSULTA A LA BASES DE DATOS PARA EL CARRITO POPUP.
  public lista_Producto_temp: any[] = []; //SE CARGAN AL GRID DETALLE  - VER TODOS 
  public list_cliente!: Cliente[];
  public Lista_Monedas: Monedas[] = [];
  public Moneda_simbol:any  = 'USD';
  public moneda_Cliente:any ;

  dataSource = new MatTableDataSource(this.lista_Producto_temp);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /*  id Det detalle de cotizacion para  la tabla */
  displayedColumns: string[] = ['Descripcion', 'Cantidad', 'Precio', 'Total', 'Acciones'];


  /**TOTALES**///CAMBIARA EN UN FUTURO
  subTotal: number = 0;
  Monto_Descuento:number = 0;
  IVA: number = 0;
  GranTotal: number = 0;

  constructor(private _builder: FormBuilder, private _snackbar: MatSnackBar, private srvCliente: ClienteService,
    public ngZone: NgZone, private srvMonedas: MonedaService, private srvItem: ItemService, public dialog: MatDialog,
    private srcItem: ItemService, private srcCotizacion: AgendaService,private router: Router, 
    public srcFactura:Factura
   ) {
    this.tools = GlobalUtilities.getInstance();
    this.toast = new Toast(this._snackbar);
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.setListaProducto();
    this.setListCliente();
    this.setListMonedas();
    this.eventAdd();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //console.log("TAMAÑO "+this.paginator)

  }
  
  async eventAdd() {
    this.srvItem.addItemTrigger.subscribe(res => {
      this.lista_Producto_temp.push(res.dataTerminado);
      this.dataSource.data = this.lista_Producto_temp;
      this.updateTotales()
    });

  }

  async setListaProducto() {
    this.id_cliente = this.AddformCotizacion.controls["id_cliente"].value;
   // console.log('id de cliente para getTipo '+JSON.stringify(this.id_cliente));

    this.lista_Producto   = (await this.srcItem.getTipoItem(this.id_cliente).toPromise())[0];
    // SE LE RSTA EL IVA  AL PRECIO PARA  SEPARA LOS MONTOS IVA CON PRECIO ANTES DE IVA     
    let DB_format_valores = (await this.srcItem.getTipoItem(this.id_cliente).toPromise())[0];  
    
      DB_format_valores.map((p:any) => {p.Precio = parseFloat(p.Precio) - parseFloat(p.iva)});
      this.list_producto_term_bd = DB_format_valores;    
  }

  async iniciarForm() {
    this.AddformCotizacion = this._builder.group({
      id_cotizacion: [0, Validators.required],
      id_cliente: [0, Validators.required],
      FechaEntrega: [this.fecha_ts,Validators.required],
      DiasPlazoEntrega: [0, Validators.required],
      DescripcionCotizacion: ['', Validators.required],
      Observaciones: ['', Validators.required],
      NumeroOC: ['0000'],
      id_moneda: ['NIO', Validators.required],
      TasaCambio: [this.flag_ts_Cambio],
      SubTotal: [0.0, Validators.required],
      Descuento: [0.0],
      DescuentoMonto: [0.0],
      IVA: [0.0, Validators.required],
      GranTotal: [0.0, Validators.required],
    });
    
    let Json_Fecha = '{"fecha":"'+this.fecha_ts+'"}';
    this.flag_ts_Cambio = parseFloat((await this.srcFactura.gettasaKambio(Json_Fecha).toPromise())[0].Tasa);    
    this.AddformCotizacion.controls["id_moneda"].setValue("USD");
    
  }


  async setListCliente() {
    this.list_cliente = await this.srvCliente.getPersonas().toPromise();
      //console.log('datos this.list_cliente : ',JSON.stringify(this.list_cliente));
  }
  async setListMonedas() {
    this.Lista_Monedas = await this.srvMonedas.getMonedas().toPromise();
  }


  cambiarMoneda(id:any){
  // 0:USD ,  NIO : 1
  if(id === 'NIO'){
    
    this.Moneda_simbol= 'NIO';
    this.flag_Moneda_Cordoba = true;
    
    let DB_format_valores = this.list_producto_term_bd;        
    DB_format_valores.map((p:any) => {p.Precio = parseFloat(p.Precio)*this.flag_ts_Cambio });
    DB_format_valores.map((p:any) => {p.iva = parseFloat(p.iva)*this.flag_ts_Cambio });
    this.list_producto_term_bd = DB_format_valores;    //actualizar la tabla 
    //console.log('====>>>   esta en cordobas  : '+JSON.stringify(DB_format_valores));

    //recalcular el grid : this.lista_Producto_temp;
    let grid_Producto_temp = this.lista_Producto_temp;
    grid_Producto_temp.map((p:any) => {p.Precio = parseFloat(p.Precio)*this.flag_ts_Cambio });
    this.updateTotales();

  }
  else{
    this.Moneda_simbol= 'USD';
    this.flag_Moneda_Cordoba= false;
    
    let DB_format_valores = this.list_producto_term_bd;        
    DB_format_valores.map((p:any) => {p.Precio = parseFloat(p.Precio)/this.flag_ts_Cambio });
    DB_format_valores.map((p:any) => {p.iva = parseFloat(p.iva)/this.flag_ts_Cambio });
    this.list_producto_term_bd = DB_format_valores;    //actualizar la tabla 
    //console.log('====>>>   esta en dolares  : '+JSON.stringify(DB_format_valores));

    //recalcular el grid : this.lista_Producto_temp;
    let grid_Producto_temp = this.lista_Producto_temp;
    grid_Producto_temp.map((p:any) => {p.Precio = parseFloat(p.Precio)/this.flag_ts_Cambio });
    this.updateTotales();

  }
}

  removeExistingItems(list: any) {
    const list_productos = Object.assign([], list);
    for (let i = 0; i < this.lista_Producto_temp.length; i++) {
      let index = list_productos.findIndex((x: any) => x.ARTICULO == this.lista_Producto_temp[i].ARTICULO);
      if (index > -1) {
        list_productos.splice(index, 1);
      }
    }
    return list_productos;
  }
  getSubTotal() {
    return this.dataSource.data.map((t: any) => t.SubTotal).reduce((acc, value) => acc + value, 0);
  }

  openForm(type: number, id: number) {
    let dialogRef;
    //1 - Proyecto y   2 - producto
    switch (type) {
      case 1: {
        if (this.id_cliente !== 0 ){                              ///  this.setListaProducto() ;      
                            
          dialogRef = this.dialog.open(AddItemComponent, 
            { height: '750px', width: '1150px', data:{lista_Producto:this.lista_Producto, id_cliente:this.id_cliente}})
          dialogRef.afterClosed().subscribe((res) => {

            if (res !== undefined) {
              this.lista_Producto_temp.push(res);
              this.dataSource.data = this.lista_Producto_temp
              this.updateTotales()
            }
          });

         

        }else
        {
          this.toast.showToast("Debe de Selecionar al Cliente  ❌", "Aceptar");
        }
      } break;
      case 2: { // para los Articulos libres 
          if(this.id_cliente !==0){                             ///  this.setListaProducto() ;       POSIBLE FALLA POR LLAMAR LA CARGA DATA
            
            let datoCompuesto_term: any[] = [0, this.removeExistingItems(this.list_producto_term_bd),this.flag_Moneda_Cordoba];
            dialogRef = this.dialog.open(AddItemSComponent, { height: '750px', width: '1150px', data: datoCompuesto_term })
            dialogRef.afterClosed().subscribe(() => {

               
            });
          }else
          {
           this.toast.showToast("Debe de Selecionar al Cliente  ❌", "Aceptar");
          }

      } break;
      case 3: {  //para editar los elementos cargados

        let proyecto = this.lista_Producto_temp[id - 1];
        dialogRef = this.dialog.open(EditProyectoComponent, { height: '730px', width: '1000px', data: proyecto })
        dialogRef.afterClosed().subscribe((res: any) => {
          if (res !== undefined) {
            this.lista_Producto_temp.push(res);
            let index = id - 1;
            this.lista_Producto_temp.splice(index, 1);
            this.dataSource.data = this.lista_Producto_temp;
            this.updateTotales()
          }
          
        });
      } break;
      default: { } break;
    }

  }
  removeDetail(index: number) {
    this.lista_Producto_temp.splice((index - 1), 1);
    this.dataSource.data = this.lista_Producto_temp
    this.toast.showToast("Eliminado correctamente ❌", "Aceptar");
  }


  updateTotales() {
    let IVATERMINADO = this.lista_Producto_temp.filter(x => x.TIPO === 'T' || x.TIPO === 'V').map((x: any) => parseFloat(x.Cantidad)*parseFloat(x.iva)).reduce((acc, value) => acc + value, 0)
    let IVAPROYECTO =  this.lista_Producto_temp.filter(x => x.TIPO === 'P')                  .map((x: any) =>                        parseFloat(x.iva)).reduce((acc, value) => acc + value, 0)
    this.IVA = IVATERMINADO + IVAPROYECTO;
    

    let SubTotalProyectos = this.lista_Producto_temp.filter(x => x.TIPO === 'P')             .map((x: any) => (parseFloat(x.Precio))).reduce((acc, value) => acc + value, 0);
    let SubTotalTerminado:number = this.lista_Producto_temp.filter(x => x.TIPO === 'T' || x.TIPO === 'V').map((x: any) => (parseFloat(x.Precio)) * parseFloat(x.Cantidad)).reduce((acc, value) => acc + value, 0);
    this.subTotal = (SubTotalProyectos + SubTotalTerminado);
    
    this.Monto_Descuento = (parseFloat(this.AddformCotizacion.controls['Descuento'].value)/100) * this.subTotal;
    
    if(this.Monto_Descuento > 0){
      let montoIVa = (this.subTotal - this.Monto_Descuento) * this.tsIVA;  
      this.GranTotal = ((this.subTotal-this.Monto_Descuento) + montoIVa) ;
      this.IVA = montoIVa;

      this.AddformCotizacion.controls['DescuentoMonto'].setValue(this.Monto_Descuento);
      this.AddformCotizacion.controls['SubTotal'].setValue(this.subTotal);
      this.AddformCotizacion.controls['IVA'].setValue(montoIVa);
      this.AddformCotizacion.controls['GranTotal'].setValue( this.GranTotal);
    }else{

      this.tsIVA;  
      this.GranTotal = (this.subTotal+this.tsIVA);
      
      this.AddformCotizacion.controls['DescuentoMonto'].setValue(this.Monto_Descuento);
      this.AddformCotizacion.controls['SubTotal'].setValue(this.subTotal);
      this.AddformCotizacion.controls['IVA'].setValue(this.IVA);
      this.AddformCotizacion.controls['GranTotal'].setValue( this.GranTotal);
    }
    

 
  }
  async Descuento_kyUp(){
      this.updateTotales();
  }

  /* Sumit del formulario  */
  enviar(values: any, formDirective: FormGroupDirective) {
    let cotizacion = { Master: values, Details: this.lista_Producto_temp }    
    this.srcCotizacion.addCotizacion(cotizacion).subscribe(res => {      
      this.toast.showToast("Agregado correctamente ✔️", "Aceptar");
      this.router.navigate(['/Cotizacion']);
    })

  }


  async Cliente_change(id:number){    
  
    this.dataSource.data = [];
    this.lista_Producto_temp = [];    
    this.id_cliente = this.AddformCotizacion.controls["id_cliente"].value;    
    this.lista_Producto = (await this.srcItem.getTipoItem(this.id_cliente).toPromise())[0];
    //  sacamos moneda del cliente
    let money: any = this.list_cliente.find(f => f.id_cliente==id);
    this.moneda_Cliente = money.MONEDA;
    console.log('dato this.moneda_Cliente :', JSON.stringify(this.moneda_Cliente))
    console.log('dato this.Moneda_simbol :',JSON.stringify(this.Moneda_simbol))
    
    if(this.moneda_Cliente!==this.Moneda_simbol) 
    { 
      this.Moneda_simbol  = this.moneda_Cliente;
      if(this.Moneda_simbol ==='NIO'){ this.cambiarMoneda('NIO')} else{this.cambiarMoneda('USD')}

    }
  }
  
  limpiarTodoelGrid(){
    const lst_articulo:any[] = this.lista_Producto_temp.map(t=> {return t.ARTICULO})    

    const list_productos = Object.assign([], this.lista_Producto_temp);
    for (let i = 0; i < this.lista_Producto_temp.length; i++) {
      let index = list_productos.findIndex((x: any) => x.ARTICULO == lst_articulo[i].ARTICULO);   
      if (index > -1) {        
        list_productos.splice(index, 1);        
      }
    }
    return(list_productos);
  }

}





