import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { ConfigService } from './config.service';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  let configService: ConfigService;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['token$']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        ConfigService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authService.token$ = of('fakeToken');
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should borrow books', fakeAsync(() => {
    service.borrowBooks('1', '2').subscribe();

    const req = httpTestingController.expectOne(`${configService.base_url}/users/1/borrow`);
    expect(req.request.method).toBe('POST');
    req.flush({});

    tick();
  }));

  it('should return books', fakeAsync(() => {
    service.returnBooks('1', []).subscribe();

    const req = httpTestingController.expectOne(`${configService.base_url}/users/1/return`);
    expect(req.request.method).toBe('POST');
    req.flush({});

    tick();
  }));
});
