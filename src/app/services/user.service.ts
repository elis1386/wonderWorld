import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { ConfigService } from './config.service';
import { AuthService } from './auth.service';
import { Book } from 'src/models/book';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private authService: AuthService
  ) {}

  borrowBooks(userId: string, bookIds: string): Observable<any> {
    const requestBody = { _id: bookIds };
    return this.authService.token$.pipe(
      switchMap((token) => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        return this.http.post(
          `${this.config.base_url}/users/${userId}/borrow`,
          requestBody,
          { headers }
        ).pipe(
          catchError(this.handleError('Error borrowing books', {}))
        );
      })
    );
  }

  returnBooks(userId: string, books: Book[]): Observable<any> {
    return this.authService.token$.pipe(
      switchMap((token) => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const requestBody = books.map((book) => book);
        return this.http.post(
          `${this.config.base_url}/users/${userId}/return`,
          { ...requestBody[0] },
          { headers }
        ).pipe(
          catchError(this.handleError('Error returning books', {}))
        );
      })
    );
  }

  private handleError<T>(errorMessage: string, result: T): (error: HttpErrorResponse) => Observable<T> {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(errorMessage, error);
      return of(result);
    };
  }
}
