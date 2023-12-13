import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { catchError, Observable, of } from "rxjs";

import { Author } from "src/models/author";
import { Book } from "src/models/book";
import { ConfigService } from "./config.service";

@Injectable({
  providedIn: "root",
})
export class AuthorService {
  private baseUrl: string;

  constructor(private configService: ConfigService, private http: HttpClient) {
    this.baseUrl = this.configService.base_url;
  }

  getAllAuthors(): Observable<Author[]> {
    const url = `${this.baseUrl}/authors`;
    return this.http
      .get<Author[]>(url)
      .pipe(catchError(this.handleError("Error fetching authors", [])));
  }

  getAuthorsById(id: string): Observable<any> {
    const url = `${this.baseUrl}/authors/${id}`;
    return this.http
      .get(url)
      .pipe(catchError(this.handleError("Error fetching author by ID", {})));
  }

  getAuthorsBooks(id: string): Observable<any> {
    const url = `${this.baseUrl}/authors/${id}/books`;
    return this.http
      .get<Book[]>(url)
      .pipe(catchError(this.handleError("Error fetching author books", [])));
  }

  private handleError<T>(
    errorMessage: string,
    result: T
  ): (error: HttpErrorResponse) => Observable<T> {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(errorMessage, error);
      return of(result);
    };
  }
}
