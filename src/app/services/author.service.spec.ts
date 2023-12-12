import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthorService } from './author.service';
import { ConfigService } from './config.service';
import { Author } from 'src/models/author';

describe('AuthorService', () => {
  let service: AuthorService;
  let httpTestingController: HttpTestingController;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorService, ConfigService],
    });

    service = TestBed.inject(AuthorService);
    httpTestingController = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all authors', fakeAsync(() => {
    const mockAuthors = [{ _id: '1', name: 'Author 1' }, { _id: '2', name: 'Author 2' }];
  
    service.getAllAuthors().subscribe((authors) => {
      return expect(authors).toEqual(mockAuthors as Author[]);
    });
  
    const req = httpTestingController.expectOne(`${configService.base_url}/authors`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthors);
  
    tick();
  }));

  it('should handle error when fetching authors', fakeAsync(() => {
    service.getAllAuthors().subscribe((authors) => {
      expect(authors).toEqual([]);
    });

    const req = httpTestingController.expectOne(`${configService.base_url}/authors`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error'));

    tick();
  }));

  it('should get author by id', fakeAsync(() => {
    const authorId = '1';
    const mockAuthor = { id: authorId, name: 'Author 1' };

    service.getAuthorsById(authorId).subscribe((author) => {
      expect(author).toEqual(mockAuthor);
    });

    const req = httpTestingController.expectOne(`${configService.base_url}/authors/${authorId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAuthor);

    tick();
  }));

  it('should get authors books by id', fakeAsync(() => {
    const authorId = '1';
    const mockBooks = [{ id: '1', title: 'Book 1' }, { id: '2', title: 'Book 2' }];

    service.getAuthorsBooks(authorId).subscribe((books) => {
      expect(books).toEqual(mockBooks);
    });

    const req = httpTestingController.expectOne(`${configService.base_url}/authors/${authorId}/books`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);

    tick();
  }));
});
