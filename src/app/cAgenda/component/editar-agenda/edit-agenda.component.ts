
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, NgZone, Inject } from '@angular/core';

import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Data, NavigationStart, Params, Router, RouterLink, Routes } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgendaService } from 'src/app/services/agenda.service';
import { Toast } from 'src/app/utils/Toast';
import { Cliente } from 'src/app/models/Cliente';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';


import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaService } from 'src/app/services/cliente.service';
import { Monedas } from '../../../models/Moneda';
import { MonedaService } from '../../../services/Moneda.service';
import { AddItemComponent } from '../add-item/add-item.component';
import { ItemService } from '../../../services/Item.service';
import { AddItemSComponent } from '../add-item-puntos/add-itemPuntos.component';
import { Cotizacion } from '../../../models/adddCotizacion';
import { Items } from '../../../models/Items';


@Component({
  selector: 'app-edit-agenda',
  templateUrl: './edit-agenda.component.html',
  styleUrls: ['./edit-agenda.component.css']
})


export class EditAgendaComponent implements OnInit {

  public id: number = 0;
  public index: number = 0;
  public monedaSeleccionadaC$ = true;
  public monedaSeleccionada$ = false;

  public datos: any;
  public tools: GlobalUtilities;
  public toast: Toast;
  

  public AddformCotizacion!: FormGroup;
  public dialogRef!: MatDialogRef<AddItemComponent>;

  public panelOpenState = true;
  public list_Cotizacion!: any;
  public lista_Producto: Items[] = [];   //LA CONSULTA A LA BASES DE DATOS PARA EL CARRITO POPUP.
  public lista_Producto_temp: Items[] = []; //SE CARGAN AL GRID DETALLE  - VER TODOS 
  public lista_Producto_Terminados: Items[] = []; // PANTALLA  DE LOS PRODUCTOS TERMINADOS DIRECTOS
  public lista_Proyectos_Item_Desc: any[] = []; // PANTALLA LISTA DE ITEMS con PROYECTOS  y descripcion
  public list_cliente!: Cliente[];
  public Lista_Monedas: Monedas[] = [];
  public subtotalDollar = 0;
  public subtotalCordoba = 0;
  public DescuentoDollar = 0;
  public DescuentoCordoba = 0;
  public IVADollar = 0;
  public IVACordoba = 0;
  public TOTALDollar = 0;
  public TOTALCordoba = 0;
  public firstLoad: boolean = true;
  public isDisabled: boolean = false;
  //dataSourceProducto = new MatTableDataSource(this.lista_Producto_temp);
  dataSource = new MatTableDataSource(this.lista_Producto_temp);
  // dataSourceItemsProyectos = new MatTableDataSource(this.lista_Proyectos_Item_Desc);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('selectpais') select_pais!: ElementRef
  @ViewChild('selectdepartamento') select_departamento!: ElementRef
  @ViewChild('selectpais_repL') select_pais_repL!: ElementRef
  @ViewChild('selectdepartamento_repL') select_departamento_repL!: ElementRef
  @ViewChild('selectpais_repP') select_pais_repP!: ElementRef
  @ViewChild('selectdepartamento_repP') select_departamento_repP!: ElementRef
  @ViewChild('edtmodal') edt_modal!: ElementRef;
  @ViewChild('cedula') cedula!: ElementRef


  /*  id Det detalle de cotizacion para  la tabla */
  displayedColumns: string[] = [
    //'idDetCotizacion',
    //'idCotizacion',
    //'IDComponente',
    //'IDArticulo',
    //'IDItem',
    'Descripcion',
    'Cantidad',
    'Precio',
    'PrecioDollar',
    'Iva',
    'subTotal',
    'subTotalDollar',
    //'FechaInicio',
    //'FechaEntrega',
    //'IDEstadoItem',
    //'userID',
    //'Anulado'
    'Acciones'
  ];



  constructor(
    private _builder: FormBuilder,
    private Aroute: ActivatedRoute, private route: Router,
    public rt: Router,
    private _snackbar: MatSnackBar,
    private srvCliente: PersonaService,
    private srvCotizacion: AgendaService, public ngZone: NgZone,
    private srvMonedas: MonedaService,
    private srvItem: ItemService,
    public dialog: MatDialog,
    private srcItem: ItemService) {
    this.tools = GlobalUtilities.getInstance();
    this.toast = new Toast(this._snackbar);

  }

  ngOnInit(): void {

    this.Aroute.params.subscribe((params: Params) => {
      this.id = params.id;
    })

    this.route.events.subscribe(event => {
      if (event instanceof NavigationStart) {

      }
    })

    //this.getDataForm();
    this.iniciarForm();



    //this.loadModules();
  }

  async getDataForm() {

    this.escuchadorTerminados();
    this.escuchadorFilaItemsProyectos();
    this.escuchadorItemsProyectos();

    this.setListaProducto();
    this.setListCliente();
    this.setListMonedas();
    this.monedaSeleccionadaC$ = true;
    this.monedaSeleccionada$ = false;
    this.AddformCotizacion.controls['simbolo'].setValue('C$');
    this.AddformCotizacion.controls['tipo_cambio'].setValue(1);


  }
  async escuchadorItemsProyectos() {
    let dataMaestro = (await this.srvCotizacion.getCotizacionTipo(this.id).toPromise());
    console.log(dataMaestro.Maestro[0]);
    //this.lista_Proyectos_Item_Desc = dataMaestro;
  }

  async escuchadorFilaItemsProyectos() {
    this.srvItem.addItemTriggerDescProyecto.subscribe(res => {
      this.lista_Producto_temp.push(res.data_filaItem);
      this.dataSource.data = this.lista_Producto_temp;

      if (this.lista_Producto_temp.length != 0) {
        this.isDisabled = true;
      }
    });
  }

  async escuchadorTerminados() {
    this.srvItem.addItemTrigger.subscribe(res => {
      this.lista_Producto_temp.push(res.dataTerminado);
      this.dataSource.data = this.lista_Producto_temp;
      if (this.lista_Producto_temp.length != 0) {
        this.isDisabled = true;
      }
      // LEVANTAMOS SOLO LOS PROD TERMINADOS PARA MANDARLOS AL API
      this.lista_Producto_Terminados.push(res.dataTerminado);
    });
  }


  async setListaProducto() {
    this.srcItem.getTipoItem(0).subscribe((ItemData: any) => {
      this.lista_Producto = ItemData[0];
    });
  }


  load_SubIvaNeto(listado: Items[], cordoba: boolean) {
    if (cordoba) {
      let sumaIva: number = 0
      listado.forEach(campo => {
        console.log('Campo IVA CORDOBAS : ' + parseFloat(campo.IvaC$));
        sumaIva = parseFloat(campo.IvaC$) + sumaIva;
      })
      return sumaIva;
    } else {
      let sumaIva$: number = 0
      listado.forEach(campo => {
        console.log('Campo IVA $_DOLLAR : ' + parseFloat(campo.Iva$));
        sumaIva$ = parseFloat(campo.Iva$) + sumaIva$;
      })
      return sumaIva$;
    }

  }

  load_SubTotalNeto(listado: Items[], cordobas: boolean) {

    if (cordobas) {
      let sumatotal: number = 0
      listado.forEach(campo => {
        sumatotal = parseFloat(campo.subTotal) + sumatotal;
      })
      return sumatotal;
    } else {
      let sumatotal$: number = 0
      listado.forEach(campo => {
        console.log('Campo de subTotales $_dollar: ' + parseFloat(campo.subTotal$));
        sumatotal$ = parseFloat(campo.subTotal$) + sumatotal$;
      })
      return sumatotal$;
    }


  }

  $$_Updated(event: any) {
    this.DescuentoDollar = parseFloat(event.target.value);
    //console.log('en Dollars '+event.target.value);
    this.TOTALDollar = (this.subtotalDollar - this.DescuentoDollar + this.IVADollar);


  }
  C$_Updated(event: any) {
    this.DescuentoCordoba = parseFloat(event.target.value);
    //console.log('en Cordobas  '+event.target.value);
    this.TOTALCordoba = (this.subtotalCordoba - this.DescuentoCordoba + this.IVACordoba);
  }

  iniciarForm() {
    this.AddformCotizacion = this._builder.group({
      id_cotizacion: [0, Validators.required],
      id_cliente: [0, Validators.required],
      fecha_cotizacion: [Date.now(), Validators.required],
      fecha_rige: [Date.now(), Validators.required],
      fecha_orden: [Date.now(), Validators.required],
      fecha_entrega: [Date.now(), Validators.required],
      dias_plazo: [0, Validators.required],
      descripcion_cotizacion: ['', Validators.required],
      observaciones: ['', Validators.required],
      tipo_cambio: [0.0, Validators.required],
      sub_total: [0.0, Validators.required],
      descuento: [0.0, Validators.required],
      iva: [0.0, Validators.required],
      gran_total: [0.0, Validators.required],
      simbolo: ['', Validators.required]
    });
  }


  async setListCliente() {
    this.list_cliente = await this.srvCliente.getPersonas().toPromise();
  }
  async setListMonedas() {
    this.Lista_Monedas = await this.srvMonedas.getMonedas().toPromise();


  }


  agregarElemnto(elemnt: any) {

  }

  getSubTotal() {
    return this.dataSource.data.map((t: any) => t.SubTotal).reduce((acc, value) => acc + value, 0);
  }


  evento(i: number) {
    //console.log(i);
  }


  evento_Moneda(i: string) {

    if (i == '$') {

      this.AddformCotizacion.controls['tipo_cambio'].setValue(this.Lista_Monedas[0].TasaCapitalizacion);
      this.AddformCotizacion.controls['simbolo'].setValue('$');
      this.monedaSeleccionada$ = true;
      this.monedaSeleccionadaC$ = false;


    } else {

      this.AddformCotizacion.controls['tipo_cambio'].setValue(this.Lista_Monedas[1].TasaCapitalizacion);
      this.AddformCotizacion.controls['simbolo'].setValue('C$');
      this.monedaSeleccionadaC$ = true;
      this.monedaSeleccionada$ = false;
    }


  }

  openForm(type: number, id: number) {
    let datoCompuesto: any[] = [0, this.lista_Producto];
    let dialogRef;
    switch (type) {   //1 - Proyecto y 2// producto
      case 1: { dialogRef = this.dialog.open(AddItemComponent, { height: '730px', width: '1000px', data: this.lista_Producto }) } break;
      case 2: { dialogRef = this.dialog.open(AddItemSComponent, { height: '730px', width: '1000px', data: datoCompuesto }) } break;
      default: { dialogRef = this.dialog.open(AddItemComponent); } break;
    }
    dialogRef.afterClosed().subscribe(() => {
      this.loadModules();
    });
  }

  loadModules() {

    if (this.firstLoad) {
      setTimeout(() => {
        this.tools.setisLoadingDetails(false)
      }, 450);
      this.firstLoad = false;
    }

    this.subtotalCordoba = this.load_SubTotalNeto(this.lista_Producto_temp, true);
    this.DescuentoCordoba = 0;
    this.IVACordoba = this.load_SubIvaNeto(this.lista_Producto_temp, true);
    this.TOTALCordoba = (this.subtotalCordoba - this.DescuentoCordoba + this.IVACordoba);
    // Subtotales en Dollares
    this.subtotalDollar = Math.round(this.load_SubTotalNeto(this.lista_Producto_temp, false));
    this.DescuentoDollar = 0;
    this.IVADollar = Math.round(this.load_SubIvaNeto(this.lista_Producto_temp, false));

    this.TOTALDollar = Math.round(((this.subtotalDollar - this.DescuentoDollar + this.IVADollar)));

    this.dataSource.paginator = this.paginator;

    //solo los cordobas  - faltan los dolares
    this.AddformCotizacion.controls['sub_total'].setValue(this.subtotalCordoba);
    this.AddformCotizacion.controls['descuento'].setValue(this.DescuentoCordoba);
    this.AddformCotizacion.controls['iva'].setValue(this.IVACordoba);
    this.AddformCotizacion.controls['gran_total'].setValue(this.TOTALCordoba);


  }

  /* Sumit del formulario  */
  enviar(values: any, formDirective: FormGroupDirective) {

    let addCotizacion = new Cotizacion(values, this.lista_Producto_Terminados, this.lista_Proyectos_Item_Desc);

    //console.log('EL MAESTRO: ' + JSON.stringify(values));
    //console.log('DETALLE ' + JSON.stringify(this.lista_Producto_Terminados));
    //console.log('COLECCION DE ITEMS PROYECTO ' + JSON.stringify(this.lista_Proyectos_Item_Desc));

    // console.log('GUARDAR OBJETO COMPLETO  :  ' + JSON.stringify(addCotizacion));

    this.srvCotizacion.add_Agenda(addCotizacion).subscribe(res => {
      if (res) {
        this.toast.showToast('Registro realizado correctamente - ✔️ ', 'Aceptar')


      } else {
        this.toast.showToast('Ha ocurrido un error -  ', 'Aceptar')
      }
    })

    //this.AddformCotizacion.reset();
    //formDirective.resetForm();
    //this.dialogRef.close();

    this.route.navigate(['/Cotizacion']);



  }






} // fin de la clase

