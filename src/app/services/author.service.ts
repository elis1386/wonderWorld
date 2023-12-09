import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, Observable, of } from 'rxjs';

import { Author } from 'src/models/author';
import { Book } from 'src/models/book';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private baseUrl: string;

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.baseUrl = this.configService.base_url;
  }

  getAllAuthors(): Observable<Author[]> {
    const url = `${this.baseUrl}/authors`;
    return this.http.get<Author[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching authors:', error);
        return of([]);
      })
    );
  }

  getAuthorsById(id: string): Observable<any> {
    const url = `${this.baseUrl}/authors/${id}`;
    return this.http.get(url);
  }

  getAuthorsBooks(id: string): Observable<any> {
    const url = `${this.baseUrl}/authors/${id}/books`;
    return this.http.get<Book[]>(url);
  }
}
