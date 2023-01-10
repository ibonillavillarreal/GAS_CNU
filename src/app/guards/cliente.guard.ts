import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class ClienteGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.access();
  }



   private access() {
  //   let tkn = '' + localStorage.getItem('token');
      let res = true;
  //   let res = false;
  //   if (tkn !== 'null') {
  //     const decode: any = jwt_decode(tkn);
  //     decode.user_role.forEach((element: any) => {
  //       element.permission_data.forEach((element2: any) => {
  //         if (element.group_data[0].sumodule_system === "Estado de cuenta" && element2.permission === "Lectura" && element2.status === '0') {
  //           res = true;
  //         }
  //       });
  //     });
  //   }else{//si no hay token lo saca al login
  //     return true;
  //   }

      return res;
  }

}
