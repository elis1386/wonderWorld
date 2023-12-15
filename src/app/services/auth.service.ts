import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from 'src/models/user';
import { ConfigService } from './config.service';
import { ApiResponseWrapper, JWTTokenPair } from 'src/models/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUser: User | null = null;
  user = new BehaviorSubject<User | null>(null);
  tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient, private config: ConfigService) {
    this.initializeUserAndToken();
  }

  private initializeUserAndToken(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    this.loggedUser = storedUser ? JSON.parse(storedUser) : null;
    this.user.next(this.loggedUser);
    const storedToken = localStorage.getItem('accessToken');
    this.tokenSubject.next(storedToken);
  }

  signUp(user: User): Observable<ApiResponseWrapper<JWTTokenPair>> {
    return this.http
      .post<ApiResponseWrapper<JWTTokenPair>>(
        `${this.config.base_url}/auth/signup`,
        user
      )
      .pipe(
        tap((authResponse) => {
          const accessToken = authResponse.data.accessToken;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          this.loggedUser = user;
          this.user.next(this.loggedUser);
        }),
        catchError(this.handleError)
      );
  }

  getAndStoreToken(
    email: string,
    password: string
  ): Observable<ApiResponseWrapper<JWTTokenPair>> {
    return this.http
      .post<ApiResponseWrapper<JWTTokenPair>>(
        `${this.config.base_url}/auth/login`,
        { email, password }
      )
      .pipe(
        tap((authResponse) => {
          const accessToken = authResponse.data.accessToken;
          localStorage.setItem('accessToken', accessToken);
          this.tokenSubject.next(accessToken);
        }),
        catchError(this.handleError)
      );
  }

  getAndStoreUser(): Observable<ApiResponseWrapper<User>> {
    const accessToken = localStorage.getItem('accessToken');
    return this.http
      .get<ApiResponseWrapper<User>>(`${this.config.base_url}/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .pipe(
        tap((currentUser) => {
          localStorage.setItem(
            'loggedInUser',
            JSON.stringify(currentUser.data)
          );
          this.loggedUser = currentUser.data;
          this.user.next(this.loggedUser);
        }),
        catchError(this.handleError)
      );
  }

  getCurrentUser(): Observable<User> {
    const accessToken = localStorage.getItem('accessToken');
    return this.http
      .get<ApiResponseWrapper<User>>(`${this.config.base_url}/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .pipe(
        tap((currentUserResponse) => {
          if (currentUserResponse) {
            localStorage.setItem(
              'loggedInUser',
              JSON.stringify(currentUserResponse.data)
            );
            this.loggedUser = currentUserResponse.data;
            this.user.next(this.loggedUser);
          }
        }),
        map((currentUserResponse) => currentUserResponse.data),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedInUser');
    this.loggedUser = null;
    this.user.next(this.loggedUser);
    this.tokenSubject.next(null);
    this.user.complete();
  }
  isAdmin(): boolean {
    return !!this.loggedUser && this.loggedUser.role === 'ADMIN';
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('HTTP request error:', error);
    throw error;
  }
}
