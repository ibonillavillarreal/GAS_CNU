import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdenService } from 'src/app/services/orden.service';
import { AddProyectoComponent } from '../add-proyecto/add-proyecto.component';

@Component({
  selector: 'app-add-orden',
  templateUrl: './add-orden.component.html',
  styleUrls: ['./add-orden.component.css']
})
export class AddOrdenComponent implements OnInit {
    form!: FormGroup;
    list_proyectos: any = [];
    list_clientes: any = [];
    selectedRow: any;
    displayedColumns: string[] = ['NoCotizacion', 'Descripcion', 'Cantidad', 'Subtotal', 'Fecha', 'acciones'];
    dataSource = new MatTableDataSource(this.list_proyectos);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    constructor(private srcOrden:OrdenService, private srcCliente: ClienteService, 
        public dialog: MatDialog, private _formBuilder: FormBuilder) { 
        this.form = this._formBuilder.group({
            cliente: [''],
            num_cotizacion: ['']
            //ProdTerm: this._formBuilder.array([])
        });
    }

    ngOnInit(): void {
        //this.loadProyectos();
        this.getClientes();
    }

    async getClientes(){
        this.list_clientes = [];
        let data = await this.srcCliente.getPersonas().toPromise();
        this.list_clientes = data;
    }

    async loadProyectos(){
        this.list_proyectos = [];
        let data = await this.srcOrden.getProyectos(20,'0').toPromise();
        this.list_proyectos = data;
        this.dataSource.data = this.list_proyectos;
        console.log(data);
    }

    async onChange(){
        this.list_proyectos = [];
        let id_cliente = this.form.controls['cliente'].value;
        let num_cotizacion = this.form.controls['num_cotizacion'].value;
       
        if(id_cliente === '' && num_cotizacion != ''){
            let data = await this.srcOrden.getProyectos(0, num_cotizacion).toPromise();
            this.list_proyectos = data;
            this.dataSource.data = this.list_proyectos;
            console.log(data);
        }else if(num_cotizacion === '' && id_cliente != ''){
            let data = await this.srcOrden.getProyectos(id_cliente, '0').toPromise();
            this.list_proyectos = data;
            this.dataSource.data = this.list_proyectos;
            console.log(data);
        }else if(num_cotizacion != '' && id_cliente != ''){
            let data = await this.srcOrden.getProyectos(id_cliente, num_cotizacion).toPromise();
            this.list_proyectos = data;
            this.dataSource.data = this.list_proyectos;
            console.log(data);
        }
    }

    openDialog(id_detalle:number, i:number){
        this.selectedRow = i;
        let dialogRef;
        dialogRef = this.dialog.open(AddProyectoComponent, {data: {id_detalle}});
        dialogRef.afterClosed().subscribe(result =>{
            
        })
    }
    
    onSubmit(id_detalle:number){
        console.log(id_detalle);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //console.log("TAMAÑO "+this.paginator)
  
    }
    /***Filtrar en la tabla** */
    applyFilter(event: Event) {
      const valor = (event.target as HTMLInputElement).value;
      this.dataSource.filter = valor.trim().toLowerCase();
    }
}
