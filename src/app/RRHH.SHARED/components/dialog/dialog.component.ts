import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { dialogParams } from '@shared/interfaces';

@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<dialogParams>(MAT_DIALOG_DATA);

  ngOnInit() {
  }

}
