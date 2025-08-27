import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss'],
  imports: [NgOptimizedImage, NgClass],
})
export class AppNavButtonComponent {
  type = 'button';
  isActive = false;

  @Input() text = '';
  @Input() iconUrl = '';
  @Input() iconUrlActive = '';
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<Event>();

  onClick(event: Event): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
