import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { Sp_Cotizacion_GetID } from 'src/app/models/Sp_Cotizacion_GetID';
import { ErrorService } from './error.service';
import { DICTIONARYKEYS } from '../utils/DICTIONARYKEYS';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class vnPrecios {  
  url = 'http://192.168.1.11:3000/API/VnPrecio/';  
  constructor(private http:HttpClient,private error:ErrorService) 
  {   }
  
  getArticulos():Observable<any[]>{     
    return this.http.get<any[]>(this.url+'/Articulos')
    .pipe(retry(1),catchError(this.error.handleError));
   }
   
  getArticulosPrecios():Observable<any[]>{     
   return this.http.get<any[]>(this.url+'/ArticulosPrecios')
   .pipe(retry(1),catchError(this.error.handleError));
  }

//{"Articulo":"PRD-SRV-00000003","id_cliente":"23","flagOperacion":"3"}  
   get_Cliente_precios(jsonCadena:any):Observable<any[]>{     
   return this.http.post<any>(this.url+'/ClientesPrecios',JSON.parse(jsonCadena))
   .pipe(retry(1),catchError(this.error.handleError));
  }
  
  //{"id_cliente":"23","Articulo":"PRD-SRV-00000003","Precio":"38.00"}  
  addJson_Cliente_Precio(jsonCadena:any):Observable<any[]>{     
    return this.http.post<any>(this.url+'/ServicioCliente',JSON.parse(jsonCadena))
    .pipe(retry(1),catchError(this.error.handleError));
   }

  addArticulosPrecios(pJson:any):Observable<any>{       
    return this.http.post<any>(this.url+'addPrecio/',JSON.stringify(pJson))
    .pipe(retry(1),catchError(this.error.handleError))   
  }

  edtArticulosPrecios(i:any):Observable<any>{    
    return this.http.put<number>
    (
      this.url, JSON.stringify(i)
    ).pipe(retry(1),catchError(this.error.handleError))   
  }
  getSp():Observable<any>{     
    return this.http.get<any>(this.url+'/spGet')
    .pipe(retry(1),catchError(this.error.handleError));
   }
}
