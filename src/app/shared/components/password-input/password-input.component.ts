import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export enum EPasswordInputIcons {
  Opened = 'icons/eye_opened.svg',
  Closed = 'icons/eye_closed.svg',
}

@Component({
  selector: 'app-password-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  standalone: true,
})
export class PasswordInputComponent {
  @Input() iconUrl: string | null = null;
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() value = '';
  @Output() controlValue: EventEmitter<string> = new EventEmitter<string>();

  type = 'password';
  buttonIcon = EPasswordInputIcons.Closed;

  onInput(value: string): void {
    this.value = value;
    this.controlValue.emit(value);
  }

  onButtonToggleClick(): void {
    if (this.type === 'password') {
      this.type = 'text';
      this.buttonIcon = EPasswordInputIcons.Opened;
    } else {
      this.type = 'password';
      this.buttonIcon = EPasswordInputIcons.Closed;
    }
  }
}
