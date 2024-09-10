import { inject, Injectable } from '@angular/core';
import { ApiServiceService } from '@core/services/api-service.service';
import { PaginatedResponse, Pagination, StatusPayload } from '@shared/interfaces';
import { Country } from '../interfaces';
import { payloadCreateCountry } from '../interfaces/payload-country.interface';
import { Loaders } from '@core/interfaces';
import { Catalogs } from '@shared/interfaces/catalogs.interface';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private ApiService = inject(ApiServiceService);
  
  get(params: Pagination){
    const loader: Loaders = { loaderType: 'skeleton' }; 
    return this.ApiService.get<PaginatedResponse<Country>>('countries', params, loader)
  }

  save(payload: payloadCreateCountry){
    return this.ApiService.post<{idCountry: number}>('countries', payload)
  }

  update(payload: payloadCreateCountry, idCountry: number){
    return this.ApiService.post<{idCountry: number}>(`countries/${idCountry}`, payload)
  }

  delete(payload: StatusPayload, idCountry: number){
    return this.ApiService.put<{idCountry: number}>(`countries/delete/${idCountry}`, payload)
  }

  getList(){
    const loader: Loaders = { loaderType: 'loader' }; 
    return this.ApiService.get<Catalogs[]>('countries/countries-list', {}, loader)
  }

}
