import { ComponentType } from '@angular/cdk/portal';
import { Component, inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { dialogParams } from '@shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  readonly dialog = inject(MatDialog);

  openDialog(component: ComponentType<unknown>, enterAnimationDuration: string, exitAnimationDuration: string, data: dialogParams): Observable<unknown> {
    const dialogRef = this.dialog.open(component, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: data
    });
    return dialogRef.afterClosed();
  }

}
