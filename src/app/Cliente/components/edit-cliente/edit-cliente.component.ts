import { Component, ElementRef, NgZone, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Departamento } from 'src/app/models/Departamento';
import { Municipio } from 'src/app/models/Municipio';
import { Pais } from 'src/app/models/Pais';
import { SP_Cliente_Get_W } from 'src/app/models/SP_Cliente_Get_W';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Toast } from 'src/app/utils/Toast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaisService } from 'src/app/services/pais.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { SubTipoCatalogo } from 'src/app/models/SubCatalogo';
import { SubCatalogoService } from 'src/app/services/subcatalogo.service';
import { SharedModule } from '../../../shared/Material.module';
@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css'],
})

export class EditClienteComponent {

  editar!: FormGroup
  //url = "http://localhost:3000/API"
  /**   Lista para los combo box  **/

  list_Cargo!: Pais[]
  list_Claustro!: Municipio[]
  list_Grado!: Departamento[]


  list_ContactoCliente!: any;
  cliente!: SP_Cliente_Get_W



  @ViewChild('selectcargo') select_Cargo!: ElementRef
  @ViewChild('slectclaustro') select_Claustro!: ElementRef
  @ViewChild('selectgradoacademico') select_GradoAcademico!: ElementRef


  @ViewChild('selectdepartamento_repL') select_departamento_repL!: ElementRef
  @ViewChild('selectpais_repP') select_pais_repP!: ElementRef
  @ViewChild('selectdepartamento_repP') select_departamento_repP!: ElementRef
  @ViewChild('edtmodal') edt_modal!: ElementRef;

  @ViewChild('cedula') cedula!: ElementRef

  toast: Toast

  public isParticular = true;


  constructor(private _builder: FormBuilder, private src: ClienteService, private srcPais: PaisService,
    private srcDepartamento: DepartamentoService,
    private srcMunicipio: MunicipioService, public ngZone: NgZone, public rt: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackbar: MatSnackBar,
    private srcSubCatalogo: SubCatalogoService, private dialogRef: MatDialogRef<EditClienteComponent>) {

    //console.log("RECIBIENDO DATA cliete  : " + this.data);
    this.toast = new Toast(_snackbar)
    this.iniciarForm();
    //this.getData();
  }

  iniciarForm() {
    this.editar = this._builder.group({
      Cod_Cargo: [0],
      Cod_Claustro: [0],
      Cod_GradoAcademico: [0],
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Telefono: ['', Validators.required],
      Email: ['', Validators.compose([Validators.email, Validators.required])],
      //IdUsuario  --pendiente de enviar      
    });
  }

  async getData() {

    this.src.getClienteEdit(this.data.id).subscribe((data: any) => {

      this.editar.controls['id_cliente'].setValue(data[0].id_cliente);
      this.editar.controls['nombre'].setValue(data[0].nombre_cliente);
      this.editar.controls['razon_social'].setValue(data[0].razon_social);
      this.editar.controls['direccion'].setValue(data[0].direccion_cliente);
      this.editar.controls['ruc'].setValue(data[0].ruc);
      this.editar.controls['correo'].setValue(data[0].correo_cliente);
      this.editar.controls['cedula'].setValue(data[0].cedula_cliente);
      this.editar.controls['id_tipo_cliente'].setValue(data[0].tipo_cliente);
      this.editar.controls['id_tipo_contribuyente'].setValue(data[0].tipo_contribuyente);
      this.editar.controls['telefono1'].setValue(data[0].telefono1_cliente);
      this.editar.controls['telefono2'].setValue(data[0].telefono2_cliente);
      this.editar.controls['telefono3'].setValue(data[0].telefono3_cliente);

      this.loadCargos(data[0].paisId);
      this.loadGrado(data[0].departamentoId); 
      this.loadClaustro(data[0].municipioId);      

    });

  }

  /*****METODOS INICIALES */
  async loadCargos(cargoId: number) {
    this.list_Cargo = [];

    const res = await this.srcPais.getPaises().toPromise();
    res.forEach(element => {
      let temp = new Pais(element.id, element.nombre);
      this.list_Cargo.push(temp);

    });
    this.editar.controls['paisId'].setValue(cargoId);
  }


  async loadClaustro(claustroId: number) {
    this.list_Claustro = [];
    
    const res = await this.srcMunicipio.getMunicipios(claustroId).toPromise();
    res.forEach(element => {
      let temp = new Municipio(element.id, element.nombre);
      
      this.list_Claustro.push(temp);      
    });
    
    this.editar.controls['municipioId'].setValue(claustroId);
  }

  async loadGrado(GradoId: number) {

    this.list_Grado = [];
    const res = await this.srcDepartamento.getDepartamentos(GradoId).toPromise();
    res.forEach(element => {
      let temp = new Departamento(element.id, element.nombre);
      this.list_Grado.push(temp);
    });

    this.editar.controls['departamentoId'].setValue(GradoId);
  }




  /*****METODOS LLAMADOS EN LOS EVENTOS CHANGE */

  setComboCargo(id: number) {
    this.list_Grado = [];    

    this.srcDepartamento.getDepartamentos(id).subscribe((data: any) => {
      data.forEach((element: any) => {
        let temp = new Departamento(element.id, element.nombre);
        
        this.list_Grado.push(temp);        
      });
        this.editar.controls['departamentoId'].setValue(this.list_Grado[0].id);
        this.setComboClaustro(1, this.list_Grado[0].id)
    });
  }


  setComboClaustro(type: number, id: number) {
    switch (type) {
      case 1: { this.list_Claustro = []; } break;

    }

    this.srcMunicipio.getMunicipios(id).subscribe((data: any) => {
      data.forEach((element: any) => {
        let temp = new Municipio(element.id, element.nombre);
        switch (type) {
          case 1: { this.list_Claustro.push(temp); } break;

        }
      });
      switch (type) {
        case 1: { this.editar.controls['municipioId'].setValue(this.list_Claustro[0].id); } break;

      }

    });
  }



  setComboGrado(id: number) {

    this.list_Grado = [];
    
    this.srcDepartamento.getDepartamentos(id).subscribe((data: any) => {
      data.forEach((element: any) => {
        let temp = new Departamento(element.id, element.nombre);        
        this.list_Grado.push(temp);        
      });
        this.editar.controls['departamentoId'].setValue(this.list_Grado[0].id);
        this.setComboClaustro(1, this.list_Grado[0].id)    
    });
  }

 


  /**** METODOS SUMIT DEL FORMULARIO  ***/

  enviar(values: any, formDirective: FormGroupDirective) {
    this.src.edtCliente(values).subscribe(res => {
      if (res) {
        this.toast.showToast('Registro actualizado correctamente ✔️', 'Aceptar');
      } else {
        this.toast.showToast('No se ha podido actualizar el registro', 'Aceptar');
      }
    });
    this.dialogRef.close();
    //this.editar.reset();
  }



}
