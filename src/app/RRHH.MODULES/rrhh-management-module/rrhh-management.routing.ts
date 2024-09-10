import { Routes, RouterModule } from '@angular/router';
import { ManagementCountriesComponent } from './management-countries/management-countries.component';
import { ManagementDepartmentsComponent } from './management-departments/management-departments.component';
import { ManagementMunicipalitiesComponent } from './management-municipalities/management-municipalities.component';
import { ManagementCompaniesComponent } from './management-companies/management-companies.component';
import { ManagementEmployeeComponent } from './management-employee/management-employee.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementEmployeeComponent
  },
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
  },
  {
    path: 'employes',
    component: ManagementEmployeeComponent
  }
];

export const RrhhManagementRoutes = RouterModule.forChild(routes);
