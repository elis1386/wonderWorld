import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ConfigService } from './config.service';
import { Book, NewBook } from 'src/models/book';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private authService: AuthService
  ) {
    this.baseUrl = this.configService.base_url;
  }

  getAllBooks(): Observable<any> {
    const url = `${this.baseUrl}/books`;
    return this.http.get(url);
  }

  getBookByIsbn(isbn: string): Observable<any> {
    const url = `${this.baseUrl}/books/${isbn}`;
    return this.http.get(url);
  }

  createBook(newBook: NewBook): Observable<any> {
    const url = `${this.baseUrl}/books`;

    return this.authService.token$.pipe(
      switchMap((token) => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        return this.http.post(url, newBook, { headers });
      })
    );
  }
  updateBookByIsbn(isbn: string, bookData: any): Observable<any> {
    const url = `${this.baseUrl}/books/${isbn}`;

    return this.authService.token$.pipe(
      switchMap((token) => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        return this.http.put(url, bookData, { headers });
      })
    );
  }

  deleteBookByIsbn(isbn: string): Observable<any> {
    const url = `${this.baseUrl}/books/${isbn}`;
    return this.authService.token$.pipe(
      switchMap((token) => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        return this.http.delete(url, { headers });
      })
    );
  }

  searchBooksByTitle(title: string): Observable<Book[] | any> {
    console.log('Searching books by title:', title);
    const url = `${this.baseUrl}/books/?title=${title}`;
    return this.http.get(url);
  }
}
