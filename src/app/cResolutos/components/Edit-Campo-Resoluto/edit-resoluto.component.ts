import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { vnPrecios } from 'src/app/services/vnPrecios.service';

@Component({
  selector: 'app-edit-resoluto',
  templateUrl:'./edit-resoluto.component.html',
  styleUrls: ['./edit-resoluto.component.css']
})
export class EditResolutoComponent implements OnInit {

public form!: FormGroup;
public ventana!: any;
    constructor(private _formBuilder: FormBuilder, private srcPrecio:vnPrecios, 
        @Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<EditResolutoComponent>) {
                    
            this.form = this._formBuilder.group({
                id_cliente: [], razon_social: [], Articulo: [],  Precio: []
        });
    }

  ngOnInit(){
    this.ventana = this.data.ventana;  
    this.form.patchValue(this.data);
  }   
    async onSubmit(frmValues:any){

        if (this.ventana==0 ){
            //frmValues.id_cliente,frmValues.Articulo,frmValues.Precio
            const json_Insert =  '{"id_cliente":"'+frmValues.id_cliente+'","Articulo":"'+frmValues.Articulo+'","Precio":"'+frmValues.Precio+'"}'; 
            const jsonCadena = json_Insert;
            let resData = await  this.srcPrecio.addJson_Cliente_Precio(jsonCadena).subscribe(res =>  { this.dialogRef.close(); });     
              
        }else if(this.ventana==2){
            const json_Insert ='{"SERVICIO":{"ARTICULO":"'+frmValues.Articulo+'"},"LISTA_PRECIO":[{"ARTICULO":"'+frmValues.Articulo+'","NIVEL_PRECIO":"PDOLAR1","MONEDA":"D","VERSION":"1","PRECIO":"'+frmValues.Precio+'"}]}'
            //const json_Insert =  '{"id_cliente":"'+frmValues.id_cliente+'","Articulo":"'+frmValues.Articulo+'","Precio":"'+frmValues.Precio+'"}'; 
       
       const jsonCadena = JSON.parse(json_Insert);
       let resData = await  this.srcPrecio.addArticulosPrecios(jsonCadena).subscribe(res =>  { this.dialogRef.close(); });       

        }
           
    }

    onNoClick(){
        this.dialogRef.close();
    }

}



    

 
