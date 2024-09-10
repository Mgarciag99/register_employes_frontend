import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RrhhManagementModuleComponent } from './rrhh-management-module.component';
import { RrhhManagementRoutes } from './rrhh-management.routing';
import { TableComponent, CrudComponent } from '@shared/components';
import { ManagementCountriesComponent } from './management-countries/management-countries.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ManagementDepartmentsComponent } from './management-departments/management-departments.component';
import { ManagementMunicipalitiesComponent } from './management-municipalities/management-municipalities.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    RrhhManagementRoutes,
    TableComponent, 
    CrudComponent,
    MatOptionModule,
    MatSelectModule
  ],
  declarations: [
    RrhhManagementModuleComponent,
    ManagementCountriesComponent, 
    ManagementDepartmentsComponent,
    ManagementMunicipalitiesComponent
  ]
})
export class RrhhManagementModuleModule { }
