//import { Component, OnInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AgendaService } from 'src/app/services/cotizacion.service';
import { MatDialog } from '@angular/material/dialog';
//import { DetailsClienteComponent } from '../details-cliente/details-cliente.component';
import { AddAgendaComponent } from '../add-agenda/add-agenda.component';
//import { AnularClienteComponent } from '../anular-cliente/anular-cliente.component';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { DeleteCotizacionComponent } from '../delete-cotizacion/delete-cotizacion.component';
import { SubCatalogoService } from 'src/app/services/subcatalogo.service';


@Component({
  selector: 'app-detalle-agenda-component',
  templateUrl: './List-agenda.component.html',
  styleUrls: ['./List-agenda.component.css']
})
export class ListAgendaComponent implements OnInit {

  /***VARIABLES PARA TABLA */
  public list_agenda: any[] = [];
  public Estado_subCatalogo: any[] = [];
  sinFiltro: string = "0";
  tools: GlobalUtilities
  firstLoad: boolean = true;  
  private permission: boolean = true;
  /*****CAMPOS TABLA **/
  displayedColumns: string[] =
    ['IdAgenda',
      'DescripcionAgenda',
      'FechaRegristro',
      'acciones'
    ];

  dataSourceAgenda = new MatTableDataSource(this.list_agenda);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private src_Agenda: AgendaService, public dialog: MatDialog,
              public srvSubCatalogos: SubCatalogoService
  ) {
      this.tools = GlobalUtilities.getInstance();
  }

  ngOnInit(): void {
    this.cargando();
    this.loadModules();
  }
async cargando(){
   const res =  await this.src_Agenda.getAgenda().toPromise();
   console.log('CArgando Resultado : '+JSON.stringify(res))
}
  //Load list
  async loadModules() {
    this.tools.setisLoadingDetails(true)
    this.list_agenda = await this.src_Agenda.getAgenda().toPromise();
    this.dataSourceAgenda.data = this.list_agenda;

    

    //this.Estado_subCatalogo = 
    //await this.srvSubCatalogos.get_Sub_Estados_Cotizacion({ 'op': 1 }).toPromise();
    //this.Estado_subCatalogo.push({ id: '0', descripcion: 'SIN FILTRO' })

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


  openForm(type: number, id: number) {
    let dialogRef;
    switch (type) {
      case 1: { dialogRef = this.dialog.open(AddAgendaComponent,  { height: '780px', width: '1200px' }) } break;
      //case 2: { dialogRef = this.dialog.open(EditCotizacionComponent, { height: '780px', width: '1200px', data: { id: id } }) } break;
      case 3: { dialogRef = this.dialog.open(DeleteCotizacionComponent, { data: { id: id } }); } break;
      default: { dialogRef = this.dialog.open(AddAgendaComponent); } break;
    }

    dialogRef.afterClosed().subscribe(result => {
      this.loadModules();
    });

  }
  /**Inicializar paginator**/
  ngAfterViewInit() {
    this.dataSourceAgenda.paginator = this.paginator;
    this.dataSourceAgenda.sort = this.sort;
    //console.log("INDICE " + this.paginator.pageIndex);
    //console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
    //console.log("TAMAÑO "+this.paginator)

  }

  getPaginatorData(event: any) {
    console.log("INDICE " + this.paginator.pageIndex);
    console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
    console.log("TAMAÑO " + this.paginator.hidePageSize)
  }

  /***Filtrar en la tabla** */
  applyFilter(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSourceAgenda.filter = valor.trim().toLowerCase();
  }

  async filtrarEstado(id: any) {
    if (id === '0') {
      this.dataSourceAgenda.data = this.list_agenda;
    } else {
      //console.log('id : ', id)
      this.dataSourceAgenda.data = this.list_agenda.filter((f: any) => f.idsubestado === id);
    }
  }

}
