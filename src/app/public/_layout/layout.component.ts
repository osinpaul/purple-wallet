import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { NgOptimizedImage } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-layout',
  imports: [NgOptimizedImage, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
})
export class PublicLayoutComponent {
  onInputChange(value: string): void {
    console.log('Контрол изменился:', value);
  }
}
