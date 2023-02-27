import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';

import { Contacto } from 'src/app/models/Contacto';
import { ContactoService } from 'src/app/services/contacto.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { AnularPersonaComponent } from '../anular-contacto/anular-contacto.component';
import { EditContactoComponent } from '../edit-contacto/edit-contacto.component';



@Component({
  selector: 'app-list-responsable-compras',
  templateUrl: './list-responsable-compras.component.html',
  styleUrls: ['./list-responsable-compras.component.css']
})
export class ListResponsableComprasComponent implements OnInit {

  public id!:number
  private tipo!:number
  public name!:string;
  tools:GlobalUtilities
  /***VARIABLES PARA TABLA */
   list_contacto!:Contacto[];
  /*****CAMPOS TABLA **/
  displayedColumns: string[] = ['id','Nombres', 'Apellidos', 'Cedula','acciones'];
  dataSource = new MatTableDataSource(this.list_contacto);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private src:ContactoService,public dialog: MatDialog,private route: ActivatedRoute){
      this.tools = GlobalUtilities.getInstance();
   }

  ngOnInit(): void {
    this.list_contacto =[];
    this.route.params.subscribe((params:Params) =>{
      this.getContactos(params.id,params.tipo);
      this.id = params.id;
      this.tipo = params.tipo;
      this.name = params.name;
    })

  }

  openForm(type:number,id:number) {
    let dialogRef;
    switch(type){
      //case 1:{dialogRef =this.dialog.open(AddPersonaComponent,{height: '520px',width: '720px',
      //   data:{id:this.id,tipo:this.tipo}})}break;
      case 2:{dialogRef =this.dialog.open(EditContactoComponent,{height: '520px',width: '720px',data:{id:id}})}break;  
      case 3:{dialogRef = this.dialog.open(AnularPersonaComponent,{data:{id:id}})}break;
      default:{dialogRef =this.dialog.open(EditContactoComponent);}break;
    }
    dialogRef.afterClosed().subscribe(result => {
      this.getContactos(this.id,this.tipo);
    });
  }
  isResponsableCompra(){
    return this.tipo ==2;
  }
  /**CONSULTAS**/
  getContactos(id:number,tipo:number){
    this.list_contacto =[];
    this.tools.setisLoadingDetails(true);
    this.src.getContactosW(tipo,id).subscribe((data:any)=>{
      data.forEach((element:any) => {
        let contacto = new Contacto(element.id,element.nombres,element.apellidos,element.cedula,element.correo,element.telefono1,
          element.telefono2,element.clienteId,element.config_catalogoId)
          this.list_contacto.push(contacto);
      });
      setTimeout(() =>{ 
        this.tools.setisLoadingDetails(false)
       }, 450);
    
      this.dataSource.data = this.list_contacto;
    });
  }

  /**Inicializar paginator**/
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /***Filtrar en la tabla** */
  applyFilter(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }
}