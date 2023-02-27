import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Actas } from 'src/app/services/Factura.service';
import { map, find } from 'rxjs/operators';
import { EditarCantidadComponent } from '../Edit-Cantidad/editar-cantidad.component';

@Component({
  selector: 'app-car-item-add',
  templateUrl: './car-item-add.component.html',
  styleUrls: ['./car-item-add.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CarItemAddComponent implements OnInit {
  public modoCotizacion: boolean = true
  public modoArtDirecto: boolean = false
  public idCliente: any;
  public razonSocial: any;
  public tsCambio: any;
  public MonedaFactura: any;
  public list_ClienteCotizaciones: any;
  public list_ArticulosTerminados: any;
  
  public IndexCotizaciones: any;
  public list_factura_Item_DB_Grid: any[] = [];
  dataSourceFacturaItems = new MatTableDataSource(this.list_factura_Item_DB_Grid);
  displayedColumns: string[] = ['NumeroCotizacion', 'ARTICULO', 'Descripcion', 'Cantidad', 'Precio', 'iva', 'subTotal', 'acciones'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private srcFactura: Actas, 
    public dialog: MatDialog, private dialoRef: MatDialogRef<CarItemAddComponent>) {
    this.idCliente = data.id_cliente;
    this.tsCambio = data.tsCambio;
    this.MonedaFactura = data.idMoneda;
    this.razonSocial = data.razonSocial;
    this.list_ClienteCotizaciones = data.clienteCotizaciones;
    this.list_ArticulosTerminados =data.list_ArticulosTerminados;
    
  }
  ngOnInit(): void {
  }

  async cotizacion_click(id_Cotizacion: any, idMoneda_cotizacion: any) {
    this.IndexCotizaciones = id_Cotizacion;
    const pjson = '{"Cliente":"' + this.idCliente + '","idCOT":"' + id_Cotizacion + '","Oper":"5"}';
    this.list_factura_Item_DB_Grid = await this.srcFactura.add_Json_FacturaItems(pjson).toPromise();
    
    if (this.MonedaFactura !== idMoneda_cotizacion) //Moneda Diferentes
    {
        if (idMoneda_cotizacion === 'USD') // Pasar cotizaciones a  Cordobas
        { 
          this.list_factura_Item_DB_Grid.map((t: any) => { return (t.Precio = parseFloat(t.Precio) * parseFloat(this.tsCambio))});
          this.list_factura_Item_DB_Grid.map((t: any) => { return (t.iva = parseFloat(t.iva) * parseFloat(this.tsCambio))});
          this.list_factura_Item_DB_Grid.map((t: any) => { return ( t.subTotal = parseFloat(t.Cantidad) * parseFloat(t.Precio))});          
          this.dataSourceFacturaItems.data = this.list_factura_Item_DB_Grid;         
        } else  // Pasar cotizaciones a  Dolares
        {
          this.list_factura_Item_DB_Grid.map((t: any) => { return (t.Precio = parseFloat(t.Precio) / parseFloat(this.tsCambio))});
          this.list_factura_Item_DB_Grid.map((t: any) => { return (t.iva = parseFloat(t.iva) / parseFloat(this.tsCambio))});          
          this.list_factura_Item_DB_Grid.map((t: any) => { return ( t.subTotal = parseFloat(t.Cantidad) * parseFloat(t.Precio))});          
          this.dataSourceFacturaItems.data = this.list_factura_Item_DB_Grid;          
        }
    } else // como son iguales : No hacere conversiones 
    {
      this.dataSourceFacturaItems.data = this.list_factura_Item_DB_Grid;
    }
  }

  async terminado_click(Producto_id:any){
    let articulo = this.list_ArticulosTerminados.find((x:any)=>{return x.idProducto === Producto_id});
    let facturaDirecta  = {      
      NumeroCotizacion:articulo.idCotizacion,
      ARTICULO:articulo.idProducto,
      Descripcion:articulo.Descripcion,
      Cantidad: parseFloat(articulo.Cantidad),
      Precio: parseFloat(articulo.Precio),
      iva: parseFloat(articulo.iva),
      subTotal: parseFloat(articulo.subTotal)
    }        

    console.log('Venta es : '+ JSON.stringify(facturaDirecta));
    this.list_factura_Item_DB_Grid.push(facturaDirecta);
    this.dataSourceFacturaItems.data = this.list_factura_Item_DB_Grid;

  }

Cantidad_click(index:any){
  console.log('indice : ',JSON.stringify(index));
  let dialogRef = this.dialog.open(EditarCantidadComponent,
    {
      height: '400px', width: '330px',
      data: { Precio:this.list_factura_Item_DB_Grid[index].Precio,DescripUso:this.list_factura_Item_DB_Grid[index].Descripcion}
    });
    dialogRef.afterClosed().subscribe((obj:any)=>{
      console.log(obj);
      let regCantidad =  this.list_factura_Item_DB_Grid[index].Cantidad = obj.Cantidad;
      console.log('Regsitro con el indice : ',JSON.stringify(regCantidad));

    });  
  
}


  add_Articulo_click(ARTICULO_id: any) {
    if (ARTICULO_id !== undefined) {
      let data = this.list_factura_Item_DB_Grid.find((x: any) => { return x.ARTICULO === ARTICULO_id });
      this.srcFactura.addFacturaTerminada.emit({ list_factura_Item_DB_Grid: data });
      // PROCEDE A ELLIMINARLO DEL OBJETO DE LISTA 
      const idx = this.list_factura_Item_DB_Grid.findIndex((x: any) => { return x.ARTICULO === ARTICULO_id });
      if (idx > -1) {
        this.list_factura_Item_DB_Grid.splice(idx, 1);
      }
      this.dataSourceFacturaItems.data = this.list_factura_Item_DB_Grid;
    }
  }

  Emitir_Articulos_click() {
    this.dialoRef.close(this.list_factura_Item_DB_Grid);
  }
  articulo_Change(event:any){
      console.log('Evento ' , event.checked);
      if(event.checked){
        this.modoCotizacion = false;
        this.modoArtDirecto = true;
      }else{
        this.modoCotizacion = true;
        this.modoArtDirecto = false;
      }

  }
}
