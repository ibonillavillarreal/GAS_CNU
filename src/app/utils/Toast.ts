
import { MatSnackBar, 
         MatSnackBarHorizontalPosition, 
         MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

export class Toast{
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(private _snackBar: MatSnackBar){
        
    }

    public showToast(msj:string,label_btn:string){
        this._snackBar.open(msj,'', {
            duration: 2 * 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: ['secondary-liosa', 'secondary-liosa'],
          });
    }
}