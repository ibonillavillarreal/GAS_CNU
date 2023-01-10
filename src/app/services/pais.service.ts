import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Pais } from "../models/Pais";
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})
export class PaisService {
    //url = "http://192.168.1.180:4700/API/Pais/"
    //url = "http://192.168.1.180:3000/api/pais/"
    url = new DICTIONARYKEYS().url+'/api/pais/';
    
    constructor(private http: HttpClient,private error:ErrorService) { }
    
    getPaises(): Observable<Pais[]> { 
        return this.http.get<Pais[]>(this.url)
        .pipe(retry(1), catchError(this.error.handleError));
    }
    getPais(i:number): Observable<Pais[]> {        
        return this.http.get<Pais[]>(this.url+i)
        .pipe(retry(1), catchError(this.error.handleError));
    }
    
}