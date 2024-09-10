import { Routes, RouterModule } from '@angular/router';
import { ManagementCountriesComponent } from './management-countries/management-countries.component';
import { ManagementDepartmentsComponent } from './management-departments/management-departments.component';
import { ManagementMunicipalitiesComponent } from './management-municipalities/management-municipalities.component';
import { ManagementCompaniesComponent } from './management-companies/management-companies.component';

const routes: Routes = [
  {
    path: 'countries',
    component: ManagementCountriesComponent
  },
  {
    path: 'departments',
    component: ManagementDepartmentsComponent
  },
  {
    path: 'municipalities',
    component: ManagementMunicipalitiesComponent
  },
  {
    path: 'companies',
    component: ManagementCompaniesComponent
  }
];

export const RrhhManagementRoutes = RouterModule.forChild(routes);
