import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user = new BehaviorSubject<User | null>(null);
  currentUser?: User;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.user.next(user);
      if (user) {
        this.currentUser = user;
      }
    });
  }

  navigateToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  navigateToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
  getProfileLink(): string {
    if (this.currentUser?.role === 'ADMIN') {
      return '/admin';
    } else {
      return '/user';
    }
  }
}
