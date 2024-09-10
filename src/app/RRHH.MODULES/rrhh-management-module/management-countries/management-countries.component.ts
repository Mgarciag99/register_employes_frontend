import { Component, inject, OnInit, viewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from '../services/countries.service';
import { Subject, takeUntil } from 'rxjs';
import { Country } from '../interfaces';
import { Columns, Pagination } from '@shared/interfaces';
import { PageEvent } from '@angular/material/paginator';
import { payloadCreateCountry } from '../interfaces/payload-country.interface';
import { MatAccordion } from '@angular/material/expansion';
import { Catalogs } from '@shared/interfaces/catalogs.interface';
import { DepartmentsService } from '../services/departments.service';
import { MunicipalitiesServiceService } from '../services/municipalities-service.service';

@Component({
  selector: 'app-management-countries',
  templateUrl: './management-countries.component.html',
  styleUrls: ['./management-countries.component.css']

})
export class ManagementCountriesComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private destroSubject = new Subject<any>;
  private countriesService = inject(CountriesService);
  private departmentsService = inject(DepartmentsService);
  private municipalitiesServiceService = inject(MunicipalitiesServiceService)
  accordion = viewChild.required(MatAccordion);
  
  form = this.formBuilder.group({
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
  optionSelected = {};
  listDepartments: Catalogs[] = [];
  listMunicipalities: Catalogs[] = [];

  loadingTable = true;

  get hasOptionSelected(): boolean {
    return Object.keys(this.optionSelected).length > 0;
  }

  ngOnInit() {
    this.get();
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

  loadMunicipalities(idCountry: number){
    if(!idCountry) return; 
    this.loadingTable = false;
    this.municipalitiesServiceService.getList(idCountry)
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
    this.loadingTable = true;
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
    this.loadDepartments(event.idCountry);
    this.loadMunicipalities(event.idCountry);
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
