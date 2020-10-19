import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) { 
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  closeSnackBar(){
    this._snackBar.dismiss()
  }

  openModal(component:any, value:any){
    const dialogRef = this.dialog.open(component, {
      width: '250px',
      data: value
    })

    dialogRef.afterClosed().subscribe();
  }

}
