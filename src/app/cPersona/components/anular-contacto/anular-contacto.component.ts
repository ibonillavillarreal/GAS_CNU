import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactoService } from 'src/app/services/contacto.service';
import { Toast } from 'src/app/utils/Toast';

@Component({
  selector: 'app-anular-contacto',
  templateUrl: './anular-contacto.component.html',
  styleUrls: ['./anular-contacto.component.css']
})
export class AnularPersonaComponent implements OnInit {
  private id:number
  private toast:Toast
  constructor(private src:ContactoService,@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar) {
      this.id = data.id;
      this.toast = new Toast(_snackBar)
   }

  ngOnInit(): void {
  }

  confirmar(){
    this.src.anularContacto(this.id).subscribe(res=>{
        if(res){
          this.toast.showToast("Eliminado correctamente","Aceptar")
        }
      }
    )
  }

}
