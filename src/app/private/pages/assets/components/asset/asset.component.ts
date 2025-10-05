import { Component, Input } from '@angular/core';
import { IAssetModel } from '../../models/asset.model';
import {
  CurrencyPipe,
  DecimalPipe,
  NgClass,
  NgOptimizedImage,
  PercentPipe,
  UpperCasePipe,
} from '@angular/common';
import { LegacyUpperCasePipe } from '../../../../../shared/pipes/legacy-uppercase.pipe';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
  imports: [
    NgOptimizedImage,
    NgClass,
    CurrencyPipe,
    PercentPipe,
    DecimalPipe,
    LegacyUpperCasePipe,
  ],
})
export class AssetComponent {
  @Input() data: IAssetModel | null = null;
}
