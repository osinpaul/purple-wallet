import { FontWeightDirective } from './../../directives/font-weight.directive';
import { NgClass, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { ButtonIconDirective } from '../../directives/button-icon.directive';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss'],
  imports: [
    NgClass,
    FontWeightDirective,
    ButtonIconDirective,
    NgOptimizedImage,
  ],
})
export class AppNavButtonComponent implements AfterViewInit {
  private _elementRef: ElementRef = inject(ElementRef);
  private _observer!: MutationObserver;
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

  ngAfterViewInit(): void {
    this._observer = new MutationObserver(() => {
      const hasClass =
        this._elementRef.nativeElement.classList.contains('active');
      this.isActive = hasClass;
    });

    this._observer.observe(this._elementRef.nativeElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const hasClass =
      this._elementRef.nativeElement.classList.contains('active');
    this.isActive = hasClass;
  }
}
