import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  durationInSeconds = 3;
  constructor(private _snackBar: MatSnackBar) { }

  openSuccessSnackBar(message: string) {
    let snackbar = this._snackBar.open(message, "Fermer", {
       duration: this.durationInSeconds * 1000,
       verticalPosition: 'bottom',
       horizontalPosition: 'center',
       panelClass: ["snackbar-success-style"]
    });

    snackbar.onAction().subscribe(() => {
      snackbar.dismiss();
    });
 }
}
