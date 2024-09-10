import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Loaders } from '@core/interfaces';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoaderService } from './loader-service.ts.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl = 'http://localhost:3000'; // Replace with your API base URL
  private http = inject(HttpClient)
  private loaderService = inject(LoaderService);
  private snackBar = inject(MatSnackBar);



  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      horizontalPosition: 'center', 
      verticalPosition: 'top', 
      // panelClass: ['success-snackbar'], 
    });
  }

  private handleSuccess(response: any, successMessage: string): void {
    this.showSuccess(successMessage);
  }


  // GET request
  get<T>(endpoint: string, params?: any, loader?: Loaders ): Observable<T> {
    if(loader){
      this.loaderService.setLoader(loader);
    }
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params }).pipe(
      map((response: any) => {
        return response;
      }),
      tap(() => {
        if (loader) {
          setTimeout(() => {
            this.loaderService.clearLoader();
          }, 500);
        }
      }),
      catchError(this.handleError)
    );
  }

  // POST request
  post<T>(endpoint: string, body: any, headers?: any, loader?: Loaders): Observable<T> {
    if(loader){
      this.loaderService.setLoader(loader);
    }
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers }).pipe(
      map(response => {
        this.handleSuccess(response, 'Guardado Correctamente');
        return response;
      }),
      tap(() => {
        if (loader) {
          setTimeout(() => {
            this.loaderService.clearLoader();
          }, 500);
        }
      }),
      catchError(this.handleError)
    );
  }

  // PUT request
  put<T>(endpoint: string, body: any, headers?: HttpHeaders, loader?: Loaders): Observable<T> {
    if(loader){
      this.loaderService.setLoader(loader);
    }
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { headers }).pipe(
      map(response => {
        this.handleSuccess(response, 'Guardado Correctamente');
        return response;
      }),
      tap(() => {
        if (loader) {
          setTimeout(() => {
            this.loaderService.clearLoader();
          }, 500);
        }
      }),
      catchError(this.handleError)
    );
  }

  // DELETE request
  delete<T>(endpoint: string, headers?: HttpHeaders, loader?: Loaders): Observable<T> {
    if(loader){
      this.loaderService.setLoader(loader);
    }
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers }).pipe(
      map(response => {
        this.handleSuccess(response, 'Guardado Correctamente');
        return response;
      }),
      tap(() => {
        if (loader) {
          setTimeout(() => {
            this.loaderService.clearLoader();
          }, 500);
        }
      }),
      catchError(this.handleError)
    );
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    this.snackBar.open(errorMessage, 'Close', {
      duration: 3000, 
      horizontalPosition: 'right', 
      verticalPosition: 'top', 
    });

    return throwError(() => new Error(errorMessage));
  }
}
