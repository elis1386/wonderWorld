import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Book } from 'src/models/book';
import { User } from 'src/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  books: Book[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.books = user.borrowedBooks as unknown as Book[];
    });
  }

  returnBook(book: Book): void {
    this.userService.returnBooks(this.user._id, [{ ...book }]).subscribe(() => {
      this.getUser();
    });
  }
}
