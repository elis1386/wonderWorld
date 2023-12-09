import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AuthorService } from 'src/app/services/author.service';
import { Author } from 'src/models/author';
import { Book } from 'src/models/book';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit {

  authorId: string = '';
  author: Author;
  authorBooks: Book[] = [];

  constructor(
    private authorService: AuthorService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.authorId = params['id'];
      this.loadAuthorDetails();
      this.loadAuthorBooks();
    });
  }

  loadAuthorDetails() {
    this.authorService.getAuthorsById(this.authorId).subscribe((response) => {
      this.author = response.data;
    });
  }

  loadAuthorBooks() {
    this.authorService.getAuthorsBooks(this.authorId).subscribe((response) => {
      this.authorBooks = response.data?.books;
    });
  }
}
