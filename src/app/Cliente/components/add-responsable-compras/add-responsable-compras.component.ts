import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Contacto } from 'src/app/models/Contacto';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-add-responsable-compras',
  templateUrl: './add-responsable-compras.component.html',
  styleUrls: ['./add-responsable-compras.component.css']
})
export class AddResponsableComprasComponent implements OnInit {
  registrar: FormGroup 
  idCliente:number
  tipo:number
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _builder:FormBuilder,private _snackBar: MatSnackBar,private src:ContactoService,private route: ActivatedRoute,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.registrar = this._builder.group({
      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      cedula:['',Validators.required],
      correo:['',Validators.compose([Validators.email,Validators.required])],
      telefono1:['',Validators.required],
      telefono2:[''],
      idCliente:[''],
      tipo:['']
    })
    this.idCliente = data.id;
    this.tipo = data.tipo;
    console.log("idCliente"+this.idCliente +" : Tipo "+this.tipo)
  }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) =>{
      console.log(params)
    })
  }
  mensaje(msj:string) {
    this._snackBar.open(msj,'Aceptar', {
      duration: 2 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }
  isResponsableCompra(){
    return this.tipo == 2;
  }
  enviar(values:any,formDirective:FormGroupDirective){
    /*
    
    */
    let contacto = new Contacto(0,values.nombres,values.apellidos,values.cedula,
      values.correo,values.telefono1,values.telefono2,this.idCliente,this.tipo);
      this.src.addContacto(contacto).subscribe(res =>{
          console.log(res)
          if(res){
            this.mensaje("Registro realizado correctamente");
          }else{
            this.mensaje("Ha ocurrido un error en el registro");
          }
      })
      formDirective.resetForm();
      this.registrar.reset();
  }
}
