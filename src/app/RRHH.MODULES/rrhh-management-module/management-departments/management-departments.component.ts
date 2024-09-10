import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DepartmentsService } from '../services/departments.service';
import { Columns, Pagination } from '@shared/interfaces';
import { Country, Department, PaylaodCreateDepartment } from '../interfaces';
import { PageEvent } from '@angular/material/paginator';
import { CountriesService } from '../services/countries.service';
import { Catalogs } from '@shared/interfaces/catalogs.interface';

@Component({
  selector: 'app-management-departments',
  templateUrl: './management-departments.component.html',
  styleUrls: ['./management-departments.component.css']
})
export class ManagementDepartmentsComponent {

  private formBuilder = inject(FormBuilder);
  private destroSubject = new Subject<any>;
  private departmentsService = inject(DepartmentsService);
  private CountryService = inject(CountriesService);

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    idCountry: ['', [Validators.required]]
  })

  columns: Columns[] = [
    {
      field: "name"
    }
  ]

  paramsPagination: Pagination = {
    search: '',
    limit: 10,
    page: 1,
  }

  data: Department[] = [];
  length: number = 0;
  optionSelected: unknown = {};
  listCountries: Catalogs[]= []


  ngOnInit() {
    this.get();
    this.getCatalog();
  }

  getCatalog(){
    this.CountryService.getList()
    .pipe(takeUntil(this.destroSubject))
    .subscribe({
      next: (data) => {
        this.listCountries = data;
      }
    })
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
    this.departmentsService.get(this.paramsPagination)
      .pipe(takeUntil(this.destroSubject))
      .subscribe({
        next: ({ data, total }) => {
          this.data = data;
          this.length = total;
        }
      })
  }

  handleOptionSelected(event: Department) {
    this.optionSelected = event;
  }

  observableToExecute(formData: Department) {
    if (Object.keys(formData).length) {
      return this.departmentsService.update(this.form.value as any, formData.idDepartment)
    }
    return this.departmentsService.save(this.form.value as any)
  }

  executeService(formData: Department) {
    if(!formData) return;
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

  updateStatus(formData: Department) {
    const { status, idDepartment } = formData
    this.departmentsService.delete({ status: !status }, idDepartment)
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
