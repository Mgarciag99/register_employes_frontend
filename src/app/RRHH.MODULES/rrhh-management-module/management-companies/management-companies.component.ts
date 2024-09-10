import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CountriesService } from '../services/countries.service';
import { Columns, Pagination } from '@shared/interfaces';
import { PageEvent } from '@angular/material/paginator';
import { Catalogs } from '@shared/interfaces/catalogs.interface';
import { DepartmentsService } from '../services/departments.service';
import { MunicipalitiesServiceService } from '../services/municipalities-service.service';
import { CompaniesService } from '../services/companies.service';
import { Company } from '../interfaces/company.interface';
import { emailValidator } from '@core/utilities/validator-email';

@Component({
  selector: 'app-management-companies',
  templateUrl: './management-companies.component.html',
  styleUrls: ['./management-companies.component.css']
})
export class ManagementCompaniesComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private destroSubject = new Subject<any>;
  private companiesService = inject(CompaniesService)
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
    email: ['', [Validators.required, emailValidator()]],
  })

  columns: Columns[] = [
    {
      field: "legalName"
    }
  ]

  paramsPagination: Pagination = {
    search: '',
    limit: 10,
    page: 1,
  }

  data: Company[] = [];
  length: number = 0;
  optionSelected: unknown = {};
  
  listCountries: Catalogs[] = [];
  listDepartments: Catalogs[] = [];
  listMunicipalities: Catalogs[] = [];
  loadingTable = true;
  
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

  loadDepartments(idCountry: number){
    if(!idCountry) return; 
    this.loadingTable = false;
    this.departmentsService.getList(idCountry)
    .pipe(takeUntil(this.destroSubject))
    .subscribe({
      next: (data) => {
        this.listDepartments = data;
      }
    })
  }

  loadMunicipalities(idDepartment: number){
    if(!idDepartment) return; 
    this.loadingTable = false;
    this.municipalitiesServiceService.getList(idDepartment)
    .pipe(takeUntil(this.destroSubject))
    .subscribe({
      next: (data) => {
        this.listMunicipalities = data;
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
    this.companiesService.get(this.paramsPagination)
      .pipe(takeUntil(this.destroSubject))
      .subscribe({
        next: ({ data, total }) => {
          this.data = data;
          this.length = total;
        }
      })
  }

  handleOptionSelected(event: Company) {
    const { idCountry, idDepartment } = event;
    if(idCountry){
      this.loadDepartments(idCountry);
    }
    if(idDepartment){
      this.loadMunicipalities(idDepartment);
    }
    this.optionSelected = event;
  }

  observableToExecute(formData: Company) {
    if (Object.keys(formData).length) {
      return this.companiesService.update(this.form.value as any, formData.idCompany)
    }
    return this.companiesService.save(this.form.value as any)
  }

  executeService(formData: Company) {
    this.loadingTable = true;
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

  updateStatus(formData: Company) {
    const { status, idCompany } = formData;
    this.loadingTable = true;
    this.companiesService.delete({ status: !status }, idCompany)
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
