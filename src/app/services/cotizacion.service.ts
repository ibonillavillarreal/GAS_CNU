import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sp_Cotizacion_GetList } from 'src/app/models/Sp_Cotizacion_GetList';



import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Sp_Cotizacion_GetID } from 'src/app/models/Sp_Cotizacion_GetID';
import { ErrorService } from './error.service';
import { Cliente } from '../models/Cliente';
import { DICTIONARYKEYS } from '../utils/DICTIONARYKEYS';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  
  url = new DICTIONARYKEYS().url + '/API/Agenda/'; 

  constructor(private http: HttpClient, private error: ErrorService) { }

  //get
  getAgenda(): Observable<any[]> {
    return this.http.get<any[]>(this.url)
      .pipe(retry(1), catchError(this.error.handleError));

  }

  addCotizacion(cotizacion: any): Observable<any> {

    return this.http.post<any>(this.url, JSON.stringify(cotizacion))
      .pipe(retry(1), catchError(this.error.handleError))


  }

  edtCotizacion(i: any): Observable<any> {

    return this.http.put<number>
      (
        this.url, JSON.stringify(i)
      ).pipe(retry(1), catchError(this.error.handleError))
  }

  getCotizacion(i: number): Observable<any> {
    return this.http.get<any>(this.url + i).
      pipe(retry(1), catchError(this.error.handleError));
  }

  getCotizacionEdit(id: number): Observable<Sp_Cotizacion_GetID[]> {

    return this.http.get<Sp_Cotizacion_GetID[]>(this.url + 'edit/' + id)
      .pipe(retry(1), catchError(this.error.handleError));
  }

  anularCotizacion(i: number): Observable<any> {
    return this.http.delete<any>
      (this.url + i).pipe(retry(1), catchError(this.error.handleError))
  }


  //leer det cotizacion / tipo : proyecto o terminado  con origen M:1 maestro y D:0 detalle
  getCotizacionTipo(idCot: number): Observable<any> {
    return this.http.get<any>(this.url + 'ProyectoTipo/' + idCot).
      pipe(retry(1), catchError(this.error.handleError));
  }
}
