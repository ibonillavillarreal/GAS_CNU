import { Component, ElementRef, NgZone, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/models/Departamento';
import { Municipio } from 'src/app/models/Municipio';
import { Pais } from 'src/app/models/Pais';
import { SP_Persona_Get } from 'src/app/models/SP_Cliente_Get_W';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Toast } from 'src/app/utils/Toast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CargoService } from 'src/app/services/pais.service';
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

  list_Cargo!: Cargo[]
  list_Claustro!: Municipio[]
  list_Grado!: Cargo[]


  list_ContactoCliente!: any;
  cliente!: SP_Persona_Get



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


  constructor(private _builder: FormBuilder, private src: ClienteService, private src_Cargo: CargoService,
    private srcDepartamento: DepartamentoService,
    private srcMunicipio: MunicipioService, public ngZone: NgZone, public rt: Router,
    @Inject(MAT_DIALOG_DATA) public data: any, private _snackbar: MatSnackBar,
    private srcSubCatalogo: SubCatalogoService, private dialogRef: MatDialogRef<EditClienteComponent>) {

    //console.log("RECIBIENDO DATA cliete  : " + this.data);
    this.toast = new Toast(_snackbar)
    this.iniciarForm();
    this.getData();
  }

  iniciarForm() {
    this.editar = this._builder.group({
      CodMiembro: [0],
      CodCargo: [0],
      CodClaustro: [0],
      CodGradoAcademico: [0],
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Telefono: [, Validators.required],
      Email: ['', Validators.compose([Validators.email, Validators.required])],
      
    });
  }

  async getData() {

    this.src.getPersonaEdit(this.data.id).subscribe((data: any) => {

      console.log('retorno observable '+JSON.stringify(data[0]))

      this.editar.controls['CodMiembro'].setValue(data[0].CodMiembro);
      this.editar.controls['CodCargo'].setValue(data[0].Cod_Cargo);
      this.editar.controls['CodClaustro'].setValue(data[0].Cod_Claustro);
      this.editar.controls['CodGradoAcademico'].setValue(data[0].Cod_GradoAcademico);
      this.editar.controls['Nombres'].setValue(data[0].Nombres);
      this.editar.controls['Apellidos'].setValue(data[0].Apellidos);
      this.editar.controls['Telefono'].setValue(data[0].Telefono);
      this.editar.controls['Email'].setValue(data[0].Email);
      

      this.loadCargos(data[0].Cod_Cargo);
      this.loadGrado(data[0].Cod_GradoAcademico); 
      //this.loadClaustro(data[0].municipioId);      

    });

  }

  /*****METODOS INICIALES */
  async loadCargos(cargoId: number) {
    this.list_Cargo = [];

    const res = await this.src_Cargo.getCargo().toPromise();
    res.forEach(element => {
      let temp = new Cargo(element.id, element.nombre);
      this.list_Cargo.push(temp);

    });
    this.editar.controls['CodCargo'].setValue(cargoId);
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
    const res = await this.srcDepartamento.getComboCargo(GradoId).toPromise();
    res.forEach(element => {
      let temp = new Cargo(element.id, element.nombre);
      this.list_Grado.push(temp);
    });

    this.editar.controls['departamentoId'].setValue(GradoId);
  }




  /*****METODOS LLAMADOS EN LOS EVENTOS CHANGE */

  setComboCargo(id: number) {
        this.editar.controls['CodCargo'].setValue(id);        
  }


  setComboClaustro(id: number) {
    this.list_Claustro = [];    

    this.srcMunicipio.getMunicipios(id).subscribe((data: any) => {
      data.forEach((element: any) => {
        let temp = new Municipio(element.id, element.nombre);
        this.list_Claustro.push(temp);        
      });
      this.editar.controls['municipioId'].setValue(this.list_Claustro[0].id);       
    });
  }


  setComboGrado(id: number) {

    this.list_Grado = [];
    
    this.srcDepartamento.getComboCargo(id).subscribe((data: any) => {
      data.forEach((element: any) => {
        let temp = new Cargo(element.id, element.nombre);        
        this.list_Grado.push(temp);        
      });
        this.editar.controls['departamentoId'].setValue(this.list_Grado[0].id);        
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
