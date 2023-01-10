import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteA } from 'src/app/models/ClienteA';
import { SP_ClienteAgente_Add } from 'src/app/models/SP_ClienteAgente_Add';


import { retry, catchError } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { SP_Cliente_Get_W } from 'src/app/models/SP_Cliente_Get_W';
import { ErrorService } from './error.service';
import { DICTIONARYKEYS } from '../utils/DICTIONARYKEYS';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  //url = "http://192.168.1.180:4700/API/Cliente/"
  //url = "http://192.168.1.180:3000/api/cliente/"
  urlagente = "http://192.168.1.17:3000/api/cliente/agente";
  
  url = new DICTIONARYKEYS().url+'/api/cliente/';
  constructor(private http:HttpClient,private error:ErrorService) { }
  //get
  getClientes():Observable<Cliente[]>{               
    return this.http.get<Cliente[]>(this.url).
    pipe(retry(1),catchError(this.error.handleError));
  }

  addCliente(cliente:any):Observable<any>{
    return this.http.post<any>(this.url,JSON.stringify(cliente))
    .pipe(retry(1),catchError(this.error.handleError))   
  }

  edtCliente(i:any):Observable<any>{
    
    return this.http.put<number>
    (
      this.url, JSON.stringify(i)
    ).pipe(retry(1),catchError(this.error.handleError))   
  }
  
  getCliente(i:number):Observable<any>{
    return this.http.get<any>(this.url+i).
    pipe(retry(1),catchError(this.error.handleError));
  }

  getClienteEdit(i:number):Observable<SP_Cliente_Get_W[]>{
    return this.http.get<SP_Cliente_Get_W[]>(this.url+'edit/'+i).
    pipe(retry(1),catchError(this.error.handleError));
  }
  anularCliente(i:number):Observable<any>{
    return this.http.delete<any>
    (this.url +i).pipe(retry(1),catchError(this.error.handleError)) 
  }

}
