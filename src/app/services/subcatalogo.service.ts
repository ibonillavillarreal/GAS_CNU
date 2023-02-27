import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";
import { ErrorService } from "./error.service";

@Injectable({
    providedIn: 'root'
})
export class SubCatalogoService {
        
    url = new DICTIONARYKEYS().url+'/API/SubCatalogos';

    constructor(private http: HttpClient, private error: ErrorService) { }
    //get
    getServicios(): Observable<any> {
        return this.http.get<any>(this.url + "/Servicios/").
            pipe(retry(1), catchError(this.error.handleError));
    }
    getTratamientos(): Observable<any> {
        return this.http.get<any>(this.url + "/Tratamientos/").
            pipe(retry(1), catchError(this.error.handleError));
    }
    getTiposCliente(): Observable<any> {        
        return this.http.get<any>(this.url + "/TipoCliente/").  
            pipe(retry(1), catchError(this.error.handleError));
    }
    getContribuyentesCliente(): Observable<any> {        
        return this.http.get<any>(this.url + "/Contribuyentes/").
            pipe(retry(1), catchError(this.error.handleError));
    }

    get_Sub_Estados_Cotizacion(oper:any): Observable<any> {            
    return this.http.post<any>(this.url +"/idSubEstEncuesta/",JSON.stringify(oper)).
        pipe(retry(1), catchError(this.error.handleError));
}

}