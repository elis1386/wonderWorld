import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

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
    const requestBody = { _id: bookIds }; // Create the expected structure
    return this.authService.token$.pipe(
      switchMap((token) => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        return this.http.post(
          `${this.config.base_url}/users/${userId}/borrow`,
          requestBody,
          { headers }
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
        );
      })
    );
  }
}
