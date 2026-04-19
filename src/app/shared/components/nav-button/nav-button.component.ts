import { NgClass, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [NgClass, NgOptimizedImage],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
})
export class NavButtonComponent implements AfterViewInit {
  private _elementRef: ElementRef = inject(ElementRef);
  private _observer!: MutationObserver;

  type = signal('button');
  isActive = signal<boolean>(false);

  text = input('');
  iconUrl = input('');
  iconUrlActive = input('');
  disabled = input<boolean>(false);

  @Output()
  clicked = new EventEmitter<Event>();

  onClick(event: Event): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }

  ngAfterViewInit(): void {
    this._observer = new MutationObserver(() => {
      const hasClass =
        this._elementRef.nativeElement.classList.contains('active');
      this.isActive.set(hasClass);
    });

    this._observer.observe(this._elementRef.nativeElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }
}
