import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Claustro } from "../models/Claustro";
import { Cargo } from "../models/Cargo";
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})
export class ClaustroService {

    url = new DICTIONARYKEYS().url + '/api/Municipio/';    

    constructor(private http: HttpClient, private error: ErrorService) { }

    getClaustro(i: number): Observable<Claustro[]> {
        return this.http.get<Claustro[]>(this.url + "Departamento/" + i).
            pipe(retry(1), catchError(this.error.handleError));
    }

    getMunicipio(i: number): Observable<Claustro[]> {
        return this.http.get<Claustro[]>(this.url + i).
            pipe(retry(1), catchError(this.error.handleError));
    }

}
