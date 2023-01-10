import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from 'src/app/services/cliente.service';
import { GlobalUtilities } from 'src/app/utils/GlobalUtilities';
import { Toast } from 'src/app/utils/Toast';

@Component({
  selector: 'app-anular-cliente',
  templateUrl: './anular-cliente.component.html',
  styleUrls: ['./anular-cliente.component.css']
})
export class AnularClienteComponent implements OnInit {
  private id:number
  private toast:Toast
  private tools:GlobalUtilities
  constructor(private src:ClienteService,@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar,
  private dialogRef: MatDialogRef<AnularClienteComponent>){
      this.id = data.id;
      this.toast = new Toast(_snackBar);
      this.tools = GlobalUtilities.getInstance();
      console.log("ID ELIMINAR"+this.id)
   }

  ngOnInit(): void {
  }
  cerrar(){
    this.dialogRef.close();
  }
  confirmar(){
    this.tools.setIsLoading(true);
    this.src.anularCliente(this.id).subscribe(res=>{
        if(res){
          this.toast.showToast("Eliminado correctamente","Aceptar")
          this.cerrar();
        }else{
          this.toast.showToast("Se produjo un error al eliminar","Aceptar")
          console.log(res);
        }
      }
      
    )
  }

}
