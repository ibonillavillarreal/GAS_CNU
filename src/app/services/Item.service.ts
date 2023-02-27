
import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { ErrorService } from "./error.service";
import { DICTIONARYKEYS } from "../utils/DICTIONARYKEYS";


@Injectable({
    providedIn: 'root'
})
export class ItemService {

    url = new DICTIONARYKEYS().url+'/api/Item';
    url_idCli = new DICTIONARYKEYS().url+'/api/Item/Tipo/';

    @Output() addItemTrigger:EventEmitter <any> = new EventEmitter();
    @Output() addItemTriggerEditProyect:EventEmitter <any> = new EventEmitter();
    @Output() addItemTriggerItems:EventEmitter <any> = new EventEmitter();

    @Output() addItemTriggerItemsEdit:EventEmitter <any> = new EventEmitter();//Añadir item en el edit de proyecto

    @Output() addItemTriggerDescProyecto:EventEmitter <any> = new EventEmitter();
    @Output() addItemTriggerItemsProyecto:EventEmitter <any> = new EventEmitter();
    

    constructor(private http: HttpClient, private error: ErrorService) { }

    getItem(): Observable<any> {
        return this.http.get<any>(this.url).
            pipe(retry(1), catchError(this.error.handleError));
    }
    getTipoItem(id:any): Observable<any> {
        return this.http.get<any>(this.url_idCli+id ).
            pipe(retry(1), catchError(this.error.handleError));
    }

}
