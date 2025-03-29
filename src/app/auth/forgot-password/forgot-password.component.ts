import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ERROR_MESSAGES } from '../../../error-messages';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, MatButtonModule, MatInput, MatFormField, MatLabel, MatCard, RouterLink, MatError],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  private sub: Subscription | null = null;
  status: string| null = null;
  constructor(private authService : AuthService, private router: Router) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl<string | null>('', [Validators.required, Validators.email])
    });
  }
  onForgotPassword() {
    this.sub = this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: () => this.router.navigate(['/reset-password']),
      error: (err) => console.error('Forgot Password Failed', err),
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
}
