import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

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
    return this.http.get(url).pipe(
      catchError(this.handleError('Error fetching books', []))
    );
  }

  getBookByIsbn(isbn: string): Observable<any> {
    const url = `${this.baseUrl}/books/${isbn}`;
    return this.http.get(url).pipe(
      catchError(this.handleError('Error fetching book by ISBN', {}))
    );
  }

  createBook(newBook: NewBook): Observable<any> {
    const url = `${this.baseUrl}/books`;

    return this.authService.token$.pipe(
      switchMap((token) => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        return this.http.post(url, newBook, { headers }).pipe(
          catchError(this.handleError('Error creating book', {}))
        );
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
        return this.http.put(url, bookData, { headers }).pipe(
          catchError(this.handleError('Error updating book', {}))
        );
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
        return this.http.delete(url, { headers }).pipe(
          catchError(this.handleError('Error deleting book', {}))
        );
      })
    );
  }

  searchBooksByTitle(title: string): Observable<Book[] | any> {
    console.log('Searching books by title:', title);
    const url = `${this.baseUrl}/books/?title=${title}`;
    return this.http.get(url).pipe(
      catchError(this.handleError('Error searching books by title', []))
    );
  }

  private handleError<T>(errorMessage: string, result: T): (error: HttpErrorResponse) => Observable<T> {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(errorMessage, error);
      return of(result);
    };
  }
}
