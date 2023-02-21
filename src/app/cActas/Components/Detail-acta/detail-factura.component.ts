import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Factura } from 'src/app/services/Factura.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { Data } from '@angular/router';
import { VerItemDetalleComponent } from '../Ver-ItemDetail/ver-item-detalle.component';
import { AgendaService } from 'src/app/services/agenda.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TrackingComponent } from '../Seg-Tracking/tracking.component';
import { SeguirTrackComponent } from '../Seg-Estaciones/seguir-track.component';

@Component({
  selector: 'app-detail-factura',
  templateUrl: './detail-factura.component.html',
  styleUrls: ['./detail-factura.component.css']
})
export class DetailFacturaComponent implements OnInit {
  public tools: GlobalUtilities
  public firstLoad: boolean = true;
  public facturaMaestro:any;
  public cotizacion: any;
  public id_factura: any;
  public num_factura: any;
  public detalle_factura_DB_Grid: any[] = [];
  public dataSourceDetFactura = new MatTableDataSource(this.detalle_factura_DB_Grid);
  public displayedColumns: string[] = ['Cotizacion', 'ARTICULO', 'Descripcion', 'Cantidad', 'Precio', 'iva', 'subTotal', 'acciones'];
  

  @ViewChild(MatPaginator) paginatorArticulos!: MatPaginator; 
  @ViewChild(MatSort) sortArticulos!: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private srcFactura: Factura, private dialoRef: MatDialogRef<DetailFacturaComponent>,
    public dialog: MatDialog,private srcCotizacion: AgendaService,
  ) {
    this.facturaMaestro = data.facturaMaestro;    
    this.id_factura = this.facturaMaestro.id_factura;
    this.num_factura = this.facturaMaestro.Factura;

  this.tools = GlobalUtilities.getInstance();
  this.loadModules();
   }
     //Load list
 async loadModules() {
  this.tools.setisLoadingDetails(true)
  const pjson = '{"Cliente":"0","idCOT":"' + this.facturaMaestro.id_factura + '","Oper":"7"}';
  this.detalle_factura_DB_Grid  = await this.srcFactura.add_Json_FacturaItems(pjson).toPromise();
  this.dataSourceDetFactura.data = this.detalle_factura_DB_Grid;            

  if (this.firstLoad) {
    setTimeout(() => {
      this.tools.setisLoadingDetails(false)
    }, 450);
    this.firstLoad = false;
  }
  
}

async openForm(type: number, id: number, proyectoDesc:any) {
  let dialogRef;
   switch (type) {
     case 1: { 
              const pjson = '{"Cliente":"0","idCOT":"' + id + '","Oper":"8"}';
              this.cotizacion  = await this.srcFactura.add_Json_FacturaItems(pjson).toPromise();
               dialogRef = this.dialog.open(VerItemDetalleComponent,  {
               height: '600px', width: '900px',
               data:{list:this.cotizacion, proyecto:proyectoDesc}})
             } break;        
      default: { dialogRef = this.dialog.open(VerItemDetalleComponent); } break;
  }
  
 }
 
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSourceDetFactura.paginator = this.paginatorArticulos;
    this.dataSourceDetFactura.sort = this.sortArticulos;
  

  }

   openDialogTracking(){
    let dialogTrackRef;
    dialogTrackRef = this.dialog.open(TrackingComponent, {data: {id_factura:this.id_factura, num_factura:this.num_factura}});
     dialogTrackRef.afterClosed().subscribe((reg:any)=>{
       //this.loadModules();
       this.dataSourceDetFactura.data = this.detalle_factura_DB_Grid;
     })
  }
  
  openDialogSeguimiento(){
    let dialogRef;
    dialogRef = this.dialog.open(SeguirTrackComponent, {data: {id_factura:this.id_factura, num_factura:this.num_factura},height: '700px', width: '950px'});
    dialogRef.afterClosed().subscribe(result =>{
        //this.loadModules();
        this.dataSourceDetFactura.data = this.detalle_factura_DB_Grid;
    })
  }

  Cerrar(){
    this.dialoRef.close();
  }
}


