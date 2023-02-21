import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/////////////
@Component({
  selector: 'app-editar-cantidad',
  templateUrl: './editar-cantidad.component.html',
  styleUrls: ['./editar-cantidad.component.css']
})
export class EditarCantidadComponent implements OnInit {
  public form!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private frm_builder: FormBuilder,
  private dialogRef: MatDialogRef<EditarCantidadComponent>){ 
    //iniciar frm
    this.form = this.frm_builder.group({
      Cantidad: [data.Cantidad,[Validators.required,Validators.min(1)]],
      Precio:[data.Precio,[Validators.required,Validators.min(0)]],
      DescripUso:[data.DescripUso]
    });
  }

  ngOnInit(): void {
  }
//////

edit(form: any ) {  
  let obj = {ARTICULO:this.data.ARTICULO,Cantidad:form.Cantidad}  
  this.dialogRef.close(obj);
}

Cerrarfrm(){
  this.dialogRef.close();
}

//////
}
