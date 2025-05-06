import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() title = '';

  @Output() btnClick: EventEmitter<void> = new EventEmitter<void>();

  onBtnClick(): void {
    this.btnClick.emit();
  }
}
