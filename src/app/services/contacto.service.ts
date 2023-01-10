import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Contacto } from "src/app/models/Contacto";
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  //url = "http://192.168.1.180:3000/API/Contacto/"
  url = new DICTIONARYKEYS().url+'/API/Contacto/';

  constructor(private http:HttpClient,private error:ErrorService){  }
  //GET muchos Con parametros
  getContactosW(i:number,j:number):Observable<Contacto>{
    return this.http.get<Contacto>(this.url+i+"/"+j).
    pipe(retry(1),catchError(this.error.handleError));
  }
  //GET
  getContactoW(i:number):Observable<Contacto>{
    return this.http.get<Contacto>(this.url+i).
    pipe(retry(1),catchError(this.error.handleError));
  }
  //Add
  addContacto(i:Contacto):Observable<Contacto>{
    return this.http.post<Contacto>(
      this.url,JSON.stringify(i)
      ).pipe(retry(1),catchError(this.error.handleError))
  }
  //Update
  updateContacto(i:Contacto):Observable<Contacto>{
    return this.http.put<Contacto>(
      this.url ,JSON.stringify(i)
      ).pipe(retry(1),catchError(this.error.handleError))
  }
  //anular
  anularContacto(i:number):Observable<number>{
    return this.http.delete<number>(this.url+i).pipe(retry(1),catchError(this.error.handleError))
  }
  
}