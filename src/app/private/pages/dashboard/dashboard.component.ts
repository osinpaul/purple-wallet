import { ProfileStoreService } from './../../../shared/services/profile-store.service';
import { Component, inject, Signal } from '@angular/core';
import { RatesService } from '../rates/services/rates.service';
import { IRateModel } from '../rates/models/rate.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { RateComponent } from '../rates/components/rate/rate.component';
import { AssetsService } from '../assets/services/assets.service';
import { IAssetModel } from '../assets/models/asset.model';
import { AssetComponent } from '../assets/components/asset/asset.component';
import { BalanceService } from '../../../shared/services/balance.service';
import { IAppBalanceStore } from '../../../shared/services/balance-store.service';
import { DecimalPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [RateComponent, AssetComponent, DecimalPipe],
  providers: [RatesService, AssetsService, BalanceService],
})
export class DashboardComponent {
  private _ratesService = inject(RatesService);
  private _assetsService = inject(AssetsService);
  private _balanceService = inject(BalanceService);
  private _profileStore = inject(ProfileStoreService);

  assets: Signal<IAssetModel[] | undefined> = toSignal(
    this._assetsService.assets$
  );
  rates: Signal<IRateModel[] | undefined> = toSignal(
    this._ratesService.popularRates$
  );
  balance: Signal<IAppBalanceStore | undefined> = toSignal(
    this._balanceService.balance$
  );
  user: Signal<string | undefined> = toSignal(
    this._profileStore.getValueAsync().pipe(
      map(data => {
        return `${data.firstName} ${data.lastName}`;
      })
    )
  );
}
