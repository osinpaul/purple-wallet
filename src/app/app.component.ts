import { Component } from '@angular/core';
import { ButtonComponent } from './shared/components/button/button.component';
import { InputComponent } from './shared/components/input/input.component';
import { PasswordInputComponent } from './shared/components/password-input/password-input.component';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent, InputComponent, PasswordInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'purple-wallet';

  onInputChange(value: string): void {
    console.log('Контрол изменился:', value);
  }
}
