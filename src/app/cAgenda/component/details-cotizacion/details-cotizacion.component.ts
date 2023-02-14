
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data, NavigationStart, Params, Router, RouterLink, Routes } from '@angular/router';
import { AgendaService } from 'src/app/services/cotizacion.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { DetailsCotizacionProyectoComponent } from '../details-cotizacion-proyecto/details-cotizacion-proyecto.component';


@Component({
  selector: 'app-details-cotizacion',
  templateUrl: './details-cotizacion.component.html',
  styleUrls: ['./details-cotizacion.component.css']
})
export class DetailsCotizacionComponent implements OnInit {
  

  public id_Agenda: number = 0;
  Data_AgendaCompleta: any
  Data_AgendaMaestro: any
  Data_AgendaAsistencia: any[] = [];  
  list_asistencia: any[] = [];
  list_PuntosAgenda: any[] = [];
  Data_PuntosAgenda: any[] = [];
  tools: GlobalUtilities

  /***TABLA PROYECTOS */
  displayedColumns: string[] = ['UND', 'DESCRIPCION', 'MONTO', 'acciones'];
  dataSource = new MatTableDataSource(this.Data_AgendaAsistencia);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  /***TABLA ARTICULOS */
  displayedColumnsArticulos: string[] = ['CODIGO', 'DESCRIPCION', 'CANTIDAD', 'MONTO', 'acciones'];
  dataSourceArticulos = new MatTableDataSource(this.Data_AgendaAsistencia);  
  @ViewChild(MatPaginator) paginatorArticulos!: MatPaginator;
  @ViewChild(MatSort) sortArticulos!: MatSort;

  /***TABLA DE ASISTENCIA - REPRESENTANTES */
  displayedColumnsAsistencia: string[] = ['Grado','Nombres','Apellidos','Correo','Tipo','Observacion'];
  dataSourceAgendaAsitencia = new MatTableDataSource(this.list_asistencia);
  @ViewChild(MatPaginator) paginatorAsistencia!: MatPaginator;
  @ViewChild(MatSort) sortAsistencia!: MatSort;

  /***TABLA DE LOS PUNTOS DE AGENDAS  */
  displayedColumnsPuntosAgenda: string[] = ['PuntosAgenda','Observacion'];
  dataSourceAgendaPuntosAgenda = new MatTableDataSource(this.list_PuntosAgenda);
  @ViewChild(MatPaginator) paginatorPuntosAgenda!: MatPaginator;
  @ViewChild(MatSort) sortPuntosAgenda!: MatSort;
  /* CONSTRUCTOR */
  constructor(private Aroute: ActivatedRoute, private route: Router, public rt: Router,
    private srcCotizacion: AgendaService, private dialog: MatDialog
  ) {
    this.tools = GlobalUtilities.getInstance();
    this.Aroute.params.subscribe((params: Params) => {
      this.id_Agenda = params.id;
    })
  }

  ngOnInit(): void {
    this.getData()
   

  }

  ngAfterViewInit() {
    this.dataSourceArticulos.paginator = this.paginatorArticulos;
    this.dataSourceArticulos.sort = this.sortArticulos;

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSourceAgendaAsitencia.paginator = this.paginator;
    this.dataSourceAgendaAsitencia.sort = this.sort;
    
    this.dataSourceAgendaPuntosAgenda.paginator = this.paginator;
    this.dataSourceAgendaPuntosAgenda.sort = this.sort;
    
  }

  async getData() {
    console.log('parametro Agenda '+JSON.stringify(this.id_Agenda)) 
   
    this.tools.setisLoadingDetails(true)
    this.Data_AgendaCompleta = await this.srcCotizacion.getVerAgenda(this.id_Agenda).toPromise();
   
    console.log('Data Agenda '+JSON.stringify(this.Data_AgendaCompleta))
   
    // this.Data_AgendaMaestro = JSON.parse(this.Data_AgendaCompleta.cotizacion)
   // this.Data_AgendaAsistencia = JSON.parse(this.Data_AgendaCompleta.cotizacion_detalle)
   // this.Data_PuntosAgenda = JSON.parse(this.Data_AgendaCompleta.elemento_detalle)
    

    //this.dataSource.data = this.Data_AgendaAsistencia;
    //this.dataSourceArticulos.data = this.Data_PuntosAgenda
    setTimeout(() => {
      this.tools.setisLoadingDetails(false)
    }, 450);
  }

  getPaginatorData(event: any) {
    console.log("INDICE " + this.paginator.pageIndex);
    console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
    console.log("TAMAÑO " + this.paginator.hidePageSize)
  }

  joinProyectDetails() {
    if (this.Data_AgendaAsistencia) {
      for (let i = 0; i < this.Data_AgendaAsistencia.length; i++) {
        let Terminado = this.Data_PuntosAgenda.filter(x => x.idDetCotizacion === this.Data_AgendaAsistencia[i].idDetCotizacion)
        this.Data_AgendaAsistencia[i].detalles_proyecto = Terminado
      }
    }
  }

  removeTermProyect() {
    if (this.Data_AgendaAsistencia) {
      for (let i = 0; i < this.Data_AgendaAsistencia.length; i++) {
        for (let j = 0; j < this.Data_AgendaAsistencia[i].detalles_proyecto.length; j++) {
          let index = this.Data_PuntosAgenda.findIndex(x => x.idDetCotizacion === this.Data_AgendaAsistencia[i].detalles_proyecto[j].idDetCotizacion);
          if (index > -1) {
            this.Data_PuntosAgenda.splice(index, 1);
          }
        }
      }
    }
  }

  openDetailsProject(id: any) {
    console.log(id)
    let proyecto = this.Data_AgendaAsistencia.find(x => x.idDetCotizacion === id);
    let dialog = this.dialog.open(DetailsCotizacionProyectoComponent, { height: '730px', width: '720px', data: { list: proyecto.detalles_proyecto, proyecto: proyecto.descripcion }, autoFocus: false })
  }



}
