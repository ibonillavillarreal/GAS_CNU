import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})
export class SeguimientoService {    
    
    url = new DICTIONARYKEYS().url+'/api/tracking/';
    
    constructor(private http: HttpClient,private error:ErrorService) { }

    getRastreo(i:number): Observable<any[]> {
        return this.http.get<any[]>(this.url+"rastreo/"+i).
            pipe(retry(1), catchError(this.error.handleError));
    }
    
}