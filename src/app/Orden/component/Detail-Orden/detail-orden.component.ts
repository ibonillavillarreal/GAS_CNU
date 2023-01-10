import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { OrdenService } from 'src/app/services/orden.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { AddConsumoComponent } from '../add-consumo/add-consumo.component';
import { SeguimientoComponent } from '../seguimiento/seguimiento.component';
import { TrackingComponent } from '../tracking/tracking.component';
import { map, find } from 'rxjs/operators';
import { Toast } from '../../../utils/Toast';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detail-orden',
  templateUrl: './detail-orden.component.html',
  styleUrls: ['./detail-orden.component.css']
})
export class DetailOrdenComponent implements OnInit {
    id!:number;
    orden: any = [];
    orden_detalle: any = [];
    tools!: GlobalUtilities
    public toast: Toast;
    firstLoad: boolean = true;
    private permission: boolean = true;
    displayedColumns: string[] = ['Articulo', 'Descripcion', 'Altura', 'Base', 'Cantidad', 'UndMedida', 'acciones'];
    dataSource = new MatTableDataSource(this.orden_detalle);
    constructor(private Aroute: ActivatedRoute, private srcOrden:OrdenService, public dialog: MatDialog,private _snackbar: MatSnackBar) { 
        this.tools = GlobalUtilities.getInstance();
        this.toast = new Toast(this._snackbar);
    }

    ngOnInit(): void {
        this.Aroute.params.subscribe((params: Params) => {
            this.id = params.id;
            console.log("Orden ID  : "+this.id);
        });
        this.getData();
    }

    isAllowed() {
        return this.permission;
    }

    async getData(){
        let data = await this.srcOrden.getOrdenbyId(this.id).toPromise();
        if (data !== '0') {
            if (this.firstLoad) { this.tools.setisLoadingDetails(true) }

            this.orden = JSON.parse(data[0].orden);
            this.orden_detalle = JSON.parse(data[0].orden_detalle);
            // console.log(this.orden);
            console.log('json this.orden_detalle : ', JSON.stringify(this.orden_detalle));
            this.dataSource.data = this.orden_detalle;
            
            if (this.firstLoad) {
              setTimeout(() => { this.tools.setisLoadingDetails(false) }, 450);
              this.firstLoad = false;
            }
          } else {
            this.permission = false;
          }   
    }

    openDialogConsumo(id_orden_trabajo_detalle: number){
        let dialogRef;
        dialogRef = this.dialog.open(AddConsumoComponent, {data: {id_orden_trabajo_detalle:id_orden_trabajo_detalle}});
        dialogRef.afterClosed().subscribe(result =>{
            this.getData();
        })
    }

    openDialogTracking(){

        let pbase    = this.orden_detalle.find((t:any) =>  parseFloat(t.base)   ===0);
        let paltura  = this.orden_detalle.find((t:any) => parseFloat(t.altura) ===0);
        //console.log('base : ',pbase,'  - altura :',paltura)
        
        if(pbase || paltura){

            this.toast.showToast("Debe Digitar base y altura.  ❌", "Aceptar");
        }
        else {
            
            let dialogRef;
            dialogRef = this.dialog.open(TrackingComponent, {data: {id_orden:this.id}});
            dialogRef.afterClosed().subscribe(result =>{
                this.getData();
            })            
        }
    }
    openDialogSeguimiento(){
        let dialogRef;
        dialogRef = this.dialog.open(SeguimientoComponent, {data: {id_orden:this.id},height: '700px', width: '1050px'});
        dialogRef.afterClosed().subscribe(result =>{
            this.getData();
        })
    }
}
