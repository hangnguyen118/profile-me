import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { ERROR_MESSAGES } from '../../../../error-messages';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatCard,
    RouterLink,
    MatError,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
  registerForm: FormGroup;
  private sub: Subscription | null = null;

  constructor(private router: Router, private authService: AuthService) {
    this.registerForm = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.registerForm.addControl(
      'confirmPassword',
      new FormControl('', [
        Validators.required,
        this.passwordMatchValidator(this.registerForm.controls['password']),
      ])
    );
  }
  onSubmit() {
    this.sub = this.authService.register(this.registerForm.value).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Login Failed', err),
    });
  }
  passwordMatchValidator(passwordControl: AbstractControl): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      let group = c as FormControl;
      const confirmPassword = group.value;
      let password = passwordControl.value;
      return confirmPassword === password ? null : { passwordMismatch: true };
    };
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
