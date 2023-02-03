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
  /** COMBO BOX**/
  list_paises!: Pais[]
  list_municipio!: Municipio[]
  list_departamento!: Departamento[]

  list_paises_repL!: Pais[]
  list_paises_repP!: Pais[]

  list_departamento_repL!: Departamento[]
  list_departamento_repP!: Departamento[]

  list_municipio_repL!: Municipio[]
  list_municipio_repP!: Municipio[]

  list_ContactoCliente!: any;
  cliente!: SP_Cliente_Get_W

  list_tipos_cliente!: SubTipoCatalogo[];
  list_contribuyentes!: SubTipoCatalogo[];
  
  @ViewChild('selectpais') select_pais!: ElementRef
  @ViewChild('selectdepartamento') select_departamento!: ElementRef

  @ViewChild('selectpais_repL') select_pais_repL!: ElementRef
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
    private srcSubCatalogo:SubCatalogoService,private dialogRef: MatDialogRef<EditClienteComponent>) {

    //console.log("RECIBIENDO DATA cliete  : " + this.data);
    this.toast = new Toast(_snackbar)
    this.iniciarForm();  
    //this.getData();
  }

  iniciarForm() {
    this.editar = this._builder.group({
      /******CLIENTE******/
      id_cliente: [0],
      nombre: ['', Validators.required],
      razon_social: ['', Validators.required],
      ruc: ['', Validators.required],
      direccion: ['', Validators.required],
      cedula: [''],
      correo: ['', Validators.compose([Validators.email, Validators.required])],
      id_tipo_cliente: ['', Validators.required],
      id_tipo_contribuyente: ['', Validators.required],
      paisId: ['', Validators.required],
      departamentoId: ['', Validators.required],
      municipioId: ['', Validators.required],
      telefono1: ['', Validators.required],
      telefono2: [''],
      telefono3: [''],
      CondicionPagoPlazo: [0],

      //RESPONSABLE DE LEGAL
      id_rep_legal: [0],
      nombre_rep_legal: [''],
      apellido_rep_legal: [''],
      cedula_rep_legal: [''],
      municipioId_rep_legal: [''],
      departamentoId_rep_legal: [''],
      paisId_rep_legal: [''],
      direccion_rep_legal: [''],
      correo_rep_legal: ['', Validators.compose([Validators.email, Validators.required])],
      telefono1_rep_legal: [''],
      telefono2_rep_legal: [''],

      //REPRESENTANTE PAGOS
      id_rep_pago:[''],
      nombre_rep_pago: [''],
      apellido_rep_pago: [''],
      cedula_rep_pago: [''],
      municipioId_rep_pago: [''],
      departamentoId_rep_pago: [''],
      paisId_rep_pago: [''],
      direccion_rep_pago: [''],
      correo_rep_pago: ['', Validators.compose([Validators.email, Validators.required])],
      telefono1_rep_pago: [''],
      telefono2_rep_pago: [''],
    });
  }

  async getData() {
    
    this.setListTiposCliente();
    this.setListContribuyentes();

 
    this.src.getClienteEdit(this.data.id).subscribe((data: any) => {      
      /*Generales*/
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
      
      /*Responsable de pagos*/
      this.editar.controls['id_rep_pago'].setValue(data[1].ContactoId);
      this.editar.controls['nombre_rep_pago'].setValue(data[1].nombres);
      this.editar.controls['apellido_rep_pago'].setValue(data[1].apellidos);
      this.editar.controls['cedula_rep_pago'].setValue(data[1].cedula);
      this.editar.controls['direccion_rep_pago'].setValue(data[1].direccion);
      this.editar.controls['correo_rep_pago'].setValue(data[1].correo);            
      this.editar.controls['telefono1_rep_pago'].setValue(data[1].telefono1);
      this.editar.controls['telefono2_rep_pago'].setValue(data[1].telefono2);
      
      /*Representante legal*/
      this.editar.controls['id_rep_legal'].setValue(data[0].ContactoId);
      this.editar.controls['nombre_rep_legal'].setValue(data[0].nombres);
      this.editar.controls['apellido_rep_legal'].setValue(data[0].apellidos);
      this.editar.controls['cedula_rep_legal'].setValue(data[0].cedula);
      this.editar.controls['direccion_rep_legal'].setValue(data[0].direccion);
      this.editar.controls['correo_rep_legal'].setValue(data[0].correo);
      

      this.editar.controls['telefono1_rep_legal'].setValue(data[0].telefono1);
      this.editar.controls['telefono2_rep_legal'].setValue(data[0].telefono2);      
      this.editar.controls['CondicionPagoPlazo'].setValue(data[0].CondicionPagoPlazo);
      
      

      this.loadPaises(data[0].paisId, data[0].paisCon, data[1].paisCon);

      this.loadDepartamentos(data[0].paisId, data[0].departamentoId, 1);
      this.loadDepartamentos(data[0].paisCon, data[0].departamentoCon, 2);
      this.loadDepartamentos(data[1].paisCon, data[1].departamentoCon, 3);

      this.loadMunicipios(data[0].departamentoId, data[0].municipioId, 1);
      this.loadMunicipios(data[0].departamentoCon, data[0].municipioCon, 2);
      this.loadMunicipios(data[1].departamentoCon, data[1].municipioCon, 3);

    });
    
  }

  /*****METODOS INICIALES */
  async loadPaises(paisId: number, pais_repL: number, pais_repP: number) {
    this.list_paises = [];
    this.list_paises_repL = [];
    this.list_paises_repP = [];

    const res = await this.srcPais.getPaises().toPromise();
    res.forEach(element => {
      let temp = new Pais(element.id, element.nombre);
      this.list_paises.push(temp);
      this.list_paises_repL.push(temp);
      this.list_paises_repP.push(temp);
    });

    
    this.editar.controls['paisId'].setValue(paisId);
    this.editar.controls['paisId_rep_legal'].setValue(pais_repL);
    this.editar.controls['paisId_rep_pago'].setValue(pais_repP);

  }

  async loadDepartamentos(paisId: number, departamentoId: number, type: number) {
    switch (type) {
      case 1: { this.list_departamento = []; } break;
      case 2: { this.list_departamento_repL = []; } break;
      case 3: { this.list_departamento_repP = []; } break;
    }
    const res = await this.srcDepartamento.getDepartamentos(paisId).toPromise();
    res.forEach(element => {
      let temp = new Departamento(element.id, element.nombre);
      switch (type) {
        case 1: { this.list_departamento.push(temp); } break;
        case 2: { this.list_departamento_repL.push(temp); } break;
        case 3: { this.list_departamento_repP.push(temp); } break;
      }
    });
    switch (type) {
      case 1: { this.editar.controls['departamentoId'].setValue(departamentoId); } break;
      case 2: { this.editar.controls['departamentoId_rep_legal'].setValue(departamentoId); } break;
      case 3: { this.editar.controls['departamentoId_rep_pago'].setValue(departamentoId); } break;
    }
  }

  async loadMunicipios(departamentoId: number, municipioId: number, type: number) {
    switch (type) {
      case 1: { this.list_municipio = []; } break;
      case 2: { this.list_municipio_repL = []; } break;
      case 3: { this.list_municipio_repP = []; } break;
    }
    const res = await this.srcMunicipio.getMunicipios(departamentoId).toPromise();
    res.forEach(element => {
      let temp = new Municipio(element.id, element.nombre);
      switch (type) {
        case 1: { this.list_municipio.push(temp); } break;
        case 2: { this.list_municipio_repL.push(temp); } break;
        case 3: { this.list_municipio_repP.push(temp); } break;
      }
    });
    switch (type) {
      case 1: { this.editar.controls['municipioId'].setValue(municipioId); } break;
      case 2: { this.editar.controls['municipioId_rep_legal'].setValue(municipioId); } break;
      case 3: { this.editar.controls['municipioId_rep_pago'].setValue(municipioId); } break;
    }
  }

  /*****METODOS LLAMADOS EN LOS EVENTOS CHANGE */
  setDepartamentosList(type: number, id: number) {
    switch (type) {
      case 1: { this.list_departamento = []; } break;
      case 2: { this.list_departamento_repL = []; } break;
      case 3: { this.list_departamento_repP = []; } break;
    }
    this.srcDepartamento.getDepartamentos(id).subscribe((data: any) => {
      data.forEach((element: any) => {
        let temp = new Departamento(element.id, element.nombre);
        switch (type) {
          case 1: { this.list_departamento.push(temp); } break;
          case 2: { this.list_departamento_repL.push(temp); } break;
          case 3: { this.list_departamento_repP.push(temp); } break;
        }
      });
      switch (type) {
        case 1: { this.editar.controls['departamentoId'].setValue(this.list_departamento[0].id); this.setMunicipiosList(1, this.list_departamento[0].id) } break;
        case 2: { this.editar.controls['departamentoId_rep_legal'].setValue(this.list_departamento_repL[0].id); this.setMunicipiosList(2, this.list_departamento_repL[0].id) } break;
        case 3: { this.editar.controls['departamentoId_rep_pago'].setValue(this.list_departamento_repP[0].id); this.setMunicipiosList(3, this.list_departamento_repP[0].id) } break;
      }
    });
  }

  setMunicipiosList(type: number, id: number) {
    switch (type) {
      case 1: { this.list_municipio = []; } break;
      case 2: { this.list_municipio_repL = []; } break;
      case 3: { this.list_municipio_repP = []; } break;
    }

    this.srcMunicipio.getMunicipios(id).subscribe((data: any) => {
      data.forEach((element: any) => {
        let temp = new Municipio(element.id, element.nombre);
        switch (type) {
          case 1: { this.list_municipio.push(temp); } break;
          case 2: { this.list_municipio_repL.push(temp); } break;
          case 3: { this.list_municipio_repP.push(temp); } break;
        }
      });
      switch (type) {
        case 1: { this.editar.controls['municipioId'].setValue(this.list_municipio[0].id); } break;
        case 2: { this.editar.controls['municipioId_rep_legal'].setValue(this.list_municipio_repL[0].id); } break;
        case 3: { this.editar.controls['municipioId_rep_pago'].setValue(this.list_municipio_repP[0].id); } break;
      }

    });
  }



  setParticular(id: number) {
    if (id === 7) {
      this.isParticular = true;
      console.log("ES PARTICULAR")
    } else {
      this.isParticular = false;
      this.editar.controls['cedula'].setValue('');
      console.log("NO ES PARTICULAR")
    }
  }

  async setListTiposCliente() {   
    let tipos_cliente = await this.srcSubCatalogo.getTiposCliente().toPromise();
    this.list_tipos_cliente = tipos_cliente;
  }
  async setListContribuyentes() {

    let contribuyentes = await this.srcSubCatalogo.getContribuyentesCliente().toPromise();
    console.log('Daetos tipo de clientes '+JSON.stringify(contribuyentes));
    this.list_contribuyentes = contribuyentes;
  }
  

  
  enviar(values: any, formDirective: FormGroupDirective) {
    this.src.edtCliente(values).subscribe(res => {
      // this.ngZone.run(() => this.rt.navigateByUrl(this.url+'/edtCliente'))
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
