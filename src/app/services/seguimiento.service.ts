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
export class SeguimientoService {
    //url = "http://192.168.1.180:4700/API/Pais/"
    //url = "http://192.168.1.180:3000/api/pais/"
    url = new DICTIONARYKEYS().url+'/api/tracking/';
    
    constructor(private http: HttpClient,private error:ErrorService) { }

    getRastreo(i:number): Observable<any[]> {
        return this.http.get<any[]>(this.url+"rastreo/"+i).
            pipe(retry(1), catchError(this.error.handleError));
    }
    
}