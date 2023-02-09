import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SP_Persona_Get } from 'src/app/models/SP_Cliente_Get_W';
import { ErrorService } from './error.service';
import { DICTIONARYKEYS } from '../utils/DICTIONARYKEYS';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  url = new DICTIONARYKEYS().url + '/api/Persona/';
  url_Eliminar = new DICTIONARYKEYS().url + '/api/Persona/Eliminar/';

  constructor(private http: HttpClient, private error: ErrorService
  ) { }

  getPersonas(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url).
      pipe(retry(1), catchError(this.error.handleError));
  }

  addPersona(regPersona: any): Observable<any> {
    return this.http.post<any>(this.url, JSON.stringify(regPersona))
      .pipe(retry(1), catchError(this.error.handleError))
  }

  edtPersona(regPersona: any): Observable<any> {

    return this.http.put<number>
      (
        this.url, JSON.stringify(regPersona)
      ).pipe(retry(1), catchError(this.error.handleError))
  }

  getPersona(i: number): Observable<any> {
    return this.http.get<any>(this.url + i).
      pipe(retry(1), catchError(this.error.handleError));
  }

  getPersonaEdit(i: number): Observable<SP_Persona_Get[]> {
    return this.http.get<SP_Persona_Get[]>(this.url + 'Edit/' + i)
      .pipe(retry(1), catchError(this.error.handleError));
  }

  anularPersona(id_User: number): Observable<any> {
    return this.http.post<any>
      (
        this.url_Eliminar, JSON.stringify(id_User)
      ).pipe(retry(1), catchError(this.error.handleError))
  }

}
