import { Injectable } from '@angular/core';
import { IRateModel } from '../../private/pages/rates/models/rate.model';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IAppStore {
  rates: IRateModel[];
}

const STORE_INITIAL_STATE: IAppStore = {
  rates: [],
};

@Injectable({ providedIn: 'root' })
export class StoreService {
  // Хранить
  private readonly _storeSubject = new BehaviorSubject<IAppStore>({
    ...STORE_INITIAL_STATE,
  });
  // Отдавать
  public getValue<K extends keyof IAppStore>(key: K): IAppStore[K] {
    return this._storeSubject.getValue()[key];
  }

  public getValueAsync<K extends keyof IAppStore>(
    key: K
  ): Observable<IAppStore[K]> {
    return this._storeSubject.asObservable().pipe(map(state => state[key]));
  }

  // Сохранять
  public setValue<K extends keyof IAppStore>(
    key: K,
    value: IAppStore[K]
  ): void {
    this._storeSubject.next({
      ...this._storeSubject.getValue(),
      [key]: value,
    });
  }
}
