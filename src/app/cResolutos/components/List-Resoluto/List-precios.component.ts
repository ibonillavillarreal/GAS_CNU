import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { vnPrecios } from 'src/app/services/vnPrecios.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { DeletResolutoComponent } from '../Delet-Resoluto/delet-resoluto.component';
import { EditResolutoComponent } from '../Edit-Campo-Resoluto/edit-resoluto.component';
import { VerResolutoComponent } from '../Ver-Resoluto/ver-Resoluto.component';


@Component({
  selector: 'app-resolutos',
  templateUrl: './List-resolutos.component.html',
  styleUrls: ['./List-resolutos.component.css']
})
export class List_ResolutoComponent implements OnInit {
  private firstLoad: boolean = true;
  private permission: boolean = true;
  public listado_vnPrecios_DB: any[] = [];
  tools: GlobalUtilities

  displayedColumns: string[] = ['Nivel', 'Articulo', 'Descripcion', 'Precio', 'MonedaDesc', 'acciones'];
  dataSourceArticuloPrecio = new MatTableDataSource(this.listado_vnPrecios_DB);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private src: vnPrecios,
    public dialog: MatDialog
  ) {
    this.tools = GlobalUtilities.getInstance();
  }

  ngOnInit(): void {
    console.log(' iniciando carga');
    this.loadModules();
  }
  //Load list
  async loadModules() {
    this.tools.setisLoadingDetails(true)
    let data = await this.src.getArticulosPrecios().toPromise();
    this.listado_vnPrecios_DB = data;
   //console.log('la data esperada ===>' + JSON.stringify(data));

    this.dataSourceArticuloPrecio.data = this.listado_vnPrecios_DB;
    if (this.firstLoad) {
      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
      }, 450);
      this.firstLoad = false;
    }

  }

  isAllowed() {
    return this.permission;
  }



  /***Filtrar en la tabla** */
  applyFilter(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSourceArticuloPrecio.filter = valor.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSourceArticuloPrecio.paginator = this.paginator;
    this.dataSourceArticuloPrecio.sort = this.sort;
    //console.log("INDICE " + this.paginator.pageIndex);
    //console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
    //console.log("TAMAÑO "+this.paginator)
  
  }
  getPaginatorData(event: any) {}

  openForm(type: number, id: number) {
    let dialogRef;
    switch (type) {
      case 1: { dialogRef = this.dialog.open(VerResolutoComponent, { height: '780px', width: '1200px' }) } break;
      //case 2: { dialogRef = this.dialog.open(EditarPrecioComponent, { height: '780px', width: '1200px', data: { id: id } }) } break;
      case 3: { dialogRef = this.dialog.open(DeletResolutoComponent, { height: '200px', width: '500px', data: { id: id } }) } break;
      default: { dialogRef = this.dialog.open(VerResolutoComponent, { height: '780px', width: '1200px' }) } break;
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.loadModules();
      }
    });

  }


 //openDialog_ClientePrecio(element.id_cliente,element.razon_social,element.Articulo,'0')
  openDialog_ClientePrecio(id_cliente:any,razon_social:any,Articulo:any,ventana:any){  //ventana:0 viene del lapiz - ventana: 1 viene del boton
    let dialogRef;  
    dialogRef = this.dialog.open(EditResolutoComponent, {data: {id_cliente:id_cliente,razon_social:razon_social,Articulo:Articulo,ventana:ventana}});
     
    dialogRef.afterClosed().subscribe(result =>{               
      const jsonCadena = '{"Articulo":0,"id_cliente":0,"flagOperacion":"3"}'  //llamada sin filtro - lista todos      
      location.reload();
     });
    
  }


}
