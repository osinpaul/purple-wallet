import { ButtonComponent } from './../../../shared/components/button/button.component';
import { PasswordInputComponent } from './../../../shared/components/password-input/password-input.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-log-in',
  imports: [
    RouterLink,
    ButtonComponent,
    InputComponent,
    PasswordInputComponent,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  standalone: true,
})
export class LogInComponent {
  onInputChange(value: string): void {
    console.log('Контрол изменился:', value);
  }
}
