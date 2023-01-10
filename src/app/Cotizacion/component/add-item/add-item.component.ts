
import { Component, Inject, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupDirective, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from 'src/app/services/Item.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddItemSComponent } from '../add-item-s/add-item-s.component';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Toast } from 'src/app/utils/Toast';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Data } from '@angular/router';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit, OnDestroy {

  frmAddItem!: FormGroup
  tools: GlobalUtilities;
  toast: Toast;
  lista_ArticulosDB: any[] = [];
  list_Producto_Item: any[] = [];
  list_proyecto: any[] = [];
  public id_cliente:any;
  //displayedColumns: string[] = ['descripcion', 'acciones'];
  displayedColumns: string[] = ['Cantidad', 'Descripcion', 'DescripcionDeUso', 'Precio', 'Total', 'acciones'];

  dataSource = new MatTableDataSource(this.list_Producto_Item);
  dataSourceItemProyecto = new MatTableDataSource(this.list_Producto_Item);  //es el del grid en esta ventana
  selection = new SelectionModel<any>(true, []);
  exit: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialogItems: any;

  constructor(private _builder: FormBuilder, private srvItem: ItemService, private _snackbar: MatSnackBar, 
  @Inject(MAT_DIALOG_DATA) public data: any, private dialogRefItems: MatDialog, private dialogRef: MatDialogRef<AddItemComponent>) 
  {
    
    this.id_cliente = data.id_cliente;
    
    this.tools = GlobalUtilities.getInstance();
    this.dataSourceItemProyecto.data = this.list_Producto_Item; //ES para la tabla grid
    this.toast = new Toast(this._snackbar);
    this.iniciarForm();
    this.getData();
  }

  iniciarForm() {
    console.log('Data ', this.data)
    this.frmAddItem = this._builder.group({
      DESCRIPCION: ['', Validators.required],
      Cantidad: [''],
      Base: ['', [Validators.min(0), Validators.required]],
      Altura: ['', [Validators.min(0), Validators.required]],
      Precio: [0, Validators.required]
    });
  }

  async getData() {
    this.setListaProducto();
  }

  ngOnInit(): void {
    this.escuchador();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async escuchador() {
    this.srvItem.addItemTriggerItems.subscribe(res => {
      if (!this.exit) {
        this.list_Producto_Item.push(res.dataTerminadoItems);
        this.dataSourceItemProyecto.data = this.list_Producto_Item;
        //El precio viene de la base de datos con iva incluido de momento
        this.frmAddItem.controls['Precio']
        .setValue(this.list_Producto_Item.map(t => parseFloat(t.Precio)).reduce((acc, value) => acc + value, 0));
        this.toast.showToast("Agregado correctamente ✔️", "Aceptar")
      }
    })
  }

  async setListaProducto() {
     let DB_format_valores = (await this.srvItem.getTipoItem(this.id_cliente).toPromise())[0];
     //console.log('====>>>   Antes de Modificar   : '+JSON.stringify(DB_format_valores));
     // SE LE RSTA EL IVA  AL PRECIO PARA  SEPARA LOS MONTOS IVA CON PRECIO ANTES DE IVA
     DB_format_valores.map((p:any) => {p.Precio = parseFloat(p.Precio) - parseFloat(p.iva)});
     this.lista_ArticulosDB = DB_format_valores;
  }

  openFrmItems() {
    
    let DescProyecto = this.frmAddItem.controls["DESCRIPCION"].value;
    let base = this.frmAddItem.controls["Base"].value;
    let altura = this.frmAddItem.controls["Altura"].value;
    if(DescProyecto==="" || base ==="" || altura ==="" ){
      this.toast.showToast("Debe digitar la Base, Altura y Descripcion de Proyecto  ❌", "Aceptar");
    }
    else{
      let datoCompuesto: any[] = [1, this.lista_ArticulosDB];
      let dialogRef = this.dialogRefItems.open(AddItemSComponent, { height: '720px', width: '1080px', data: datoCompuesto });
    }
  }

  add() {
    if(this.list_Producto_Item.length !== 0){

      let frm_modeloItem = this.frmAddItem.value;
      console.log(this.list_Producto_Item);
      let iva = this.list_Producto_Item.map(t => parseFloat(t.iva) * parseFloat(t.Cantidad)).reduce((acc, value) => acc + value, 0);
      this.frmAddItem.controls['Cantidad'].setValue(this.list_Producto_Item.map(t => parseInt(t.Cantidad)).reduce((acc, value) => acc + value, 0))
      console.log()
  
      this.list_Producto_Item.forEach(item => {
        item.Base = frm_modeloItem.Base,
          item.Altura = frm_modeloItem.Altura
      });
      let proyecto = {
        ARTICULO: '',
        DESCRIPCION: frm_modeloItem.DESCRIPCION,
        Cantidad: this.list_Producto_Item.map(t => parseInt(t.Cantidad)).reduce((acc, value) => acc + value, 0),
        Precio: this.list_Producto_Item.map(t => parseFloat(t.Precio) * parseFloat(t.Cantidad)).reduce((acc, value) => acc + value, 0),
        DescripcionUso: "",
        iva: iva,
        TIPO: 'P',
        Base: frm_modeloItem.Base,
        Altura: frm_modeloItem.Altura,
        detalles_proyecto: this.list_Producto_Item
      };
      console.log(proyecto)
      this.dialogRef.close(proyecto);       
    }

  }

  delete(Articulo: any) {
  }
  // ngOnDestroy() {
  //   // this.srvItem.addItemTriggerItems.next();
  //   // this.srvItem.addItemTriggerItems.complete();
  // }
  ngOnDestroy() {
    // this.srvItem.addItemTriggerItems.next();
    // this.srvItem.addItemTriggerItems.complete();
    this.exit = true;
  }

  removeItem(index: any) {
    console.log(index)
    this.list_Producto_Item.splice((index - 1), 1)
    this.dataSourceItemProyecto.data = this.list_Producto_Item;
  }
}