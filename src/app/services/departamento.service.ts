import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Cargo } from "../models/Departamento";
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})
export class DepartamentoService {
    //url = "http://172.16.23.203:3000/API/Departamento/"
    //url  = "http://172.16.23.203:3000/api/Departamento/"
    url = new DICTIONARYKEYS().url+'/api/Departamento/';
    
    constructor(private http: HttpClient, private error: ErrorService) { }

    getComboCargo(i: number): Observable<Cargo[]> {
        //console.log('valor i :  '+this.url + "Pais/" + i);

        return this.http.get<Cargo[]>(this.url + "Pais/" + i).
            pipe(retry(1), catchError(this.error.handleError));
    }
    
    getDepartamento(i: number): Observable<Cargo[]> {
        return this.http.get<Cargo[]>(this.url + i).
            pipe(retry(1), catchError(this.error.handleError));
    }
}