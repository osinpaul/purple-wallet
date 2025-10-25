import { IAssetModel } from './../../private/pages/assets/models/asset.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IRateModel } from '../../private/pages/rates/models/rate.model';
import { map, Observable } from 'rxjs';

export interface IAppStore {
  rates: IRateModel[];
  assets: IAssetModel[];
}

const STORE_INITIAL_STATE: IAppStore = {
  rates: [],
  assets: [],
};

@Injectable({ providedIn: 'root' })
export class StoreService {
  private readonly ratesSubject = new BehaviorSubject<IAppStore>({
    ...STORE_INITIAL_STATE,
  });

  public getValue<K extends keyof IAppStore>(key: K): IAppStore[K] {
    return this.ratesSubject.getValue()[key];
  }

  public getValueAsync<K extends keyof IAppStore>(
    key: K
  ): Observable<IAppStore[K]> {
    return this.ratesSubject.asObservable().pipe(map(state => state[key]));
  }

  public setValue<K extends keyof IAppStore>(
    key: K,
    value: IAppStore[K]
  ): void {
    this.ratesSubject.next({
      ...this.ratesSubject.getValue(),
      [key]: value,
    });
  }
}
