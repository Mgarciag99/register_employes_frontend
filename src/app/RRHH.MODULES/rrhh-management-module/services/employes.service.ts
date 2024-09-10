import { inject, Injectable } from '@angular/core';
import { ApiServiceService } from '@core/services/api-service.service';
import { PaginatedResponse, Pagination, StatusPayload } from '@shared/interfaces';
import { payloadCreateCountry } from '../interfaces/payload-country.interface';
import { Loaders } from '@core/interfaces';
import { Catalogs } from '@shared/interfaces/catalogs.interface';
import { Employee } from '../interfaces/employee.interface';
import { PayloadCreateEmployee } from '../interfaces/payload-employee.interface';
@Injectable({
  providedIn: 'root'
})
export class EmployesService {
  private ApiService = inject(ApiServiceService);
  
  get(params: Pagination){
    const loader: Loaders = { loaderType: 'skeleton' }; 
    return this.ApiService.get<PaginatedResponse<Employee>>('employee', params, loader)
  }

  save(payload: PayloadCreateEmployee){
    return this.ApiService.post<{idEmploye: number}>('employee', payload)
  }

  update(payload: PayloadCreateEmployee, idEmploye: number){
    return this.ApiService.post<{idEmploye: number}>(`employee/${idEmploye}`, payload)
  }

  delete(payload: StatusPayload, idEmploye: number){
    return this.ApiService.put<{idEmploye: number}>(`employee/delete/${idEmploye}`, payload)
  }

  // getList(){
  //   const loader: Loaders = { loaderType: 'skeleton' }; 
  //   return this.ApiService.get<Catalogs[]>('employee/countries-list', {}, loader)
  // }

}
