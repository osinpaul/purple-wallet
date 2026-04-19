import { ButtonComponent } from './../../../shared/components/button/button.component';
import { PasswordInputComponent } from './../../../shared/components/password-input/password-input.component';
import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../../../shared/services/auth.service';
import { catchError, of, take, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [ButtonComponent, InputComponent, PasswordInputComponent],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  standalone: true,
})
export class LogInComponent {
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _formValue: { username: string | null; password: string | null } = {
    username: null,
    password: null,
  };

  error: string | null = null;

  onInputChange(ctrl: 'username' | 'password', value: string): void {
    this.error = null;
    this._formValue[ctrl] = value;
  }

  onLoginClick(): void {
    if (this._formValue.username == null || this._formValue.password == null)
      return;
    this._authService
      .login$(this._formValue.username, this._formValue.password)
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
