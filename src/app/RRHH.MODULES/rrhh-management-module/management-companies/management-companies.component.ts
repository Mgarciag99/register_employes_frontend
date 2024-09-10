import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CountriesService } from '../services/countries.service';
import { Columns, Pagination } from '@shared/interfaces';
import { Country } from '../interfaces';
import { PageEvent } from '@angular/material/paginator';
import { payloadCreateCountry } from '../interfaces/payload-country.interface';
import { Catalogs } from '@shared/interfaces/catalogs.interface';
import { MatSelectChange } from '@angular/material/select';
import { DepartmentsService } from '../services/departments.service';
import { MunicipalitiesServiceService } from '../services/municipalities-service.service';

@Component({
  selector: 'app-management-companies',
  templateUrl: './management-companies.component.html',
  styleUrls: ['./management-companies.component.css']
})
export class ManagementCompaniesComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private destroSubject = new Subject<any>;
  private countriesService = inject(CountriesService);
  private departmentsService = inject(DepartmentsService)
  private municipalitiesServiceService = inject(MunicipalitiesServiceService)

  form = this.formBuilder.group({
    idCountry: ['', [Validators.required]],
    idMunicipality: ['', []],
    idDepartment: ['', []],
    nit: ['', [Validators.required]],
    legalName: ['', [Validators.required]],
    comercialName: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required]],
    name: ['', [Validators.required]]
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

  data: Country[] = [];
  length: number = 0;
  optionSelected: unknown = {};
  
  listCountries: Catalogs[] = [];
  listDepartments: Catalogs[] = [];
  listMunicipalities: Catalogs[] = [];



  ngOnInit() {
    this.get();
    this.loadCountries();
  }

  loadCountries(){
    this.countriesService.getList()
    .pipe(takeUntil(this.destroSubject))
    .subscribe({
      next: (data) => {
        this.listCountries = data;
      }
    })
  }

  loadDepartments(event: MatSelectChange){
    const country = event.value;
    if(!country) return; 
    this.departmentsService.getList(country)
    .pipe(takeUntil(this.destroSubject))
    .subscribe({
      next: (data) => {
        this.listDepartments = data;
      }
    })
  }

  loadMunicipalities(event: MatSelectChange){
    const department = event.value;
    if(!department) return; 
    this.municipalitiesServiceService.getList(department)
    .pipe(takeUntil(this.destroSubject))
    .subscribe({
      next: (data) => {
        this.listMunicipalities = data;
      }
    })  }

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
    this.countriesService.get(this.paramsPagination)
      .pipe(takeUntil(this.destroSubject))
      .subscribe({
        next: ({ data, total }) => {
          this.data = data;
          this.length = total;
        }
      })
  }

  handleOptionSelected(event: Country) {
    this.optionSelected = event;
  }

  observableToExecute(formData: Country) {
    if (Object.keys(formData).length) {
      return this.countriesService.update(this.form.value as payloadCreateCountry, formData.idCountry)
    }
    return this.countriesService.save(this.form.value as payloadCreateCountry)
  }

  executeService(formData: Country) {
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

  updateStatus(formData: Country) {
    const { status, idCountry } = formData
    this.countriesService.delete({ status: !status }, idCountry)
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
