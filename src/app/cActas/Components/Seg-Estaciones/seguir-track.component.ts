import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Factura } from 'src/app/services/Factura.service';

@Component({
  selector: 'app-seguir-track',
  templateUrl: './seguir-track.component.html',
  styleUrls: ['./seguir-track.component.css']
})
export class SeguirTrackComponent implements OnInit {

  Generada:any[]=[];
  Entregada:any[]=[];
  Recibida:any[]=[];
  Cancelada:any[]=[];
  Contabilizada:any[]=[];

  id_factura:any;  
  @ViewChild('stepper') private stepper!: MatStepper;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private srcFactura: Factura, private dialoRef: MatDialogRef<SeguirTrackComponent>
    
  ) { 
    this.id_factura = data.id_factura;
    this.loadModule();
  }

  ngOnInit(): void {
    
  }
  async loadModule(){
    let tracking = await this.srcFactura.seguir_Tracking(this.id_factura).toPromise();
    this.Generada = tracking.filter((x:any) => x.id_estacion === 222);  // Generada
    this.Entregada = tracking.filter((x:any) => x.id_estacion === 223) //Entregada
    this.Recibida = tracking.filter((x:any) => x.id_estacion === 224) //Recibida
    this.Cancelada = tracking.filter((x:any) => x.id_estacion === 225) // Cancelada
    this.Contabilizada = tracking.filter((x:any) => x.id_estacion === 226) // Contabilizada
    
    setTimeout(() => {
    if(this.Entregada.length > 0){
      this.stepper.next();
    }
    if(this.Recibida.length > 0){
      this.stepper.next();
    }
    if(this.Cancelada.length > 0){
      this.stepper.next();
    }
    if(this.Contabilizada.length > 0){
      this.stepper.next();
    }
  },300);    
}
  
 Cerrar(){
    this.dialoRef.close();
  }

}
