import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/models/user';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let config: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, ConfigService],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    config = TestBed.inject(ConfigService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up a user', fakeAsync(() => {
    const user: User = {
      firstName: 'testfirstname',
      lastName: 'testlastname',
      email: 'test@example.com',
      password: 'password123',
      _id: '',
      role: '',
      image: '',
      borrowedBooks: [''],
    };

    const signUpResponse = { data: { accessToken: 'fakeAccessToken' }, status: 'success' };

    service.signUp(user).subscribe((response) => {
      expect(response).toEqual(signUpResponse);
      expect(service.loggedUser).toEqual(user);
    });

    const req = httpTestingController.expectOne(`${config.base_url}/auth/signup`);
    expect(req.request.method).toBe('POST');
    req.flush(signUpResponse);

    tick();

    expect(localStorage.getItem('accessToken')).toBe('fakeAccessToken');
    expect(localStorage.getItem('loggedInUser')).toEqual(JSON.stringify(user));
  }));

  it('should get and store token', fakeAsync(() => {
    const email = 'test@example.com';
    const password = 'password123';

    const loginResponse = { data: { accessToken: 'fakeAccessToken' }, status: 'success' };

    service.getAndStoreToken(email, password).subscribe((response) => {
      return expect(response).toEqual(loginResponse);
    });

    const req = httpTestingController.expectOne(`${config.base_url}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(loginResponse);

    tick();

    expect(service.tokenSubject.value).toBe('fakeAccessToken');
    expect(localStorage.getItem('accessToken')).toBe('fakeAccessToken');
  }));

  it('should get and store user', fakeAsync(() => {
    const user: User = {
      firstName: 'testfirstname',
      email: 'test@example.com',
      password: 'password123',
      lastName: 'testlastname',
      image: 'http://avatar.jpg',
      _id: '',
      role: '',
      borrowedBooks: [''],
    };

    const getUserResponse = { data: user, status: 'success' };

    service.getAndStoreUser().subscribe((response) => {
      expect(response).toEqual(getUserResponse);
      expect(service.loggedUser).toEqual(user);
    });

    const req = httpTestingController.expectOne(`${config.base_url}/auth/me`);
    expect(req.request.method).toBe('GET');
    req.flush(getUserResponse);

    tick();

    expect(localStorage.getItem('loggedInUser')).toEqual(JSON.stringify(user));
  }));

  it('should get current user', fakeAsync(() => {
    const user: User = {
      _id: '123',
      firstName: 'testuser',
      lastName: 'lastname',
      email: 'test@example.com',
      password: 'password123',
      role: 'user',
      image: 'http://avatar.jpg',
      borrowedBooks: ['book1'],
    };

    const getCurrentUserResponse = { data: user, status: 'success' };

    service.getCurrentUser().subscribe((response) => {
      expect(response).toEqual(user);
      expect(service.loggedUser).toEqual(user);
    });

    const req = httpTestingController.expectOne(`${config.base_url}/auth/me`);
    expect(req.request.method).toBe('GET');
    req.flush(getCurrentUserResponse);

    tick();

    expect(localStorage.getItem('loggedInUser')).toEqual(JSON.stringify(user));
  }));

  it('should log out user', fakeAsync(() => {
    service.logout();

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('loggedInUser')).toBeNull();
    expect(service.loggedUser).toBeNull();
    expect(service.tokenSubject.value).toBeNull();
  }));
});
