
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editfila-uso-campo',
  templateUrl: './editfila-Campo.component.html',
  styleUrls: ['./editfila-Campo.component.css']
})
export class EditafilaCampoComponent implements OnInit {
  public form!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private frm_builder: FormBuilder,
  private dialogRef: MatDialogRef<EditafilaCampoComponent>){ 
    //iniciar frm
    this.form = this.frm_builder.group({
      // Cantidad: [data.Cantidad,[Validators.required,Validators.min(1)]],
      // Precio:[data.Precio,[Validators.required,Validators.min(0)]],
      Descripcion:[data.Descripcion]
    });
  }

  ngOnInit(): void {
  }
   
  edit(form: any ) {     
    let obj = {CodMiembro:this.data.CodMiembro,Descripcion:form.Descripcion}    
    this.dialogRef.close(obj);
  }
  Cerrarfrm(){
    this.dialogRef.close();
  }

}
