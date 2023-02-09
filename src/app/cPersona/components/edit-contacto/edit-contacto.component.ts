import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contacto } from 'src/app/models/Contacto';
import { ContactoService } from 'src/app/services/contacto.service';
import { Toast } from 'src/app/utils/Toast';

@Component({
  selector: 'app-edit-contacto',
  templateUrl: './edit-contacto.component.html',
  styleUrls: ['./edit-contacto.component.css']
})
export class EditContactoComponent implements OnInit {
  editar!:FormGroup 
  private id:number;
  private toast:Toast
  constructor(private src:ContactoService,private _builder:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any,private _snackbar:MatSnackBar){
    this.id = data.id;
    this.toast = new Toast(_snackbar);
    this.loadForm();
    this.getData();
  }

  ngOnInit(): void {
  }
  /*METODOS*/
  loadForm(){
    this.editar = this._builder.group({
      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      cedula:['',Validators.required],
      correo:['',Validators.compose([Validators.email,Validators.required])],
      telefono1:['',Validators.required],
      telefono2:['']
    })
  }
  getData(){
     this.src.getContactoW(this.id).subscribe((data:any)=>{
      this.editar.controls['nombres'].setValue(data[0].nombres);
      this.editar.controls['apellidos'].setValue(data[0].apellidos);
      this.editar.controls['cedula'].setValue(data[0].cedula);
      this.editar.controls['correo'].setValue(data[0].correo);
      this.editar.controls['telefono1'].setValue(data[0].telefono1);
      this.editar.controls['telefono2'].setValue(data[0].telefono2);
     });
  }
  enviar(values:any){
    let contacto = new Contacto(this.id,values.nombres,values.apellidos,values.cedula,values.correo,values.telefono1,
      values.telefono2,0,0);
    
      this.src.updateContacto(contacto).subscribe(res =>{
        if(res){
          this.toast.showToast("Actualizado correctamente","Aceptar");
        }else{
          this.toast.showToast("Ha ocurrido un error al actualizar","Aceptar");
        }
    })
  }
}
