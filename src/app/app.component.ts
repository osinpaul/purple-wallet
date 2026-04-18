import { Component } from '@angular/core';
import { ButtonComponent } from './shared/components/button/button.component';
import { InputComponent } from './shared/components/input/input.component';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent, InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'purple-wallet';

  onBtnClick(): void {
    console.log('Button clicked');
  }

  onInputChange(value: string): void {
    console.log('Control has changed:', value);
  }
}
