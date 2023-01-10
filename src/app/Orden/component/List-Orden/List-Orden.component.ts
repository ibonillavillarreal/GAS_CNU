import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdenService } from 'src/app/services/orden.service';
import { SubCatalogoService } from 'src/app/services/subcatalogo.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { AnularOrdenComponent } from '../anular-orden/anular-orden.component';

@Component({
  selector: 'app-orden',
  templateUrl: './List-Orden.component.html',
  styleUrls: ['./List-Orden.component.css']
})
export class OrdenComponent implements OnInit {

    list_ordenes: any =[];
    firstLoad: boolean = true;
    public Area_Internas_OT: any[] = []; 
    sinFiltro: string="0";
    tools!: GlobalUtilities
    private permission: boolean = true;
    /*****CAMPOS TABLA **/
    displayedColumns: string[] = ['NoOrden', 'Descripcion', 'Cliente', 'Fecha', 'Estado', 'acciones'];
    dataSource = new MatTableDataSource(this.list_ordenes);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    constructor(private srcOrden:OrdenService, public dialog: MatDialog, public srvSubCatalogos: SubCatalogoService) { 
        this.tools = GlobalUtilities.getInstance();
    }

    ngOnInit(): void {
        this.loadOrdenes();
    }

    async loadOrdenes(){
        this.list_ordenes = [];
        let data = await this.srcOrden.getOrdenes().toPromise();
        if (data !== '0') {
          if (this.firstLoad) { this.tools.setisLoadingDetails(true) }
          this.list_ordenes = data;
          console.log('list_ordenes : ',JSON.stringify(this.list_ordenes));
          this.dataSource.data = this.list_ordenes;

          this.Area_Internas_OT = await this.srvSubCatalogos.get_Sub_Estados_Cotizacion({'op':2}).toPromise();    
          this.Area_Internas_OT.push({id:'0',descripcion:'SIN FILTRO'})  
        

          if (this.firstLoad) {
            setTimeout(() => { this.tools.setisLoadingDetails(false) }, 450);
            this.firstLoad = false;
          }
        } else {
          this.permission = false;
        }
    }

    isAllowed() {
        return this.permission;
    }

    openDialogAnular(id_orden:number){
        let dialogRef;
        dialogRef = this.dialog.open(AnularOrdenComponent, {data: {id_orden:id_orden}});
        dialogRef.afterClosed().subscribe(result =>{
            
        })
    }

      /**Inicializar paginator**/
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("INDICE " + this.paginator.pageIndex);
      console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
      //console.log("TAMAÑO "+this.paginator)

    }
    /***Filtrar en la tabla** */
    applyFilter(event: Event) {
      const valor = (event.target as HTMLInputElement).value;
      this.dataSource.filter = valor.trim().toLowerCase();
    }

    async filtrarEstado(id:any){      
      if(id==='0'){ 
            this.dataSource.data = this.list_ordenes;
      }else{
            this.dataSource.data =this.list_ordenes.filter((f:any)=> f.idsubestado === id);
      }
    }
}
