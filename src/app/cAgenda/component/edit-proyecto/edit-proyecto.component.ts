import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from 'src/app/services/Item.service';
import { AddItemSComponent } from '../add-item-puntos/add-itemPuntos.component';
import { EditafilaCampoComponent } from '../editFilaUso/editfila-Campo.component';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.css']
})
export class EditProyectoComponent implements OnInit, OnDestroy {
  list_Producto_Item: any[] = [];
  form!: FormGroup
  list_ProductosDB: any[] = []
  exit: boolean = false;
  displayedColumns: string[] = ['Cantidad', 'Descripcion', 'DescripcionDeUso', 'Precio', 'Total', 'acciones'];
  dataSource = new MatTableDataSource(this.list_Producto_Item);
  constructor(private _builder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRefEdit: MatDialog, private dialogRef: MatDialogRef<EditProyectoComponent>,
    private srcItem: ItemService) {
    this.form = this._builder.group({
      DESCRIPCION: ['', Validators.required],
      Cantidad: [''],
      Base: ['', [Validators.min(0), Validators.required]],
      Altura: ['', [Validators.min(0), Validators.required]],
      Precio: [0, Validators.required]
    });
    this.list_Producto_Item = data.detalles_proyecto
    this.dataSource.data = this.list_Producto_Item;
    this.getProducts();
    this.escuchador();
    this.form.controls['DESCRIPCION'].setValue(this.data.DESCRIPCION)
    this.form.controls['Base'].setValue(this.data.Base)
    this.form.controls['Altura'].setValue(this.data.Altura)
  }
  async getProducts() {
    this.srcItem.getTipoItem(0).subscribe((ItemData: any) => {
      this.list_ProductosDB = ItemData[0];
    });
  }
  escuchador() {
    this.srcItem.addItemTriggerItemsEdit.subscribe(res => {
      if (!this.exit) {
        this.list_Producto_Item.push(res.dataTerminadoItems);
        this.dataSource.data = this.list_Producto_Item;
        //El precio viene de la base de datos con iva incluido de momento
        this.form.controls['Precio'].setValue(this.list_Producto_Item.map(t => parseFloat(t.Precio) * parseFloat(t.Cantidad)).reduce((acc, value) => acc + value, 0));
      }
    })
  }
  openFrmItems() {
    ;
    let datoCompuesto: any[] = [2, this.list_ProductosDB];
    let dialogRef = this.dialogRefEdit.open(AddItemSComponent, { height: '720px', width: '1080px', data: datoCompuesto });
  }

  removeExistingItems(list: any) {
    const list_productos = Object.assign([], list);
    for (let i = 0; i < this.list_Producto_Item.length; i++) {
      let index = list_productos.findIndex((x: any) => x.ARTICULO == this.list_Producto_Item[i].ARTICULO);
      if (index > -1) {
        list_productos.splice(index, 1);
      }
    }
    console.log(this.list_ProductosDB)
    console.log(list_productos);
    return list_productos;
  }

  ngOnInit(): void {
  }


  EditDetalle(Index: any, ARTICULO: any, Cantidad: any, DescripUso: any, Precio: any) {
    let dialog = this.dialogRefEdit.open(EditafilaCampoComponent, 
      { data: { ARTICULO: ARTICULO, Cantidad: Cantidad, DescripUso: DescripUso, Precio: Precio } })
    dialog.afterClosed().subscribe((res: any) => {
      if (res !== undefined) {
        let detalle = this.list_Producto_Item[Index - 1];
        //Detalle no es copia del item encontrado es un puntero, literalmente el elemento en la lista por eso edita.
        detalle.Cantidad = res.Cantidad
        detalle.DescripcionUso = res.DescripUso;
        detalle.Precio = res.Precio;
        this.form.controls['Precio'].setValue(this.list_Producto_Item.map(t => parseFloat(t.Precio) * parseFloat(t.Cantidad)).reduce((acc, value) => acc + value, 0));
        this.dataSource.data = this.list_Producto_Item;
      }
    });
  }

  update(values: any) {
    //AQUI QUEDE MANDAR EL PROYECTO EDITADO AL MASTER

    let iva = this.list_Producto_Item.map(t => parseFloat(t.iva) * parseFloat(t.Cantidad)).reduce((acc, value) => acc + value, 0);
    let proyecto = {
      ARTICULO: '',
      DESCRIPCION: values.DESCRIPCION,
      Cantidad: this.list_Producto_Item.map(t => parseInt(t.Cantidad)).reduce((acc, value) => acc + value, 0),
      Precio: this.list_Producto_Item.map(t => parseFloat(t.Precio) * parseFloat(t.Cantidad)).reduce((acc, value) => acc + value, 0),
      DescripcionUso: "",
      iva: iva,
      TIPO: 'P',
      Base: values.Base,
      Altura: values.Altura,
      detalles_proyecto: this.list_Producto_Item
    };
    //console.log(proyecto)
    this.dialogRef.close(proyecto)

  }

  ngOnDestroy() {
    // this.srvItem.addItemTriggerItems.next();
    // this.srvItem.addItemTriggerItems.complete();
    this.exit = true;
  }
  removeItem(index: any) {
    console.log(index)
    this.list_Producto_Item.splice((index - 1), 1)
    this.dataSource.data = this.list_Producto_Item;
  }

}
