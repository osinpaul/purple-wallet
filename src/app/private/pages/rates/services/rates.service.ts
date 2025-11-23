import { inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { IRateModel } from '../models/rate.model';
import { StoreService } from '../../../../shared/services/store.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IPagedResponseModel } from '../../../../shared/models/paged-response.model';

@Injectable()
export class RatesService {
  private _httpClient: HttpClient = inject(HttpClient);

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
    const params = new HttpParams().set('page', 1).set('limit', 20);
    const headers = new HttpHeaders().set('TestHeader', 'true');

    return this._httpClient
      .get<
        IPagedResponseModel<IRateModel[]>
      >('http://localhost:3000/api/v1/rates', { params, headers })
      .pipe(
        tap(response => this._store.setValue('rates', response.data)),
        map(() => void 0)
      );
  }
}
