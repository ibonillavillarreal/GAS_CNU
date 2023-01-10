import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Departamento } from "../models/Departamento";
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})
export class DepartamentoService {
    //url = "http://192.168.1.180:4700/API/Departamento/"
    //url  = "http://192.168.1.180:3000/api/Departamento/"
    url = new DICTIONARYKEYS().url+'/api/Departamento/';
    
    constructor(private http: HttpClient, private error: ErrorService) { }

    getDepartamentos(i: number): Observable<Departamento[]> {
        console.log('valor i :  '+this.url + "Pais/" + i);

        return this.http.get<Departamento[]>(this.url + "Pais/" + i).
            pipe(retry(1), catchError(this.error.handleError));
    }
    
    getDepartamento(i: number): Observable<Departamento[]> {
        return this.http.get<Departamento[]>(this.url + i).
            pipe(retry(1), catchError(this.error.handleError));
    }
}