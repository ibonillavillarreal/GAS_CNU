import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Factura } from 'src/app/services/Factura.service';
import { Toast } from 'src/app/utils/Toast';
import { CarSelecPagosComponent } from '../Car-SelecPagos/car-selec-pagos.component';

@Component({
  selector: 'app-car-pagos-add',
  templateUrl: './car-pagos-add.component.html',
  styleUrls: ['./car-pagos-add.component.css']
})
export class CarPagosAddComponent implements OnInit {
  

  public list_FormaPagos_DBGrid:any[]=[];
  public TOTAL_USD: any = 0;
  public TOTAL_NIO: any = 0;
  public IMPORTE: any = 0;
  public CAMBIO: any = 0;
  public tsCambio: any = 0;
  public fechaDia:any;
  public fecha_factura: any;
  public idMoneda: any;  
  public id_plazos: any;  
  
  //---
  public json_factura_Y_detalle: any;
  public json_factura_Y_detalle_ConPagos: any;
  
  
  dataSourceFormasDePagos = new MatTableDataSource(this.list_FormaPagos_DBGrid);
  displayedColumns: string[] =[ 'Metodo','Moneda', 'Banco', 'Cuenta', 'TipoRetencion', 'NroReferencia','Monto','acciones' ];
  public toast: Toast;

  constructor(
    private dialoRef: MatDialogRef<CarPagosAddComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
    public dialog: MatDialog,private _snackbar: MatSnackBar,private srcFactura: Factura ) 
  { 
    this.toast = new Toast(this._snackbar);
    //data = {TOTAL_NIO:this.TOTAL_NIO,TOTAL_USD:this.TOTAL_USD}
    this.TOTAL_USD = data.TOTAL_USD;
    this.TOTAL_NIO = data.TOTAL_NIO;
    this.tsCambio = data.tsCambio;
    this.json_factura_Y_detalle = data.json;
    this.fechaDia=data.fechaDia; 
    this.fecha_factura=data.fecha_factura;    
    this.idMoneda=data.idMoneda;    
    this.id_plazos=data.id_plazos;
    
      

  }

  ngOnInit(): void {
   this.calcular_buelto(0);
  }

  calcular_buelto(oper:any){
    if(oper===0){
      this.CAMBIO = parseFloat(this.TOTAL_USD) - parseFloat(this.IMPORTE);
    }else{

      this.CAMBIO = parseFloat(this.TOTAL_USD) - parseFloat(this.IMPORTE);
    }  
  }

Cerrar(){
this.dialoRef.close();
}
SeleccioPago(type:number){
  let dialogRef;
  switch (type) {
    case 1: {
      if (1) {
        dialogRef = this.dialog.open(CarSelecPagosComponent,
          {
            height: '650px', width: '500px',
            data:{}
          });
        dialogRef.afterClosed().subscribe((result: any) => {
          if (result !== undefined) {
            
            this.list_FormaPagos_DBGrid.push(result);
            this.dataSourceFormasDePagos.data = this.list_FormaPagos_DBGrid; 
            console.log('valores frm ======>>>   '+JSON.stringify(result));
            
            if(result.idMoneda===37){  // si es cordoba 
                let dolarizado:any =  (parseFloat(result.Monto) / parseFloat(this.tsCambio))
                this.IMPORTE += parseFloat(dolarizado);  
            }else{
                this.IMPORTE += parseFloat(result.Monto);
            };
            
            this.calcular_buelto(1);
          }
          
          
        });
      } else {
        this.toast.showToast("SELECCIONE AL CLIENTE  ❗ ❗ ❗ ", "Aceptar");
      }
    } break;
    
    default: { dialogRef = this.dialog.open(CarSelecPagosComponent, {}) } break;
  }
}

  Aplicar_Factura_Detalle_Pagos(){

    this.json_factura_Y_detalle_ConPagos = {
      factura:this.json_factura_Y_detalle,
      FormaPagos:this.list_FormaPagos_DBGrid
    }
  
   console.log('this.json_factura_detalle_ConPagos =====>>>  '+JSON.stringify(this.json_factura_Y_detalle_ConPagos))  ;
  // const vJSON  = '{"factura":{"idcliente":16,"tipoFactura":212,"Sub_Total_USD":5300,"IVA_USD":300,"TOTAL_USD":5600,"Sub_Total_NIO":182743.99999999997,"IVA_NIO":10343.999999999998,"TOTAL_NIO":193087.99999999997,"tsCambio":34.48,"fechaDia":"2022-01-04T22:45:47.987Z","DetFactura":[{"idDetCotizacion":1513,"idCotizacion":2248,"NumeroCotizacion":"COT-0002248","Tipo":"T","TipoDesc":"TERMINADOS","ARTICULO":"PRD-TER-00000001","Descripcion":"LONA VINIL 1 MTS  x 50 - 8 ONZ","Altura":null,"Base":null,"UndMedida":null,"Cantidad":1,"Precio":1500,"iva":0,"subTotal":1500},{"idDetCotizacion":1514,"idCotizacion":2248,"NumeroCotizacion":"COT-0002248","Tipo":"V","TipoDesc":"SERVICIOS","ARTICULO":"PRD-SRV-00000010","Descripcion":"SERVICIO DE IMPRESION FULL COLOR PARA MANTAS","Altura":null,"Base":null,"UndMedida":null,"Cantidad":1,"Precio":1150,"iva":150,"subTotal":1150},{"idDetCotizacion":1515,"idCotizacion":2248,"NumeroCotizacion":"COT-0002248","Tipo":"P","TipoDesc":"PROYECTO","ARTICULO":"GNR-SRV-99999999","Descripcion":"proyecto de prueba","Altura":null,"Base":null,"UndMedida":null,"Cantidad":1,"Precio":2650,"iva":150,"subTotal":2650}]},"FormaPagos":[{"idformaPago":169,"Metodo":"Efectivo","idMoneda":38,"Moneda":"Dolar","idBanco":null,"idTipoCuenta":null,"idTipoRetencion":null,"NroReferencia":null,"Monto":5000},{"idformaPago":170,"Metodo":"Cheque","idMoneda":38,"Moneda":"Dolar","idBanco":186,"Banco":"BAC","idTipoCuenta":189,"Cuenta":"Corriente","idTipoRetencion":null,"NroReferencia":50505050,"Monto":600}]}'

  this.srcFactura.Add_Json_Factura(this.json_factura_Y_detalle_ConPagos).subscribe(res =>{
    console.log('respuesta insert :  '+ JSON.stringify(res));
      if(res){
        this.toast.showToast("GUARDADO CORRECTAMENTE ✔️", "Aceptar");        
        this.dialoRef.close(1);
      } else{
        this.toast.showToast("ERROR AL INTENTAR GUARDAR ❌ ", "Aceptar");        
      }    
  }) ;
  
  
}

}
