import { Routes, RouterModule } from '@angular/router';
import { ManagementCountriesComponent } from './management-countries/management-countries.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementCountriesComponent
  },
  {
    path: 'countries',
    component: ManagementCountriesComponent
  },
];

export const RrhhManagementRoutes = RouterModule.forChild(routes);
