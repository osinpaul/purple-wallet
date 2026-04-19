import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { IRateModel } from './models/rate.model';
import { FAKE_RATES } from '../../../shared/const/fake-rates.const';
import { RateComponent } from './components/rate/rate.component';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { StoreService } from '../../../shared/services/store.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
  standalone: true,
  imports: [RateComponent],
})
export class RatesComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _store = inject(StoreService);
  rates = toSignal(this._store.getValueAsync('rates'));

  searchQuery = toSignal(
    this._activatedRoute.queryParamMap.pipe(
      map(params => (params.get('q') ?? '').trim().toLowerCase())
    ),
    {
      initialValue: '',
    }
  );

  filterRates = computed(() => {
    const query = this.searchQuery();
    const list = this.rates();

    if (!query) {
      return list;
    }

    return list?.filter(
      rate =>
        rate.assetId.toLowerCase().includes(query.toLowerCase()) ||
        rate.assetName.toLowerCase().includes(query.toLowerCase())
    );
  });

  constructor() {
    // effect — аналог подписки на изменения
    effect(() => {
      console.log('Rates updated:', this.rates());
    });
  }

  ngOnInit(): void {
    this._store.setValue('rates', FAKE_RATES);
  }
}
