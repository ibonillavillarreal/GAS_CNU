

import { Router } from '@angular/router';
import {
  Component, OnInit,
  ViewChild, NgZone,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { Toast } from 'src/app/utils/Toast';
import { PersonaService } from 'src/app/services/cliente.service';
import { MonedaService } from '../../../services/Moneda.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { ItemService } from '../../../services/Item.service';
import { AgendaService } from 'src/app/services/agenda.service';
import { EditafilaCampoComponent } from '../editFilaUso/editfila-Campo.component';
import { AddItemSComponent } from '../add-item-puntos/add-itemPuntos.component';

@Component({
  selector: 'app-add-cotizacion',
  templateUrl: './add-agenda.component.html',
  styleUrls: ['./add-agenda.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class AddAgendaComponent implements OnInit {


  // AGENDA - ALISTANDO CAMPOS   
  public datos: any;
  public toast: Toast;
  public firstLoad: boolean = true;

  public CodMiembro = 0;
  public Id_Agenda: any;
  Data_AgendaCompleta: any
  Data_AgendaMaestro: any
  Data_AgendaAsistencia: reg_asistencia[] = [];
  list_asistencia: any[] = [];
  Data_PuntosAgenda: puntos_agenda[] = [];
  list_PuntosAgenda: any[] = [];

  public tools: GlobalUtilities;
  public frmAgenda!: FormGroup;
  public fecha_Agendada = new Date(Date.now());
  public dialogRef!: MatDialogRef<AddItemComponent>;


  /***TABLA DE ASISTENCIA - REPRESENTANTES */
  displayedColumnsAsistencia_Add: string[] = ['Grado', 'Nombres', 'Apellidos', 'Correo', 'Tipo', 'Observacion1', 'acciones'];
  dataSourceAgendaAsitencia = new MatTableDataSource(this.list_asistencia);
  @ViewChild(MatPaginator) paginatorAsistencia!: MatPaginator;
  @ViewChild(MatSort) sortAsistencia!: MatSort;

  /***TABLA DE LOS PUNTOS DE AGENDAS  */
  displayedColumnsPuntosAgenda: string[] = ['PuntosAgenda', 'Observacion', 'punto-acciones'];
  dataSourceAgendaPuntosAgenda = new MatTableDataSource(this.list_PuntosAgenda);
  @ViewChild(MatPaginator) paginatorPuntosAgenda!: MatPaginator;
  @ViewChild(MatSort) sortPuntosAgenda!: MatSort;


  // CONSTRUCTOR - INJECTOR 
  constructor(
    private _builder: FormBuilder, private _snackbar: MatSnackBar,
    private srvCliente: PersonaService, public ngZone: NgZone,
    private srvMonedas: MonedaService, public dialog: MatDialog,
    public dialog2: MatDialog, private srcItem: ItemService,
    private src_Agenda: AgendaService, private router: Router,
    public srcAgenda: AgendaService
  ) {
    this.tools = GlobalUtilities.getInstance();
    this.toast = new Toast(this._snackbar);
    this.iniciar_FormAgenda();
    this.loadModules_Asistencias();
    this.loadModules_PuntosAgenda();

  }
  ngOnInit(): void {
    this.eventAdd();
    this.getData();

  }

  ngAfterViewInit() {
    this.dataSourceAgendaAsitencia.paginator = this.paginatorAsistencia;
    this.dataSourceAgendaAsitencia.sort = this.sortAsistencia;
    this.dataSourceAgendaPuntosAgenda.paginator = this.paginatorPuntosAgenda;
    this.dataSourceAgendaPuntosAgenda.sort = this.sortPuntosAgenda;

  }

  async eventAdd() {

  }

  async iniciar_FormAgenda() {
    this.frmAgenda = this._builder.group({
      IdAgenda: ['', Validators.required],
      DescripcionAgenda: ['', Validators.required],
      FechaRegristro: ['', Validators.required]
    });
  }

  async getData() {
    this.tools.setisLoadingDetails(true)
    const nroRegAgenda = await this.src_Agenda.getNroRegAgenda().toPromise();
    this.frmAgenda.controls['IdAgenda'].setValue(nroRegAgenda[0][0].newNroIdAgenda);
    this.frmAgenda.controls['FechaRegristro'].setValue(this.fecha_Agendada);

    this.Id_Agenda = nroRegAgenda[0][0].newNroIdAgenda;


    setTimeout(() => {
      this.tools.setisLoadingDetails(false)
    }, 450);

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

              console.log('Registro de retorno -Nuevo '+JSON.stringify(res));

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
              disableClose: true, autoFocus: true
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

    let nRegAsistencia = this.list_asistencia.length == undefined ? 0 : this.Data_PuntosAgenda.length;
    let nRegPuntAgenda = this.list_PuntosAgenda.length == undefined ? 0 : this.Data_PuntosAgenda.length;

    if (nRegAsistencia > 0 && nRegPuntAgenda > 0) {
      let IdUsuario: number = 1
      values.IdUsuario = IdUsuario
      let enviar_Registro_Json =
      {
        Master_Agenda: values,
        Detalle_Asistencia: this.list_asistencia,
        Detalle_PuntosAgenda: this.list_PuntosAgenda
      };


      console.log('registro agenda : '+ JSON.stringify(enviar_Registro_Json.Master_Agenda));

      this.srcAgenda.add_Agenda(enviar_Registro_Json).subscribe(res => {
        if (res) {
          this.toast.showToast('Registro Guardado correctamente ✔️ ', 'Aceptar')

        } else {
          this.toast.showToast('Ha ocurrido un error ❌', 'Aceptar')
        }
      });
      this.frmAgenda.reset();
      formDirective.resetForm();
      this.router.navigate(['/Agenda']);


    } else {
      this.toast.showToast("Digite los Detalle de Agenda - codigo: " + this.Id_Agenda + " ⛔", "Aceptar");
    }


  }


  getPaginatorData(event: any) {
    console.log("INDICE Asistencia" + this.paginatorAsistencia.pageIndex);
    console.log("REGISTROS POR PAGINA " + this.paginatorAsistencia.pageSize)
    console.log("TAMAÑO " + this.paginatorAsistencia.hidePageSize)
    console.log("INDICE Puntos Agenda" + this.paginatorPuntosAgenda.pageIndex);
    console.log("REGISTROS POR PAGINA " + this.paginatorPuntosAgenda.pageSize)
    console.log("TAMAÑO " + this.paginatorPuntosAgenda.hidePageSize)

  }


}



export interface reg_asistencia {
  CodMiembro: number,
  Grado: string,
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

