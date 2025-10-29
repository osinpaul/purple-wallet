import { ButtonComponent } from './../../../shared/components/button/button.component';
import { PasswordInputComponent } from './../../../shared/components/password-input/password-input.component';
import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../../../shared/services/auth.service';
import { catchError, of, take, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-log-in',
  imports: [
    ButtonComponent,
    InputComponent,
    PasswordInputComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  standalone: true,
})
export class LogInComponent {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  public formValue: { password: string | null } = {
    password: null,
  };

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  error: string | null = null;

  onInputChange(ctrl: 'password', value: string): void {
    this.formValue[ctrl] = value;
  }

  onLoginClick(): void {
    this._authService
      .login$(this.form.controls.email.value, this.formValue['password'] ?? '')
      .pipe(
        take(1),
        tap(() => this._router.navigate(['private'])),
        catchError(err => {
          this.error = err;
          return of(err);
        })
      )
      .subscribe();
  }
}
