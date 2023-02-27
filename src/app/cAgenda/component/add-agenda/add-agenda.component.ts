
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
import { Cliente } from 'src/app/models/Cliente';
import { PersonaService } from 'src/app/services/cliente.service';
import { Actas } from 'src/app/services/Factura.service';
import { Monedas } from '../../../models/Moneda';
import { MonedaService } from '../../../services/Moneda.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { ItemService } from '../../../services/Item.service';
import { AddItemSComponent as AddPuntosItemComponent } from '../add-item-puntos/add-itemPuntos.component';
import { Items } from '../../../models/Items';
import { AgendaService } from 'src/app/services/agenda.service';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { EditafilaCampoComponent } from '../editFilaUso/editfila-Campo.component';
import { CdkAccordion } from '@angular/cdk/accordion';

@Component({
  selector: 'app-add-cotizacion',
  templateUrl: './add-agenda.component.html',
  styleUrls: ['./add-agenda.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class AddAgendaComponent implements OnInit {


  public flag_Moneda_Cordoba: boolean = false;
  public flag_ts_Cambio: any;
  public fecha_ts = new Date(Date.now()).toISOString().substring(0, 10);
  public index: number = 0;
  public tsIVA: number = 0.15;
  public usaArea: boolean = false;



  public lista_Producto: Items[] = [];   //LA CONSULTA A LA BASES DE DATOS PARA EL CARRITO POPUP.
  public list_producto_term_bd: Items[] = [];   //LA CONSULTA A LA BASES DE DATOS PARA EL CARRITO POPUP.
  public lista_Producto_temp: any[] = []; //SE CARGAN AL GRID DETALLE  - VER TODOS 
  public list_cliente!: Cliente[];
  public Lista_Monedas: Monedas[] = [];
  public Moneda_simbol: any = 'USD';
  public moneda_Cliente: any;



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


  //eventos OnInit
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
          dialogRef2 = this.dialog.open(AddPuntosItemComponent,
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












  //********************************** */
  //***  METODOS ANTERIORES  ***//
  //********************************** */
  async setListaProducto() {

    this.lista_Producto = (await this.srcItem.getTipoItem(this.Id_Agenda).toPromise())[0];
    // SE LE RSTA EL IVA  AL PRECIO PARA  SEPARA LOS MONTOS IVA CON PRECIO ANTES DE IVA     
    let DB_format_valores = (await this.srcItem.getTipoItem(this.Id_Agenda).toPromise())[0];

    DB_format_valores.map((p: any) => { p.Precio = parseFloat(p.Precio) - parseFloat(p.iva) });
    this.list_producto_term_bd = DB_format_valores;
  }

  async setListCliente() {
    this.list_cliente = await this.srvCliente.getPersonas().toPromise();
    //console.log('datos this.list_cliente : ',JSON.stringify(this.list_cliente));
  }
  async setListMonedas() {
    this.Lista_Monedas = await this.srvMonedas.getMonedas().toPromise();
  }

  cambiarMoneda(id: any) {
    // 0:USD ,  NIO : 1
    if (id === 'NIO') {

      this.Moneda_simbol = 'NIO';
      this.flag_Moneda_Cordoba = true;

      let DB_format_valores = this.list_producto_term_bd;
      DB_format_valores.map((p: any) => { p.Precio = parseFloat(p.Precio) * this.flag_ts_Cambio });
      DB_format_valores.map((p: any) => { p.iva = parseFloat(p.iva) * this.flag_ts_Cambio });
      this.list_producto_term_bd = DB_format_valores;    //actualizar la tabla 
      //console.log('====>>>   esta en cordobas  : '+JSON.stringify(DB_format_valores));

      //recalcular el grid : this.lista_Producto_temp;
      let grid_Producto_temp = this.lista_Producto_temp;
      grid_Producto_temp.map((p: any) => { p.Precio = parseFloat(p.Precio) * this.flag_ts_Cambio });
      this.updateTotales();

    }
    else {
      this.Moneda_simbol = 'USD';
      this.flag_Moneda_Cordoba = false;

      let DB_format_valores = this.list_producto_term_bd;
      DB_format_valores.map((p: any) => { p.Precio = parseFloat(p.Precio) / this.flag_ts_Cambio });
      DB_format_valores.map((p: any) => { p.iva = parseFloat(p.iva) / this.flag_ts_Cambio });
      this.list_producto_term_bd = DB_format_valores;    //actualizar la tabla 
      //console.log('====>>>   esta en dolares  : '+JSON.stringify(DB_format_valores));

      //recalcular el grid : this.lista_Producto_temp;
      let grid_Producto_temp = this.lista_Producto_temp;
      grid_Producto_temp.map((p: any) => { p.Precio = parseFloat(p.Precio) / this.flag_ts_Cambio });
      this.updateTotales();

    }
  }

  removeExistingItems(list: any) {
    const list_productos = Object.assign([], list);
    for (let i = 0; i < this.lista_Producto_temp.length; i++) {
      let index = list_productos.findIndex((x: any) => x.ARTICULO == this.lista_Producto_temp[i].ARTICULO);
      if (index > -1) {
        list_productos.splice(index, 1);
      }
    }
    return list_productos;
  }


  getSubTotal() {
    //return this.dataSource.data.map((t: any) => t.SubTotal).reduce((acc, value) => acc + value, 0);
  }

  removeDetail(index: number) {
    this.lista_Producto_temp.splice((index - 1), 1);
    //this.dataSource.data = this.lista_Producto_temp
    this.toast.showToast("Eliminado correctamente ❌", "Aceptar");
  }


  updateTotales() {
    let IVATERMINADO = this.lista_Producto_temp.filter(x => x.TIPO === 'T' || x.TIPO === 'V').map((x: any) => parseFloat(x.Cantidad) * parseFloat(x.iva)).reduce((acc, value) => acc + value, 0)
    let IVAPROYECTO = this.lista_Producto_temp.filter(x => x.TIPO === 'P').map((x: any) => parseFloat(x.iva)).reduce((acc, value) => acc + value, 0)

    let SubTotalProyectos = this.lista_Producto_temp.filter(x => x.TIPO === 'P').map((x: any) => (parseFloat(x.Precio))).reduce((acc, value) => acc + value, 0);
    let SubTotalTerminado: number = this.lista_Producto_temp.filter(x => x.TIPO === 'T' || x.TIPO === 'V').map((x: any) => (parseFloat(x.Precio)) * parseFloat(x.Cantidad)).reduce((acc, value) => acc + value, 0);

  }
  async Descuento_kyUp() {
    this.updateTotales();
  }

  async Cliente_change(id: number) {

    //this.dataSource.data = [];
    this.lista_Producto_temp = [];
    // this.id_cliente = this.AddformCotizacion.controls["id_cliente"].value;    
    this.lista_Producto = (await this.srcItem.getTipoItem(this.Id_Agenda).toPromise())[0];
    //  sacamos moneda del cliente
    let money: any = this.list_cliente.find(f => f.id_cliente == id);
    this.moneda_Cliente = money.MONEDA;


    if (this.moneda_Cliente !== this.Moneda_simbol) {
      this.Moneda_simbol = this.moneda_Cliente;
      if (this.Moneda_simbol === 'NIO') { this.cambiarMoneda('NIO') } else { this.cambiarMoneda('USD') }

    }
  }

  limpiarTodoelGrid() {
    const lst_articulo: any[] = this.lista_Producto_temp.map(t => { return t.ARTICULO })

    const list_productos = Object.assign([], this.lista_Producto_temp);
    for (let i = 0; i < this.lista_Producto_temp.length; i++) {
      let index = list_productos.findIndex((x: any) => x.ARTICULO == lst_articulo[i].ARTICULO);
      if (index > -1) {
        list_productos.splice(index, 1);
      }
    }
    return (list_productos);
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

