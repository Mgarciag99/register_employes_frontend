import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Columns, Pagination } from '@shared/interfaces';
import { PageEvent } from '@angular/material/paginator';
import { EmployesService } from '../services/employes.service';
import { Employee } from '../interfaces/employee.interface';
import { emailValidator } from '@core/utilities/validator-email';

@Component({
  selector: 'app-management-employee',
  templateUrl: './management-employee.component.html',
  styleUrls: ['./management-employee.component.css']
})
export class ManagementEmployeeComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private destroSubject = new Subject<any>;
  private employesService = inject(EmployesService)

  form = this.formBuilder.group({
    personalId: ['', [Validators.required]],
    firtName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    age: [Number(), [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required, emailValidator()]]
  })

  columns: Columns[] = [
    {
      field: "firtName"
    }
  ]

  paramsPagination: Pagination = {
    search: '',
    limit: 10,
    page: 1,
  }

  data: Employee[] = [];
  length: number = 0;
  optionSelected: unknown = {};

  ngOnInit() {
    this.get();
  }

  updateParams(pagination: PageEvent) {
    this.paramsPagination.page = pagination?.pageIndex + 1;
    this.paramsPagination.limit = pagination?.pageSize;
    this.get();
  }

  search(text: string){
    this.paramsPagination.page = 1;
    this.paramsPagination.search = text;
    this.get();
  }

  get() {
    this.employesService.get(this.paramsPagination)
      .pipe(takeUntil(this.destroSubject))
      .subscribe({
        next: ({ data, total }) => {
          this.data = data;
          this.length = total;
        }
      })
  }

  handleOptionSelected(event: Employee) {
    this.optionSelected = event;
  }

  observableToExecute(formData: Employee) {
    if (Object.keys(formData).length) {
      return this.employesService.update(this.form.value as any, formData.idEmploye)
    }
    return this.employesService.save(this.form.value as any)
  }

  executeService(formData: Employee) {
    this.observableToExecute(formData)
      .subscribe({
        next: (data) => {
          if (data) {
            this.optionSelected = {};
            this.get();
          }
        }
      })
  }

  updateStatus(formData: Employee) {
    const { status, idEmploye } = formData
    this.employesService.delete({ status: !status }, idEmploye)
      .subscribe({
        next: (data) => {
          if (data) {
            this.optionSelected = {};
            this.get();
          }
        }
      })

  }


  ngOnDestroy(): void {
    this.destroSubject.next(null);
    this.destroSubject.complete();
  }

}
