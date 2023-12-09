import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { BookService } from 'src/app/services/book.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ModalService } from 'src/app/services/modal.service';
import { AuthorService } from 'src/app/services/author.service';
import { User } from 'src/models/user';
import { Book } from 'src/models/book';
import { Author } from 'src/models/author';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  animations: [
    trigger('borrowBookAnimation', [
      state('idle', style({})),
      state(
        'borrowed',
        style({
          transform: 'scale(1.1)',
          opacity: 0.7,
        })
      ),
      transition('idle => borrowed', [animate('0.5s ease-out')]),
    ]),
  ],
})
export class BookComponent implements OnInit {
  @Input() user: User | null;

  book!: Book;
  bookAuthorId: string;
  moveAnimationState: string = 'initial';
  author: Author;

  constructor(
    private bookService: BookService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    public modalService: ModalService,
    private authorService: AuthorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.activeRoute.params.subscribe((params: Params) => {
      let isbn: string = params['isbn'];
      this.bookService.getBookByIsbn(isbn).subscribe((book) => {
        this.book = book.data;
        this.bookAuthorId = book.data.authors[0]._id;
      });
    });
  }
  borrowBook(book: Book) {
    if (this.user?._id) {
      const userId = this.user._id;
      const bookId = book._id;
      this.userService.borrowBooks(userId, bookId).subscribe(() => {
        book.status = 'borrowed';
      });
    } else {
      this.modalService.open();
    }
  }
  goToAuthorPage() {
    const authorId = this.bookAuthorId;
    this.authorService.getAuthorsById(authorId).subscribe((response) => {
      this.author = response.data;
      this.router.navigate([`/authors/${authorId}`]);
    });
  }
}
