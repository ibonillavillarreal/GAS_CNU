import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonaService } from 'src/app/services/cliente.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { Toast } from 'src/app/utils/Toast';

@Component({
  selector: 'app-anular-cliente',
  templateUrl: './anular-persona.component.html',
  styleUrls: ['./anular-persona.component.css']
})
export class AnularPersonaComponent implements OnInit {
  private id: number
  private toast: Toast
  private tools: GlobalUtilities

  constructor(private src: PersonaService, @Inject(MAT_DIALOG_DATA)
  public data: any, private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AnularPersonaComponent>
  ) {
    this.id = data.id;
    this.toast = new Toast(_snackBar);
    this.tools = GlobalUtilities.getInstance();
    
  }

  ngOnInit(): void {
  }
  cerrar() {
    this.dialogRef.close();
  }
  
  confirmar(operacion:number) {

    let id_User:any ={id:this.id,idUser:1,operacion:operacion}  

    this.tools.setIsLoading(true);    
    this.src.anularPersona(id_User).subscribe(res => {
      if (res) {
          if(operacion === 1)
          {
            this.toast.showToast("Eliminado FISICA correctamente ✔️", "Aceptar")
            this.cerrar();
          }else
          {
            this.toast.showToast("Eliminado LOGICA correctamente ✔️", "Aceptar")
            this.cerrar();
          }
        
      } else {
        this.toast.showToast("Error inesperado en la acción ❌", "Aceptar")
        console.log(res);
      }
    });
  }

}
