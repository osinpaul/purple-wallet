import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
})
export class InputComponent {
  @Input() iconUrl: string | null = null;
  @Input() type: 'text' | 'email' = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() value = '';
  @Output() controlValue: EventEmitter<string> = new EventEmitter<string>();

  onInput(value: string) {
    this.value = value;
    this.controlValue.emit(value);
  }
}
