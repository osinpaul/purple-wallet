import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { IAssetModel } from './models/asset.model';
import { AssetComponent } from './components/asset/asset.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { AssetsService } from './services/assets.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AssetComponent],
  providers: [AssetsService],
})
export class AssetsComponent {
  private _ratesService: AssetsService = inject(AssetsService);
  assetsSignal: Signal<IAssetModel[] | undefined> = toSignal(
    this._ratesService.assets$
  );
}
