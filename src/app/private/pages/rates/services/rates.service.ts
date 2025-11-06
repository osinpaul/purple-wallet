import { inject, Injectable } from '@angular/core';
import { combineLatest, delay, map, Observable, of, tap, filter } from 'rxjs';
import { IRateModel } from '../models/rate.model';
import { FAKE_RATES } from '../../../../shared/const/fake-rates.const';
import { StoreService } from '../../../../shared/services/store.service';

@Injectable()
export class RatesService {
  private _store: StoreService = inject(StoreService);
  readonly rates$: Observable<IRateModel[]> =
    this._store.getValueAsync('rates');
  readonly searchForm$: Observable<string> =
    this._store.getFormValueAsync('search');
  readonly filteredRates$: Observable<IRateModel[]> = combineLatest([
    this.rates$,
    this.searchForm$,
  ]).pipe(
    map(([rates, formValue]) =>
      rates.filter(rate =>
        rate.assetName.toLowerCase().includes(formValue.toLowerCase())
      )
    )
  );

  constructor() {
    this._updateRates$().subscribe();
  }

  private _updateRates$(): Observable<void> {
    return of(0).pipe(
      delay(1000),
      tap(() => this._store.setValue('rates', FAKE_RATES)),
      map(() => void 0)
    );
  }
}
