import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { DetailFacturaComponent } from '../Detail-factura/detail-factura.component';
import { EditFacturaComponent } from '../Edit-factura/edit-factura.component';
import { DelEstadoFacturaComponent } from '../Del-EstadoFactura/del-estado-factura.component';
import { Factura } from 'src/app/services/Factura.service';
import { CcService } from 'src/app/services/Cc.service';
import { SubCatalogoService } from 'src/app/services/subcatalogo.service';

@Component({
  selector: 'app-list-factura',
  templateUrl:'./list-factura.component.html',
  styleUrls: ['./list-factura.component.css']
})
export class ListFacturaComponent implements OnInit {

  public tools: GlobalUtilities
  public permission: boolean = true;
  public firstLoad: boolean = true;  
  public Estado_subCatalogo: any[] = []; 
  sinFiltro: string="0";

  displayedColumns: string[] =  ['Codigo','Cliente','Factura','Tipo','Monto','Moneda','Estado','acciones'];

  list_facturasDB: any[] = [];
  dataSourceFactura = new MatTableDataSource(this.list_facturasDB);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,private srcFactura: Factura, public srvSubCatalogos: SubCatalogoService 
  ) { 

  this.tools = GlobalUtilities.getInstance();
  this.loadModules();
  }

  ngOnInit(): void {
    
      
  }

  //Load list
 async loadModules() {
  this.tools.setisLoadingDetails(true)
  let data = await this.srcFactura.getFacturaListado().toPromise();  
   this.list_facturasDB = data;   
   this.dataSourceFactura.data = this.list_facturasDB;   

   this.Estado_subCatalogo = await this.srvSubCatalogos.get_Sub_Estados_Cotizacion({'op':3}).toPromise();    
   this.Estado_subCatalogo.push({id:'0',descripcion:'SIN FILTRO'})  

  if (this.firstLoad) {
    setTimeout(() => {
      this.tools.setisLoadingDetails(false)
    }, 450);
    this.firstLoad = false;
  }
  //console.log('this.list_facturasDB : '+ JSON.stringify(this.list_facturasDB));
}

  openForm(type: number, id: number) {
    let dialogRef;
     switch (type) {
       case 1: { dialogRef = this.dialog.open(DetailFacturaComponent,  {
                 height: '700px', width: '9000px',
                 data:{facturaMaestro:this.list_facturasDB.find((reg:any)=>{return(reg.id_factura ===id)})}})

               } break;
       case 2: { dialogRef = this.dialog.open(EditFacturaComponent, { height: '780px', width: '1200px', data: { id: id } }) 
                dialogRef.afterClosed().subscribe((result:any) => {
                location.reload(); 
                });
      } break;
       case 3: { dialogRef = this.dialog.open(DelEstadoFacturaComponent, { height: '780px', width: '1200px',data: { id: id } }); } break;
        default: { dialogRef = this.dialog.open(DetailFacturaComponent); } break;
    }
    
    
     
   }


  isAllowed() {
    return this.permission;
  }

  getPaginatorData(event: any) {
    //console.log("INDICE " + this.paginator.pageIndex);
    //console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
    //console.log("TAMAÑO " + this.paginator.hidePageSize)
  }
  
    /***Filtrar en la tabla** */
    applyFilter(event: Event) {
      const valor = (event.target as HTMLInputElement).value;
      this.dataSourceFactura.filter = valor.trim().toLowerCase();
    }
    async filtrarEstado(id:any){      
     
      switch(id) { 
        case 0: { 
          this.dataSourceFactura.data = this.list_facturasDB;   
           break; 
        } 
        case 240: {  //GENERADA
          this.dataSourceFactura.data =this.list_facturasDB.filter((f:any)=> f.id_estado === 214);
           break; 
        } 
        case 241: {  //ENTREGADA
          this.dataSourceFactura.data =this.list_facturasDB.filter((f:any)=> f.id_estado === 214);
          break; 
       } 
       case 242: {  //RECIBIDA
        this.dataSourceFactura.data =this.list_facturasDB.filter((f:any)=> f.id_estado === 214);
        break; 
       } 
       case 243: {  //CANCELADA
        this.dataSourceFactura.data =this.list_facturasDB.filter((f:any)=> f.id_estado === 214);
        break; 
       } 
       case 244: {  //CONTABILIZADA
        this.dataSourceFactura.data =this.list_facturasDB.filter((f:any)=> f.id_estado === 226);
        break; 
       } 
        default: { 
          this.dataSourceFactura.data = this.list_facturasDB;   
           break; 
        } 
     } 

    }

}
