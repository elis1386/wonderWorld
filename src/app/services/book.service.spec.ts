import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { ConfigService } from './config.service';
import { AuthService } from './auth.service';

describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService, ConfigService, AuthService],
    });

    service = TestBed.inject(BookService);
    httpTestingController = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all books', fakeAsync(() => {
    const mockBooks = [{ isbn: '1452462', title: 'Book 1' }, { isbn: '2263757', title: 'Book 2' }];

    service.getAllBooks().subscribe((books) => {
      expect(books).toEqual(mockBooks);
    });

    const req = httpTestingController.expectOne(`${configService.base_url}/books`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);

    tick();
  }));

  it('should get book by ISBN', fakeAsync(() => {
    const isbn = '11452462';
    const mockBook = { isbn, title: 'Book 1' };

    service.getBookByIsbn(isbn).subscribe((book) => {
      expect(book).toEqual(mockBook);
    });

    const req = httpTestingController.expectOne(`${configService.base_url}/books/${isbn}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBook);

    tick();
  }));

  it('should search books by title', fakeAsync(() => {
    const title = 'SearchQuery';
    const mockBooks = [{ isbn: '1452462', title: 'Book 1' }, { isbn: '2263757', title: 'Book 2' }];

    service.searchBooksByTitle(title).subscribe((books) => {
      expect(books).toEqual(mockBooks);
    });

    const req = httpTestingController.expectOne(`${configService.base_url}/books/?title=${title}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);

    tick();
  }));
});
