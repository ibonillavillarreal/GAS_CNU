import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actas } from 'src/app/services/Factura.service';
import { Toast } from 'src/app/utils/Toast';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  public id_factura: any;
  public num_factura: any;

  list_tracking: any;
  isShown: boolean = false;
  public toast: Toast

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private srcFactura: Actas, private dialoRef: MatDialogRef<TrackingComponent>,
    private _snackbar: MatSnackBar
  ) {
    this.toast = new Toast(_snackbar);
    this.id_factura = data.id_factura;
    this.num_factura = data.num_factura;    
    this.loadModule();
  }

  ngOnInit(): void {
  }

  async loadModule() {
    let data = await this.srcFactura.estacion_rastreo(this.num_factura).toPromise();
    this.list_tracking = data[0];
    this.isShown = true
  }

  async changeEstacion() {
    let objUserFactura = { id_factura: this.id_factura, id_usuario: 5 };
    await this.srcFactura.pasar_TrackingUpdate(objUserFactura).subscribe(res => {
      
      if(res[0].id_proceso !== 0 ) {
        this.toast.showToast("Avanzando al estado siguiente  ✔️", "Go Tracking");
      }else{
        this.toast.showToast("⛔ Valide con el administrador de facturas ! ", "NO Tracking");
      }

      this.dialoRef.close();
      });

  }

  Cerrar() {
    this.dialoRef.close();
  }


}
