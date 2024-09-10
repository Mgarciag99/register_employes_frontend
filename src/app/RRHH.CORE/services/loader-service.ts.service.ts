import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Loaders } from '@core/interfaces';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<Loaders | null>(null);
  public loader$ = this.loaderSubject.asObservable();

  setLoader(loader: Loaders | null) {
    this.loaderSubject.next(loader);
  }

  clearLoader() {
    this.loaderSubject.next(null);
  }
}
