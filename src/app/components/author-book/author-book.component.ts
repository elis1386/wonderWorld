import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorService } from 'src/app/services/author.service';
import { Book } from 'src/models/book';

@Component({
  selector: 'app-author-book',
  templateUrl: './author-book.component.html',
  styleUrls: ['./author-book.component.css'],
})
export class AuthorBookComponent implements OnChanges {
  @Input() authorId: string;
  relatedBooks: Book[] = [];
  books: Book[] = [];
  currentBook: Book;

  constructor(private authorService: AuthorService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('authorId' in changes) {
      this.loadRelatedBooks();
    }
  }
  getAllAuthorBooks() {
    this.authorService.getAuthorsBooks(this.authorId).subscribe({
      next: (response) => {
        this.books = response.data.books;
      },
      error: (error) => {
        console.error('Error fetching authors books:', error);
      },
    });
  }

  loadRelatedBooks() {
    if (this.authorId) {
      this.authorService.getAuthorsBooks(this.authorId).subscribe({
        next: (response) => {
          const books = response.data?.books;
          this.relatedBooks = Array.isArray(books) ? books.slice(0, 3) : [];
        },
        error: (error) => {
          console.error('Error fetching authors books:', error);
        },
      });
    }
  }

  goToCurrentBook(isbn: string) {
    this.router.navigate(['/book', isbn]);
  }
}
