import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { ErrorService } from "./error.service";
import { Monedas } from '../models/Moneda';
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";

@Injectable({
    providedIn: 'root'
})
export class MonedaService {
    //url = "http://192.168.1.180:4700/API/Pais/"
    //url = "http://192.168.1.180:3000/api/Moneda"
    url = new DICTIONARYKEYS().url+'/api/Moneda';
    constructor(private http: HttpClient,private error:ErrorService) { }

    getMonedas(): Observable<Monedas[]> { 
        return this.http.get<Monedas[]>(this.url).
            pipe(retry(1), catchError(this.error.handleError));
    }
    getMoneda(i:number): Observable<Monedas[]> {
        return this.http.get<Monedas[]>(this.url+i).
            pipe(retry(1), catchError(this.error.handleError));
    }
    
}