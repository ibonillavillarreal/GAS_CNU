import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-ver-item-detalle',
  templateUrl: './ver-item-detalle.component.html',
  styleUrls: ['./ver-item-detalle.component.css']
})
export class VerItemDetalleComponent implements OnInit {
  list_detalles:any[] = [];
  descripcion:any;
  displayedColumnsArticulos: string[] = ['CODIGO', 'DESCRIPCION', 'CANTIDAD', 'MONTO'];
  dataSourceArticulos = new MatTableDataSource(this.list_detalles);

  @ViewChild(MatPaginator) paginatorArticulos!: MatPaginator; 
  @ViewChild(MatSort) sortArticulos!: MatSort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {   }
  ngOnInit(): void {

    //console.log('this.cotizacion : '+ JSON.stringify(this.data.obj_cotizacion));
    this.descripcion = this.data.proyecto
    this.list_detalles = this.data.list;
    this.dataSourceArticulos.data = this.list_detalles;
  }

  ngAfterViewInit() {
    this.dataSourceArticulos.paginator = this.paginatorArticulos;
    this.dataSourceArticulos.sort = this.sortArticulos;
    //console.log("TAMAÑO "+this.paginator)

  }

}
