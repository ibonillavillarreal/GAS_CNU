import { Component, OnInit, NgZone, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Pais } from 'src/app/models/Pais';
import { Cargo } from 'src/app/models/Departamento';
import { SP_Cliente_Add } from 'src/app/models/SP_Cliente_Add';
import { SP_ClienteAgente_Add } from 'src/app/models/SP_ClienteAgente_Add';
import { Municipio } from 'src/app/models/Municipio';
import { Toast } from 'src/app/utils/Toast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MunicipioService } from 'src/app/services/municipio.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { CargoService } from 'src/app/services/pais.service';
import { ClienteA } from 'src/app/models/ClienteA';
import { SubTipoCatalogo } from 'src/app/models/SubCatalogo';
import { SubCatalogoService } from 'src/app/services/subcatalogo.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.css']
})
export class AddClienteComponent implements OnInit {
  /***CAMPOS***/
  registrar: FormGroup

  url = "http://localhost:3000/api/Cliente"

  @Output() salida = new EventEmitter();
  /**LISTAS COMBO BOX**/
  list_paises!: Pais[]
  list_municipio!: Municipio[]
  list_departamento!: Cargo[]

  list_paises_repL!: Pais[]
  list_paises_repP!: Pais[]

  list_departamento_repL!: Cargo[]
  list_departamento_repP!: Cargo[]

  list_municipio_repL!: Municipio[]
  list_municipio_repP!: Municipio[]

  toast: Toast

  list_tipos_cliente!: SubTipoCatalogo[];
  list_contribuyentes!: SubTipoCatalogo[];

  public isParticular = true;
  constructor(private _builder: FormBuilder, private src: ClienteService, private scrMunicipio: MunicipioService,
    private srcDepartamento: DepartamentoService, private srcPais: CargoService, private _snackBar: MatSnackBar,
    public ngZone: NgZone, public rt: Router, private srcSubCatalogo: SubCatalogoService, private dialogRef: MatDialogRef<AddClienteComponent>) {

    this.toast = new Toast(_snackBar)
    this.registrar = this._builder.group({
      /******CLIENTE******/
      id_cliente: [0],
      codigo: ['0000'],
      nombre: ['', Validators.required],
      razon_social: ['', Validators.required],
      ruc: ['', Validators.required],
      direccion: ['', Validators.required],
      cedula: [''],
      CondicionPagoPlazo: [0,Validators.required],
      correo: ['', Validators.compose([Validators.email, Validators.required])],
      id_tipo_cliente: ['', Validators.required],
      id_tipo_contribuyente: ['', Validators.required],
      paisId: ['', Validators.required],
      departamentoId: ['', Validators.required],
      municipioId: ['', Validators.required],
      telefono1: ['', Validators.required],
      telefono2: [''],
      telefono3: [''],

      //RESPONSABLE DE LEGAL
      nombre_rep_legal: ['',Validators.required],
      apellido_rep_legal: ['',Validators.required],
      cedula_rep_legal: ['',Validators.required],
      municipioId_rep_legal: ['',Validators.required],
      departamentoId_rep_legal: ['',Validators.required],
      paisId_rep_legal: ['',Validators.required],
      direccion_rep_legal: ['',Validators.required],
      correo_rep_legal: ['', Validators.compose([Validators.email, Validators.required])],
      telefono1_rep_legal: ['',Validators.required],
      telefono2_rep_legal: [''],

      //REPRESENTANTE PAGOS
      nombre_rep_pago: ['',Validators.required],
      apellido_rep_pago: ['',Validators.required],
      cedula_rep_pago: ['',Validators.required],
      municipioId_rep_pago: ['',Validators.required],
      departamentoId_rep_pago: ['',Validators.required],
      paisId_rep_pago: ['',Validators.required],
      direccion_rep_pago: ['',Validators.required],
      correo_rep_pago: ['', Validators.compose([Validators.email, Validators.required])],
      telefono1_rep_pago: ['',Validators.required],
      telefono2_rep_pago: [''],
    });

    this.loadInfo();
    this.setListTiposCliente();
    this.setListContribuyentes();
  }

  ngOnInit(): void {
  }
  /***METODOS**/
  loadInfo() {
    this.list_paises = [];
    this.list_paises_repL = [];
    this.list_paises_repP = [];

    this.srcPais.getCargo().subscribe((data: any) => {
      data.forEach((element: any) => {
        let temp = new Pais(element.id, element.nombre);
        this.list_paises.push(temp);
        this.list_paises_repL.push(temp);
        this.list_paises_repP.push(temp);
      });

      this.registrar.controls['paisId'].setValue(this.list_paises[0].id);
      this.registrar.controls['paisId_rep_legal'].setValue(this.list_paises[0].id);
      this.registrar.controls['paisId_rep_pago'].setValue(this.list_paises[0].id);
      this.setDepartamentos(this.list_paises[0].id);
    });

  }


  setDepartamentos(id: number) {
    this.list_departamento = [];
    this.list_departamento_repL = [];
    this.list_departamento_repP = [];

    this.srcDepartamento.getComboCargo(id).subscribe((data: any) => {
      data.forEach((element: any) => {
        // list.push(element.Id);
        let temp = new Cargo(element.id, element.nombre);
        this.list_departamento.push(temp);
        this.list_departamento_repL.push(temp);
        this.list_departamento_repP.push(temp);
      });
      this.registrar.controls['departamentoId'].setValue(this.list_departamento[0].id);
      this.registrar.controls['departamentoId_rep_legal'].setValue(this.list_departamento_repL[0].id);
      this.registrar.controls['departamentoId_rep_pago'].setValue(this.list_departamento_repP[0].id);
      this.setMunicipios(this.list_departamento[0].id)
    });
  }


  setDepartamentosList(type: number, id: number) {

    switch (type) {
      case 1: { this.list_departamento = []; } break;
      case 2: { this.list_departamento_repL = []; } break;
      case 3: { this.list_departamento_repP = []; } break;
    }

    this.srcDepartamento.getComboCargo(id).subscribe((data: any) => {
      data.forEach((element: any) => {
        let temp = new Cargo(element.id, element.nombre);
        switch (type) {
          case 1: { this.list_departamento.push(temp); } break;
          case 2: { this.list_departamento_repL.push(temp); } break;
          case 3: { this.list_departamento_repP.push(temp); } break;
        }
      });
      switch (type) {
        case 1: { this.registrar.controls['departamentoId'].setValue(this.list_departamento[0].id); this.setMunicipiosList(1, this.list_departamento[0].id) } break;
        case 2: { this.registrar.controls['departamentoId_rep_legal'].setValue(this.list_departamento_repL[0].id); this.setMunicipiosList(2, this.list_departamento_repL[0].id) } break;
        case 3: { this.registrar.controls['departamentoId_rep_pago'].setValue(this.list_departamento_repP[0].id); this.setMunicipiosList(3, this.list_departamento_repP[0].id) } break;
      }
    });
  }


  setMunicipiosList(type: number, id: number) {
    switch (type) {
      case 1: { this.list_municipio = []; } break;
      case 2: { this.list_municipio_repL = []; } break;
      case 3: { this.list_municipio_repP = []; } break;
    }
    this.scrMunicipio.getMunicipios(id).subscribe((data: any) => {
      data.forEach((element: any) => {
        let temp = new Municipio(element.id, element.nombre);
        switch (type) {
          case 1: { this.list_municipio.push(temp); } break;
          case 2: { this.list_municipio_repL.push(temp); } break;
          case 3: { this.list_municipio_repP.push(temp); } break;
        }
      });
      switch (type) {
        case 1: { this.registrar.controls['municipioId'].setValue(this.list_municipio[0].id); } break;
        case 2: { this.registrar.controls['municipioId_rep_legal'].setValue(this.list_municipio_repL[0].id); } break;
        case 3: { this.registrar.controls['municipioId_rep_pago'].setValue(this.list_municipio_repP[0].id); } break;
      }

    });
  }

  setMunicipios(id: number) {

    this.list_municipio = [];
    this.list_municipio_repL = [];
    this.list_municipio_repP = [];

    this.scrMunicipio.getMunicipios(id).subscribe((data: any) => {
      data.forEach((element: any) => {
        let temp = new Municipio(element.id, element.nombre);
        this.list_municipio.push(temp);
        this.list_municipio_repL.push(temp);
        this.list_municipio_repP.push(temp);
      });

      this.registrar.controls['municipioId'].setValue(this.list_municipio[0].id);
      this.registrar.controls['municipioId_rep_legal'].setValue(this.list_municipio[0].id);
      this.registrar.controls['municipioId_rep_pago'].setValue(this.list_municipio[0].id);
    });
  }
  setParticular(id: number) {
    if (id === 7) {
      this.isParticular = true;
      console.log("ES PARTICULAR")
    } else {
      this.isParticular = false;
      this.registrar.controls['cedula'].setValue('');
      console.log("NO ES PARTICULAR")
    }
  }

  async setListTiposCliente() {
    let tipos_cliente = await this.srcSubCatalogo.getTiposCliente().toPromise();
    this.list_tipos_cliente = tipos_cliente;
  }
  async setListContribuyentes() {
    let contribuyentes = await this.srcSubCatalogo.getContribuyentesCliente().toPromise();
    this.list_contribuyentes = contribuyentes;
  }
  evento(value: number) {
    console.log(value)
  }

  enviar(values: any, formDirective: FormGroupDirective) {

    this.src.addCliente(values).subscribe(res => {      
      if (res) {
        this.toast.showToast('Registro realizado correctamente', 'Aceptar')
      } else {
        this.toast.showToast('Ha ocurrido un error', 'Aceptar')

      }
    })
    this.registrar.reset();
    formDirective.resetForm();
    this.dialogRef.close();
  }
}
