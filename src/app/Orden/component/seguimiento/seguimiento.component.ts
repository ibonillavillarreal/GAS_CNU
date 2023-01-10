import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { SeguimientoService } from 'src/app/services/seguimiento.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit {

  list_Diseno:any[]=[];
  list_Impresion:any[]=[];
  list_CorteArmado:any[]=[];
  list_Supervizado:any[]=[];
  list_Facturacion:any[]=[];
  num_orden:string="";
  @ViewChild('stepper') private stepper!: MatStepper;
  constructor(private srcRastreo:SeguimientoService,@Inject(MAT_DIALOG_DATA) public dataDetails: any) { }

  ngOnInit(): void {
    this.getData();
  }
  
  async getData(){
    let data = await this.srcRastreo.getRastreo(this.dataDetails.id_orden).toPromise();
    this.num_orden = data[0].id_orden;
    this.list_Diseno = data.filter(x => x.id_estacion === 10);
    this.list_Impresion = data.filter(x => x.id_estacion === 11)
    this.list_CorteArmado = data.filter(x => x.id_estacion === 12)
    this.list_Supervizado = data.filter(x => x.id_estacion === 238)
    this.list_Facturacion = data.filter(x => x.id_estacion === 31)

    setTimeout(() => {
    if(this.list_Impresion.length > 0){
      this.stepper.next();
    }
    if(this.list_CorteArmado.length > 0){
      this.stepper.next();
    }
    if(this.list_Supervizado.length > 0){
      this.stepper.next();
    }
    if(this.list_Facturacion.length > 0){
      this.stepper.next();
    }},300)
  }

}
