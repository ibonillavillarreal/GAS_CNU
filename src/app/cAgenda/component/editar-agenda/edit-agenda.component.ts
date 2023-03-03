



import { Component, Inject, OnInit, ViewChild,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { Toast } from 'src/app/utils/Toast';
import { AgendaService } from 'src/app/services/agenda.service';
import { AddItemSComponent } from '../add-item-puntos/add-itemPuntos.component';
import { AddItemComponent } from '../add-item/add-item.component';
import { EditafilaCampoComponent } from '../editFilaUso/editfila-Campo.component';
import { Router} from '@angular/router';


@Component({
  selector: 'app-edit-agenda',
  templateUrl: './edit-agenda.component.html',
  styleUrls: ['./edit-agenda.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class EditAgendaComponent implements OnInit {

  public Id_Agenda: number = 0;
  public CodMiembro = 0;
  Data_AgendaCompleta: any
  Data_AgendaMaestro: any
  Data_AgendaAsistencia: any[] = [];
  list_asistencia: any[] = [];
  Data_PuntosAgenda: any[] = [];
  list_PuntosAgenda: any[] = [];

  frmAgenda!: FormGroup
  tools: GlobalUtilities
  public toast: Toast;
  firstLoad: boolean = true;



  /***TABLA DE ASISTENCIA - REPRESENTANTES */
  displayedColumnsAsistencia: string[] = ['Grado', 'Nombres', 'Apellidos', 'Correo', 'Tipo', 'Observacion','acciones'];
  dataSourceAgendaAsitencia = new MatTableDataSource(this.list_asistencia);
  @ViewChild(MatPaginator) paginatorAsistencia!: MatPaginator;
  @ViewChild(MatSort) sortAsistencia!: MatSort;

  /***TABLA DE LOS PUNTOS DE AGENDAS  */
  displayedColumnsPuntosAgenda: string[] = ['PuntosAgenda', 'Observacion','punto-acciones'];
  dataSourceAgendaPuntosAgenda = new MatTableDataSource(this.list_PuntosAgenda);
  @ViewChild(MatPaginator) paginatorPuntosAgenda!: MatPaginator;
  @ViewChild(MatSort) sortPuntosAgenda!: MatSort;

  /* CONSTRUCTOR */
  constructor(private router: Router, private _snackbar: MatSnackBar,
    private srcAgenda: AgendaService, private dialog: MatDialog,private dialog2: MatDialog,
    private _builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditAgendaComponent>,
  ) {

    this.tools = GlobalUtilities.getInstance();
    this.toast = new Toast(this._snackbar);
    this.Id_Agenda = data.CodAgenda;
    this.iniciar_FormAgenda();
    
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {

    this.dataSourceAgendaAsitencia.paginator = this.paginatorAsistencia;
    this.dataSourceAgendaAsitencia.sort = this.sortAsistencia;

    this.dataSourceAgendaPuntosAgenda.paginator = this.paginatorPuntosAgenda;
    this.dataSourceAgendaPuntosAgenda.sort = this.sortPuntosAgenda;
  }

  async iniciar_FormAgenda() {
    this.frmAgenda = this._builder.group({
      IdAgenda: ['', Validators.required],
      DescripcionAgenda: ['', Validators.required],
      FechaRegristro: ['', Validators.required]
    });
  }

  async getData() {
    //this.tools.setisLoadingDetails(true)

    this.Data_AgendaCompleta = await this.srcAgenda.getVerAgenda(this.Id_Agenda).toPromise();

    this.Data_AgendaMaestro = this.Data_AgendaCompleta.Maestro //Maestro Agenda    

    this.frmAgenda.controls['IdAgenda'].setValue(this.Data_AgendaMaestro[0].IdAgenda);
    this.frmAgenda.controls['DescripcionAgenda'].setValue(this.Data_AgendaMaestro[0].DescripcionAgenda);

   
    // Convert Ctrl de fechas  
    const fecha_Splite 
    =(JSON.stringify(this.Data_AgendaMaestro[0].FechaRegristro).substring(1,11)).split('-');  // yyyy-mm-dd
    const fecha_Edit  = fecha_Splite[1]+'-'+fecha_Splite[2]+'-'+fecha_Splite[0];  /// mm-dd-yyyy
    this.frmAgenda.controls['FechaRegristro'].setValue(new Date(fecha_Edit)); // MM-DD-YYYY
     
    /////
    this.Data_AgendaAsistencia = this.Data_AgendaCompleta.Asistencia;    
    this.list_asistencia = this.Data_AgendaAsistencia;
    console.log('CARGA ASISTENCIA : '+JSON.stringify(this.list_asistencia))
    this.dataSourceAgendaAsitencia.data = this.Data_AgendaAsistencia;


    this.Data_PuntosAgenda = this.Data_AgendaCompleta.PuntosDeAgenda;
    this.Data_PuntosAgenda.map((reg: any, cont: number = 0) => { reg.CodMiembro = cont }); //reordenar los index    
    this.list_PuntosAgenda = this.Data_PuntosAgenda;
    this.dataSourceAgendaPuntosAgenda.data = this.Data_PuntosAgenda;


    if (this.firstLoad) {
      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
      }, 450);
      this.firstLoad = false;
    }
  }

  getPaginatorData(event: any) {
    // console.log("INDICE Asistencia" + this.paginatorAsistencia.pageIndex);
    // console.log("REGISTROS POR PAGINA " + this.paginatorAsistencia.pageSize)
    // console.log("TAMAÑO " + this.paginatorAsistencia.hidePageSize)
    // console.log("INDICE Puntos Agenda" + this.paginatorPuntosAgenda.pageIndex);
    // console.log("REGISTROS POR PAGINA " + this.paginatorPuntosAgenda.pageSize)
    // console.log("TAMAÑO " + this.paginatorPuntosAgenda.hidePageSize)
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


  async loadModules_Asistencias() {
    this.firstLoad = true;
    this.tools.setisLoadingDetails(true)
    this.list_asistencia = this.Data_AgendaAsistencia;
    this.dataSourceAgendaAsitencia.data = this.list_asistencia;

    if (this.firstLoad) {
      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
      }, 450);
      this.firstLoad = false;
    }
  }

  async loadModules_PuntosAgenda() {
    this.firstLoad = true;
    this.tools.setisLoadingDetails(true)

    this.list_PuntosAgenda = this.Data_PuntosAgenda;
    this.dataSourceAgendaPuntosAgenda.data = this.list_PuntosAgenda;

    if (this.firstLoad) {
      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
      }, 450);
      this.firstLoad = false;
    }
  }


  openForm(type: number, id: number) {   // FRM DIALOGOS SHOW  
    let dialogRef;
    let dialogRef2;

    switch (type) {
      case 1: {  // 1 - Representantes            
        if (this.frmAgenda.controls['DescripcionAgenda'].value !== "") {

          dialogRef = this.dialog.open(AddItemComponent,
            {
              height: '700px', width: '1000px',
              data: {
                Id_Agenda: this.Id_Agenda,
                list_asistencia: this.list_asistencia
              }
            });
          dialogRef.afterClosed().subscribe((res) => {

            if (res !== undefined) {
                  
              console.log('Registro de retorno '+JSON.stringify(res));

              res.forEach((reg: any) => {
                this.Data_AgendaAsistencia.push(reg);
              });
              this.loadModules_Asistencias();

            }
          });
        } else {
          this.toast.showToast("Digite una descripción de Agenda - codigo: " + this.Id_Agenda + " ⛔", "Aceptar");
        }
      } break;

      case 2: { //Puntos de Agenda
        if (this.frmAgenda.controls['DescripcionAgenda'].value !== "") {

          this.CodMiembro = this.list_PuntosAgenda.length == undefined ? 0 : this.list_PuntosAgenda.length;
          dialogRef2 = this.dialog.open(AddItemSComponent,
            {
              height: '500px', width: '1000px',
              data: { Id_Agenda: this.Id_Agenda, CodMiembro: this.CodMiembro },
              disableClose: false, autoFocus: true
            });

          dialogRef2.afterClosed().subscribe((res) => {
            if (res !== undefined) {
              this.Data_PuntosAgenda.push(res[0]);
              this.loadModules_PuntosAgenda();

            }
          });

        } else {
          this.toast.showToast("Digite una descripción de Agenda - codigo: " + this.Id_Agenda + " ⛔", "Aceptar");
        }
      } break;
      default: { } break;
    }

  }


  EditaCampo(key: number, CodMiembro: any, Descripcion: any) {

    switch (key) {
      case 1: {
        let dialog_asistencia = this.dialog.open(EditafilaCampoComponent,
          {
            height: '290px', width: '500px',
            data: { CodMiembro: CodMiembro, Descripcion: Descripcion },
            disableClose: true, autoFocus: true
          });

        dialog_asistencia.afterClosed().subscribe((asistencia_res: any) => {
          if (asistencia_res !== undefined) {
            let Index = this.list_asistencia.findIndex((reg: any) => reg.CodMiembro == CodMiembro);
            let fila = this.list_asistencia[Index];
            fila.NotaObservacion = asistencia_res.Descripcion;
          }
        });

      } break;


      case 2: {
        let dialog_Puntos = this.dialog2.open(EditafilaCampoComponent,
          {
            height: '290px', width: '500px',
            data: { CodMiembro: CodMiembro, Descripcion: Descripcion },
            disableClose: true, autoFocus: true
          });

        dialog_Puntos.afterClosed().subscribe((res_puntos: any) => {

          if (res_puntos !== undefined) {
            let IndexPuntos = this.list_PuntosAgenda.findIndex((reg_puntos: any) => reg_puntos.CodMiembro == CodMiembro);
            let filaPuntos = this.list_PuntosAgenda[IndexPuntos];
            filaPuntos.NotaObservacion = res_puntos.Descripcion;
          }

        });
      } break;

      default: { } break;
    }


  }

  delete_filaGrid_Asistencia(CodMiembro: any) {
    this.Data_AgendaAsistencia = this.delete_Items_Existente(this.list_asistencia, CodMiembro);
    this.loadModules_Asistencias();
  }
  delete_filaGrid_PuntosAgenda(CodMiembro: any) {
    this.Data_PuntosAgenda = this.delete_Items_Existente(this.list_PuntosAgenda, CodMiembro);

    this.Data_PuntosAgenda.map((reg: any, cont: number = 0) => { reg.CodMiembro = cont }); //reordenar los index    
    this.CodMiembro = this.Data_PuntosAgenda.length == undefined ? 0 : this.Data_PuntosAgenda.length;
    this.loadModules_PuntosAgenda();

  }
  delete_Items_Existente(list_aFiltrar: any, CodMiembro: any) {
    const list_resultante = Object.assign([], list_aFiltrar);
    let index = list_resultante.findIndex((x: any) => x.CodMiembro == CodMiembro);
    if (index > -1) {
      list_resultante.splice(index, 1);
    }
    return list_resultante;
  }


  /* Sumit del formulario */
  enviar(values: any, formDirective: FormGroupDirective) {
    
    let nRegAsistencia = this.list_asistencia.length == undefined ? 0 : this.Data_AgendaAsistencia.length;
    let nRegPuntAgenda = this.list_PuntosAgenda.length == undefined ? 0 : this.Data_PuntosAgenda.length;

    if (nRegAsistencia > 0 && nRegPuntAgenda > 0) 
    {
      let IdUsuario: number = 1
      values.IdUsuario = IdUsuario
      values.CodAgenda = this.Data_AgendaMaestro[0].CodAgenda
      let enviar_Registro_Json =
      {
        Master_Agenda: values,
        Detalle_Asistencia: this.list_asistencia,
        Detalle_PuntosAgenda: this.list_PuntosAgenda
      };


      console.log('EDITANDO AGENDA  : ' + JSON.stringify(enviar_Registro_Json));

      this.srcAgenda.editAgenda(enviar_Registro_Json).subscribe(res => {
        if (res) {
          this.toast.showToast('Registro Editado correctamente ✔️ ', 'Aceptar')

        } else {
          this.toast.showToast('Ha ocurrido un error de Edición ❌', 'Aceptar')
        }
      });

      this.frmAgenda.reset();
      formDirective.resetForm();      
      this.cerrar();


    } else {
      this.toast.showToast("Digite los Detalle de Agenda - codigo: " + this.Id_Agenda + " ⛔", "Aceptar");
    }


  }

  cerrar() {
    this.frmAgenda.reset();
    this.dialogRef.close();
  }


  openDetailsProject(id: any) {
    // console.log('parametro id : ' + id)
    // let proyecto = this.Data_AgendaAsistencia.find(x => x.idDetCotizacion === id);
  }
  






} // fin de la clase



export interface reg_asistencia {
  CodMiembro: number,
  CodGradoAcademico: string,   //Grado
  Nombres: string,
  Apellidos: string,
  Email: string,
  Id_Representante: number,
  Tipo_Representante: string,
  NotaObservacion: string

}

export interface puntos_agenda {
  PuntosAgenda: string,
  NotaObservacion: string
}
