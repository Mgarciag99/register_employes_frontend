import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RrhhManagementModuleComponent } from './rrhh-management-module.component';
import { RrhhManagementRoutes } from './rrhh-management.routing';

@NgModule({
  imports: [
    CommonModule,
    RrhhManagementRoutes
  ],
  declarations: [RrhhManagementModuleComponent]
})
export class RrhhManagementModuleModule { }
