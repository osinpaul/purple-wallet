import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FAKE_ASSETS } from '../../../shared/const/fake-assets.const';
import { IAssetModel } from './models/asset.model';
import { AssetComponent } from './components/asset/asset.component';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AssetComponent],
})
export class AssetsComponent {
  assets: IAssetModel[] = FAKE_ASSETS;
}
