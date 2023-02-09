import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from 'src/app/services/Item.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { AddItemSComponent } from '../add-item-s/add-item-s.component';

@Component({
  selector: 'app-add-details-proyect',
  templateUrl: './add-details-proyect.component.html',
  styleUrls: ['./add-details-proyect.component.css']
})
export class AddDetailsProyectComponent implements OnInit {
  public form!: FormGroup;
  public PadreOrigen!: boolean;
  list_productos: any[] = [];

  dataSource = new MatTableDataSource(this.list_productos); //tabla grid de articulos 
  displayedColumns: string[] = ['Descripcion', 'Cantidad', 'DescripcionUso', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dialog: any;
  tools: GlobalUtilities;
  constructor(private _builder: FormBuilder,
    private srcItem: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialoRef: MatDialogRef<AddItemSComponent>) {
    this.tools = GlobalUtilities.getInstance();
    this.list_productos = this.data
    this.dataSource.data = this.list_productos;
    this.iniciarForm();
  }

  iniciarForm() {
    this.form = this._builder.group({
      ARTICULO: [],
      Cantidad: []
    });
  }
  ngOnInit(): void {
  }

  add(ARTICULO: any) {
    let valor = (<HTMLInputElement>document.getElementById(ARTICULO)).value;
    let DescripcionDeUso = (<HTMLInputElement>document.getElementById(ARTICULO + "D")).value;

    let data = this.list_productos.find((x: any) => x.ARTICULO === ARTICULO);

    data.Cantidad = parseInt(valor);
    data.DescripcionDeUso = DescripcionDeUso;

    data.subTotal = (data.Cantidad * parseFloat(data.Precio)).toFixed(2);
    data.IvaC$ = data.subTotal * (parseFloat(data.Iva));
    //- Los montos Dollares
    data.subTotal$ = (parseFloat(data.Cantidad) * parseFloat(data.Precio$)).toFixed(2);
    data.Iva$ = data.subTotal$ * (parseFloat(data.Iva));
    
    this.srcItem.addItemTriggerEditProyect.emit({ data });
    const index = this.list_productos.findIndex((x: any) => x.ARTICULO === ARTICULO);

    if (index > -1) {
      this.list_productos.splice(index, 1);
    }
    this.dataSource.data = this.list_productos;
  }
  /***Filtrar en la tabla** */
  applyFilter(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  getPaginatorData(event: any) {
    console.log("INDICE " + this.paginator.pageIndex);
    console.log("REGISTROS POR PAGINA " + this.paginator.pageSize)
    console.log("TAMAÑO " + this.paginator.hidePageSize)
  }
}
