import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      image: [''],
    });
  }
  signUp() {
    if (this.signUpForm.invalid) {
      return this.signUpForm.markAllAsTouched();
    }
    const user = this.signUpForm.value;
    this.authService.signUp(user).subscribe({
      next: () => {
        this.router.navigate(['/user']);
      },
      error: (error) => {
        console.error('Signup failed!', error);
      },
    });
  }
}
