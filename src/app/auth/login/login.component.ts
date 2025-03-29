import { Component, inject, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ERROR_MESSAGES } from '../../../error-messages';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButtonModule, MatInput, MatFormField, MatLabel, MatCard, RouterLink, MatError],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
  loginForm: FormGroup;
  private sub: Subscription | null = null;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onLogin() {
    this.sub = this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => console.error('Login Failed', err),
    });
  }
  isInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }
  getErrorMessage(c: AbstractControl) {
    let control = c as FormControl;
    if (!control || !control.errors || !this.isInvalid(control)) {
      return '';
    }
    const errorKey = Object.keys(control.errors)[0];
    if (typeof ERROR_MESSAGES[errorKey] === 'function') {
      return ERROR_MESSAGES[errorKey](control.errors[errorKey]);
    }
    return ERROR_MESSAGES[errorKey] || 'Invalid!';
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}