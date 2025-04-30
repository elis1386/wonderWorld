import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { trigger, state, style, animate, transition } from "@angular/animations";

import { BookService } from "src/app/services/book.service";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";
import { ModalService } from "src/app/services/modal.service";

import { Book } from "src/models/book";
import { User } from "src/models/user";

@Component({
  selector: "app-new-arrive",
  templateUrl: "./new-arrive.component.html",
  styleUrls: ["./new-arrive.component.css"],
  animations: [
    trigger("borrowBookAnimation", [
      state("idle", style({})),
      state(
        "borrowed",
        style({
          transform: "scale(1.1)",
          opacity: 0.7,
        })
      ),
      transition("idle => borrowed", [animate("0.5s ease-out")]),
    ]),
  ],
})
export class NewArriveComponent implements OnInit {
  @Input() user: User | null;

  isModalVisible = false;
  books: Book[] = [];
  currentBook: Book;
  book!: Book;

  constructor(
    private router: Router,
    private bookService: BookService,
    private userService: UserService,
    private authService: AuthService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.bookService.getAllBooks().subscribe((response) => {
      if (response.status === "success") {
        const books = response.data.books;
        this.books = books.splice(-4);
      } else {
        console.error("Error retrieving books:", response);
      }
    });
  }

  goToCurrentBook(isbn: string) {
    this.bookService.getBookByIsbn(isbn).subscribe((book) => {
      this.currentBook = book;
      this.router.navigate(["/book", isbn]);
    });
  }
  borrowBook(book: Book) {
    if (this.user?._id) {
      const userId = this.user._id;
      const bookId = book._id;
      this.userService.borrowBooks(userId, bookId).subscribe((response) => {
        book.status = "borrowed";
      });
    } else {
      this.modalService.open();
    }
  }
}
