import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  standalone: true,
})
export class InputComponent {
  iconUrl = input<string>('/icons/search.svg');
  type = input<'text'>('text');
  placeholder = input('');
  disabled = input<boolean>(false);
  @Input()
  value: string | undefined = '';
  @Output() controlValue = new EventEmitter<string>();

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.controlValue.emit(this.value);
  }
}
