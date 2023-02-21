
import { Component, Inject, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/Item.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { Toast } from 'src/app/utils/Toast';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-item-puntos',
  templateUrl: './add-itemPuntos.component.html',
  styleUrls: ['./add-itemPuntos.component.css']
})

export class AddItemSComponent implements OnInit {
  public flag_Moneda_Cordoba: boolean = true;
  public IsProject!: boolean;
  public IsProjectEdit!: boolean;
  list_asistencia: any[] = [];
  public UsaArea: boolean = true;

  /***TABLA DE ASISTENCIA - REPRESENTANTES */
  displayedColumns: string[] = ['Grado', 'Nombres', 'Apellidos', 'Correo', 'Tipo', 'Observacion'];
  dataSource = new MatTableDataSource(this.list_asistencia);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dialog: any;
  tools: GlobalUtilities;
  toast: Toast


  /***CAMPOS - PARA LOS PUNTOS DE AGNDAS***/
  registrar: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRefItems: MatDialog, private dialoRef: MatDialogRef<AddItemSComponent>,
    private srcItem: ItemService
  ) {
    this.toast = new Toast(_snackbar)
    this.tools = GlobalUtilities.getInstance();
    this.IsProject = data[0];

    this.registrar = this._builder.group({
      PuntosAgenda: ['', Validators.required],
      NotaObservacion: ['', Validators.required]
    });

    if (data[0] === 2) {//insert en la vista de editar proyecto
      this.IsProject = true;
      this.IsProjectEdit = true
    }

    this.list_asistencia = data[1];
    this.flag_Moneda_Cordoba = data[2]; //la moneda seleccionada



  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  agregar_textos(value: any, formDirective: FormGroupDirective) {
    //console.log(' Envio del frm: ' + JSON.stringify(value)) 
    this.dialoRef.close(value);
  }

  /***Filtrar en la tabla** */
  applyFilter(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  getPaginatorData(event: any) {
    //console.log("INDICE " + this.paginator.pageIndex);
    //console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
    //console.log("TAMAÑO " + this.paginator.hidePageSize)
  }


  enviar() {

  }


  ///////////////******************************///////////////////
  add(Articulo: any) {

    if (this.IsProject) {
      let valor = (<HTMLInputElement>document.getElementById(Articulo));

      if (isNaN(parseInt(valor.value))) {
        this.toast.showToast("⛔ Cantidad no valida ", "Aceptar")
      } else {
        let DescripcionDeUso = (<HTMLInputElement>document.getElementById(Articulo + "D"));
        let Precio = (<HTMLInputElement>document.getElementById(Articulo + "P")).value;
        let data = this.list_asistencia.find((x: any) => x.ARTICULO === Articulo);

        let proyecto = {
          ARTICULO: Articulo,
          DESCRIPCION: data.DESCRIPCION,
          Cantidad: parseInt(valor.value),
          Precio: parseFloat(Precio),
          DescripcionUso: DescripcionDeUso.value,
          iva: data.iva,
          TIPO: data.TIPO
        };
        if (this.IsProjectEdit) {

          this.srcItem.addItemTriggerItemsEdit.emit({ dataTerminadoItems: proyecto });
        } else {
          //console.log('====>>>   emit campos de  proyecto   : '+JSON.stringify(proyecto));
          this.srcItem.addItemTriggerItems.emit({ dataTerminadoItems: proyecto });
        }
        // const index = this.lista_ArticulosBD.findIndex((x: any) => x.ARTICULO === Articulo);
        // if (index > -1) {
        //   this.lista_ArticulosBD.splice(index, 1);
        // }
        DescripcionDeUso.value = '';
        valor.value = '';
        this.toast.showToast("Agregado correctamente ✔️", "Aceptar");
        this.dataSource.data = this.list_asistencia;
      }
    } else {
      let valor = (<HTMLInputElement>document.getElementById(Articulo)).value;
      if (isNaN(parseInt(valor))) {
        this.toast.showToast("⛔ Cantidad no valida ", "Aceptar")
      } else {
        // Cargar el  UsaArea
        let data = this.list_asistencia.find((x: any) => x.ARTICULO === Articulo);
        this.UsaArea = data.UsaArea;
        console.log('dato this.UsaArea  : ', JSON.stringify(this.UsaArea));

        let Precio = parseFloat((<HTMLInputElement>document.getElementById(Articulo + "P")).value);
        data.Cantidad = parseInt(valor);
        data.DescripcionDeUso = "";
        data.Base = parseFloat((<HTMLInputElement>document.getElementById(Articulo + "B")).value)
        data.Altura = parseFloat((<HTMLInputElement>document.getElementById(Articulo + "A")).value)

        // NO Actualizar precio si NO usa_area (Base por altura)
        if (this.UsaArea === true) {
          let nuevo_precio_mts = Precio;
          Precio = (nuevo_precio_mts) * parseFloat(data.Base) * parseFloat(data.Altura);
        }

        let proyecto = {
          ARTICULO: Articulo,
          DESCRIPCION: data.DESCRIPCION,
          Cantidad: data.Cantidad,
          Precio: Precio,
          DescripcionUso: data.DescripcionDeUso,
          iva: data.iva,
          TIPO: data.TIPO,
          Base: data.Base,
          Altura: data.Altura,
        };

        this.srcItem.addItemTrigger.emit({ dataTerminado: proyecto });
        // PROCEDE A ELLIMINARLO DEL OBJETO DE LISTA 
        const index = this.list_asistencia.findIndex((x: any) => x.ARTICULO === Articulo);
        if (index > -1) {
          this.list_asistencia.splice(index, 1);
          this.toast.showToast("Agregado correctamente ✔️", "Aceptar");
        }
        this.dataSource.data = this.list_asistencia;
      }
    }
    //this.dialoRef.close();
  }

  valCantidad(ARTICULO: any) {


    let cantidad = (<HTMLInputElement>document.getElementById(ARTICULO));
    if (parseFloat(cantidad.value) < 1) {
      cantidad.value = '';
    }
  }



}










