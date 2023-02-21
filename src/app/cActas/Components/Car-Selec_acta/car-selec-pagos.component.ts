import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwIfEmpty } from 'rxjs/operators';
import { Factura } from 'src/app/services/Factura.service';
import { Toast } from 'src/app/utils/Toast';

@Component({
  selector: 'app-car-selec-pagos',
  templateUrl: './car-selec-pagos.component.html',
  styleUrls: ['./car-selec-pagos.component.css']
})
export class CarSelecPagosComponent implements OnInit {

  public list_formas_dePagos:any[]= [];
  public list_monedas:any[]= [];
  public list_bancos:any[]= [];
  public list_tipo_cuentas:any[]= []; 
  public list_tipo_retencion:any[]= [];

  public flag_formas_dePagos: boolean = true;
  public flag_monedas:boolean = false
  public flag_bancos:boolean = false;
  public flag_tipo_cuentas: boolean =false;
  public flag_tipo_retencion: boolean =false;
  public flag_nro_referencia: boolean =false;

  public frmSelecPagos!: FormGroup;
  public toast: Toast;
  
  constructor(
    private dialoRef: MatDialogRef<CarSelecPagosComponent>,
    private _builder: FormBuilder,
    private srcFactura: Factura,
    private _snackbar: MatSnackBar ) 
  { 
    this.toast = new Toast(this._snackbar);
     this.loadModules();
  }

  ngOnInit(): void {
      this.iniciarForm();
  }
//init formulario
iniciarForm() {
  this.frmSelecPagos = this._builder.group({
    idformaPagos: [], idMoneda: [], idBancos: [] ,idTipoCuentas:[], idTipoRetencion:[],idDocReferencia:[],idMonto:[]});
}
  //Load conbos
  async loadModules() {
    let filtro = '{"p":30}';
    this.list_formas_dePagos = await this.srcFactura.get_parametros_pagos(filtro).toPromise();    
    filtro = '{"p":19}';
    this.list_monedas =await this.srcFactura.get_parametros_pagos(filtro).toPromise();
    filtro = '{"p":33}';
    this.list_bancos =await this.srcFactura.get_parametros_pagos(filtro).toPromise();
    filtro = '{"p":34}';
    this.list_tipo_cuentas =await this.srcFactura.get_parametros_pagos(filtro).toPromise();
    filtro = '{"p":36}';
    this.list_tipo_retencion =await this.srcFactura.get_parametros_pagos(filtro).toPromise();
  }

  tipos_pagos_click(id:any){
    
    console.log(id);

    if(id === 169){ //169 para Efectivo
      
      this.flag_monedas = true;
      this.flag_bancos = false;
      this.flag_tipo_cuentas =false;
      this.flag_tipo_retencion =false;
      this.flag_nro_referencia =false;
      
    }else if(id === 170 || id ===171 || id === 172 || id === 173 ){ //170 : CHeque
      this.flag_monedas = true;
      this.flag_bancos = true;
      this.flag_tipo_cuentas =true;
      this.flag_tipo_retencion =false;
      this.flag_nro_referencia =true;             
    }else if(id === 174){  //174 : notas de creditos 
      this.flag_monedas = true;
      this.flag_bancos = false;
      this.flag_tipo_cuentas =false;
      this.flag_tipo_retencion =false;
      this.flag_nro_referencia =true;       
    }else if (id === 175){//175: Retenciones  || 
      this.flag_monedas = true;
      this.flag_bancos = false;
      this.flag_tipo_cuentas =false;
      this.flag_tipo_retencion =true;
      this.flag_nro_referencia =true;       
    }

  }

  
  enviar_formaPago_click(frm_value:any){

        if(frm_value.idformaPagos === null){
          this.toast.showToast("SELECCIONE LA FORMA DE PAGO  ❗ ❗ ❗ ", "Aceptar");
        }else{
        
        let  formas_dePagos,monedas,bancos,cuentas,retencion;

        if(frm_value.idformaPagos !== null){formas_dePagos = this.list_formas_dePagos.find((x:any) => x.id === frm_value.idformaPagos).Descripcion;}
        if(frm_value.idMoneda !== null){ monedas =this.list_monedas.find((x:any) => x.id === frm_value.idMoneda).Descripcion;}
        if(frm_value.idBancos !== null){bancos = this.list_bancos.find((x:any) => x.id === frm_value.idBancos).Descripcion;}
        if(frm_value.idTipoCuentas !== null){cuentas =  this.list_tipo_cuentas.find((x:any) => x.id === frm_value.idTipoCuentas).Descripcion;}
        if(frm_value.idTipoRetencion !== null){retencion =  this.list_tipo_retencion.find((x:any) => x.id === frm_value.idTipoRetencion).Descripcion;}
            
        const json_enviar = {
          idformaPago:frm_value.idformaPagos,Metodo:formas_dePagos,
          idMoneda:frm_value.idMoneda,Moneda:monedas,
          idBanco:frm_value.idBancos,Banco:bancos,
          idTipoCuenta:frm_value.idTipoCuentas,Cuenta:cuentas,
          idTipoRetencion:frm_value.idTipoRetencion,TipoRetencion:retencion,
          NroReferencia:frm_value.idDocReferencia,
          Monto:frm_value.idMonto
        }
        
        this.dialoRef.close(json_enviar);
      }
      
    }
        
    
  }
  
