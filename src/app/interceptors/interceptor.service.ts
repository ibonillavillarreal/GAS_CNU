import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalUtilities } from '../utils/GlobalUtilities';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  tools: GlobalUtilities
  constructor() {
    this.tools = GlobalUtilities.getInstance();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const tkn = localStorage.getItem('token');
    // console.log("INTERCEPTOR TOKE :" + tkn)
    // if (tkn) {
    //   const headers = new HttpHeaders({
    //     'x-auth-token': '' + tkn,
    //     'Content-Type': 'application/json'
    //   });
    //   const reqClone = req.clone({ headers });
    //   return next.handle(reqClone);
    // } else {
    //   this.tools.setAuthenticated(true);
    //   return next.handle(req)
    // }
    const headers = new HttpHeaders({
      //     'x-auth-token': '' + tkn,
      'Content-Type': 'application/json'
    });
    const reqClone = req.clone({ headers });
    return next.handle(reqClone);
  }



}
