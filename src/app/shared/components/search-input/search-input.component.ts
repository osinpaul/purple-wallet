import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule, CommonModule, NgOptimizedImage],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  standalone: true,
})
export class SearchInputComponent {
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
