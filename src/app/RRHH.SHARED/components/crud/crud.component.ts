import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DialogService } from '@core/services/dialog.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent {
  private DialogService = inject(DialogService);
  @Input() templateOutlet!: TemplateRef<any>;
  @Input() optionSelected: any = {};
  @Input() form!: FormGroup;
  @Output() submitForm = new EventEmitter<any>();
  @Output() updateStatus = new EventEmitter<any>();



  isEdit: boolean = false;
  formAux: object = {};

  ngOnChanges({ optionSelected }: SimpleChanges): void {
    if (optionSelected) {
      if (Object.keys(optionSelected.currentValue).length > 0) {
        this.handleForm();
      } else {
        this.resetForm();
      }
    }
  }

  resetForm() {
    this.form.reset();
    this.optionSelected = {};
    this.formAux = {};
    this.isEdit = false;
  }

  handleForm() {
    const patchValue = this.matchFormValues();
    if (!patchValue) return
    this.form.patchValue(patchValue);
    this.formAux = this.form.value;
    this.isEdit = true;
  }

  matchFormValues() {
    if (!this.form) return;
    const patchValue: { [key: string]: any } = {};
    Object.keys(this.optionSelected).forEach(key => {
      if (this.form.contains(key)) {
        patchValue[key] = this.optionSelected[key];
      }
    });
    return patchValue;
  }

  validateForm() {
    if (!this.form.valid) {
      return true;
    } else if (this.isEdit && (JSON.stringify(this.formAux) === JSON.stringify(this.form.value))) {
      return true;
    }
    return false;
  }

  save() {
    if (!this.form.valid) return;
    this.submitForm.emit(this.optionSelected)
  }

  changeStatus(event: MatSlideToggleChange) {
    const data = {
      title: "Cambiar Estado",
      content: event.checked ? "Esta seguro que desea cambiar a estado ACTIVO elemento seleccionado" : "Esta seguro que desea cambiar a estado INACTIVO elemento seleccionado"
    }
    const dialogRef = this.DialogService.openDialog(DialogComponent, '0ms', '0ms', data)
    dialogRef.subscribe((data) => {
      if(data){
        this.updateStatus.emit(this.optionSelected)
      }
    })
  }

  cancel() {
    this.resetForm();
  }
}
