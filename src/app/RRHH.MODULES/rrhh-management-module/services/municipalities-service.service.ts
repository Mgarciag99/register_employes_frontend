import { inject, Injectable } from '@angular/core';
import { Loaders } from '@core/interfaces';
import { ApiServiceService } from '@core/services/api-service.service';
import { PaginatedResponse, Pagination, StatusPayload } from '@shared/interfaces';
import { Municipality, payloadCreateMunicipality } from '../interfaces';
import { Catalogs } from '@shared/interfaces/catalogs.interface';

@Injectable({
  providedIn: 'root'
})
export class MunicipalitiesServiceService {

  private ApiService = inject(ApiServiceService);
  
  get(params: Pagination){
    const loader: Loaders = { loaderType: 'skeleton' }; 
    return this.ApiService.get<PaginatedResponse<Municipality>>('municipality', params, loader)
  }

  save(payload: payloadCreateMunicipality){
    return this.ApiService.post<{idMunicipality: number}>(`municipality/create/${payload.idDepartment}/${payload.idCountry}`, {name: payload.name})
  }

  update(payload: payloadCreateMunicipality, idMunicipality: number){
    return this.ApiService.post<{idMunicipality: number}>(`municipality/update/${idMunicipality}/${payload.idDepartment}/${payload.idCountry}`, {name: payload.name})
  }

  delete(payload: StatusPayload, idCountry: number){
    return this.ApiService.put<{idMunicipality: number}>(`municipality/delete/${idCountry}`, payload)
  }

  getList(department?: number){
    const loader: Loaders = { loaderType: 'skeleton' }; 
    return this.ApiService.get<Catalogs[]>('municipality/municipalities-list', {department}, loader)
  }

}
