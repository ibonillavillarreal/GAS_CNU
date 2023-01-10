
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data, NavigationStart, Params, Router, RouterLink, Routes } from '@angular/router';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { DetailsCotizacionProyectoComponent } from '../details-cotizacion-proyecto/details-cotizacion-proyecto.component';


@Component({
  selector: 'app-details-cotizacion',
  templateUrl: './details-cotizacion.component.html',
  styleUrls: ['./details-cotizacion.component.css']
})
export class DetailsCotizacionComponent implements OnInit {

  public id: number = 0;
  private cotizacion: any
  Master: any
  Proyectos: any[] = [];
  Terminado: any[] = [];
  tools: GlobalUtilities

  /***TABLA PROYECTOS */
  displayedColumns: string[] = ['UND', 'DESCRIPCION', 'MONTO', 'acciones'];
  dataSource = new MatTableDataSource(this.Proyectos);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  /***TABLA ARTICULOS */
  displayedColumnsArticulos: string[] = ['CODIGO', 'DESCRIPCION', 'CANTIDAD', 'MONTO', 'acciones'];
  dataSourceArticulos = new MatTableDataSource(this.Proyectos);
  @ViewChild(MatPaginator) paginatorArticulos!: MatPaginator;
  @ViewChild(MatSort) sortArticulos!: MatSort;
  constructor(private Aroute: ActivatedRoute, private route: Router, public rt: Router,
    private srcCotizacion: CotizacionService, private dialog: MatDialog) {
    this.tools = GlobalUtilities.getInstance();
    this.Aroute.params.subscribe((params: Params) => {
      this.id = params.id;
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

  }
  async getData() {
    this.tools.setisLoadingDetails(true)
    this.cotizacion = await this.srcCotizacion.getCotizacion(this.id).toPromise();
    this.Master = JSON.parse(this.cotizacion.cotizacion)
    this.Proyectos = JSON.parse(this.cotizacion.cotizacion_detalle)
    this.Terminado = JSON.parse(this.cotizacion.elemento_detalle)
    this.joinProyectDetails();
    this.removeTermProyect();
    this.dataSource.data = this.Proyectos;
    this.dataSourceArticulos.data = this.Terminado
    setTimeout(() => {
      this.tools.setisLoadingDetails(false)
    }, 450);
  }

  joinProyectDetails() {
    if (this.Proyectos) {
      for (let i = 0; i < this.Proyectos.length; i++) {
        let Terminado = this.Terminado.filter(x => x.idDetCotizacion === this.Proyectos[i].idDetCotizacion)
        this.Proyectos[i].detalles_proyecto = Terminado
      }
    }
  }
  removeTermProyect() {
    if(this.Proyectos){
      for (let i = 0; i < this.Proyectos.length; i++) {
        for (let j = 0; j < this.Proyectos[i].detalles_proyecto.length; j++) {
          let index = this.Terminado.findIndex(x => x.idDetCotizacion === this.Proyectos[i].detalles_proyecto[j].idDetCotizacion);
          if (index > -1) {
            this.Terminado.splice(index, 1);
          }
        }
      }
    }
  }
  openDetailsProject(id: any) {
    console.log(id)
    let proyecto = this.Proyectos.find(x => x.idDetCotizacion === id);
    let dialog = this.dialog.open(DetailsCotizacionProyectoComponent, { height: '730px', width: '720px', data: { list: proyecto.detalles_proyecto, proyecto: proyecto.descripcion }, autoFocus: false })
  }
}
