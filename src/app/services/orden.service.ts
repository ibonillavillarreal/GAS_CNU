import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Orden } from "../models/Orden";
import { ErrorService } from "./error.service";
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";

@Injectable({
    providedIn: 'root'
})
export class OrdenService {
    //url = "http://192.168.1.91:3000/API/Orden"
    url = new DICTIONARYKEYS().url+'/API/Orden'
    
    constructor(private http: HttpClient, private error: ErrorService) { }
    //get
    getOrdenes(): Observable<any> {
        return this.http.get<any>(this.url).
            pipe(retry(1), catchError(this.error.handleError));
    }
    getProyectos(id_cliente:number, num_cotizacion:string): Observable<any>{
        return this.http.get<any>(this.url+'/proyectos/'+id_cliente+'/'+num_cotizacion).
            pipe(retry(1), catchError(this.error.handleError));
    }
    getOrdenbyId(id_orden:number ):Observable<any>{
        return this.http.get<any>(this.url+'/getOrdenbyId/'+id_orden).
            pipe(retry(1), catchError(this.error.handleError));
    }
    anularOrden(id_orden:number ):Observable<any>{
        return this.http.get<any>(this.url+'/anularOrden/'+id_orden).
            pipe(retry(1), catchError(this.error.handleError));
    }

    ordenTracking(id_numero_orden:number ):Observable<any>{
        return this.http.get<any>(this.url+'/ordenTracking/'+id_numero_orden).
            pipe(retry(1), catchError(this.error.handleError));
    }
    //post
    addOrden(orden: any): Observable<any>{
        return this.http.post<any>(this.url+'/addOrden/', orden).pipe(retry(1), catchError(this.error.handleError));
    }
    addOrdenConsumo(orden: any): Observable<any>{
        return this.http.post<any>(this.url+'/addOrdenConsumo/', orden).pipe(retry(1), catchError(this.error.handleError));
    }
    ordenTrackingUpdate(orden: any): Observable<any>{
        return this.http.post<any>(this.url+'/ordenTrackingUpdate/', orden).pipe(retry(1), catchError(this.error.handleError));
    }
}