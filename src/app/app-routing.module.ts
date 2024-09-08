import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'management',
    loadChildren: () => import('./RRHH.MODULES/rrhh-management-module/rrhh-management-module.module').then(m => m.RrhhManagementModuleModule),
  },
  {
    path: '**',
    redirectTo: 'management',
    pathMatch: 'full'
  }
  
];

const routerConfig: ExtraOptions = {
  useHash: true
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
