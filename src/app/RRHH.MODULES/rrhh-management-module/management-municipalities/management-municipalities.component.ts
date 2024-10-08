import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DepartmentsService } from '../services/departments.service';
import { Columns, Pagination } from '@shared/interfaces';
import { Municipality } from '../interfaces';
import { Catalogs } from '@shared/interfaces/catalogs.interface';
import { PageEvent } from '@angular/material/paginator';
import { MunicipalitiesServiceService } from '../services/municipalities-service.service';
import { CountriesService } from '../services/countries.service';

@Component({
  selector: 'app-management-municipalities',
  templateUrl: './management-municipalities.component.html',
  styleUrls: ['./management-municipalities.component.css']
})
export class ManagementMunicipalitiesComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private destroSubject = new Subject<any>;
  private municipalitiesService = inject(MunicipalitiesServiceService)
  private departmentsService = inject(DepartmentsService);
  private countriesService = inject(CountriesService);

  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    idCountry: ['', [Validators.required]],
    idDepartment: ['', [Validators.required]]
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

  data: Municipality[] = [];
  length: number = 0;
  optionSelected: unknown = {};
  listDepartments: Catalogs[]= []
  listCountries: Catalogs[] = [];

  loadingTable: boolean = true;


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
    this.municipalitiesService.get(this.paramsPagination)
      .pipe(takeUntil(this.destroSubject))
      .subscribe({
        next: ({ data, total }) => {
          this.data = data;
          this.length = total;
        }
      })
  }

  handleOptionSelected(event: Municipality) {
    const { idCountry, idDepartment } = event;
    if(idCountry){
      this.loadDepartments(idCountry);
    }
    // if(idDepartment){
    //   this.loadMunicipalities(idDepartment);
    // }
    this.optionSelected = event;
  }

  observableToExecute(formData: Municipality) {
    if (Object.keys(formData).length) {
      return this.municipalitiesService.update(this.form.value as any, formData.idMunicipality)
    }
    return this.municipalitiesService.save(this.form.value as any)
  }

  executeService(formData: Municipality) {
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

  updateStatus(formData: Municipality) {
    const { status, idMunicipality } = formData
    this.municipalitiesService.delete({ status: !status }, idMunicipality)
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
