import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { StoreService } from '../../../../shared/services/store.service';
import { IAssetModel } from '../models/asset.model';
import { IHttpResponseModel } from '../../../../shared/models/http-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AssetsService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _store: StoreService = inject(StoreService);
  readonly assets$: Observable<IAssetModel[]> =
    this._store.getValueAsync('assets');

  constructor() {
    this._updateAssets$().subscribe();
  }

  private _updateAssets$(): Observable<void> {
    return this._httpClient
      .get<
        IHttpResponseModel<IAssetModel[]>
      >('http://localhost:3000/api/v1/assets')
      .pipe(
        tap(response => this._store.setValue('assets', response.data)),
        map(() => void 0)
      );
  }
}
