import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { FAKE_ASSETS } from '../../../shared/const/fake-assets.const';
import { IAssetModel } from './models/asset.model';
import { AssetComponent } from './components/asset/asset.component';
import { delay, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AssetComponent],
})
export class AssetsComponent {
  assets$: Observable<IAssetModel[]> = of(FAKE_ASSETS).pipe(delay(1000));
  assetsSignal: Signal<IAssetModel[] | undefined> = toSignal(this.assets$);
}
