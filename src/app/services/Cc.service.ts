
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { DICTIONARYKEYS } from '../utils/DICTIONARYKEYS';
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})
export class CcService {
    url = new DICTIONARYKEYS().url+"/API/Cc/"
    
    constructor(private http: HttpClient,private error:ErrorService) { }

    getPlazos():Observable<any>{  
        return this.http.get<any>(this.url+"Plazos").
        pipe(retry(1),catchError(this.error.handleError));
    }

    
}