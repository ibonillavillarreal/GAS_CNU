
import { Component, Inject, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast } from 'src/app/utils/Toast';
import { ItemService } from 'src/app/services/Item.service';


@Component({
  selector: 'app-add-item-puntos',
  templateUrl: './add-itemPuntos.component.html',
  styleUrls: ['./add-itemPuntos.component.css']
})

export class AddItemSComponent implements OnInit {
  public flag_Moneda_Cordoba: boolean = true;
  public IsProjectEdit!: boolean;
  public UsaArea: boolean = true;


  /***CAMPOS - PARA LOS PUNTOS DE AGNDAS***/
  /***FORMULARIO -PARA LOS PUNTOS DE AGENDAS */
  public Id_Agenda!: any;
  public CodMiembro_puntos = 0 ;  //controlar puntos de agenda -fila
  public Data_List_PuntosAgenda: any[] = [];
  dialog: any;
  tools: GlobalUtilities;
  toast: Toast
  registrar: FormGroup;

  constructor(
    private dialogRefItems: MatDialog, private dialoRef: MatDialogRef<AddItemSComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _builder: FormBuilder,
    private _snackbar: MatSnackBar,
    private srcItem: ItemService
  ) {
    this.toast = new Toast(_snackbar)
    this.tools = GlobalUtilities.getInstance();
    this.Id_Agenda = data.Id_Agenda;
    this.CodMiembro_puntos = data.CodMiembro;
   
    this.registrar = this._builder.group({
      PuntosAgenda: ['', Validators.required],
      NotaObservacion: ['Ninguna' ]
    });
  }

  ngOnInit(): void {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  agregar_textos(value: any, formDirective: FormGroupDirective) {
    let fila = {CodMiembro:this.CodMiembro_puntos, ...value,CodAgenda:this.Id_Agenda  }    
   
    this.Data_List_PuntosAgenda.push(fila)
    this.dialoRef.close(this.Data_List_PuntosAgenda);
  }


  /***Filtrar en la tabla** */
  applyFilter(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = valor.trim().toLowerCase();
  }

  getPaginatorData(event: any) {
    //console.log("INDICE " + this.paginator.pageIndex);
    //console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
    //console.log("TAMAÑO " + this.paginator.hidePageSize)
  }






  ///////////////******************************///////////////////
  add(Articulo: any) {

    if (1) {
      let valor = (<HTMLInputElement>document.getElementById(Articulo));

      if (isNaN(parseInt(valor.value))) {
        this.toast.showToast("⛔ Cantidad no valida ", "Aceptar")
      } else {
        let DescripcionDeUso = (<HTMLInputElement>document.getElementById(Articulo + "D"));
        let Precio = (<HTMLInputElement>document.getElementById(Articulo + "P")).value;
        let data = this.Data_List_PuntosAgenda.find((x: any) => x.ARTICULO === Articulo);

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
       
          this.srcItem.addItemTriggerItems.emit({ dataTerminadoItems: proyecto });
        }
        // const index = this.lista_ArticulosBD.findIndex((x: any) => x.ARTICULO === Articulo);
        // if (index > -1) {
        //   this.lista_ArticulosBD.splice(index, 1);
        // }
        DescripcionDeUso.value = '';
        valor.value = '';
        this.toast.showToast("Agregado correctamente ✔️", "Aceptar");
        //this.dataSource.data = this.Data_List_PuntosAgenda;
      }
    } else {
      let valor = (<HTMLInputElement>document.getElementById(Articulo)).value;
      if (isNaN(parseInt(valor))) {
        this.toast.showToast("⛔ Cantidad no valida ", "Aceptar")
      } else {
        // Cargar el  UsaArea
        let data = this.Data_List_PuntosAgenda.find((x: any) => x.ARTICULO === Articulo);
        this.UsaArea = data.UsaArea;
      
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
        const index = this.Data_List_PuntosAgenda.findIndex((x: any) => x.ARTICULO === Articulo);
        if (index > -1) {
          this.Data_List_PuntosAgenda.splice(index, 1);
          this.toast.showToast("Agregado correctamente ✔️", "Aceptar");
        }
        //this.dataSource.data = this.Data_List_PuntosAgenda;
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










