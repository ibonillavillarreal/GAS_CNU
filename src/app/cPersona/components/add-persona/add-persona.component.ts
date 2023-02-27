import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/services/cliente.service';
import { Cargo } from 'src/app/models/Pais';
import { Claustro } from 'src/app/models/Claustro';
import { Toast } from 'src/app/utils/Toast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClaustroService } from 'src/app/services/municipio.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { CargoService } from 'src/app/services/Cargo.service';
import { SubCatalogoService } from 'src/app/services/subcatalogo.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Grado } from 'src/app/models/Grado';
@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-persona.component.html',
  styleUrls: ['./add-persona.component.css']
})
export class AddClienteComponent implements OnInit {

  /***CAMPOS***/
  registrar: FormGroup

  @Output() salida = new EventEmitter();

  /**LISTAS COMBO BOX**/

  toast: Toast

  list_Cargo!: Cargo[]
  list_Claustro!: Claustro[]
  list_Grado!: Cargo[]

  constructor(private _builder: FormBuilder, private src: PersonaService,
    private _snackBar: MatSnackBar, public ngZone: NgZone,
    public rt: Router, private src_Cargo: CargoService,
    private dialogRef: MatDialogRef<AddClienteComponent>
  ) {

    this.toast = new Toast(_snackBar)

    this.registrar = this._builder.group({
      CodMiembro: [0],
      CodCargo: [0],
      CodClaustro: [0],
      CodGradoAcademico: [0],
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Telefono: [, Validators.required],
      Email: ['', Validators.compose([Validators.email, Validators.required])],
    });

    this.loadCargos();
    this.loadClaustro();
    this.loadGrado();

  }
  ngOnInit(): void {
  }


  /*****METODOS de Cargas Iniciales */
  async loadCargos() {
    this.list_Cargo = [] ;
    const res = await this.src_Cargo.getCargo().toPromise();
    res.forEach(element => {
      let temp = new Cargo(element.id, element.nombre);
      this.list_Cargo.push(temp);

    });
    this.registrar.controls['CodCargo'].setValue(this.list_Cargo[0].id);
  }

  async loadClaustro() {
    this.list_Claustro = [];

    const res = await this.src_Cargo.getClaustro().toPromise();
    res.forEach(element => {
      let temp = new Claustro(element.id, element.nombre);

      this.list_Claustro.push(temp);
    });

    this.registrar.controls['CodClaustro'].setValue(this.list_Claustro[0].id);
  }

  async loadGrado() {
    this.list_Grado = [];

    const res = await this.src_Cargo.getGrado().toPromise();
    res.forEach(element => {
      let temp = new Grado(element.id, element.nombre);
      this.list_Grado.push(temp);
    });

    this.registrar.controls['CodGradoAcademico'].setValue(this.list_Grado[0].id);
  }


  /*****METODOS LLAMADOS EN LOS EVENTOS CHANGE */
  setComboCargo(id: number) {
    this.registrar.controls['CodCargo'].setValue(id);
  }


  setComboClaustro(claustroId: number) {
    this.registrar.controls['CodClaustro'].setValue(claustroId);
  }


  setComboGrado(GradoId: number) {
    this.registrar.controls['CodGradoAcademico'].setValue(GradoId);
  }

  evento(value: number) {
    console.log(value)
  }

  // Gaurdar el Registro   
  enviar(values: any, formDirective: FormGroupDirective) {

    let IdUsuario: number = 1
    values.IdUsuario = IdUsuario

    this.src.addPersona(values).subscribe(res => {

      if (res) {
        this.toast.showToast('Registro Guardado correctamente ✔️ ', 'Aceptar')
      } else {
        this.toast.showToast('Ha ocurrido un error ❌', 'Aceptar')
      }
    })

    this.registrar.reset();
    formDirective.resetForm();
    this.dialogRef.close();
  }

}
