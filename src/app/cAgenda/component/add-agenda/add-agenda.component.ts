
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
import { ClienteService } from 'src/app/services/cliente.service';
import { Factura } from 'src/app/services/Factura.service';
import { Monedas } from '../../../models/Moneda';
import { MonedaService } from '../../../services/Moneda.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { ItemService } from '../../../services/Item.service';
import { AddItemSComponent as AddPuntosItemComponent } from '../add-item-puntos/add-itemPuntos.component';
import { Items } from '../../../models/Items';
import { AgendaService } from 'src/app/services/agenda.service';


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
  public id_cliente: any = 0;
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

  public id_Agenda: number = 0;
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
  displayedColumnsAsistencia_Add: string[] = ['Grado', 'Nombres', 'Apellidos', 'Correo', 'Tipo', 'Observacion'];
  dataSourceAgendaAsitencia = new MatTableDataSource(this.list_asistencia);
  @ViewChild(MatPaginator) paginatorAsistencia!: MatPaginator;
  @ViewChild(MatSort) sortAsistencia!: MatSort;

  /***TABLA DE LOS PUNTOS DE AGENDAS  */
  displayedColumnsPuntosAgenda: string[] = ['PuntosAgenda', 'Observacion'];
  dataSourceAgendaPuntosAgenda = new MatTableDataSource(this.list_PuntosAgenda);
  @ViewChild(MatPaginator) paginatorPuntosAgenda!: MatPaginator;
  @ViewChild(MatSort) sortPuntosAgenda!: MatSort;


  // CONSTRUCTOR - INJECTOR 
  constructor(private _builder: FormBuilder, private _snackbar: MatSnackBar,
    private srvCliente: ClienteService, public ngZone: NgZone, private srvMonedas: MonedaService,
    private srvItem: ItemService, public dialog: MatDialog, private srcItem: ItemService,
    private src_Agenda: AgendaService, private router: Router, public srcFactura: Factura
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
    //console.log('nroRegAgenda : '+ JSON.stringify(nroRegAgenda[0][0].newNroIdAgenda))

    setTimeout(() => {
      this.tools.setisLoadingDetails(false)
    }, 450);

  }

  async loadModules_Asistencias() {
    this.firstLoad = true;
    this.tools.setisLoadingDetails(true)
    //let modelo: reg_asistencia[]=[];
    let json_reg = { CodMiembro: 1, Grado: "ing1", Nombres: "ivan", Apellidos: "bonilla", Email: "ib@d.com", Id_Representante: 22, Tipo_Representante: "Invitado Especial", NotaObservacion: "Mantiene su cargo" };
    let json_reg2 = { CodMiembro: 1, Grado: "ing2", Nombres: "ivan", Apellidos: "bonilla", Email: "ib@d.com", Id_Representante: 22, Tipo_Representante: "Invitado Especial", NotaObservacion: "Mantiene su cargo" };
    this.Data_AgendaAsistencia.push(json_reg);
    this.Data_AgendaAsistencia.push(json_reg2);
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
    //let modelo: puntos_agenda[]=[];
    let json_punto_agenda = { PuntosAgenda: "Inicia presentación", NotaObservacion: "Todos hablan" };
    let json_punto_agenda2 = { PuntosAgenda: "Iniciar puntos ", NotaObservacion: "Todos aportan" };

    this.Data_PuntosAgenda.push(json_punto_agenda);
    this.Data_PuntosAgenda.push(json_punto_agenda2);
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

    switch (type) {
      case 1: {  // 1 - Representantes    
        if (this.id_cliente == 0) {

          dialogRef = this.dialog.open(AddItemComponent,
            {
              height: '700px', width: '1000px',
              data: { lista_Producto: this.lista_Producto, id_cliente: this.id_cliente }
            })
          dialogRef.afterClosed().subscribe((res) => {
            if (res !== undefined) {
              console.log('list_Item_Agenda_Ckeck: ' + JSON.stringify(res))
            }
          });
        } else {
          this.toast.showToast("Debe de Selecionar los Representantes ⛔", "Aceptar");
        }
      } break;

      case 2: { //Puntos de Agenda
        if (this.id_cliente == 0) {

          let datoCompuesto_term: any[] = [0, this.removeExistingItems(this.list_producto_term_bd), this.flag_Moneda_Cordoba];
          dialogRef = this.dialog.open(AddPuntosItemComponent,
            {
              height: '500px', width: '1000px',
              data: datoCompuesto_term
            })

          dialogRef.afterClosed().subscribe((res) => {
            if (res !== undefined) {
              console.log('Textos: ' + JSON.stringify(res))
            }
          });

        } else {
          this.toast.showToast("Debe Caragar puntos de Agenda ⛔", "Aceptar");
        }
      } break;
      default: { } break;
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
    // this.id_cliente = this.AddformCotizacion.controls["id_cliente"].value;
    // console.log('id de cliente para getTipo '+JSON.stringify(this.id_cliente));

    this.lista_Producto = (await this.srcItem.getTipoItem(this.id_cliente).toPromise())[0];
    // SE LE RSTA EL IVA  AL PRECIO PARA  SEPARA LOS MONTOS IVA CON PRECIO ANTES DE IVA     
    let DB_format_valores = (await this.srcItem.getTipoItem(this.id_cliente).toPromise())[0];

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



  /* Sumit del formulario  */
  enviar(values: any, formDirective: FormGroupDirective) {
    let cotizacion = { Master: values, Details: this.lista_Producto_temp }
    this.src_Agenda.addCotizacion(cotizacion).subscribe(res => {
      this.toast.showToast("Agregado correctamente ✔️", "Aceptar");
      this.router.navigate(['/Cotizacion']);
    })

  }


  async Cliente_change(id: number) {

    //this.dataSource.data = [];
    this.lista_Producto_temp = [];
    // this.id_cliente = this.AddformCotizacion.controls["id_cliente"].value;    
    this.lista_Producto = (await this.srcItem.getTipoItem(this.id_cliente).toPromise())[0];
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

