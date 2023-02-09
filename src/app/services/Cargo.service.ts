import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Claustro } from "../models/Claustro";
import { Grado } from "../models/Grado";
import { Cargo } from "../models/Pais";
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})
export class CargoService {
    
    url_Cargo = new DICTIONARYKEYS().url+'/api/Cargo/';
    url_Claustro = new DICTIONARYKEYS().url+'/api/Cargo/Claustro/'
       url_Grado = new DICTIONARYKEYS().url+'/api/Cargo/Claustro/Grado'
    
    constructor(private http: HttpClient,private error:ErrorService) { }
    
    getCargo(): Observable<Cargo[]> { 
        return this.http.get<Cargo[]>(this.url_Cargo)
        .pipe(retry(1), catchError(this.error.handleError));
    }

    getClaustro(): Observable<Claustro[]> {        
        return this.http.get<Claustro[]>(this.url_Claustro)
        .pipe(retry(1), catchError(this.error.handleError));
    }
    
    getGrado(): Observable<Grado[]> {        
        return this.http.get<Grado[]>(this.url_Grado)
        .pipe(retry(1), catchError(this.error.handleError));
    }

}