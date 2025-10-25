import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of, tap } from 'rxjs';
import { StoreService } from '../../../../shared/services/store.service';
import { IAssetModel } from '../models/asset.model';
import { FAKE_ASSETS } from '../../../../shared/const/fake-assets.const';

@Injectable()
export class AssetsService {
  private _store: StoreService = inject(StoreService);
  readonly assets$: Observable<IAssetModel[]> =
    this._store.getValueAsync('assets');

  constructor() {
    this._updateAssets$().subscribe();
  }

  private _updateAssets$(): Observable<void> {
    return of(0).pipe(
      delay(1000),
      tap(() => this._store.setValue('assets', FAKE_ASSETS)),
      map(() => void 0)
    );
  }
}
