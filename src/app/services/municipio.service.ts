import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Municipio } from "../models/Municipio";
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})
export class MunicipioService {
    //url2 = "http://192.168.1.180:4700/API/Municipio/"
    //url = "http://192.168.1.180:3000/api/Municipio/"
    url = new DICTIONARYKEYS().url+'/api/Municipio/';
    
    constructor(private http: HttpClient,private error:ErrorService) { }

    getMunicipios(i:number):Observable<Municipio[]>{  
        return this.http.get<Municipio[]>(this.url+"Departamento/"+i).
        pipe(retry(1),catchError(this.error.handleError));
    }
    
    getMunicipio(i:number):Observable<Municipio[]>{  
        return this.http.get<Municipio[]>(this.url+i).
        pipe(retry(1),catchError(this.error.handleError));
    }
}
