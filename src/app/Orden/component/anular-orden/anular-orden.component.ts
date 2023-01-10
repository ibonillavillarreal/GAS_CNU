import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdenService } from 'src/app/services/orden.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { Toast } from 'src/app/utils/Toast';

@Component({
  selector: 'app-anular-orden',
  templateUrl: './anular-orden.component.html',
  styleUrls: ['./anular-orden.component.css']
})
export class AnularOrdenComponent implements OnInit {
    private toast:Toast
    private tools:GlobalUtilities
    constructor(private srcOrden:OrdenService, @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AnularOrdenComponent>) {
        
        this.toast = new Toast(_snackBar);
        this.tools = GlobalUtilities.getInstance();
    }

    ngOnInit(): void {
    }

    cancelar(){
        this.dialogRef.close();
    }
    
    confirmar(){
        let id_orden = this.data.id_orden;
        this.srcOrden.anularOrden(id_orden).subscribe(res => {
            this.toast.showToast("Orden anulada correctamente!","aceptar");
            location.reload();
        });
    }
}
