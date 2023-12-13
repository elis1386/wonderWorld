import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  loginForm: FormGroup;
  currentUser?: User;
  signInError: string | null = null;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signIn(): void {
    if (this.loginForm.invalid) {
      return this.loginForm.markAllAsTouched();
    }

    this.authService
      .getAndStoreToken(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .subscribe({
        next: () => {
          this.authService.getAndStoreUser().subscribe({
            next: (response) => {
              this.currentUser = response.data;
              if (this.currentUser.role === 'ADMIN') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/user']);
              }
            },
            error: (err) => {
              this.signInError = 'Invalid email or password. Please try again.';
            },
          });
        },
        error: (err) => {
          if (err.status === 403) {
            this.signInError = 'Invalid email or password. Please try again.';
          } else {
            this.signInError =
              'An error occurred during sign-in. Please try again later.';
          }
        },
      });
  }
}
