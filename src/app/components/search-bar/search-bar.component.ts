import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/models/book';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  searchForm: FormGroup;
  results: Book[] = [];
  showBox = false;
  currentBook: Book;

  constructor(private bookService: BookService, private router: Router) {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(''),
    });
  }

  ngOnInit() {
    this.searchForm
      .get('searchTerm')!
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((search: string) => {
          if (!search) {
            this.results = [];
            return [];
          }
          return this.bookService.searchBooksByTitle(search.toLowerCase());
        })
      )
      .subscribe((searchResults) => {
        this.results = searchResults.data.books;
      });
  }

  onSearchInputChange() {
    const searchTerm = this.searchForm.get('searchTerm')!.value.toLowerCase();
    this.showBox = !!searchTerm;
  }

  goToCurrentBook(isbn: string) {
    this.bookService.getBookByIsbn(isbn).subscribe((book) => {
      this.currentBook = book;
      this.router.navigate(['/book', isbn]);
      this.showBox = false;
      this.searchForm.reset();
    });
  }
}
