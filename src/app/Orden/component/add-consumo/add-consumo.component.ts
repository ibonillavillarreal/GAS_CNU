import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddOrdenConsumo } from 'src/app/models/AddOrdenConsumo';
import { OrdenService } from 'src/app/services/orden.service';
import { Toast } from 'src/app/utils/Toast';

@Component({
  selector: 'app-add-consumo',
  templateUrl: './add-consumo.component.html',
  styleUrls: ['./add-consumo.component.css']
})
export class AddConsumoComponent implements OnInit {
    public form!: FormGroup;
    public toast: Toast;

    constructor(private _formBuilder: FormBuilder, private srcOrden:OrdenService, @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar,
    private _snackbar: MatSnackBar, private dialogRef: MatDialogRef<AddConsumoComponent>) {
        this.toast = new Toast(this._snackbar);

        console.log(this.data);
        this.form = this._formBuilder.group({
            base: [''],
            altura: ['']
        });
    }

    ngOnInit() {

    }

    onNoClick(){
        this.dialogRef.close();
    }

    onSubmit(value:any){

        let pbase    = value.base;  let paltura  = value.altura;
        if(parseFloat(pbase)===0 || parseFloat(paltura)===0){

            this.toast.showToast("Debe Digitar ambos datos (base y altura).  ❌", "Aceptar");
        }else{

            let orden = new AddOrdenConsumo(this.data.id_orden_trabajo_detalle, value.base, value.altura, 5);
            console.log(orden);
            this.srcOrden.addOrdenConsumo(orden).subscribe(res => {
                this.dialogRef.close();
            });
        }

    }
}
