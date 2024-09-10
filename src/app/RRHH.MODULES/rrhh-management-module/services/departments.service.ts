import { inject, Injectable } from '@angular/core';
import { ApiServiceService } from '@core/services/api-service.service';
import { PaginatedResponse, Pagination, StatusPayload } from '@shared/interfaces';
import { Country, Department } from '../interfaces';
import { PaylaodCreateDepartment } from '../interfaces';
import { Loaders } from '@core/interfaces';
import { Catalogs } from '@shared/interfaces/catalogs.interface';
@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private ApiService = inject(ApiServiceService);

  get(params: Pagination) {
    const loader: Loaders = { loaderType: 'skeleton' };
    return this.ApiService.get<PaginatedResponse<Department>>('department', params, loader)
  }

  save(payload: PaylaodCreateDepartment) {
    return this.ApiService.post<{ idDepartment: number }>('department', payload)
  }

  update(payload: PaylaodCreateDepartment, idDepartment: number) {
    return this.ApiService.post<{ idDepartment: number }>(`department/${idDepartment}`, payload)
  }

  delete(payload: StatusPayload, idDepartment: number) {
    return this.ApiService.put<{ idDepartment: number }>(`department/delete/${idDepartment}`, payload)
  }


  getList(idCountry?: number) {
    const loader: Loaders = { loaderType: 'loader' };
    return this.ApiService.get<Catalogs[]>('department/departments-list', { idCountry }, loader)
  }

}
