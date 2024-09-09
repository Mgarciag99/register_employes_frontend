import { Routes, RouterModule } from '@angular/router';
import { ManagementCountriesComponent } from './management-countries/management-countries.component';
import { ManagementDepartmentsComponent } from './management-departments/management-departments.component';
import { ManagementMunicipalitiesComponent } from './management-municipalities/management-municipalities.component';

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
  }
];

export const RrhhManagementRoutes = RouterModule.forChild(routes);
