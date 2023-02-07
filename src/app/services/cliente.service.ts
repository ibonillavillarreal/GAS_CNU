import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteA } from 'src/app/models/ClienteA';
import { SP_ClienteAgente_Add } from 'src/app/models/SP_ClienteAgente_Add';


import { retry, catchError } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { SP_Persona_Get } from 'src/app/models/SP_Cliente_Get_W';
import { ErrorService } from './error.service';
import { DICTIONARYKEYS } from '../utils/DICTIONARYKEYS';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  //url = "http://172.16.23.203:3000/API/Cliente/"  
  urlagente = "http://172.16.23.203:3000/api/cliente/agente";  
  url = new DICTIONARYKEYS().url+'/api/cliente/';
  
  constructor(private http:HttpClient,private error:ErrorService) 
  { }
  
  //get
  getPersonas():Observable<Cliente[]>{       
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
  
  getPersona(i:number):Observable<any>{
    return this.http.get<any>(this.url+i).
    pipe(retry(1),catchError(this.error.handleError));
  }

  getPersonaEdit(i:number):Observable<SP_Persona_Get[]>{    
    return this.http.get<SP_Persona_Get[]>(this.url+'Edit/'+i)
    .pipe(retry(1),catchError(this.error.handleError));
  }

  anularCliente(i:number):Observable<any>{
    return this.http.delete<any>
    (this.url +i).pipe(retry(1),catchError(this.error.handleError)) 
  }

}
