import { Component, computed, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  imports: [ButtonComponent],
})
export class ExchangeComponent implements OnInit {
  value = signal(0);
  valueIn2 = computed(() => this.value() * 2);
  valueIn2$ = toObservable(this.valueIn2);

  onUpdateClick(): void {
    this.value.update(v => v + 1);
  }

  ngOnInit(): void {
    this.valueIn2$.subscribe(console.log);
  }
}
