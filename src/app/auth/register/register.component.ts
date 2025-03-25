import { Component } from '@angular/core';
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
import { ERROR_MESSAGES } from '../../../error-messages';

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
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    });
    this.registerForm.addControl('confirmPassword', new FormControl('', [Validators.required, this.passwordMatchValidator(this.registerForm.get('password')?.value)]));
  }
  onSubmit() {}
  passwordMatchValidator(password?: string): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      let group = c as FormControl;
      const confirmPassword = group.value;
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
}
