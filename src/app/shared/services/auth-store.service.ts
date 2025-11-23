import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, Observable } from 'rxjs';

export interface IAppAuthStore {
  token: string | null;
  tokenType: 'Bearer' | null;
  expiresIn: 'string' | null;
}

const STORE_INITIAL_STATE: IAppAuthStore = {
  token: null,
  tokenType: null,
  expiresIn: null,
};

@Injectable({ providedIn: 'root' })
export class AuthStoreService {
  private readonly ratesSubject = new BehaviorSubject<IAppAuthStore>({
    ...STORE_INITIAL_STATE,
  });

  public getValue<K extends keyof IAppAuthStore>(key: K): IAppAuthStore[K] {
    return this.ratesSubject.getValue()[key];
  }

  public reset(): void {
    return this.ratesSubject.next({ ...STORE_INITIAL_STATE });
  }

  public getValueAsync<K extends keyof IAppAuthStore>(
    key: K
  ): Observable<IAppAuthStore[K]> {
    return this.ratesSubject.asObservable().pipe(map(state => state[key]));
  }

  public setValue<K extends keyof IAppAuthStore>(
    key: K,
    value: IAppAuthStore[K]
  ): void {
    this.ratesSubject.next({
      ...this.ratesSubject.getValue(),
      [key]: value,
    });
  }
}
