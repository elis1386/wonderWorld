import { Component, OnInit } from '@angular/core';

import { BookService } from 'src/app/services/book.service';
import { Book, NewBook } from 'src/models/book';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe((response) => {
      this.books = response.data.books;
      console.log(this.books);
    });
  }

  addNewBook(newBook: NewBook) {
    this.bookService.createBook(newBook).subscribe({
      next: () => {
        alert('Book added successfully');
        this.getAllBooks();
      },
      error: (error) => {
        alert('Error adding book. Please check console for details.');
      },
    });
  }

  deleteBook(isbn: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBookByIsbn(isbn).subscribe({
        next: () => {
          this.getAllBooks();
        },
        error: (error) => {
          console.error('Error deleting book', error);
        },
      });
    }
  }

  updateBook(book: Book): void {
    this.bookService.updateBookByIsbn(book.isbn, book).subscribe(() => {
      this.getAllBooks();
    });
  }
}
