
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Data, NavigationStart, Params, Router, RouterLink, Routes } from '@angular/router';
import { AgendaService } from 'src/app/services/agenda.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';



@Component({
  selector: 'app-details-cotizacion',
  templateUrl: './details-agenda.component.html',
  styleUrls: ['./details-agenda.component.css']
})
export class DetailsAgendaComponent implements OnInit {
  

  public id_Agenda: number = 0;
  Data_AgendaCompleta: any
  Data_AgendaMaestro: any
  Data_AgendaAsistencia: any[] = [];  
  list_asistencia: any[] = [];
  Data_PuntosAgenda: any[] = [];
  list_PuntosAgenda: any[] = [];
  frmAgenda!:FormGroup 
  tools: GlobalUtilities
  
  

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
    private src_Agenda: AgendaService, private dialog: MatDialog,
    private _builder: FormBuilder
    ) {
      this.tools = GlobalUtilities.getInstance();
      this.Aroute.params.subscribe((params: Params) => {
      this.id_Agenda = params.id;
    })
    this.iniciar_FormAgenda();
    }

  ngOnInit(): void {
    this.getData()
  }

  ngAfterViewInit() {

    this.dataSourceAgendaAsitencia.paginator = this.paginatorAsistencia;
    this.dataSourceAgendaAsitencia.sort = this.sortAsistencia;
    
    this.dataSourceAgendaPuntosAgenda.paginator = this.paginatorPuntosAgenda;
    this.dataSourceAgendaPuntosAgenda.sort = this.sortPuntosAgenda;    
  }

  iniciar_FormAgenda() {
    this.frmAgenda = this._builder.group({
      IdAgenda: [''],
      DescripcionAgenda: [''],
      FechaRegristro: ['']
    });
  }

  async getData() {
    this.tools.setisLoadingDetails(true)

    this.Data_AgendaCompleta = await this.src_Agenda.getVerAgenda(this.id_Agenda).toPromise();

    this.Data_AgendaMaestro = this.Data_AgendaCompleta.Maestro //Maestro Agenda    
    
    this.frmAgenda.controls['IdAgenda'].setValue(this.Data_AgendaMaestro[0].IdAgenda);
    this.frmAgenda.controls['DescripcionAgenda'].setValue(this.Data_AgendaMaestro[0].DescripcionAgenda);
    this.frmAgenda.controls['FechaRegristro'].setValue(this.Data_AgendaMaestro[0].FechaRegristro);
    //
    this.Data_AgendaAsistencia = this.Data_AgendaCompleta.Asistencia;
    this.Data_PuntosAgenda = this.Data_AgendaCompleta.PuntosDeAgenda;
    
    //console.log(' Tabla Asistencia ' +JSON.stringify(this.Data_AgendaAsistencia)) 
    this.dataSourceAgendaAsitencia.data = this.Data_AgendaAsistencia;
    this.dataSourceAgendaPuntosAgenda.data = this.Data_PuntosAgenda;

    setTimeout(() => {
      this.tools.setisLoadingDetails(false)
    }, 450);
  }

  getPaginatorData(event: any) {
     console.log("INDICE Asistencia" + this.paginatorAsistencia.pageIndex);
     console.log("REGISTROS POR PAGINA " + this.paginatorAsistencia.pageSize)
     console.log("TAMAÑO " + this.paginatorAsistencia.hidePageSize)     
     console.log("INDICE Puntos Agenda" + this.paginatorPuntosAgenda.pageIndex);
     console.log("REGISTROS POR PAGINA " + this.paginatorPuntosAgenda.pageSize)
     console.log("TAMAÑO " + this.paginatorPuntosAgenda.hidePageSize)
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
    console.log('parametro id : '+id)
    let proyecto = this.Data_AgendaAsistencia.find(x => x.idDetCotizacion === id);    
  }



}
