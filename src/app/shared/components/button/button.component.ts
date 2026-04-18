import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  title = input('');
  @Output() btnClick: EventEmitter<void> = new EventEmitter<void>();

  onBtnClick(): void {
    this.btnClick.emit();
  }
}
