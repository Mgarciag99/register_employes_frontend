import { inject, Injectable } from '@angular/core';
import { ApiServiceService } from '@core/services/api-service.service';
import { PaginatedResponse, Pagination } from '@shared/interfaces';
import { Country } from '../interfaces';
import { payloadCreateCountry } from '../interfaces/payload-country.interface';
@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private ApiService = inject(ApiServiceService)
  
  get(params: Pagination){
    return this.ApiService.get<PaginatedResponse<Country>>('countries', params)
  }

  save(payload: payloadCreateCountry){
    return this.ApiService.post<{idCountry: number}>('countries', payload)
  }

  update(payload: payloadCreateCountry, idCountry: number){
    return this.ApiService.post<{idCountry: number}>(`countries/${idCountry}`, payload)
  }

}
