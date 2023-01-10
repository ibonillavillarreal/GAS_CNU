import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddOrden } from 'src/app/models/AddOrden';
import { OrdenService } from 'src/app/services/orden.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { Toast } from 'src/app/utils/Toast';

@Component({
  selector: 'app-add-proyecto',
  templateUrl: './add-proyecto.component.html',
  styleUrls: ['./add-proyecto.component.css']
})
export class AddProyectoComponent implements OnInit {
    //form!: FormGroup
    private toast:Toast
    private tools:GlobalUtilities
    selectedRow: any;
    constructor(private srcOrden: OrdenService, private _snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<AddProyectoComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private router: Router) { 
        console.log(this.data);
        this.toast = new Toast(_snackBar);
        this.tools = GlobalUtilities.getInstance();
        // this.form = this._formBuilder.group({
        //     cantidad: ['']
        // });
    }

    ngOnInit(): void {
    }

    onNoClick(){
        this.dialogRef.close();
    }

    onSubmit(){
        let add_orden = new AddOrden(this.data.id_detalle, 5,0);
        console.log(add_orden);
        this.srcOrden.addOrden(add_orden).subscribe(res => {
            this.toast.showToast("Agregado correctamente ✔️", "Aceptar");
            this.router.navigate(['/Orden']);
        });
    }
}
