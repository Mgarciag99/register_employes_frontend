import { inject, Injectable } from '@angular/core';
import { Loaders } from '@core/interfaces';
import { ApiServiceService } from '@core/services/api-service.service';
import { PaginatedResponse, Pagination, StatusPayload } from '@shared/interfaces';
import { PayloadCreateCompany } from '../interfaces/payload-companies.interface';
import { Catalogs } from '@shared/interfaces/catalogs.interface';
import { AsignationCompanies, Company } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private ApiService = inject(ApiServiceService);
  
  get(params: Pagination){
    const loader: Loaders = { loaderType: 'skeleton' }; 
    return this.ApiService.get<PaginatedResponse<Company>>('company', params, loader)
  }
  
  save(payload: PayloadCreateCompany){
    return this.ApiService.post<{idCompany: number}>('company', payload)
  }
  
  update(payload: PayloadCreateCompany, idCompany: number){
    return this.ApiService.post<{idCompany: number}>(`company/${idCompany}`, payload)
  }
  
  delete(payload: StatusPayload, idCompany: number){
    return this.ApiService.put<{idCompany: number}>(`company/delete/${idCompany}`, payload)
  }
  
  getList(){
    const loader: Loaders = { loaderType: 'skeleton' }; 
    return this.ApiService.get<Catalogs[]>('company/countries-list', {}, loader)
  }
  
  getAssignation(idEmploye: number){
    const loader: Loaders = { loaderType: 'skeleton' }; 
    return this.ApiService.get<AsignationCompanies[]>('company/assignation', {idEmploye}, loader)
  }

  assignOne(idEmploye: number, idCompany: number){
    return this.ApiService.post(`company/assignOne/${idEmploye}/${idCompany}`, {})
  }


}
