import { Component, computed, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  imports: [ButtonComponent],
})
export class ExchangeComponent {
  value = signal(0);
  valueIn2 = computed(() => this.value() * 2);

  onUpdateClick(): void {
    this.value.update(v => v + 1);
  }
}
