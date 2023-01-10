import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { Sp_Cotizacion_GetID } from 'src/app/models/Sp_Cotizacion_GetID';
import { ErrorService } from './error.service';
import { DICTIONARYKEYS } from '../utils/DICTIONARYKEYS';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Factura {  

  url_local = new DICTIONARYKEYS().url+'/API';
  url = 'http://192.168.1.11:3000/API/Factura/';  
  

  constructor(private http:HttpClient,private error:ErrorService) 
  {   }

  @Output() addFacturaTerminada:EventEmitter <any> = new EventEmitter();

  gettasaKambio(Json_Fecha:any):Observable<any>{     
    return this.http.post<any>(this.url_local+'/Factura/tasaKambio',JSON.parse(Json_Fecha))
    .pipe(retry(1),catchError(this.error.handleError));
   }
 
  
  getTipoFacturacion():Observable<any[]>{     
    return this.http.get<any[]>(this.url_local+'/Factura/getTipoFacturacion')
    .pipe(retry(1),catchError(this.error.handleError));
   }
 
  
  getFacturaListado():Observable<any[]>{     
   return this.http.get<any[]>(this.url_local+'/Factura/getFacturaListado')
   .pipe(retry(1),catchError(this.error.handleError));
  }

  // FACTURA  COMPLETA Y SUS FORMAS DE PAGO
  Add_Json_Factura(jsonCadena:any):Observable<any[]>{        
    return this.http.post<any>(this.url_local+'/Factura/addJsonFactura',JSON.stringify(jsonCadena)) 
    .pipe(retry(1),catchError(this.error.handleError));
   }

  //-- json={Cliente:'39',idCOT:'2285',Oper:'6'}
  add_Json_FacturaItems(jsonCadena:any):Observable<any[]>{     
  return this.http.post<any>(this.url_local+'/Factura/add_Json_FacturaItems',JSON.parse(jsonCadena))
  .pipe(retry(1),catchError(this.error.handleError));
 }
  
 //-- json={p:'30'}
 get_parametros_pagos(jsonCadena:any):Observable<any[]>{     
  return this.http.post<any>(this.url_local+'/Factura/get_parametros',JSON.parse(jsonCadena))
  .pipe(retry(1),catchError(this.error.handleError));
 }
 
 seguir_Tracking(id_factura:any ):Observable<any>{
  return this.http.get<any>(this.url+'/ordenTracking/'+JSON.stringify(id_factura)).
      pipe(retry(1), catchError(this.error.handleError));
}

 pasar_TrackingUpdate(obj_facturaUsuario:any): Observable<any>{  
  return this.http.post<any>(this.url+'ordenTrackingUpdate/',JSON.stringify(obj_facturaUsuario))
  .pipe(retry(1), catchError(this.error.handleError));
}

estacion_rastreo(numero_factura:any ):Observable<any>{
  return this.http.get<any>(this.url+'/estacionrastreo/'+numero_factura).
      pipe(retry(1), catchError(this.error.handleError));
}

}
