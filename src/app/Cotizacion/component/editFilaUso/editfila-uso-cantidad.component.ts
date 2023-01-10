import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';


@Component({
  selector: 'app-editfila-uso-cantidad',
  templateUrl: './editfila-uso-cantidad.component.html',
  styleUrls: ['./editfila-uso-cantidad.component.css']
})
export class EditfilaUsoCantidadComponent implements OnInit {
  public form!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private frm_builder: FormBuilder,
  private dialogRef: MatDialogRef<EditfilaUsoCantidadComponent>){ 
    //iniciar frm
    this.form = this.frm_builder.group({
      Cantidad: [data.Cantidad,[Validators.required,Validators.min(1)]],
      Precio:[data.Precio,[Validators.required,Validators.min(0)]],
      DescripUso:[data.DescripUso]
    });
  }

  ngOnInit(): void {
  }
   
  edit(form: any ) {
    console.log('dato capturado '+this.data.ARTICULO);
    console.log('Desc capturado '+form.DescripUso);
    let obj = {ARTICULO:this.data.ARTICULO,Cantidad:form.Cantidad,DescripUso:form.DescripUso,Precio:form.Precio}
    console.log(obj)
    this.dialogRef.close(obj);
  }
  Cerrarfrm(){
    this.dialogRef.close();
  }

}
