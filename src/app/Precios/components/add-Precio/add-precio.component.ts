import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { vnPrecios } from 'src/app/services/vnPrecios.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { MatDialog } from '@angular/material/dialog';
import { EditPrecioComponent } from '../Edit-Campo-Precio/edit-precio.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Toast } from 'src/app/utils/Toast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { __values } from 'tslib';
import { find } from 'rxjs/operators';

@Component({
  selector: 'app-add-precio',
  templateUrl: './add-precio.component.html',
  styleUrls: ['./add-precio.component.css']
})
  
export class AddPrecioComponent implements OnInit {
  private firstLoad: boolean = true;
  private permission: boolean = true;
  public listado_Precios_por_Cliente_DB: any[] = [];  
  //['NIVEL_PRECIO','MONEDA','VERSION','ARTICULO','VERSION_ARTICULO','DESCRIPCION','PRECIO','TIPO' ,'ACTIVO'];
  public displayedColumns: string[] = ['codigo','razon_social','Articulo','Descripcion','Precio','Moneda','acciones'];

  public dataSourceArticuloPrecio = new MatTableDataSource(this.listado_Precios_por_Cliente_DB);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public tools: GlobalUtilities;
  public frmClientePrecio!: FormGroup;
  public list_cliente: any;
  public list_Articulos: any;
  toast: Toast;


  constructor(
    private _builder: FormBuilder,
    private src_Precios: vnPrecios,
    public dialog: MatDialog,
    private srvCliente: ClienteService,
    private _snackbar: MatSnackBar,) 
    { 
      this.tools = GlobalUtilities.getInstance();
      this.toast = new Toast(this._snackbar);
    }

  ngOnInit(): void {   
    this.iniciarForm(); 
    this.setListadosClienteArticulo();
    this.loadModules();
  }
  //Load Cli
  async setListadosClienteArticulo() {
    this.list_cliente   = await this.srvCliente.getPersonas().toPromise();
    this.list_Articulos = await this.src_Precios.getArticulos().toPromise();
  }
  //Load list
  async loadModules() {
    this.tools.setisLoadingDetails(true)    
    //const jsonCadena = '{"Articulo":"PRD-SRV-00000003","id_cliente":"23","flagOperacion":"3"}'
    const jsonCadena = '{"Articulo":0,"id_cliente":0,"flagOperacion":"3"}'  //llamada sin filtro
    this.listado_Precios_por_Cliente_DB = await this.src_Precios.get_Cliente_precios(jsonCadena).toPromise();
    this.dataSourceArticuloPrecio.data = this.listado_Precios_por_Cliente_DB[0];
    
    if (this.firstLoad) {
      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
      }, 450);
      this.firstLoad = false;
    }
  }

  iniciarForm() {
    this.frmClientePrecio = this._builder.group({
      id_cliente: [], razon_social: [], Articulo: []  });
  }

  /***Filtrar en la tabla** */
 applyFilter(event: Event) {
  const valor = (event.target as HTMLInputElement).value;
  this.dataSourceArticuloPrecio.filter = valor.trim().toLowerCase();
}
getPaginatorData(event: any) {}

ngAfterViewInit() {
  this.dataSourceArticuloPrecio.paginator = this.paginator;
  this.dataSourceArticuloPrecio.sort = this.sort;
}

openDialog_ClientePrecio(id_cliente:any,razon_social:any,Articulo:any,ventana:any){  //ventana:0 viene del lapiz - ventana: 1 viene del boton
  let dialogRef;  
  dialogRef = this.dialog.open(EditPrecioComponent, {data: {id_cliente:id_cliente,razon_social:razon_social,Articulo:Articulo,ventana:ventana}});
   
  dialogRef.afterClosed().subscribe(result =>{               
    const jsonCadena = '{"Articulo":0,"id_cliente":0,"flagOperacion":"3"}'  //llamada sin filtro - lista todos
    this.Cargar(jsonCadena);  
   })
}
async Cargar(pJson:any){
  
  const jsonCadena = pJson 
  let resData = await  this.src_Precios.get_Cliente_precios(jsonCadena).subscribe( data =>{    
    this.toast.showToast("CARGADO CORRECTAMENTE ✔️", "Aceptar");        
    console.log(data);
    this.dataSourceArticuloPrecio.data  = data[0];
  });  
}

async ServicioClienteInsert(json_Insert:any){
 //const json_Insert =  '{"id_cliente":"23","Articulo":"PRD-SRV-00000003","Precio":"38.00"}'; 
 const jsonCadena = json_Insert
 let resData = await  this.src_Precios.addJson_Cliente_Precio(jsonCadena).toPromise();  
}

Json_Seleccion_click(){
  let id_cliente =  this.frmClientePrecio.controls["id_cliente"].value;
  let razon_social = this.list_cliente.find((x:any) => x.id_cliente === id_cliente).nombre;
  let id_Articulo =  this.frmClientePrecio.controls["Articulo"].value;     
  this.openDialog_ClientePrecio(id_cliente,razon_social,id_Articulo,'0'); 

  //const json_Insert =  '{"id_cliente":"'+id_cliente+'","Articulo":"'+id_Articulo+'","Precio":"999.00"}';
  //this.ServicioClienteInsert(JSON.stringify(json_Insert));  
  //const jsonCadena = '{"Articulo":"'+id_Articulo+'","id_cliente":"'+id_cliente+'","flagOperacion":"4"}'   
  //this.Cargar(JSON.stringify(jsonCadena));  
}

Json_click(){ 
  const jsonCadena = '{"Articulo":0,"id_cliente":0,"flagOperacion":"3"}'  //llamada sin filtro
  this.Cargar(jsonCadena);  
}

isAllowed() {
  return this.permission;
}
Cliente_change(id_cliente:any, nombre:any){
  console.log('valor de id : '+id_cliente);
  console.log('valor de nombre : '+nombre);
//const jsonCadena = '{"Articulo":"PRD-SRV-00000003","id_cliente":"23","flagOperacion":"3"}'
 const jsonCadena = '{"Articulo":"0","id_cliente":"'+id_cliente+'","flagOperacion":"1"}'   
 console.log('valor de nombre : '+jsonCadena);
 this.Cargar(JSON.stringify(jsonCadena));  
}

Articulo_change(id_Articulo:any,Descripcion:any){
  console.log('valor de id : '+id_Articulo);
  console.log('valor de nombre : '+Descripcion);
//const jsonCadena = '{"Articulo":"PRD-SRV-00000003","id_cliente":"23","flagOperacion":"3"}'
const jsonCadena = '{"Articulo":"'+id_Articulo+'","id_cliente":"0","flagOperacion":"2"}'   
console.log('valor de nombre : '+jsonCadena);
this.Cargar(JSON.stringify(jsonCadena));  

}
}


