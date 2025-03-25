import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { ERROR_MESSAGES } from '../../../error-messages';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatCard,
    RouterLink,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  onSubmit() {
    console.log(this.loginForm.value);
    this.router.navigate(['/home']);
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
